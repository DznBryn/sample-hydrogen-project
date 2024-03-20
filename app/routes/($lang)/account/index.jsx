import {useLoaderData} from '@remix-run/react';
import {
  CacheShort,
  flattenConnection,
  generateCacheControlHeader,
  parseGid,
} from '@shopify/hydrogen';
import {defer, redirect} from '@shopify/remix-oxygen';
import {
  getAddresses,
  getCustomer,
} from '~/utils/graphql/shopify/queries/customer';
import {getCMSContent} from '~/utils/functions/eventFunctions';
import {
  GET_REWARDS_FAQ_CONTENT,
  GET_YOTPO_REDEEM_PRODUCTS,
} from '~/utils/graphql/sanity/queries';
import Layouts from '~/layouts';
import Account, {links as accountStyles} from '~/modules/accounts';
import {CANCEL_REASONS, FORM_ACTIONS} from '~/utils/constants';
import {
  CREATE_ADDRESS_MUTATION,
  DELETE_ADDRESS_MUTATION,
  UPDATE_ADDRESS_MUTATION,
  UPDATE_DEFAULT_ADDRESS_MUTATION,
} from '~/utils/graphql/shopify/mutations/customer';
import {
  cancelSubscription,
  changeShippingAddress,
  changeSubscriptionDate,
  getCollectionProducts,
  getCustomerAddresses,
  getCustomerOrders,
  getCustomerSubscription,
  reactivateSubscription,
  skipSubscriptionOrder,
} from '~/utils/services/subscription';
import {format} from 'date-fns';
import logout from './__private/logout';
import {useEffect} from 'react';
import {useStore} from '~/hooks/useStore';

export function links() {
  return [...accountStyles()];
}

export const meta = () => [
  {title: 'My Account - TULA Skincare'},
  {
    description: 'Log in and access your TULA account here',
  },
];

