import {useRouteLoaderData} from '@remix-run/react';
import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const AccessibilityPage = () => {
  const {ENVS} = useRouteLoaderData('root');

  //

  function getURL() {
    const isUK = ENVS?.SITE_NAME.includes('UK');
    const isCA = ENVS?.SITE_NAME.includes('CA');
    const isUS =
      ENVS?.SITE_NAME.includes('US') || ENVS?.SITE_NAME.includes('US_STG');

    if (isUS)
      return 'https://portal.audioeye.com/marketplace/accessibilitystatement/format/ajax/site/26580';

    if (isCA)
      return 'https://customer-portal.audioeye.com/accessibility-statement.html?domain=tulaskincare.ca';

    if (isUK)
      return 'https://customer-portal.audioeye.com/accessibility-statement.html?domain=tulaskincare.co.uk';
  }

  //

  return (
    <div className={'accessibilityPage minHeight'}>
      <iframe src={getURL()} title="Accessibility Statement"></iframe>
    </div>
  );
};
export default AccessibilityPage;
