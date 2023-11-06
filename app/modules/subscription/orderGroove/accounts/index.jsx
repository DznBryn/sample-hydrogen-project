import React from 'react';
import styles from './styles.css';
import getApiKeys from '~/utils/functions/getApiKeys';
//let loaded = false;

export function links() {
  return [
    { rel: 'stylesheet', href: styles },
  ];
}

const AccountSubscription = ({ active, clientId }) => {
  return (
    <div className={(active === 1) ? 'menuWrapper' : 'menuWrapper hidden'}>
      <div id="autoTab">
        <div className={'ogMyAcctWrapper'}>
          <div className="fixedWidthPage">
            <iframe src={'https://services.tula.com/subscriptions.html?clientId=' + clientId + '&env=' + getApiKeys().CURRENT_ENV} width="100%" height="1300px" style={{ border: 'none' }}></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AccountSubscription, () => { return false; });