import React, {useCallback, useEffect, useState} from 'react';
import styles from './styles.css';
import {Link, useFetcher, useLoaderData} from '@remix-run/react';
import {useStore} from '~/hooks/useStore';
import {Image, flattenConnection, parseGid} from '@shopify/hydrogen';
import {API_METHODS, CANCEL_REASONS, FETCHER} from '~/utils/constants';
import {
  changeFrequency,
  changeProduct,
  getCustomerOrders,
  getCustomerSubscription,
  getItems,
  getSubscriptionPayments,
} from '~/utils/services/subscription';
import ModalGeneric from '~/modules/modalGeneric';
import DatePicker from 'react-date-picker';
import datePickerStyles from 'react-date-picker/dist/DatePicker.css';
import calendarStyles from 'react-calendar/dist/Calendar.css';

export function links() {
  return [
    {rel: 'stylesheet', href: styles},
    {rel: 'stylesheet', href: datePickerStyles},
    {rel: 'stylesheet', href: calendarStyles},
  ];
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

export const handleUpdateCustomerSubcription = async (
  order,
  {customer, updateCustomerSubscription},
  callback,
) => {
  const [
    activeSubscription,
    inactiveSubscription,
    subscriptionOrders,
    items,
    payments,
  ] = await Promise.all([
    getCustomerSubscription(order.customer, true),
    getCustomerSubscription(order.customer),
    getCustomerOrders(order.customer),
    getItems(order.customer),
    getSubscriptionPayments(order.customer),
  ]);

  inactiveSubscription &&
    (customer.subscription.inactive = inactiveSubscription);

  const activeItems = {
    ...items,
    results: items?.results?.map((item) => {
      if (activeSubscription?.results) {
        const subscription = activeSubscription.results.find(
          (sub) => sub.public_id === item.subscription,
        );
        const payment = payments?.results?.find(
          (pay) => pay.public_id === subscription.payment,
        );

        subscription.payment = payment;
        item.subscription = subscription;
      }

      return item;
    }),
  };

  subscriptionOrders?.results &&
    (subscriptionOrders.results = subscriptionOrders.results.map((order) => {
      const items = [];

      activeItems.results.forEach((item) => {
        if (order.public_id === item.order) {
          items.push(item);
        }
      });
      order.items = items;
      return order;
    }));

  subscriptionOrders && (customer.subscription.orders = subscriptionOrders);

  updateCustomerSubscription(customer.subscription);
  if (callback) callback();
};

const AccountSubscription = ({active}) => {
  const {data} = useStore((store) => store?.account ?? null);

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

            {((data.subscription?.orders?.results?.length === 0 &&
              data.subscription?.inactive?.results.length === 0) ||
              !data.subscription) && (
              <div className="noSubscription">
                <div className="noSubscription__container">
                  <p>
                    Currently, you do not have any products on auto-delivery
                    yet. Start receiving your TULA favorites on your schedule &
                    save 15% on each delivery (plus all the other perks!).
                    Enroll now—your skin will thank you.
                  </p>
                  <Link to={'/collections/all'} className="underline-btn">
                    Shop Now
                  </Link>
                </div>
              </div>
            )}
            {data.subscription?.orders?.results?.length > 0 && (
              <div className={'activeProducts'}>
                <h3>
                  <b>Upcoming Shipments</b>
                </h3>
                <ul>
                  {data.subscription?.orders?.results
                    ?.sort((a, b) => {
                      const dateA = new Date(a.place);
                      const dateB = new Date(b.place);
                      return dateA - dateB;
                    })
                    .map((order, index) =>
                      order?.items?.length > 0 ? (
                        <ActiveProductItem
                          key={`active-${order.public_id}-${index}`}
                          {...{
                            address: data.subscription.addresses.results.find(
                              (address) =>
                                address.public_id === order?.shipping_address,
                            ),
                            order,
                            items: order?.items ?? [],
                          }}
                        />
                      ) : (
                        <></>
                      ),
                    )}
                </ul>
              </div>
            )}
            {data.subscription?.inactive?.results?.length > 0 && (
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

function ActiveProductItem({address, order, items}) {
  const [showModal, setShowModal] = useState(null);
  const subscription = null;

  const handleModalClose = useCallback(() => setShowModal(null), []);
  const mapActionToComponent = {
    changeShipping: (
      <EditShippingAddress
        handleModalClose={handleModalClose}
        subscription={subscription}
        order={order}
      />
    ),
  };

  return (
    <>
      <li>
        {items.length > 0 &&
          items.map((item, index) => (
            <SubscriptionItem
              key={`item-${item.public_id}`}
              index={index}
              order={order}
              item={item}
            />
          ))}
        <div className="subscriptionDetails">
          <div className="shippingDetails col-span-2">
            <div className="shipping">
              <p>
                <b>Billing</b>
              </p>
              <div>
                {order?.payment?.cc_number_ending ? (
                  <>
                    <p>ending in {order?.payment?.cc_number_ending ?? '-'}</p>
                    <p>Expires {order?.payment?.cc_exp_date}</p>
                    <button
                      className="underline-btn"
                      type="button"
                      onClick={() => setShowModal('changePayment')}
                      disabled={true}
                    >
                      Edit
                    </button>
                  </>
                ) : (
                  <p> No billing info found.</p>
                )}
              </div>
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
                  <button
                    className="underline-btn"
                    type="button"
                    onClick={() => setShowModal('changeShipping')}
                    disabled={showModal !== null}
                  >
                    Edit
                  </button>
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
      <ModalGeneric isOpen={showModal !== null} handleClose={handleModalClose}>
        {mapActionToComponent[showModal]}
      </ModalGeneric>
    </>
  );
}

function SubscriptionItem({index, order, item}) {
  const [showModal, setShowModal] = useState(null);
  const handleModalClose = useCallback(() => setShowModal(null), []);
  const {data, updateCustomerSubscription} = useStore(
    (store) => store?.account ?? null,
  );
  const {subscription} = item;
  const {products: all} = useLoaderData();
  const [product, setProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState(
    subscription?.every ?? 1,
  );
  const [selectedProductId, setSelectedProductId] = useState(
    item?.product ?? null,
  );
  const options = [1, 2, 3, 4, 5];

  useEffect(() => {
    if (item?.product) {
      const existingProduct = all.products.find((product) => {
        const variants = flattenConnection(product.variants);
        return variants.find(
          (variant) => parseGid(variant.id).id === item.product,
        );
      });
      setProduct(existingProduct);
    }
  }, [item?.product]);

  const handleSelectChange = async (event) => {
    if (subscription?.every === Number(event.target.value)) {
      return;
    }

    try {
      const res = await changeFrequency({
        ...subscription,
        every: Number(event.target.value),
      });

      if (!res?.every || res?.every === event.target.value) {
        return;
      }

      return setSelectedOption(res.every);
    } catch (error) {
      return console.log({
        message: error.message,
      });
    }
  };

  const handleSwapProduct = async (event) => {
    if (item?.product === event.target.value) {
      return;
    }
    try {
      const res = await changeProduct(item, event.target.value);

      if (res?.product) {
        setSelectedProductId(res.product);
      }

      if (res.subscription) {
        return handleUpdateCustomerSubcription(order, {
          customer: data,
          updateCustomerSubscription,
        });
      }
    } catch (error) {
      return console.log({
        message: error.message,
      });
    }
  };

  const mapActionToComponent = {
    changeDate: (
      <ChangeSubscriptionDate
        handleModalClose={handleModalClose}
        subscription={subscription}
        order={order}
      />
    ),
    skip: (
      <SkipOrderSubscription
        handleModalClose={handleModalClose}
        subscription={subscription}
        order={order}
      />
    ),
    pause: (
      <PauseSubscription
        handleModalClose={handleModalClose}
        subscription={subscription}
        order={order}
      />
    ),
    cancel: (
      <CancelSubscription
        handleModalClose={handleModalClose}
        {...subscription}
      />
    ),
  };

  return (
    <>
      <div className="subcriptionDelivery">
        <p className="deliveryDate col-span-2">
          {index === 0 && `Shipment On: ${handleDateFormatter(order?.place)}`}
        </p>
        <div className="deliveryActions">
          <button
            className="outline-btn"
            type="submit"
            onClick={() => setShowModal('changeDate')}
            disabled={showModal !== null}
          >
            Change Date
          </button>
          <button
            className="outline-btn"
            type="button"
            onClick={() => setShowModal('skip')}
            disabled={showModal !== null}
          >
            Skip Order
          </button>
        </div>
      </div>
      <div className="subcriptionItem" key={`item-${item?.public_id}`}>
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
                        parseGid(variant.id).id === item?.subscription?.product,
                    )?.image ?? product?.images?.nodes?.[0]
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
                <ProductTitle
                  product={product}
                  subscription={item?.subscription}
                />
              </Link>
            ) : (
              <p className="itemTitle">
                {'Product not found. Please contact us.'}
              </p>
            )}

            <p className="itemQuantity">
              <span style={{textDecoration: 'line-through'}}>
                ${Number(item?.price).toFixed(2)}
              </span>{' '}
              $
              {(
                Number(item?.total_price) / Number(item?.quantity ?? 1)
              ).toFixed(2)}{' '}
              each
            </p>

            {data?.subscription?.products?.results?.length > 0 && (
              <select value={selectedProductId} onChange={handleSwapProduct}>
                <option value={selectedProductId}>
                  (swap all upcoming deliveries){' '}
                  <ProductTitle product={product} subscription={subscription} />
                </option>
                {data.subscription.products.results
                  .filter((ogProduct) =>
                    all.products.find((product) => {
                      const variants = flattenConnection(product.variants);
                      return variants.find(
                        (variant) =>
                          String(parseGid(variant.id).id) ===
                          ogProduct.external_product_id,
                      );
                    }),
                  )
                  .map((subscription, index) => {
                    return (
                      subscription.external_product_id !==
                        selectedProductId && (
                        <option
                          key={index}
                          value={subscription.external_product_id}
                        >
                          {subscription?.name &&
                            `${subscription.name} - $${Number(
                              subscription.price ?? '0',
                            ).toFixed(2)}`}
                        </option>
                      )
                    );
                  })}
              </select>
            )}
          </div>
        </div>
        <div className="subscriptionActionContainer">
          <div>
            <div className="frequency">
              <label>Sending {item?.quantity ?? 1} every</label>
              <select value={selectedOption} onChange={handleSelectChange}>
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option === 1 ? `${option} months` : `${option} months`}
                  </option>
                ))}
              </select>
            </div>
            <div className="actionButtons">
              <button
                className="underline-btn"
                type="button"
                onClick={() => setShowModal('cancel')}
              >
                Cancel Auto-delivery
              </button>
              <button
                className="underline-btn"
                type="submit"
                onClick={() => setShowModal('pause')}
              >
                Pause Auto-delivery
              </button>
            </div>
          </div>
        </div>
      </div>
      <ModalGeneric isOpen={showModal !== null} handleClose={handleModalClose}>
        {mapActionToComponent[showModal]}
      </ModalGeneric>
    </>
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
                <ProductTitle product={product} subscription={subscription} />
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

