import {flattenConnection} from '@shopify/hydrogen';
import {isFreeGitPromoActivate} from '../utils';
import useCurrency from '~/hooks/useCurrency';

let initState = 0;

//

const ProgressBar = ({cart, cartConfig}) => {
  const {getCurrency} = useCurrency();
  let cartTotal = cart?.cost?.subtotalAmount?.amount ?? 0;
  const items = cart?.lines ? flattenConnection(cart.lines) : [];
  let progressMsg = null;
  let progressMsgFreeGift = null;
  let leftTillFree = 0;
  let leftTillFreeGift = 0;
  let percentage = 0;
  let percentageFreeGift = 0;
  initState = ++initState;

  if (items.find((item) => item?.sellingPlanAllocation?.sellingPlan?.id)) {
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
          {
            // eslint-disable-next-line
            "You're " +
              getCurrency() +
              leftTillFree +
              ' away from free shipping'
          }
        </p>
      );
    }
  }

  if (isFreeGitPromoActivate(cartConfig)) {
    if (!cartConfig.freeGiftPromoCombineAD) {
      cartTotal = items
        .filter((item) => !item?.sellingPlanAllocation?.sellingPlan)
        .reduce((total, value) => {
          return (total += Number(
            value?.cost?.amountPerQuantity?.amount * value.quantity ?? 0,
          ));
        }, 0);
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
        // eslint-disable-next-line
        <p>{"You're $" + leftTillFreeGift + ' away from a Free Gift'}</p>
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
          <div className={'progress'} style={{width: percentage + '%'}}></div>
        </div>
      </div>

      {isFreeGitPromoActivate(cartConfig) && (
        <div className={['progressWrap', 'pinkProgressWrap'].join(' ')}>
          {progressMsgFreeGift}
          <div className={'goal'}>
            <div
              className={'progress'}
              style={{width: percentageFreeGift + '%'}}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
