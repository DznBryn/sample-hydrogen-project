import {useEffect} from 'react';
import {useCollection} from '~/hooks/useCollection';

const Listrack = () => {
  const {products: productList, state} = useCollection('all');

  const triggerListrak = () => {
    window._ltk.Signup.New(
      'Footer',
      'email_signup_new',
      window._ltk.Signup.TYPE.CLICK,
      'FooterNewsletterSubmit',
      'channel',
    );

    if (typeof window._ltk.OnsiteContent?.reload === 'function') {
      window._ltk.OnsiteContent?.reload();
    }

    if (window.location.href.includes('/products/')) {
      const handle = window.location.pathname.replace('/products/', '');

      const product = productList.find((prod) => prod.handle === handle);

      if (product) {
        const splittedID = product.id.split('/');
        const externalID = splittedID[splittedID.length - 1];

        window._ltk.Activity.AddProductBrowse(externalID);
      }
    }

    window._ltk.Activity.AddPageBrowse(window.location.href);
  };

  useEffect(() => {
    if (typeof window._ltk === 'object' && state === 'loaded') {
      triggerListrak();
    }
  });

  return null;
};

export default Listrack;
