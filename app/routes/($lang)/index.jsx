import { useLoaderData } from '@remix-run/react';
import apolloClient from '~/utils/graphql/sanity/apolloClient';
import { GET_FOOTERS } from '~/utils/graphql/sanity/queries/footers';
import Layouts, { links as layoutsStyles } from '~/layouts';
import Homepage, { links as homePageStyles } from '~/modules/homepage';

export const links = () => {
  return [
    ...homePageStyles(),
    ...layoutsStyles().mainNavFooterStyles,
  ];
};

export const loader = async ({context}) => {

  const { SANITY_DATASET_DOMAIN, SANITY_API_TOKEN } = context.env;
  
  const result = await apolloClient(SANITY_DATASET_DOMAIN, SANITY_API_TOKEN).query({ query: GET_FOOTERS });
  const { allFooters } = result.data;

  return { allFooters };

};

export default function Index() {

  const { allFooters } = useLoaderData();

  return (
    <Layouts.MainNavFooter footers={allFooters}>
      <Homepage/>
    </Layouts.MainNavFooter>
  );
}