import Layouts from '~/layouts';

import {getCMSContent} from '~/utils/functions/eventFunctions';
import {
  GET_REWARDS_PRODUCT_CONTENT,
  GET_REWARDS_FAQ_CONTENT,
} from '~/utils/graphql/sanity/queries';
import {useLoaderData} from '@remix-run/react';

import RewardsPage, {links as rewardsPageStyles} from '~/modules/rewardsPage';

export async function loader({context}) {
  const [getRewardsContent, getRewardsFaqContent] = await Promise.all([
    getCMSContent(context, GET_REWARDS_PRODUCT_CONTENT),
    getCMSContent(context, GET_REWARDS_FAQ_CONTENT),
  ]);

  return {
    getRewardsContent,
    getRewardsFaqContent,
  };
}

export const links = () => {
  return [...rewardsPageStyles()];
};

export default function RewardsComponent() {
  const {getRewardsContent, getRewardsFaqContent} = useLoaderData();

  return (
    <Layouts.MainNavFooter>
      <RewardsPage
        context={getRewardsContent}
        yotpoFaq={getRewardsFaqContent}
      />
    </Layouts.MainNavFooter>
  );
}
