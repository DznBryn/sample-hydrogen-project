import {json} from '@shopify/remix-oxygen';
import {
  login,
  recoverPassword,
} from '~/utils/graphql/shopify/mutations/customer';
import Layouts from '~/layouts';
import Homepage, {links as homePageStyles} from '~/modules/homepage';
import {SIGN_IN_EMAIL, SIGN_IN_PASSWORD, FORGOT_EMAIL} from '~/utils/constants';
import {
  getCMSContent,
  getCMSDoc,
  getCustomerData,
} from '~/utils/functions/eventFunctions';
import {
  GET_CAROUSEL_SLIDES_GROUP,
  GET_HOMEPAGE_SHOP_BY_CONCERN,
  GET_HOME_PAGE_RECOMMENDATIONS,
  GET_HOMEPAGE_WHY_PROBIOTICS,
  GET_HOMEPAGE_SKIN_QUIZ,
  GET_HOMEPAGE_COLLECTION_CALLOUT,
} from '~/utils/graphql/sanity/queries';
import {useLoaderData} from '@remix-run/react';
import {parseGid} from '@shopify/hydrogen';
import {
  getCustomerAddresses,
  getCustomerOrders,
  getCustomerSubscription,
  getItems,
  getProucts,
  getSubscriptionPayments,
} from '~/utils/services/subscription';

export const links = () => homePageStyles();

export const meta = () => [
  {title: 'TULA Skincare: Probiotic Skin Care Products'},
  {
    name: 'description',
    content:
      'Clean + Effective Skincare Made With Probiotic Extracts and Superfoods. Get Your Healthiest, Brightest Skin Ever With 15% Off Your First Order & Email Signup.',
  },
];

export const action = async ({request, context}) => {
  const [formData] = await Promise.all([request.formData()]);
  let errorMessage = 'Something went wrong. Please try again.';

  if (
    formData.get(SIGN_IN_EMAIL) &&
    (formData.get(SIGN_IN_EMAIL) !== '' ||
      typeof formData.get(SIGN_IN_EMAIL) !== 'string') &&
    formData.get(SIGN_IN_PASSWORD) &&
    (formData.get(SIGN_IN_PASSWORD) !== '' ||
      typeof formData.get(SIGN_IN_PASSWORD) !== 'string')
  ) {
    const email = formData.get(SIGN_IN_EMAIL);
    const password = formData.get(SIGN_IN_PASSWORD);
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
  } else if (
    formData.get(SIGN_IN_EMAIL) === '' ||
    !formData.get(SIGN_IN_EMAIL)
  ) {
    errorMessage = 'Please enter an email.';
  } else if (
    formData.get(SIGN_IN_PASSWORD) === '' ||
    !formData.get(SIGN_IN_PASSWORD)
  ) {
    errorMessage = 'Please enter a password.';
  } else {
    errorMessage = 'Email and password are required.';
  }

  if (
    formData.get(FORGOT_EMAIL) &&
    (formData.get(FORGOT_EMAIL) !== '' ||
      typeof formData.get(FORGOT_EMAIL) !== 'string')
  ) {
    const email = formData.get(FORGOT_EMAIL);
    const result = await recoverPassword(email, context);

    if (result?.customerRecover?.customerUserErrors?.length) {
      return json({
        message: result?.customerRecover?.customerUserErrors[0]?.message,
        status: 400,
      });
    }
    return json({message: 'Success', status: 200});
  }

  return json({message: errorMessage, status: 400});
};

export async function loader({context}) {
  return {...(await fetchContentData(context))};
}

export default function Index() {
  const {
    carouselSlidesGroup,
    hpRecs,
    concerns,
    homepageWhyProbioticsContent,
    homepageSkinQuizContent,
    homepageCollectionCallout,
  } = useLoaderData();

  return (
    <Layouts.MainNavFooter>
      <Homepage
        carouselSlidesGroup={getCMSDoc(carouselSlidesGroup, 'Homepage')}
        hpRecs={getCMSDoc(hpRecs, 'HomepageRecommendationsSection')}
        concerns={concerns}
        homepageWhyProbioticsContent={getCMSDoc(
          homepageWhyProbioticsContent,
          'Why Probiotics Content',
        )}
        homepageSkinQuizContent={getCMSDoc(
          homepageSkinQuizContent,
          'Homepage Skin Quiz Content',
        )}
        homepageCollectionCallout={getCMSDoc(homepageCollectionCallout, 'EYS')}
      />
    </Layouts.MainNavFooter>
  );
}

//

async function fetchContentData(context) {
  const [
    carouselSlidesGroup,
    hpRecs,
    concerns,
    homepageWhyProbioticsContent,
    homepageSkinQuizContent,
    homepageCollectionCallout,
  ] = await Promise.all([
    getCMSContent(context, GET_CAROUSEL_SLIDES_GROUP),
    getCMSContent(context, GET_HOME_PAGE_RECOMMENDATIONS),
    getCMSContent(context, GET_HOMEPAGE_SHOP_BY_CONCERN),
    getCMSContent(context, GET_HOMEPAGE_WHY_PROBIOTICS),
    getCMSContent(context, GET_HOMEPAGE_SKIN_QUIZ),
    getCMSContent(context, GET_HOMEPAGE_COLLECTION_CALLOUT),
  ]);

  return {
    carouselSlidesGroup,
    hpRecs,
    concerns,
    homepageWhyProbioticsContent,
    homepageSkinQuizContent,
    homepageCollectionCallout,
  };
}
