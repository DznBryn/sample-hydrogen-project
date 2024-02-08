import Layouts from '~/layouts';

import {getCMSContent} from '~/utils/functions/eventFunctions';
import {
  GET_REWARDS_FAQ_CONTENT,
  GET_YOTPO_REDEEM_PRODUCTS,
} from '~/utils/graphql/sanity/queries';
import {useLoaderData} from '@remix-run/react';

import RewardsPage, {links as rewardsPageStyles} from '~/modules/rewardsPage';

export async function loader({context}) {
  const [getRewardsFaqContent, getYotpoRedeemProducts] = await Promise.all([
    getCMSContent(context, GET_REWARDS_FAQ_CONTENT),
    getCMSContent(context, GET_YOTPO_REDEEM_PRODUCTS),
  ]);

  return {
    getRewardsFaqContent,
    getYotpoRedeemProducts,
  };
}

export const links = () => {
  return [...rewardsPageStyles()];
};

export default function RewardsComponent() {
  const {getRewardsFaqContent, getYotpoRedeemProducts} = useLoaderData();

  return (
    <Layouts.MainNavFooter>
      <RewardsPage
        yotpoFaq={getRewardsFaqContent}
        yotpoRedeemProducts={getYotpoRedeemProducts}
      />
    </Layouts.MainNavFooter>
  );
}
