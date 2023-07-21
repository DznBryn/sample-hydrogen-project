import getApiKeys from '../../../utils/functions/getApiKeys';
import {

  isAutoCart,
  isAutoCartGraphQL,
  getCurrency,
  getCartTotalForFreeShipping,
  getCartTotalForFreeShippingGraphQL,
} from '../../../utils/functions/eventFunctions';
import {isFreeGitPromoActivate} from '../utils'
const apiType = getApiKeys().API_TYPE;
let initState = 0;

const ProgressBar = ({ cart, cartConfig }) => {
  let cartTotal =
    apiType === 'graphql'
      ? getCartTotalForFreeShippingGraphQL()
      : getCartTotalForFreeShipping();
  let progressMsg = null;
  let progressMsgFreeGift = null;
  let leftTillFree = 0;
  let leftTillFreeGift = 0;
  let percentage = 0;
  let percentageFreeGift = 0;
  initState = ++initState;

  if (
    apiType === 'graphql'
      ? isAutoCartGraphQL(cart.items)
      : isAutoCart(cart.items)
  ) {
    progressMsg = (
      <p className={'freeShip'}>
        Congrats! Enjoy FREE SHIPPING with auto-delivery
      </p>
    );
    percentage = 100;
  } else {
    if (cartTotal > cartConfig.freeShippingThreshold) {
      progressMsg = (
        <p className={'freeShip'}>Congrats! Your order ships free!</p>
      );
      percentage = 100;
    } else {
      leftTillFree = cartConfig.freeShippingThreshold - cartTotal;
      leftTillFree =
        leftTillFree % 1 === 0
          ? leftTillFree
          : (leftTillFree + 0.29).toFixed(2);
      percentage = (cartTotal / cartConfig.freeShippingThreshold) * 100;
      progressMsg = (
        <p>
          {'You\'re ' +
            getCurrency() +
            leftTillFree +
            ' away from free shipping'}
        </p>
      );
    }
  }

  if (isFreeGitPromoActivate(cartConfig)) {
    if (!cartConfig.freeGiftPromoCombineAD) {
      cartTotal =
        apiType === 'graphql'
          ? cart.items
            .filter(
              (item) =>
                !item.customAttributes.some(
                  (el) => el.key === 'selling_plan',
                ),
            )
            .reduce(
              (total, value) => (total += Number(value.variant.price)),
              0,
            )
          : cart.items
            .filter((item) => item.selling_plan_allocation === undefined)
            .reduce(
              (total, value) => (total += value.final_line_price / 100),
              0,
            );
    }
    if (cartTotal >= cartConfig.freeGiftPromoThreshold) {
      progressMsgFreeGift = (
        <p className={'pinkFreeShip'}>
          {cartConfig.freeGiftPromoProgressCompleteMessage}
        </p>
      );
      percentageFreeGift = 100;
    } else {
      leftTillFreeGift = cartConfig.freeGiftPromoThreshold - cartTotal;
      leftTillFreeGift =
        leftTillFreeGift % 1 === 0
          ? leftTillFreeGift
          : (leftTillFreeGift + 0.29).toFixed(2);
      percentageFreeGift =
        (cartTotal / cartConfig.freeGiftPromoThreshold) * 100;
      progressMsgFreeGift = (
        <p>{'You\'re $' + leftTillFreeGift + ' away from a Free Gift'}</p>
      );
    }
  }

  return (
    <div className={'progressMainContainer'}>
      <div className={'progressWrap'}>
        {progressMsg}
        <div
          className={[
            'goal',
            isFreeGitPromoActivate(cartConfig) ? '' : 'shortGoal',
          ].join(' ')}
        >
          <div
            className={'progress'}
            style={{ width: percentage + '%' }}
          ></div>
        </div>
      </div>

      {isFreeGitPromoActivate(cartConfig) && (
        <div
          className={['progressWrap', 'pinkProgressWrap'].join(' ')}
        >
          {progressMsgFreeGift}
          <div className={'goal'}>
            <div
              className={'progress'}
              style={{ width: percentageFreeGift + '%' }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressBar