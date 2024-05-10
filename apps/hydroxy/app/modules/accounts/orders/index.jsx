/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import styles from './styles.css';
import {Link} from '@remix-run/react';
import {Image, flattenConnection} from '@shopify/hydrogen';
import {useRouteLoaderData} from '@remix-run/react';
import {getReturnsURL} from '~/utils/functions/eventFunctions';
import {useCustomer} from '~/hooks/useCustomer';

//

export function links() {
  return [{rel: 'stylesheet', href: styles}];
}

//

export default function OrderHistory() {
  const {orders} = useCustomer();

  //

  return (
    <div id={'ordersTab'}>
      {orders.length > 0 ? (
        orders
          .sort((a, b) => new Date(b.processedAt) - new Date(a.processedAt))
          .map((order) => <OrderItem key={`order-${order?.id}`} data={order} />)
      ) : (
        <p>
          You haven't placed any orders yet.{' '}
          <Link to={'/collections/all'}>Let's go shopping</Link>.
        </p>
      )}
    </div>
  );
}

//

function OrderItem({data}) {
  const rootData = useRouteLoaderData('root');
  const formattedDate = data?.processedAt
    ? new Date(data.processedAt).toLocaleDateString()
    : null;
  const lineItems = data?.lineItems ? flattenConnection(data.lineItems) : [];
  const showReturn =
    data?.fulfillmentStatus !== 'UNFULFILLED' ||
    new Date().getTime() > data?.processedAt;

  //

  return (
    <div className="order">
      <div className="orderHeader">
        <div className="orderNo" colSpan="2">
          Order ID:{' '}
          <span>#{data?.orderNumber ? `5${data?.orderNumber}` : ''}</span>
        </div>
        <div colSpan="3" className={'orderDate'}>
          Date: <span>{formattedDate}</span>
        </div>
        <div className={'orderTotal'}>
          Total:{' '}
          <span>
            ${parseFloat(data?.currentTotalPrice?.amount ?? 0).toFixed(2)}
          </span>
        </div>
      </div>
      <div className="orderProducts">
        <div className={'orderProdHeader'}>
          <div className={'headerSpacer'}></div>
          <div className={'orderName'}>
            <span>NAME</span>
          </div>
          <div className={'qty'}>QTY</div>
        </div>
        {lineItems.map((item, index) => (
          <div key={`lineItem-${index}`} className={'orderProdDetails'}>
            <div className={'prodThumb'}>
              <Image
                data={item?.variant?.image}
                sizes="(min-width: 45em) 50vw, 100vw"
                aspectRatio="4/5"
              />
            </div>
            <div className={'prodName'}>{item?.title}</div>
            <div className={'prodQuantity'}>
              <span className={'olabels'}>{item?.quantity}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={'status'}>
        <div className={'statusDetailsWrapper'}>
          <span className={'olabels'}>Payment:</span>{' '}
          <span className={'statusText'}>
            {data?.financialStatus?.toLowerCase()}
          </span>
          <span className={'olabels'}>Status:</span>{' '}
          <span className={'statusText'}>
            {data?.fulfillmentStatus?.replace('_', ' ').toLowerCase()}
          </span>
        </div>
        <div className={'orderOptions'}>
          <Link to={`${data?.statusUrl}`}>Track Order</Link>
        </div>
        {showReturn && (
          <div className={styles.orderOptions}>
            <Link to={getReturnsURL(rootData?.ENVS?.SITE_NAME)}>
              Start a Return
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
