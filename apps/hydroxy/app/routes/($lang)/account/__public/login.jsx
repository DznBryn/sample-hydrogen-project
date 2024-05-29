import Layouts from '~/layouts';
import {json, redirect} from '@shopify/remix-oxygen';
import {login} from '~/utils/graphql/shopify/mutations/customer';
import LoginForm, {
  links as loginFormStyles,
} from '../../../../modules/accounts/login';
import {
  getCustomerAddresses,
  getCustomerOrders,
  getCustomerSubscription,
  getItems,
  getProucts,
  getSubscriptionPayments,
} from '~/utils/services/subscription';
import {parseGid} from '@shopify/hydrogen';
import {getCustomerData} from '~/utils/functions/eventFunctions';
import {SIGN_IN_EMAIL, SIGN_IN_PASSWORD} from '~/utils/constants';

export const links = () => {
  return [...loginFormStyles()];
};

export const action = async ({request, context}) => {
  const [formData] = await Promise.all([request.formData()]);
  let errorMessage = 'Something went wrong. Please try again.';

  const email = formData.get(SIGN_IN_EMAIL) || formData.get('email');
  const password = formData.get(SIGN_IN_PASSWORD) || formData.get('password');

  if (
    email &&
    (email !== '' || typeof email !== 'string') &&
    password &&
    (password !== '' || typeof password !== 'string')
  ) {
    const data = await login(context, {email, password});

    if (data?.accessToken) {
      context.session.set('customerAccessToken', data.accessToken);
      const customer = await getCustomerData(context, data.accessToken);

      if (customer?.id) {
        customer.subscription = {};
        const customerId = parseGid(customer.id).id;

        const [
          activeSubscription,
          inactiveSubscription,
          subscriptionOrders,
          items,
          payments,
          subscriptionAddresses,
          ogProducts,
        ] = await Promise.all([
          getCustomerSubscription(customerId, true),
          getCustomerSubscription(customerId),
          getCustomerOrders(customerId),
          getItems(customerId),
          getSubscriptionPayments(customerId),
          getCustomerAddresses(customerId),
          getProucts(customerId),
        ]);

        subscriptionAddresses &&
          (customer.subscription.addresses = subscriptionAddresses);

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
          (subscriptionOrders.results = subscriptionOrders.results.map(
            (order) => {
              const items = [];

              activeItems.results.forEach((item) => {
                if (order.public_id === item.order) {
                  items.push(item);
                }
              });

              const payment = payments?.results?.find(
                (pay) => pay.public_id === order.payment,
              );

              order.payment = payment;
              order.items = items;
              return order;
            },
          ));

        subscriptionOrders &&
          (customer.subscription.orders = subscriptionOrders);

        ogProducts && (customer.subscription.products = ogProducts);
      }

      console.log('customer.accessToken', customer);

      return json(
        {
          customer,
        },
        {
          headers: {
            'Set-Cookie': await context.session.commit(),
          },
        },
      );
    }

    return {
      data,
    };
  } else if (email === '' || !email) {
    errorMessage = 'Please enter an email.';
  } else if (password === '' || !password) {
    errorMessage = 'Please enter a password.';
  } else {
    errorMessage = 'Email and password are required.';
  }

  return json({message: errorMessage, status: 400});
};

export async function loader({context, params}) {
  const customerAccessToken = await context.session.get('customerAccessToken');
  if (customerAccessToken) {
    return redirect(params.lang ? `${params.lang}/account` : '/account');
  }
  return null;
}

export default function LoginPage() {
  return (
    <Layouts.MainNavFooter>
      <LoginForm />
    </Layouts.MainNavFooter>
  );
}