function ProductTitle({product, subscription}) {
  const [title, setTitle] = useState('');
  useEffect(() => {
    if (product && product?.title) {
      setTitle(`${product.title} 
      ${
        product?.variants?.nodes?.length > 1 &&
        flattenConnection(product?.variants).find(
          (variant) => parseGid(variant.id).id === subscription.product,
        )?.title
          ? ` - ${
              flattenConnection(product?.variants).find(
                (variant) => parseGid(variant.id).id === subscription.product,
              ).title
            }`
          : ''
      }`);
    }
  }, [product?.title]);
  return title;
}

function EditShippingAddress({handleModalClose, order}) {
  const fetcher = useFetcher();
  const {data: customer, updateCustomerSubscription} = useStore(
    (store) => store?.account ?? null,
  );
  const addresses = customer?.subscription?.addresses?.results ?? [];
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(
    order?.shipping_address ?? null,
  );
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    if (fetcher.type === FETCHER.TYPE.ACTION_RELOAD) {
      //@TODO: BUG - Response reutrns data but message is "Body is unusable" from fetcher
      if (fetcher.data && order?.customer) {
        handleUpdateCustomerSubcription(
          {customer: order?.customer},
          {
            customer,
            updateCustomerSubscription,
          },
          handleModalClose,
        );
      }
    }
  }, [fetcher.type]);

  const handleShippingChange = (event) => {
    setSelectedShippingAddress(event.target.value);
  };
  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className="modal__container">
      <div className="modal__header">
        <h3>Change Shipping Address</h3>
      </div>
      <div className="modal__body">
        <div className="addressList">
          <div>
            <p>Stored Address(es)</p>
          </div>
          <div className="addressList__container">
            {addresses?.length > 0 && (
              <select
                value={selectedShippingAddress}
                onChange={handleShippingChange}
              >
                <option value={selectedShippingAddress}>
                  {addresses.find(
                    (address) => address.public_id === selectedShippingAddress,
                  )?.address ?? 'Select an address'}
                </option>
                {addresses.map((address, index) => {
                  return address?.public_id &&
                    address.public_id !== selectedShippingAddress ? (
                    <option key={index} value={address.public_id}>
                      {address.address}
                    </option>
                  ) : null;
                })}
              </select>
            )}
            <label htmlFor="checkAllShipments" className="checkboxShippingAll">
              <input
                type="checkbox"
                name="checkAllShipments"
                id="checkAllShipments"
                defaultChecked={isChecked}
                value={isChecked}
                onChange={handleCheckbox}
              />
              <span>Use for all shipments</span>
            </label>
          </div>
        </div>
      </div>
      <div className="modal__footer">
        <button
          className="outline-btn"
          type="submit"
          onClick={() => handleModalClose()}
          disabled={true}
        >
          Add New Address
        </button>
        <div className="button__container">
          <button
            className="outline-btn"
            type="submit"
            onClick={() => handleModalClose()}
          >
            Cancel
          </button>
          <fetcher.Form action="/account" method={API_METHODS.PATCH}>
            <input
              type="hidden"
              name="formAction"
              value={'SUBSCRIPTION_CHANGE_SHIPPING'}
            />
            <input type="hidden" name="changeAllShipping" value={isChecked} />
            <input
              type="hidden"
              name="publicId"
              value={order?.public_id ?? ''}
            />
            <input
              type="hidden"
              name="shippingAddressId"
              value={selectedShippingAddress ?? ''}
            />
            <input
              type="hidden"
              name="customerId"
              value={order?.customer ?? ''}
            />
            <button
              className="outline-btn"
              type="submit"
              disabled={
                order?.shipping_address === selectedShippingAddress ||
                fetcher.type === FETCHER.TYPE.ACTION_RELOAD ||
                fetcher.type === FETCHER.TYPE.ACTION_SUBMISSION
              }
            >
              Save Changes
            </button>
          </fetcher.Form>
        </div>
      </div>
    </div>
  );
}

