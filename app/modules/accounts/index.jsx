/* eslint-disable no-unused-vars */
import {useStore} from '~/hooks/useStore';
import styles from './styles.css';
import {useEffect, useState} from 'react';
import getApiKeys from '~/utils/functions/getApiKeys';
import Addresses, {links as addressesStyles} from './addresses';
import OrderHistory, {links as ordersStyles} from './orders';
import ReferralWidget, {links as referralStyles} from './referral';
import LoyaltyRewardsTab, {links as loyaltyStyles} from './loyalty';
import AccountSubscription, {
  links as subscriptionStyles,
} from '~/modules/subscription/orderGroove/accounts';
import {useYotpo} from '~/hooks/useYotpo';

export function links() {
  return [
    {rel: 'stylesheet', href: styles},
    ...subscriptionStyles(),
    ...referralStyles(),
    ...ordersStyles(),
    ...addressesStyles(),
    ...loyaltyStyles(),
  ];
}

export default function Account(props) {
  const {data} = useStore((store) => store.account);

  const {id} = data;

  data.yotpoFAQ = props?.yotpoFaq[0].yotpoQuestions || null;
  data.yotpoProducts = props?.yotpoProducts || null;

  return id !== '' ? (
    <div className={'fullWidth minHeight'}>
      <Header
        data={{
          firstName: data.firstName,
        }}
      />
      <Tabs data={data} />
    </div>
  ) : null;
}

function Header({data}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="myAccountHeaderWrapper">
      <h1 className={'myH1'}>
        Welcome Back{data.firstName !== '' && ', ' + data.firstName}!
      </h1>
    </div>
  );
}

function Tabs({data}) {
  const showRewardsTab = getApiKeys().FEATURE_FLAGS.LOYALTY;
  const showAddressTab = true;
  const showReferralTab = true;
  const [active, setActive] = useState(1);
  const {refreshWidgets} = useYotpo();

  const tabsID = {
    ad: 1,
    orders: 2,
    referrals: 3,
    address: 4,
    rewards: 5,
  };

  useEffect(() => {
    checkURLQuerys();
    refreshWidgets();
  }, []);

  function checkURLQuerys() {
    const URLQuery = window.location.search.split('=');
    const thereIsCParam = URLQuery[0].includes('c');
    const tabQuery = thereIsCParam ? URLQuery[1] : null;
    const tabToGo = tabsID[tabQuery] || (showRewardsTab ? 5 : 1);

    setActive(tabToGo);
  }

  function setURLQuery(tab) {
    // eslint-disable-next-line no-unused-vars
    const urlTogo = Object.entries(tabsID).filter(
      ([key, value]) => value === tab,
    )[0];

    if (urlTogo);
    window.history.pushState('tab', '', `/account?c=${urlTogo[0]}`);
  }

  function handleActiveTab(tab) {
    setActive(tab);
    setURLQuery(tab);
  }

  return (
    <div className={'fixedWidthPage'}>
      <section className={'MAMenu'}>
        {showRewardsTab && (
          <div
            className={
              active === 5 ? 'navigationTab tab-selected' : 'navigationTab'
            }
            onClick={() => handleActiveTab(5)}
          >
            Rewards
          </div>
        )}
        <div
          className={
            active === 1 ? 'navigationTab tab-selected' : 'navigationTab'
          }
          onClick={() => handleActiveTab(1)}
        >
          Auto-Deliveries
        </div>
        <div
          className={
            active === 2 ? 'navigationTab tab-selected' : 'navigationTab'
          }
          onClick={() => handleActiveTab(2)}
        >
          Order History
        </div>
        {showReferralTab && (
          <div
            className={
              active === 3 ? 'navigationTab tab-selected' : 'navigationTab'
            }
            onClick={() => handleActiveTab(3)}
          >
            Referral
          </div>
        )}
        {showAddressTab && (
          <div
            className={
              active === 4 ? 'navigationTab tab-selected' : 'navigationTab'
            }
            onClick={() => handleActiveTab(4)}
          >
            Addresses
          </div>
        )}
      </section>
      <hr className="myHr" />
      {active === 1 ? (
        <AccountSubscription
          clientId={
            data.id !== '' ? data.id.replace('gid://shopify/Customer/', '') : ''
          }
          active={active}
        />
      ) : null}
      <div style={{display: active === 2 ? 'flex' : 'none'}}>
        <OrderHistory />
      </div>
      <div style={{display: active === 3 ? 'flex' : 'none'}}>
        <ReferralWidget />
      </div>
      <div style={{display: showAddressTab && active === 4 ? 'flex' : 'none'}}>
        <Addresses />
      </div>
      <div style={{display: active === 5 ? 'block' : 'none'}}>
        <LoyaltyRewardsTab
          yotpoFAQ={data?.yotpoFAQ}
          yotpoProducts={data?.yotpoProducts}
        />
      </div>
    </div>
  );
}
