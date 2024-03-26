import Layouts from '~/layouts';
import {useLoaderData} from '@remix-run/react';
import SearchPage, {links as searchPageStyles} from '~/modules/searchPage';

export const links = () => searchPageStyles();

export async function loader({context, request}) {
  const {ALGOLIA_WRITE_API_KEY, ALGOLIA_APP_ID} = context.env;

  const url = new URL(request.url);
  const query = url.searchParams.get('query');

  const algoliaKeys = {
    appID: ALGOLIA_APP_ID,
    writeAPIKey: ALGOLIA_WRITE_API_KEY,
  };

  return {
    query,
    algoliaKeys,
  };
}

export default function SearchFullPage() {
  const {query, algoliaKeys} = useLoaderData();

  return (
    <Layouts.MainNavFooter>
      <SearchPage searchQuery={query} algoliaKeys={algoliaKeys} />
    </Layouts.MainNavFooter>
  );
}
