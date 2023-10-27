import { Form, Link} from '@remix-run/react';
import { useStore } from '~/hooks/useStore';
import { API_METHODS } from '~/utils/constants';
import styles from './styles.css';
import { useEffect, useState } from 'react';
import getApiKeys from '~/utils/functions/getApiKeys';
import Addresses, { links as addressesStyles} from './addresses';
import OrderHistory, {links as ordersStyles } from './orders';
import ReferralWidget, {links as referralStyles} from './referral';
import LoyaltyRewardsTab, { links as loyaltyStyles } from './loyalty';

export function links() {
  return [
    { rel: 'stylesheet', href: styles },
    ...referralStyles(),
    ...ordersStyles(),
    ...addressesStyles(),
    ...loyaltyStyles(),
  ];
}

export default function Account() {
  const { data } = useStore(store => store.account);
  const { id } = data;
  
  return id !== '' ? (
    <div className={'fullWidth minHeight'}>
      <Header data={{
        firstName: data.firstName
      }} />
      <Tabs />
    </div>
  ) : null;
}

function Header({ data }) {
  const [open, setOpen] = useState(false);
  return <div className="myAccountHeaderWrapper">
    <h1 className={'myH1'}>Welcome Back{data.firstName !== '' && ', ' + data.firstName}!</h1>
  </div>;
}

function Tabs() {
  const showRewardsTab = (getApiKeys().FEATURE_FLAGS.LOYALTY);
  const showAddressTab = true;
  const showReferralTab = true;
  const [active, setActive] = useState(1);

  const tabsID = {
    'ad': 1,
    'orders': 2,
    'referrals': 3,
    'address': 4,
    'rewards': 5
  };

  useEffect(() => {
    checkURLQuerys();
  }, []);
  

  function checkURLQuerys() {
    const URLQuery = window.location.search.split('=');
    const thereIsCParam = URLQuery[0].includes('c');
    const tabQuery = ((thereIsCParam) ? URLQuery[1] : null);
    const tabToGo = tabsID[tabQuery] || (showRewardsTab ? 5 : 1);

    setActive(tabToGo);
  }

  function setURLQuery(tab) {
    // eslint-disable-next-line no-unused-vars
    const urlTogo = Object.entries(tabsID).filter(([key, value]) => value === tab)[0];
    if (urlTogo) window.history.pushState('tab', '', `/account?c=${urlTogo[0]}`);
  }

  function handleActiveTab(tab) {
    setActive(tab);
    setURLQuery(tab);
  }

  return < div className = {'fixedWidthPage' }>
    <section className={'MAMenu'}>
      {showRewardsTab && <div className={active === 5 ? 'navigationTab selected' : 'navigationTab'} onClick={() => handleActiveTab(5)}>Rewards</div>}
      <div className={active === 1 ? 'navigationTab selected' : 'navigationTab'} onClick={() => handleActiveTab(1)}>Auto-Deliveries</div>
      <div className={active === 2 ? 'navigationTab selected' : 'navigationTab'} onClick={() => handleActiveTab(2)}>Order History</div>
      {showReferralTab && <div className={active === 3 ? 'navigationTab selected' : 'navigationTab'} onClick={() => handleActiveTab(3)}>Referral</div>}
      {showAddressTab && <div className={active === 4 ? 'navigationTab selected' : 'navigationTab'} onClick={() => handleActiveTab(4)}>Addresses</div>}
    </section>
    <hr className="myHr" />
    {active === 2 ? <OrderHistory /> : null}
    {active === 3 ? <ReferralWidget /> : null}
    {showAddressTab && active === 4 ? <Addresses /> : null}
    {active === 5 ? <LoyaltyRewardsTab /> : null}
  </div>;
}