function CancelSubscription({handleModalClose, ...subscription}) {
  const fetcher = useFetcher();
  const {data: customer, updateCustomerSubscription} = useStore(
    (store) => store?.account ?? null,
  );
  const [selectedReason, setSelectedReason] = useState(null);
  const [customReason, setCustomReason] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (fetcher.type === FETCHER.TYPE.ACTION_RELOAD) {
      if (fetcher.data?.message) {
        setErrorMessage(fetcher.data.message);
      }
      if (fetcher.data?.customer) {
        if (errorMessage !== '') {
          setErrorMessage('');
        }
        handleUpdateCustomerSubcription(fetcher.data, {
          customer,
          updateCustomerSubscription,
        });
        handleModalClose();
      }
    }
  }, [fetcher.type]);

  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value);
  };

  const handleCustomReasonChange = (event) => {
    setCustomReason(event.target.value);
  };

  return (
    <div className="modal__container">
      <div className="modal__header">
        <h3>Cancel My Auto-Delivery</h3>
      </div>
      <div className="modal__body">
        <p>
          We hate to see you go. You can also skip or edit the date of your next
          shipment. If you&apos;d still like to cancel, kindly share with us why
          you&apos;re opting out?
        </p>
        {errorMessage && errorMessage !== '' ? (
          <p className="error">{errorMessage}</p>
        ) : null}
        <div className="reasons">
          {CANCEL_REASONS.map((reason, index) => (
            <div key={index} className="reason">
              <input
                type="radio"
                id={`reason${index}`}
                name="cancelReason"
                value={index}
                checked={selectedReason === index.toString()}
                onChange={handleReasonChange}
              />
              <label htmlFor={`reason${index}`}>{reason}</label>
            </div>
          ))}
        </div>
        <div>
          <textarea
            rows={4}
            className={`${
              errorMessage && errorMessage !== '' ? 'border-error' : ''
            }`}
            cols={50}
            value={customReason ?? ''}
            onChange={handleCustomReasonChange}
          />
        </div>
      </div>
      <div className="modal__footer">
        <button
          className="outline-btn"
          type="submit"
          onClick={() => handleModalClose()}
        >
          Nevermind
        </button>
        <fetcher.Form action="/account" method={API_METHODS.PATCH}>
          <input
            type="hidden"
            name="formAction"
            value={'SUBSCRIPTION_CANCEL'}
          />
          <input
            type="hidden"
            name={'cancelReason'}
            value={selectedReason ?? ''}
          />
          <input type="hidden" name="customReason" value={customReason ?? ''} />
          <input
            type="hidden"
            name="publicId"
            value={subscription?.public_id ?? ''}
          />
          <input
            type="hidden"
            name="customerId"
            value={subscription?.customer ?? ''}
          />
          <button
            className="outline-btn"
            type="submit"
            disabled={
              !selectedReason ||
              fetcher.type === FETCHER.TYPE.ACTION_RELOAD ||
              fetcher.type === FETCHER.TYPE.ACTION_SUBMISSION
            }
          >
            Cancel Auto-delivery
          </button>
        </fetcher.Form>
      </div>
    </div>
  );
}

