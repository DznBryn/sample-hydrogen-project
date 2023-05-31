import { useLoaderData } from '@remix-run/react';
import {flattenConnection} from '@shopify/hydrogen-react';
import { getCMSContent } from '~/utils/functions/eventFunctions';
import { GET_FOOTERS, GET_EMAIL_SMS_SIGNUP_CONTENT } from '~/utils/graphql/sanity/queries';
import { PRODUCTS_QUERY } from '~/utils/graphql/shopify/queries/collections';
import Layouts, { links as layoutsStyles } from '~/layouts';
import Homepage, { links as homePageStyles } from '~/modules/homepage';

export const links = () => {
  return [
    ...homePageStyles(),
    ...layoutsStyles().mainNavFooterStyles,
  ];
};

async function getCollectionProducts(context){

  const {collection} = await context.storefront.query(PRODUCTS_QUERY, {
    variables: { handle: 'all' },
  });

  if (!collection) throw new Response(null, {status: 404});

  return {
    products: collection?.products ? flattenConnection(collection.products) : [],
  };

}

export const loader = async ({context}) => {

  const collection = await getCollectionProducts(context);

  const footers = await getCMSContent(context, GET_FOOTERS);
  const emailSmsSignupContent = await getCMSContent(context, GET_EMAIL_SMS_SIGNUP_CONTENT);

  return { 
    collection,
    footers,
    emailSmsSignupContent,
  };

};

export default function Index() {

  const { footers, collection, emailSmsSignupContent } = useLoaderData();

  return (
    <Layouts.MainNavFooter 
      footers={footers} 
      productsList={collection} 
      emailSmsSignupContent={emailSmsSignupContent}
    >
      <Homepage/>
    </Layouts.MainNavFooter>
  );
}