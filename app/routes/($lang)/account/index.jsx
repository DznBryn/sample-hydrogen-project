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
import Layouts from '~/layouts';
import Account, {links as accountStyles} from '~/modules/accounts';
import {useStore} from '~/hooks/useStore';
import {useEffect} from 'react';
import {FORM_ACTIONS} from '~/utils/constants';
import {
  CREATE_ADDRESS_MUTATION,
  DELETE_ADDRESS_MUTATION,
  UPDATE_ADDRESS_MUTATION,
  UPDATE_DEFAULT_ADDRESS_MUTATION,
} from '~/utils/graphql/shopify/mutations/customer';
import {
  getCollectionProducts,
  getCustomerAddresses,
  getCustomerOrders,
  getCustomerSubscription,
  reactivateSubscription,
} from '~/utils/services/subscription';

export function links() {
  return [...accountStyles()];
}

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

      const activeSubscription = await getCustomerSubscription(
        res.customer,
        true,
      );
      const inactiveSubscription = await getCustomerSubscription(res.customer);
      const subscriptionOrders = await getCustomerOrders(res.customer);

      return {
        resubscribeItem: res,
        activeSubscription,
        inactiveSubscription,
        subscriptionOrders,
      };
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

  const customer = await getCustomer(context, customerAccessToken);
  customer.addresses = flattenConnection(customer.addresses);
  customer.orders = flattenConnection(customer.orders);

  const header = customer
    ? customer?.firstName
      ? `Welcome, ${customer.firstName}`
      : 'Welcome to your account'
    : 'Account Page';

  const customerId = parseGid(customer?.id)?.id ?? null;
  const products = await getCollectionProducts(context, 'all');
  let activeSubscription = {};
  let inactiveSubscription = {};
  let subscriptionOrders = {};
  let subscriptionAddresses = {};

  if (customerId) {
    activeSubscription = await getCustomerSubscription(customerId, true);
    inactiveSubscription = await getCustomerSubscription(customerId);
    subscriptionOrders = await getCustomerOrders(customerId);
    subscriptionAddresses = await getCustomerAddresses(customerId);
  }

  return defer(
    {
      header,
      customer,
      activeSubscription,
      inactiveSubscription,
      subscriptionOrders,
      subscriptionAddresses,
      products,
    },
    {
      headers: {
        'Cache-Control': generateCacheControlHeader(CacheShort()),
      },
    },
  );
}

export default function AccountPage() {
  const {
    customer,
    activeSubscription,
    inactiveSubscription,
    subscriptionOrders,
    subscriptionAddresses,
  } = useLoaderData();
  const {data, setCustomerData} = useStore((store) => store?.account);
  useEffect(() => {
    if (data.id === '') {
      customer.subscription = {};
      subscriptionAddresses &&
        (customer.subscription.addresses = subscriptionAddresses);
      activeSubscription && (customer.subscription.active = activeSubscription);
      inactiveSubscription &&
        (customer.subscription.inactive = inactiveSubscription);
      subscriptionOrders && (customer.subscription.orders = subscriptionOrders);
      setCustomerData(customer);
    }
  }, [subscriptionOrders]);

  return (
    <Layouts.MainNavFooter>
      <Account />
    </Layouts.MainNavFooter>
  );
}
