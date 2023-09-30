import {getCMSContent, getCMSDoc} from '~/utils/functions/eventFunctions';
import {GET_ROBOTS} from '~/utils/graphql/sanity/queries';

export const loader = async ({context}) => {
  const robots = await getCMSContent(context, GET_ROBOTS);
  const {content} = getCMSDoc(robots, 'Content');

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};
