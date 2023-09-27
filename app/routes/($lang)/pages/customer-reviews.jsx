import Layouts from '~/layouts';

import {useLoaderData} from '@remix-run/react';
import {getCMSContent, getCMSDoc} from '~/utils/functions/eventFunctions';
import {GET_CUSTOMER_REVIEWS} from '~/utils/graphql/sanity/queries';
import CustomerReviews, {
  links as customerReviewsStyles,
} from '~/modules/customerReviews';

export const links = () => {
  return [...customerReviewsStyles()];
};

export async function loader({context}) {
  const customerReviewsContent = await getCMSContent(
    context,
    GET_CUSTOMER_REVIEWS,
  );

  return {
    customerReviewsContent,
  };
}

export default function AutoDeliveryComponent() {
  const {customerReviewsContent} = useLoaderData();

  return (
    <Layouts.MainNavFooter>
      <CustomerReviews
        content={getCMSDoc(customerReviewsContent, 'CustomerReviews')}
      />
    </Layouts.MainNavFooter>
  );
}
