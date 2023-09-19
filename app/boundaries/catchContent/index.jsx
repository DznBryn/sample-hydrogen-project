import Layouts from '~/layouts';
import PageNotFound, { links as pageNotFoundStyles } from '~/boundaries/catchContent/pageNotFound';
import ListrakRec, { links as listrakRecStyles } from '~/modules/listrakRec';
import { useMatches } from '@remix-run/react';
import { getCMSDoc } from '~/utils/functions/eventFunctions';

export const links = () => {
  return [
    ...pageNotFoundStyles(),
    ...listrakRecStyles(),
  ];
};

export default function CatchContent({ status }) {

  const [root] = useMatches();

  return (

    <Layouts.MainNavFooter>
      {
        (status === 404) ? <PageNotFound /> : <p>Caught - Status: {status}</p>
      }
      <ListrakRec listrak={getCMSDoc(root.data.listrakRec, '404')} />
    </Layouts.MainNavFooter>

  );

}