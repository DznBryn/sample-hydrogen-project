import { useLoaderData } from '@remix-run/react';
import apolloClient from '~/utils/graphql/sanity/apolloClient';
import { GET_ALL_PETS } from '~/utils/graphql/sanity/queries/pet';

import Homepage from '../../modules/Homepage';

export const meta = () => {
  return {
    title: 'TULA Skincare: Probiotic Skin Care Products',
    description: 'Clean + effective probiotic skincare products made with superfoods.',
  };
};

export const loader = async ({context}) => {

  const { SANITY_DATASET_DOMAIN, SANITY_API_TOKEN } = context.env;
  
  const result = await apolloClient(SANITY_DATASET_DOMAIN, SANITY_API_TOKEN).query({ query: GET_ALL_PETS });
  const { allPet } = result.data;

  return { allPet };

};

export default function Index() {

  const { allPet } = useLoaderData();

  return (
    <div>
      <Homepage pets={allPet} />
    </div>
  );
}