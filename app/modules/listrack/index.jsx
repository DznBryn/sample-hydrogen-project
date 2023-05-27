import { useEffect } from 'react';
import { appendScript } from '~/utils/functions/eventFunctions';
import getApiKeys from '~/utils/functions/getApiKeys';

const Listrack = ({ productList }) => {

  useEffect(() => {

    const triggerListrak = () => {

      window._ltk.Signup.New('Footer', 'email_signup_new', window._ltk.Signup.TYPE.CLICK, 'FooterNewsletterSubmit', 'channel');
      window._ltk.OnsiteContent?.reload();

      if (window.location.href.includes('/products/')) {

        const slug = window.location.pathname.replace('/products/', '');

        const product = productList.products.filter((prod) => (prod.slug === slug));

        window._ltk.Activity.AddProductBrowse(product[0].externalId.toString());

      }

      window._ltk.Activity.AddPageBrowse(window.location.href);

    };

    if (typeof window._ltk === 'undefined') {
      appendScript(getApiKeys().LISTRAK_SCRIPT, 'listrak', true, triggerListrak);
    } else {
      triggerListrak();
    }

  }, []);

  return null;

};

export default Listrack;