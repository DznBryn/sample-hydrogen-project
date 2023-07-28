import Layouts from '~/layouts';
import { useLoaderData } from '@remix-run/react';
import { GET_LISTRAK_REC } from '../../utils/graphql/sanity/queries';
import { getCMSContent, getCMSDoc } from '~/utils/functions/eventFunctions';
import SearchPage, { links as searchPageStyles } from '~/modules/searchPage';

export const links = () => searchPageStyles();

export const meta = () => {
  return {
    title: 'Search',
    description: 'Search page',
  };
};

export async function loader({ context, request }) {
  
  const { ALGOLIA_WRITE_API_KEY } = context.env;

  const url = new URL(request.url);
  const query = url.searchParams.get('query');

  const algoliaKeys = {
    appID: 'YQP7IIXNMT',
    writeAPIKey: ALGOLIA_WRITE_API_KEY,
  };

  const listrakRec = await getCMSContent(context, GET_LISTRAK_REC);

  return {
    query,
    listrakRec,
    algoliaKeys,
  };

}

export default function SearchFullPage() {

  const { 
    query,
    listrakRec,
    algoliaKeys,
  } = useLoaderData();

  return (
    <Layouts.MainNavFooter>
      <SearchPage 
        searchQuery={query}
        listrak={getCMSDoc(listrakRec, 'Search')}
        algoliaKeys={algoliaKeys}
      />
    </Layouts.MainNavFooter>
  );
}