function SkipOrderSubscription({handleModalClose, subscription, order}) {
  const fetcher = useFetcher();
  const {data: customer, updateCustomerSubscription} = useStore(
    (store) => store?.account ?? null,
  );

  useEffect(() => {
    if (fetcher.type === FETCHER.TYPE.ACTION_RELOAD) {
      if (fetcher.data?.customer) {
        handleUpdateCustomerSubcription(fetcher.data, {
          customer,
          updateCustomerSubscription,
        });
        handleModalClose();
      }
    }
  }, [fetcher.type]);

  return (
    <div className="modal__container">
      <div className="modal__header">
        <h3>Skip Order</h3>
      </div>
      <div className="modal__body">
        <p>
          Do you want to skip this shipment? Your next shipment will be
          scheduled according to your auto-delivery preferences.
        </p>
      </div>
      <div className="modal__footer">
        <button
          className="outline-btn"
          type="button"
          onClick={() => handleModalClose()}
        >
          Cancel
        </button>
        <fetcher.Form action="/account" method={API_METHODS.PATCH}>
          <input
            type="hidden"
            name="formAction"
            value={'SUBSCRIPTION_SKIP_ORDER'}
          />
          <input
            type="hidden"
            name="subscriptionId"
            value={subscription.public_id}
          />
          <input type="hidden" name="publicId" value={order.public_id} />
          <input type="hidden" name="customerId" value={order.customer} />
          <button
            className="outline-btn"
            type="submit"
            disabled={
              fetcher.type === FETCHER.TYPE.ACTION_RELOAD ||
              fetcher.type === FETCHER.TYPE.ACTION_SUBMISSION
            }
          >
            Skip Shipment
          </button>
        </fetcher.Form>
      </div>
    </div>
  );
}

