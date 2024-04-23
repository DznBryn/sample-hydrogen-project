import {UnlockedIcon, LockedIcon} from '../../icons';
import {Image, flattenConnection} from '@shopify/hydrogen';
import useCurrency from '~/hooks/useCurrency';

//

const FreeGiftPromoProduct = ({
  product,
  isMystery,
  anonymousImageSrc,
  active,
  productPrice,
}) => {
  const {getCurrency} = useCurrency();
  const shopifyProductImages = product?.images
    ? flattenConnection(product.images)
    : [];
  const Img =
    isMystery && anonymousImageSrc?.asset ? (
      <>
        <img
          src={anonymousImageSrc?.asset?.url}
          alt={anonymousImageSrc?.asset?.altText ?? 'Mystery gift'}
          sizes="(min-width: 45em) 50vw, 100vw"
        />
      </>
    ) : (
      <Image
        className="productImage"
        data={shopifyProductImages?.[0]}
        sizes="(min-width: 45em) 50vw, 100vw"
        aspectRatio="4:5"
      />
    );

  //

  return (
    <div className={['freeGiftPromo', active ? '' : 'disabled'].join(' ')}>
      {Img}
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
        <p>{isMystery ? 'Mystery gift' : product?.title}</p>
      </div>
    </div>
  );
};

export default FreeGiftPromoProduct;
