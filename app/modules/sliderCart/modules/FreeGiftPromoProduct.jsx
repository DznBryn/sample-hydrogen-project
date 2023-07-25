import { UnlockedIcon, LockedIcon } from '../../icons';
import { getCurrency } from '../../../utils/functions/eventFunctions';

const FreeGiftPromoProduct = ({
  product,
  isMystery,
  // anonymousImageSrc,
  active,
  productPrice,
}) => {
  // const IMG_SRC = isMystery ? anonymousImageSrc : product.media[0].details.src;
  
  return (
    <div
      className={['freeGiftPromo', active ? '' : 'disabled'].join(
        ' ',
      )}
    >
      {/* <ResponsiveImage src={IMG_SRC} /> */}
      <div className={'info'}>
        <div className={'badge'}>
          {active ? (
            <span>
              <UnlockedIcon />
              FREE GIFT
            </span>
          ) : (
            <span>
              <LockedIcon />
              UNLOCK FREE GIFT
            </span>
          )}

          {`(${getCurrency() + productPrice} value)`}
        </div>
        <p>{isMystery ? 'Mystery gift' : product?.name}</p>
      </div>
    </div>
  );
};

export default FreeGiftPromoProduct;