function ChangeSubscriptionDate({handleModalClose, subscription, order}) {
  const fetcher = useFetcher();
  const {data: customer, updateCustomerSubscription} = useStore(
    (store) => store?.account ?? null,
  );
  const [dateChange, setDateChange] = useState(order?.place ?? new Date());

  useEffect(() => {
    if (fetcher.type === FETCHER.TYPE.ACTION_RELOAD) {
      if (fetcher.data?.customer) {
        handleUpdateCustomerSubcription(fetcher.data, {
          customer,
          updateCustomerSubscription,
        });
        handleModalClose();
      }
    }
  }, [fetcher.type]);
  return (
    <div className="modal__container">
      <div className="modal__header">
        <h3>Select a Shipment Date</h3>
      </div>
      <div className="modal__body">
        <DatePicker
          onChange={setDateChange}
          value={dateChange}
          isOpen={true}
          closeCalendar={false}
          calendarClassName={'changeDateCalendar'}
        />
      </div>
      <div className="modal__footer">
        <button
          className="outline-btn"
          type="submit"
          onClick={() => handleModalClose()}
        >
          Cancel
        </button>
        <fetcher.Form action="/account" method={API_METHODS.PATCH}>
          <input
            type="hidden"
            name="formAction"
            value={'SUBSCRIPTION_CHANGE_DATE'}
          />
          <input type="hidden" name="changeDate" value={dateChange} />
          <input
            type="hidden"
            name="publicId"
            value={subscription?.public_id ?? ''}
          />
          <input
            type="hidden"
            name="customerId"
            value={subscription?.customer ?? ''}
          />
          <button
            className="outline-btn"
            type="submit"
            disabled={
              fetcher.type === FETCHER.TYPE.ACTION_RELOAD ||
              fetcher.type === FETCHER.TYPE.ACTION_SUBMISSION
            }
          >
            Save Shipment Date
          </button>
        </fetcher.Form>
      </div>
    </div>
  );
}

