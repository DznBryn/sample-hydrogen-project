import {useStore} from '~/hooks/useStore';
import {useNavigate, useRouteLoaderData} from '@remix-run/react';
import useCurrency from '~/hooks/useCurrency';
import {useMultipass} from '~/hooks/useMultipass';

//

const Checkout = ({message, url, valueToSubtract = null, isEmpty = false}) => {
  const {ENVS} = useRouteLoaderData('root');
  const {navigateToShopify} = useMultipass();
  const toggleCart = useStore((store) => store?.cart?.toggleCart ?? (() => {}));
  const navigate = useNavigate();
  const {getCurrency} = useCurrency();
  const cart = useStore((store) => store?.cart?.data ?? null);
  const subtotalPrice = Number(cart?.cost?.subtotalAmount?.amount ?? 0).toFixed(
    2,
  );

  //

  const handleCartSubTotal = ({subtotalPrice}) => {
    return Number(subtotalPrice - valueToSubtract).toFixed(2);
  };

  const modifiedSubtotalPrice = valueToSubtract
    ? getCurrency() +
      (handleCartSubTotal({cart, subtotalPrice}) - valueToSubtract)
    : getCurrency() + handleCartSubTotal({cart, subtotalPrice});

  function handleCheckoutOnClick() {
    if (url.includes('https')) {
      navigateToShopify(url);
    } else {
      navigate(url);
      toggleCart();
    }
  }

  //

  const isNotEmptyCart = cart !== null && !isEmpty;

  return (
    <div className={isNotEmptyCart ? 'checkout' : 'emptyCheckout'}>
      {isNotEmptyCart && (
        <div className={'subtotal'}>
          <h2>Subtotal</h2>
          <h2>{modifiedSubtotalPrice}</h2>
        </div>
      )}
      <div onClick={handleCheckoutOnClick} className={'checkoutCta'}>
        {message}
      </div>

      {isNotEmptyCart && (
        <div className={'discount'}>
          {ENVS?.SITE_NAME.includes('US')
            ? 'Got a discount code or rewards points? Add them at checkout.'
            : 'Got a discount code? Add it on the next page'}
        </div>
      )}
    </div>
  );
};

export default Checkout;
