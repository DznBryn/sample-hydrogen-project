import { Form, Link, useLoaderData } from '@remix-run/react';
import { useStore } from '~/hooks/useStore';
import { API_METHODS } from '~/utils/constants';
import styles from './styles.css';
import { useEffect, useState } from 'react';
import getApiKeys from '~/utils/functions/getApiKeys';
import Addresses, { links as addressesStyles} from './addresses';

export function links() {
  return [
    ...addressesStyles(),
    { rel: 'stylesheet', href: styles },
  ];
}

export default function Account() {
  const { data } = useStore(store => store.account);
  const { id } = data;
  console.log(data);
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
    <div className="dropdownWrap">
      <div id="headerMenuBtn" className={'carat'} onClick={() => setOpen(!open)}>&#9660;</div>
      {open ?
        <div className={'shortMenu'}>
          {/*<a href="/account/edit">Edit Account</a>*/}
          <Link to="/pages/contact-us">Contact Us</Link>
          <Form method={API_METHODS.POST} action='/account/logout'>
            <button type='submit'>Sign out</button>
          </Form>
        </div>
        :
        null
      }
    </div>
  </div>;
}

function Tabs() {
  const showRewardsTab = (getApiKeys().FEATURE_FLAGS.LOYALTY);
  const showAddressTab = true;
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
      {showAddressTab && <div className={active === 4 ? 'navigationTab selected' : 'navigationTab'} onClick={() => handleActiveTab(4)}>Addresses</div>}
    </section>
    <hr className="myHr" />
    {showAddressTab && active === 4 ? <Addresses /> : null}
  </div>;
}