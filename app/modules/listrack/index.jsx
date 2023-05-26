import { useEffect } from 'react';
import { appendScript } from '~/utils/functions/getApiKeys';
import getApiKeys from '~/utils/functions/getApiKeys';

const Listrack = ({ productList }) => {

  const _ltk = _ltk;

  useEffect(() => {

    const triggerListrak = () => {

      _ltk.Signup.New('Footer', 'email_signup_new', _ltk.Signup.TYPE.CLICK, 'FooterNewsletterSubmit', 'channel');
      _ltk.OnsiteContent?.reload();

      if (window.location.href.includes('/products/')) {

        const slug = window.location.pathname.replace('/products/', '');

        const product = productList.products.filter((prod) => (prod.slug === slug));

        _ltk.Activity.AddProductBrowse(product[0].externalId.toString());

      }

      _ltk.Activity.AddPageBrowse(window.location.href);

    };

    if (typeof _ltk === 'undefined') {
      appendScript(getApiKeys().LISTRAK_SCRIPT, 'listrak', true, triggerListrak);
    } else {
      triggerListrak();
    }

  }, []);

  return null;

};

export default Listrack;