import { json, redirect } from '@shopify/remix-oxygen';
import { login, recoverPassword } from '~/utils/graphql/shopify/mutations/customer';
import Layouts from '~/layouts';
import Homepage, { links as homePageStyles } from '~/modules/homepage';

import { SIGN_IN_EMAIL, SIGN_IN_PASSWORD, FORGOT_EMAIL } from '~/utils/constants';
import { getCMSContent, getCMSDoc } from '~/utils/functions/eventFunctions';
import { GET_CAROUSEL_SLIDES_GROUP, GET_HOME_PAGE_RECOMMENDATIONS } from '~/utils/graphql/sanity/queries';
import { useLoaderData } from '@remix-run/react';

export const links = () => homePageStyles();

export const action = async ({ request, context }) => {

  const [formData] = await Promise.all([
    request.formData(),
  ]);
  let errorMessage = 'Something went wrong. Please try again.';

  if (formData.get(SIGN_IN_EMAIL) && (formData.get(SIGN_IN_EMAIL) !== '' || typeof formData.get(SIGN_IN_EMAIL) !== 'string') && formData.get(SIGN_IN_PASSWORD) && (formData.get(SIGN_IN_PASSWORD) !== '' || typeof formData.get(SIGN_IN_PASSWORD) !== 'string')) {
    const email = formData.get(SIGN_IN_EMAIL);
    const password = formData.get(SIGN_IN_PASSWORD);
    const customerAccessToken = await login(context, { email, password });
    context.session.set('customerAccessToken', customerAccessToken);
    
    return redirect('/', {
      headers: {
        'Set-Cookie': await context.session.commit()
      }
    });

  } else {
    errorMessage = 'Email and password are required.';
  }

  if (formData.get(FORGOT_EMAIL) && (formData.get(FORGOT_EMAIL) !== '' || typeof formData.get(FORGOT_EMAIL) !== 'string')) {
    const email = formData.get(FORGOT_EMAIL);
    const result = await recoverPassword(email, context);

    if (result?.customerRecover?.customerUserErrors?.length) {
      return json({ message: result?.customerRecover?.customerUserErrors[0]?.message, status: 400 });
    }
    return json({ message: 'Success', status: 200 });
  } else {
    errorMessage = 'Email is required.';
  }
  return json({ message: errorMessage, status: 400 });



};

export async function loader({context}) {

  const carouselSlidesGroup = await getCMSContent(context, GET_CAROUSEL_SLIDES_GROUP);
  const hpRecs = await getCMSContent(context, GET_HOME_PAGE_RECOMMENDATIONS);

  return {
    carouselSlidesGroup,
    hpRecs,
  };

}

export default function Index() {

  const { 
    carouselSlidesGroup,
    hpRecs,
  } = useLoaderData();

  return (
    <Layouts.MainNavFooter>
      <Homepage 
        carouselSlidesGroup={getCMSDoc(carouselSlidesGroup, 'Homepage')}
        hpRecs={getCMSDoc(hpRecs, 'HomepageRecommendationsSection')}
      />
    </Layouts.MainNavFooter>
  );
}