export async function action({request, context}) {
  const {storefront, session} = context;

  const formData = await request.formData();
  const customerAccessToken = await session.get('customerAccessToken');

  if (typeof customerAccessToken !== 'string') {
    return {
      message: 'You must be logged in to edit your account.',
      status: 400,
    };
  }
  const addressId = formData.get('addressId');
  const formAction = formData.get('formAction');

  if (formAction === 'LOGOUT') {
    return await logout({request, context});
  }

  if (formAction === 'LOGOUT_NO_REDIRECT') {
    return await logout({request, context}, true);
  }
  // SUBSCRIPTION
  if (formAction.includes('SUBSCRIPTION')) {
    if (formAction === 'SUBSCRIPTION_REACTIVATE') {
      const resubscribe = {
        public_id: formData.get('publicId'),
        customer: formData.get('customerId'),
        every: formData.get('every'),
        every_period: formData.get('everyPeriod'),
        start_Date: formData.get('startDate'),
      };
      const res = await reactivateSubscription(resubscribe);
      if (!res?.customer) {
        return {
          message: res,
          status: 400,
        };
      }

      return res;
    }
    if (formAction === 'SUBSCRIPTION_SKIP_ORDER') {
      const res = await skipSubscriptionOrder({
        public_id: formData.get('publicId'),
        subscription_id: formData.get('subscriptionId'),
        customer: formData.get('customerId'),
      });

      if (!res?.customer) {
        return {
          message: res,
          status: 400,
        };
      }

      return res;
    }
    if (formAction === 'SUBSCRIPTION_CANCEL') {
      const reasonNumber = formData.get('cancelReason');
      if (
        String(CANCEL_REASONS.length - 1) === reasonNumber &&
        (!formData.get('customReason') || !formData.get('customReason') === '')
      ) {
        return {
          message: 'Please provide details.',
          status: 400,
        };
      }
      const cancelReason = `${reasonNumber}|${
        String(CANCEL_REASONS.length - 1) === reasonNumber
          ? formData.get('customReason')
          : CANCEL_REASONS[formData.get('cancelReason')]
      }`;
      const res = await cancelSubscription({
        public_id: formData.get('publicId'),
        customer: formData.get('customerId'),
        cancelReason,
      });

      if (!res?.customer) {
        return {
          message: res,
          status: 400,
        };
      }

      return res;
    }
    if (formAction === 'SUBSCRIPTION_CHANGE_DATE') {
      const formatDate = format(
        new Date(formData.get('changeDate')),
        'yyyy-MM-dd',
      );

      const res = await changeSubscriptionDate({
        public_id: formData.get('publicId'),
        customer: formData.get('customerId'),
        changeDate: String(formatDate),
      });

      if (!res?.customer) {
        return {
          message: res,
          status: 400,
        };
      }

      return res;
    }
    if (formAction === 'SUBSCRIPTION_CHANGE_SHIPPING') {
      // Note: changeAllShippingAddress API does not work on the backend Issue comes from OG API
      const res = await changeShippingAddress({
        public_id: formData.get('publicId'),
        customer: formData.get('customerId'),
        shipping_address: formData.get('shippingAddressId'),
      });

      if (!res?.customer) {
        return {
          message: res,
          status: 400,
        };
      }

      return res;
    }
  }

  // ADDRESSES
  const normalizeAddress = {
    firstName: formData?.get('firstName') ?? '',
    lastName: formData?.get('lastName') ?? '',
    address1: formData?.get('streetAddress') ?? '',
    address2: formData?.get('number') ? String(formData.get('number')) : null,
    city: formData?.get('city') ?? '',
    company: formData?.get('company') ?? '',
    country: formData?.get('country') ?? '',
    phone: formData?.get('phone')
      ? String(formData?.get('phone').slice(0, 16))
      : null,
    province: formData?.get('province') ?? '',
    zip: formData.get('zip') ? String(formData.get('zip').slice(0, 5)) : '',
  };

  const formErrors = [];
  const requiredFields = ['firstName', 'lastName', 'city', 'province'];

  Object.keys(normalizeAddress).forEach((key) => {
    if (key === 'zip') {
      if (normalizeAddress[key] === '' && !formErrors.includes('zip')) {
        formErrors.push('zip');
      }
    }
    if (key === 'address1') {
      if (
        normalizeAddress[key] === '' &&
        !formErrors.includes('streetAddress')
      ) {
        formErrors.push('streetAddress');
      }
    }
    if (requiredFields.includes(key)) {
      if (normalizeAddress[key] === '' && !formErrors.includes(key)) {
        formErrors.push(key);
      }
    }
  });

  if (formErrors.length > 0) {
    return {
      message: 'Please fill out all required fields.',
      status: 400,
      errors: formErrors,
    };
  }

  if (request.method === FORM_ACTIONS.DELETE) {
    // refactor into function deleteAddress()

    if (typeof addressId !== 'string') {
      return {
        message: 'You must provide an address id.',
        status: 400,
      };
    }

    if (typeof addressId !== 'string') {
      return {
        message: 'You must provide an address id.',
        status: 400,
      };
    }

    try {
      const data = await storefront.mutate(DELETE_ADDRESS_MUTATION, {
        variables: {customerAccessToken, id: addressId},
      });

      const errorMessage = data?.customerUserErrors?.[0]?.message;
      if (errorMessage) {
        throw new Error(errorMessage);
      }

      const customer = await getAddresses(
        context,
        customerAccessToken,
        'addresses',
        request,
      );
      customer.addresses = flattenConnection(customer.addresses);

      return customer;
    } catch (error) {
      return {
        message: error?.message,
        status: 400,
      };
    }
  }

  const isDefault =
    formData?.get('isDefault') && formData?.get('isDefault') !== ''
      ? true
      : false;

  if ((!addressId || addressId !== '') && formAction === FORM_ACTIONS.CREATE) {
    try {
      const data = await storefront.mutate(CREATE_ADDRESS_MUTATION, {
        variables: {
          customerAccessToken,
          address: normalizeAddress,
        },
      });

      let errorMessage = data?.customerUserErrors?.[0]?.message;
      if (errorMessage) {
        throw new Error(errorMessage);
      }

      const newId = data?.customerAddressCreate?.customerAddress?.id;

      if (isDefault) {
        const data = await storefront.mutate(UPDATE_DEFAULT_ADDRESS_MUTATION, {
          variables: {
            customerAccessToken,
            addressId: newId,
          },
        });

        errorMessage = data?.customerUserErrors?.[0]?.message;
        if (errorMessage) {
          throw new Error(errorMessage);
        }
      }

      const customer = await getAddresses(
        context,
        customerAccessToken,
        'addresses',
        request,
      );
      customer.addresses = flattenConnection(customer.addresses);

      return customer;
    } catch (error) {
      return {
        message: error?.message,
        status: 400,
      };
    }
  } else {
    try {
      const data = await storefront.mutate(UPDATE_ADDRESS_MUTATION, {
        variables: {
          address: normalizeAddress,
          customerAccessToken,
          id: addressId,
        },
      });

      let errorMessage = data?.customerUserErrors?.[0]?.message;
      if (errorMessage) {
        throw new Error(errorMessage);
      }

      if (isDefault) {
        const data = await storefront.mutate(UPDATE_DEFAULT_ADDRESS_MUTATION, {
          variables: {
            customerAccessToken,
            addressId,
          },
        });

        errorMessage = data?.customerUserErrors?.[0]?.message;
        if (errorMessage) {
          throw new Error(errorMessage);
        }
      }

      const customer = await getAddresses(
        context,
        customerAccessToken,
        'addresses',
        request,
      );
      customer.addresses = flattenConnection(customer.addresses);

      return customer;
    } catch (error) {
      return {
        message: error?.message,
        status: 400,
      };
    }
  }
}

