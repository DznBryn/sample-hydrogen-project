import React from 'react';
import { useStore } from '~/hooks/useStore';
import styles from './styles.css';

export function links() {
  return [
    { rel: 'stylesheet', href: styles }
  ];
}
export default function Addresses() {
  const data = useStore(store => store?.account?.data ?? null);
  return (
    <div id="addressTab" className={'mainContainer'}>
      <div className="dataContainer">
        <div className="accountDetailsContainer">
          <div className={'headerContainer'}>
            <h3 className={'headerTitle'}>Account Details</h3>
          </div>
          <h3 className={'accountName'}>{
            (data?.defaultAddress?.firstName !== '' ? data.defaultAddress.firstName : data?.firstName)
            + ' ' +
            (data?.defaultAddress?.lastName !== '' ? data.defaultAddress.lastName : data?.lastName)
          }</h3>
          <span className={'accountDetails'}>{data?.phone}</span>
          <span className={'accountDetails'}>{data?.email}</span>
          <span className={'accountDetails'}>
            {new Date(data?.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
        <div className={'addressContainer'}>

          <div className={'headerContainer'}>
            <h3 className={'headerTitle'}>Shipping Addresses</h3>
            <button
              className={'editButton'}

            >
              + Add New Address
            </button>
          </div>
          {
            data?.addresses && data.addresses?.length > 0 ? (
              <div className={'addressListContainer'}>
                {
                  data.addresses.sort((a, b) => {
                    a.isDefault = data?.defaultAddress?.id === a.id;
                    b.isDefault = data?.defaultAddress?.id === b.id;
                    return b.isDefault - a.isDefault
                  }).map(address => <><AddressBox data={address} /></>)
                }
              </div>
            ) : (<p className={'noAddressesMessage'}>
              <strong>No addesses saved yet</strong>
              <br />
              <span>
                Shipping addresses used at checkout will be saved here or you
                can &nbsp;
              </span>
              <span
                className={'editButton'}

              >
                add a new address now.
              </span>
            </p>)
          }
        </div>
      </div>
    </div>
  );
}

const AddressBox = ({ data = null }) => {
  return (
    <div
      className={'addressBoxContainer'}
      style={{
        background: data?.isDefault && '#47c6d90d',
        paddingTop: !data?.isDefault && 33,
      }}
    >
      {data?.isDefault && (
        <div className={'defaultAddressBadge'}>default address</div>
      )}

      <div className={'addressDetails'}>
        <p
          className={'addressDetailName'}
        >{`${data?.firstName} ${data?.lastName}`}</p>
        <p className={'addressDetailAddress'}>
          {data?.address1}.&nbsp;
          {data?.city},&nbsp;
          {data?.zip},&nbsp;
          <br className={'countryBreakRow'} />
          {data?.country}
        </p>
      </div>

      <div className={'addressBtnContainer'}>
        <button
          className={'addressBtn'}
          type="button"

        >
          Edit Address
        </button>
        <div className={'verticalSeparator'} />
        <button
          className={'addressBtn'}
          type="button"
        >
          Remove Address
        </button>
      </div>
    </div>
  );
};