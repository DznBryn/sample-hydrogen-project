import { useLoaderData } from '@remix-run/react';
import { client } from 'sanity.js';

import Homepage from '../../modules/Homepage';

export const meta = () => {
  return {
    title: 'TULA Skincare: Probiotic Skin Care Products',
    description: 'Clean + effective probiotic skincare products made with superfoods.',
  };
};

export const loader = async () => {
  const query = '*[_type == "pet"]';
  const pets = await client.fetch(query);

  return { pets };
};

export default function Index() {

  const { pets } = useLoaderData();

  return (
    <div>
      <Homepage pets={pets}/>
    </div>
  );
}