export async function loader({request, context, params}) {
  const {pathname} = new URL(request.url);
  const isAccountPage = /^\/account\/?$/.test(pathname);
  const lang = params.lang;
  const customerAccessToken = await context.session.get('customerAccessToken');

  if (typeof customerAccessToken !== 'string' && isAccountPage) {
    await context.session.unset('customerAccessToken');
    return redirect(lang ? `/${lang}/account/login` : '/account/login', {
      headers: {
        'Set-Cookie': await context.session.commit(),
      },
    });
  }

  const customer = await getCustomer(context, customerAccessToken, request);
  customer.addresses = flattenConnection(customer.addresses);
  customer.orders = flattenConnection(customer.orders);

  const header = customer
    ? customer?.firstName
      ? `Welcome, ${customer.firstName}`
      : 'Welcome to your account'
    : 'Account Page';

  const products = await getCollectionProducts(context, 'all');
  let activeSubscription = {};
  let inactiveSubscription = {};
  let subscriptionOrders = {};
  let subscriptionAddresses = {};

  if (customer?.id) {
    customer.subscription = {};
    const customerId = parseGid(customer.id).id;

    [
      activeSubscription,
      inactiveSubscription,
      subscriptionOrders,
      subscriptionAddresses,
    ] = await Promise.all([
      getCustomerSubscription(customerId, true),
      getCustomerSubscription(customerId),
      getCustomerOrders(customerId),
      getCustomerAddresses(customerId),
    ]);

    subscriptionAddresses &&
      (customer.subscription.addresses = subscriptionAddresses);
    activeSubscription && (customer.subscription.active = activeSubscription);
    inactiveSubscription &&
      (customer.subscription.inactive = inactiveSubscription);
    subscriptionOrders && (customer.subscription.orders = subscriptionOrders);
  }

  const [yotpoRedeemProducts, faqContent] = await Promise.all([
    getCMSContent(context, GET_YOTPO_REDEEM_PRODUCTS),
    getCMSContent(context, GET_REWARDS_FAQ_CONTENT),
  ]);

  return defer(
    {
      header,
      customer,
      products,
      faqContent,
      yotpoRedeemProducts,
    },
    {
      headers: {
        'Cache-Control': generateCacheControlHeader(CacheShort()),
      },
    },
  );
}

export default function AccountPage() {
  const {customer} = useLoaderData();
  const {data: customerData, setCustomerData} = useStore(
    (store) => store?.account ?? {},
  );

  useEffect(() => {
    if (customerData && customer?.id !== customerData.id) {
      setCustomerData(customer);
    }
  }, [customerData.id]);

  return (
    <Layouts.MainNavFooter>
      <Account data={customerData} />
    </Layouts.MainNavFooter>
  );
}
