import Layouts from '~/layouts';
import { getCMSContent, getCMSDoc } from '~/utils/functions/eventFunctions';
import { GET_LISTRAK_REC } from '../../utils/graphql/sanity/queries';
import PageNotFound, { links as pageNotFoundStyles } from '~/modules/pageNotFound';
import ListrakRec, { links as listrakRecStyles } from '~/modules/listrakRec';
import { useLoaderData } from '@remix-run/react';

export const links = () => {
  return [
    ...pageNotFoundStyles(),
    ...listrakRecStyles(),
  ];
};

export async function loader({context}) {

  const listrakRec = await getCMSContent(context, GET_LISTRAK_REC);

  return {
    listrakRec,
  };

}

export default function NotFound() {

  const { listrakRec } = useLoaderData();

  return (
    <Layouts.MainNavFooter>
      <PageNotFound />
      <ListrakRec listrak={getCMSDoc(listrakRec, '404')}/>
    </Layouts.MainNavFooter>
  );
}