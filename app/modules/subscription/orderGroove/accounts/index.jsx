import React, {useEffect, useState} from 'react';
import styles from './styles.css';
import {Link, useFetcher, useLoaderData} from '@remix-run/react';
import {useStore} from '~/hooks/useStore';
import {Image, flattenConnection, parseGid} from '@shopify/hydrogen';
import {API_METHODS} from '~/utils/constants';
//let loaded = false;

export function links() {
  return [{rel: 'stylesheet', href: styles}];
}

const handleDateFormatter = (date) => {
  if (!date) return null;

  // Create a JavaScript Date object from the input string
  const dateObject = new Date(date);

  // Define an array of month names
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Get the month, day, and year from the date object
  const month = monthNames[dateObject.getMonth()];
  const day = dateObject.getDate();
  const year = dateObject.getFullYear();
  return `${month} ${day}, ${year}`;
};

const AccountSubscription = ({active}) => {
  const data = useStore((store) => store?.account?.data ?? null);
  return (
    <div className={active === 1 ? 'menuWrapper' : 'menuWrapper hidden'}>
      <div id="autoTab">
        <div className={'ogMyAcctWrapper'}>
          <div className="fixedWidthPage">
            <p>
              Manage all of your auto-delivery orders below. Read our FAQs{' '}
              <Link to={'/pages/auto-delivery'}>here</Link>, email us, or give
              our customer service a call (844-545-1236).
            </p>
            {data?.subscription?.orders?.results.length > 0 && (
              <div className={'activeProducts'}>
                <h3>
                  <b>Upcoming Shipments</b>
                </h3>
                <ul>
                  {data.subscription.orders.results
                    .map((order, index) => (
                      <ActiveProductItem
                        key={`active-${order.public_id}-${index}`}
                        {...{
                          address: data.subscription.addresses.results.find(
                            (address) =>
                              address.public_id ===
                              data?.subscription?.active?.results[index]
                                ?.shipping_address,
                          ),
                          order,
                          subscription:
                            data?.subscription?.active?.results[index],
                        }}
                      />
                    ))
                    .reverse()}
                </ul>
              </div>
            )}
            {data.subscription?.inactive?.results.length > 0 && (
              <div className={'inactiveProducts'}>
                <h3>
                  <b>Inactive Auto-delivery</b>
                </h3>
                <ul>
                  {data.subscription.inactive.results.map(
                    (subscription, index) => (
                      <InactiveProductItem
                        key={`inactive-${subscription.product}-${index}`}
                        {...{products: data.subscription, subscription}}
                      />
                    ),
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function ActiveProductItem({address, order, subscription}) {
  const {products: all} = useLoaderData();
  const [product, setProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState(
    subscription?.every ?? 1,
  );
  const options = [1, 2, 3, 4, 5];
  const fullPrice = Number(order?.sub_total) + Number(order?.discount_total);
  useEffect(() => {
    if (!product && subscription) {
      const existingProduct = all.products.find((product) => {
        const variants = flattenConnection(product.variants);
        return variants.find(
          (variant) => parseGid(variant.id).id === subscription.product,
        );
      });
      setProduct(existingProduct);
    }
  }, []);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <li>
      <div className="subcriptionDelivery">
        <p className="deliveryDate col-span-2">
          Shipment On: {handleDateFormatter(order?.place)}
        </p>
        <div className="deliveryActions">
          <button className="outline-btn" type="submit">
            Change Date
          </button>
          <button className="outline-btn" type="submit">
            Skip Order
          </button>
        </div>
      </div>
      <div className="subcriptionItem">
        <div className="productDetail col-span-2">
          <div className="itemImageContainer">
            {product && (
              <Link
                to={`/products/${product?.handle}`}
                target="_blank"
                role="link"
              >
                <Image
                  data={
                    flattenConnection(product?.variants).find(
                      (variant) =>
                        parseGid(variant.id).id === subscription.product,
                    )?.image
                  }
                  sizes="(min-width: 45em) 50vw, 100vw"
                  aspectRatio="4/5"
                />
              </Link>
            )}
          </div>
          <div className="productDescription">
            {product?.title ? (
              <Link
                to={`/products/${product?.handle}`}
                target="_blank"
                className="itemTitle"
                role="link"
              >
                {product.title}
              </Link>
            ) : (
              <p className="itemTitle">
                {'Product not found. Please contact us.'}
              </p>
            )}
            {fullPrice && (
              <p className="itemQuantity">
                <span style={{textDecoration: 'line-through'}}>
                  ${fullPrice.toFixed(2)}
                </span>{' '}
                ${order?.sub_total} each
              </p>
            )}
          </div>
        </div>
        <div className="subscriptionActionContainer">
          <div>
            <div className="frequency">
              <label>Sending 1 every</label>
              <select value={selectedOption} onChange={handleSelectChange}>
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option === 1 ? `${option} months` : `${option} months`}
                  </option>
                ))}
              </select>
            </div>
            <div className="actionButtons">
              <button className="underline-btn" type="submit">
                Cancel Auto-delivery
              </button>
              <button className="underline-btn" type="submit">
                Pause Auto-delivery
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="subscriptionDetails">
        <div className="shippingDetails col-span-2">
          <div className="shipping">
            <p>
              <b>Billing</b>
            </p>
          </div>
          <div className="shipping">
            <p>
              <b>Shipping</b>
            </p>
            {address && (
              <div>
                <p>
                  {address?.first_name} {address?.last_name}
                </p>
                {address?.address && <p>{address.address}</p>}
                {address?.address2 && <p>{address.address2}</p>}
                <p>
                  {address?.city}, {address?.state_province_code}{' '}
                  {address?.zip_postal_code}{' '}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="costDetails">
          <div className="costDetail">
            <p>
              <b>Subscription Saving</b>
            </p>
            <p>${order?.discount_total}</p>
          </div>
          <div className="costDetail">
            <p>
              <b>Subtotal</b>
            </p>
            <p>${order?.sub_total}</p>
          </div>
          <div className="costDetail">
            <p>
              <b>Shipping</b>
            </p>
            <p>${order?.shipping_total}</p>
          </div>
          <div className="costDetail">
            <p>
              <b>Total</b>
              <br />
              <small>*Shipping and taxes may apply.</small>
            </p>
            <p>
              <b>${order?.total}</b>
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}

function InactiveProductItem({products, subscription}) {
  const {products: all} = useLoaderData();
  const [product, setProduct] = useState(
    products && products?.results
      ? products.results.find(
          (product) => product.external_product_id === subscription.product,
        )
      : null,
  );

  useEffect(() => {
    if (!product) {
      const existingProduct = all.products.find((product) => {
        const variants = flattenConnection(product.variants);
        return variants.find(
          (variant) => parseGid(variant.id).id === subscription.product,
        );
      });
      setProduct(existingProduct);
    }
  }, [product?.live]);

  return (
    <li>
      <div className="subcriptionItem">
        <div className="productDetail col-span-2">
          <div className="itemImageContainer">
            {product && (
              <Link
                to={`/products/${product?.handle}`}
                target="_blank"
                role="link"
              >
                <Image
                  data={
                    flattenConnection(product?.variants).find(
                      (variant) =>
                        parseGid(variant.id).id === subscription.product,
                    )?.image
                  }
                  sizes="(min-width: 45em) 50vw, 100vw"
                  aspectRatio="4/5"
                />
              </Link>
            )}
          </div>
          <div className="productDescription">
            {product?.title ? (
              <Link
                to={`/products/${product?.handle}`}
                target="_blank"
                className="itemTitle"
                role="link"
              >
                {product.title}
              </Link>
            ) : (
              <p className="itemTitle">
                {'Product not found. Please contact us.'}
              </p>
            )}
            <p className="itemQuantity">Qty: {subscription?.quantity ?? '0'}</p>
          </div>
        </div>
        <div className="subscriptionActionContainer">
          <ReactivateButton {...{product, subscription}} />
          <p>
            Cancelled on {handleDateFormatter(subscription?.cancelled ?? null)}
          </p>
        </div>
      </div>
    </li>
  );
}

function ReactivateButton({product, subscription}) {
  const {data, setCustomerData} = useStore((store) => store?.account);
  const fetcher = useFetcher();
  useEffect(() => {
    if (data.id === '') {
      fetcher.data?.subscription &&
        (data.subscription = fetcher.data?.subscription);
      fetcher.data?.subscriptionOrders &&
        (data.subscription.orders = fetcher.data?.subscriptionOrders);
      setCustomerData(data);
    }
  }, [fetcher.type]);

  return (
    <fetcher.Form action="/account" method={API_METHODS.PATCH}>
      <input
        type="hidden"
        name="formAction"
        value={'SUBSCRIPTION_REACTIVATE'}
      />
      <input type="hidden" name="publicId" value={subscription?.public_id} />
      <input type="hidden" name="customerId" value={subscription?.customer} />
      <input type="hidden" name="every" value={subscription?.every} />
      <input
        type="hidden"
        name="everyPeriod"
        value={subscription?.every_period}
      />
      <input type="hidden" name="startDate" value={subscription?.start_date} />
      <button
        className="outline-btn"
        type="submit"
        disabled={!subscription.public_id || !product}
        // onClick={async () => await reactivateSubscription(subscription)}
      >
        Reactivate Auto-delivery
      </button>
    </fetcher.Form>
  );
}
export default React.memo(AccountSubscription, () => {
  return false;
});
