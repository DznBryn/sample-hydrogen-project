import {useStore} from '~/hooks/useStore';
import {getCurrency} from '../../../utils/functions/eventFunctions';
import getApiKeys from '../../../utils/functions/getApiKeys';

const Checkout = ({message, url, valueToSubtract = null, isEmpty = false}) => {
  const cart = useStore((store) => store?.cart?.data ?? null);
  const subtotalPrice = Number(cart?.cost?.subtotalAmount?.amount ?? 0).toFixed(
    2,
  );

  const handleCartSubTotal = ({subtotalPrice}) => {
    return Number(subtotalPrice - valueToSubtract).toFixed(2);
  };

  const modifiedSubtotalPrice = valueToSubtract
    ? getCurrency() +
      (handleCartSubTotal({cart, subtotalPrice}) - valueToSubtract)
    : getCurrency() + handleCartSubTotal({cart, subtotalPrice});

  const isNotEmptyCart = cart !== null && !isEmpty;

  return (
    <div className={isNotEmptyCart ? 'checkout' : 'emptyCheckout'}>
      {isNotEmptyCart && (
        <div className={'subtotal'}>
          <h2>Subtotal</h2>
          <h2>{modifiedSubtotalPrice}</h2>
        </div>
      )}
      <a href={url} className={'checkoutCta'}>
        {message}
      </a>
      {isNotEmptyCart && (
        <div className={'discount'}>
          {getApiKeys().CURRENT_ENV.includes('US')
            ? 'Got a discount code or rewards points? Add them at checkout.'
            : 'Got a discount code? Add it on the next page'}
        </div>
      )}
    </div>
  );
};

export default Checkout;