function PauseSubscription({handleModalClose, subscription, order}) {
  const fetcher = useFetcher();
  const {data: customer, updateCustomerSubscription} = useStore(
    (store) => store?.account ?? null,
  );
  const [dateChange, setDateChange] = useState(order?.place ?? new Date());
  useEffect(() => {
    if (fetcher.type === FETCHER.TYPE.ACTION_RELOAD) {
      if (fetcher.data?.customer) {
        handleUpdateCustomerSubcription(fetcher.data, {
          customer,
          updateCustomerSubscription,
        });
        handleModalClose();
      }
    }
  }, [fetcher.type]);
  return (
    <div className="modal__container">
      <div className="modal__header">
        <h3>Pause Auto-delivery</h3>
      </div>
      <div className="modal__body">
        <p>Please select the date you would like your shipments to resume.</p>
        <DatePicker
          onChange={setDateChange}
          value={dateChange}
          isOpen={true}
          closeCalendar={false}
          calendarClassName={'changeDateCalendar'}
        />
      </div>
      <div className="modal__footer">
        <div></div>
        <fetcher.Form action="/account" method={API_METHODS.PATCH}>
          <input
            type="hidden"
            name="formAction"
            value={'SUBSCRIPTION_CHANGE_DATE'}
          />
          <input type="hidden" name="changeDate" value={dateChange} />
          <input
            type="hidden"
            name="publicId"
            value={subscription?.public_id ?? ''}
          />
          <input
            type="hidden"
            name="customerId"
            value={subscription?.customer ?? ''}
          />
          <button
            className="outline-btn"
            type="submit"
            disabled={
              fetcher.type === FETCHER.TYPE.ACTION_RELOAD ||
              fetcher.type === FETCHER.TYPE.ACTION_SUBMISSION
            }
          >
            Pause Subscription
          </button>
        </fetcher.Form>
      </div>
    </div>
  );
}

function ReactivateButton({product, subscription}) {
  const fetcher = useFetcher();
  const {data: customer, updateCustomerSubscription} = useStore(
    (store) => store?.account ?? null,
  );
  useEffect(() => {
    if (fetcher.type === FETCHER.TYPE.ACTION_RELOAD) {
      if (fetcher.data?.customer) {
        handleUpdateCustomerSubcription(fetcher.data, {
          customer,
          updateCustomerSubscription,
        });
      }
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
        disabled={
          !subscription.public_id ||
          !product ||
          fetcher.type === FETCHER.TYPE.ACTION_RELOAD ||
          fetcher.type === FETCHER.TYPE.ACTION_SUBMISSION
        }
      >
        {fetcher.state === 'loading'
          ? 'Reactivate...'
          : 'Reactivate Auto-delivery'}
      </button>
    </fetcher.Form>
  );
}

export default React.memo(AccountSubscription, () => {
  return false;
});
