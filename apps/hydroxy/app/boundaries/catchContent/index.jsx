// import Layouts from '~/layouts';
import PageNotFound, {
  links as pageNotFoundStyles,
} from '~/boundaries/catchContent/pageNotFound';
// import ListrakRec, {links as listrakRecStyles} from '~/modules/listrakRec';
// import {Await, useMatches} from '@remix-run/react';
// import {getCMSDoc} from '~/utils/functions/eventFunctions';
// import {Suspense} from 'react';

export const links = () => {
  return [
    ...pageNotFoundStyles(),
    // ...listrakRecStyles()
  ];
};

export default function CatchContent({status}) {
  // const [root] = useMatches();

  return (
    // <Layouts.MainNavFooter>
    <>{status === 404 ? <PageNotFound /> : <p>Caught - Status: {status}</p>}</>
    // <Suspense>
    //   <Await resolve={root.data.listrakRec}>
    //     {(listrakRec) => (
    //       <ListrakRec listrak={getCMSDoc(listrakRec, '404')} />
    //     )}
    //   </Await>
    // </Suspense>
    // </Layouts.MainNavFooter>
  );
}
