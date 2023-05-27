import { useLoaderData } from '@remix-run/react';
import {flattenConnection} from '@shopify/hydrogen-react';
import apolloClient from '~/utils/graphql/sanity/apolloClient';
import { GET_FOOTERS, } from '~/utils/graphql/sanity/queries/footers';
import { GET_EMAIL_SMS_SIGNUP_CONTENT } from '~/utils/graphql/sanity/queries/emailSmsSignupContent';
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

async function getFooterData(context){

  const { SANITY_DATASET_DOMAIN, SANITY_API_TOKEN } = context.env;
  const result = await apolloClient(SANITY_DATASET_DOMAIN, SANITY_API_TOKEN).query({ query: GET_FOOTERS });

  return result.data.allFooters;  

}

async function getAllEmailSmsSignupContent(context){

  const { SANITY_DATASET_DOMAIN, SANITY_API_TOKEN } = context.env;
  const result = await apolloClient(SANITY_DATASET_DOMAIN, SANITY_API_TOKEN).query({ query: GET_EMAIL_SMS_SIGNUP_CONTENT });

  return result.data.allEmailSmsSignupContent[0];  

}

export const loader = async ({context}) => {

  const allFooters = await getFooterData(context);
  const collection = await getCollectionProducts(context);
  const emailSmsSignupContent = await getAllEmailSmsSignupContent(context);

  return { 
    allFooters,
    collection,
    emailSmsSignupContent,
  };

};

export default function Index() {

  const { allFooters, collection, emailSmsSignupContent } = useLoaderData();

  return (
    <Layouts.MainNavFooter 
      footers={allFooters} 
      productsList={collection} 
      emailSmsSignupContent={emailSmsSignupContent}
    >
      <Homepage/>
    </Layouts.MainNavFooter>
  );
}