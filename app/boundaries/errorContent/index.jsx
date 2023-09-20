import Layouts from '~/layouts';
import styles from './styles.css';
import ListrakRec, { links as listrakRecStyles } from '~/modules/listrakRec';
import { useMatches } from '@remix-run/react';
import { getCMSDoc } from '~/utils/functions/eventFunctions';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...listrakRecStyles(),
  ];
};

let notThrowed = true;

export default function ErrorContent({ error }) {

  const [root] = useMatches();

  if(notThrowed) {
    // eslint-disable-next-line no-console
    console.error(error);
    notThrowed = false;
  }

  return (
    <Layouts.MainNavFooter>
      <div className={'errorPage'}>
        <h2>oops, something&apos;s gone wrong!</h2>
        <h4>Not to worry, why don&apos;t you try a search?</h4>
        <form action="/search" method="get" role="search" aria-label="Search" className={'searchForm'}>
          <input
            name="query"
            id="query"
            className={'searchInput'} />
          <button
            className={'searchButton'}
            type="submit">
            <svg className={'icon'} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.6696 9.74384C3.72631 11.8005 6.95947 11.9686 9.21225 10.2076L13.7996 14.7941C14.0742 15.0686 14.5194 15.0686 14.794 14.7941C15.0687 14.5196 15.0687 14.0745 14.794 13.8L10.2067 9.21348C11.9514 6.97624 11.8002 3.72995 9.74342 1.67327C7.51104 -0.558393 3.90072 -0.557118 1.66962 1.67327C-0.55654 3.89743 -0.55654 7.51854 1.66962 9.74398L1.6696 9.74384ZM2.66405 2.66609C4.34662 0.984055 7.06775 0.984693 8.74905 2.66609C10.426 4.34302 10.426 7.07203 8.74905 8.74912C7.06648 10.4312 4.34535 10.4305 2.66405 8.74912C0.98658 7.07267 0.98658 4.34318 2.66405 2.66609Z" />
            </svg>
            <span>Search</span>
          </button>
        </form>
      </div>
      <ListrakRec listrak={getCMSDoc(root.data.listrakRec, '404')} />
    </Layouts.MainNavFooter>
  );
}