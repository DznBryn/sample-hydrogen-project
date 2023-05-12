import { useLoaderData } from '@remix-run/react';
import apolloClient from '~/utils/graphql/sanity/apolloClient';
import { GET_ALL_PETS } from '~/utils/graphql/sanity/queries/pets';
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
  
  const result = await apolloClient(SANITY_DATASET_DOMAIN, SANITY_API_TOKEN).query({ query: GET_ALL_PETS });
  const { allPets } = result.data;

  return { allPets };

};

export default function Index() {

  const { allPets } = useLoaderData();

  return (
    <Layouts.MainNavFooter>
      <Homepage pets={allPets} />
    </Layouts.MainNavFooter>
  );
}