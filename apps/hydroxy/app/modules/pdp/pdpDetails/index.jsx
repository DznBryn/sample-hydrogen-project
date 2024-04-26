import {useState, useRef} from 'react';
import classnames from 'classnames';
import {Link} from '@remix-run/react';
import {useStore} from '~/hooks/useStore';
import {useCustomerState} from '~/hooks/useCostumer';
import {switchSliderPanelVisibility} from '../../sliderPanel';
import {triggerAnalyticsLoyaltyEvents} from '~/utils/functions/eventFunctions';
import {IconClose} from '../../plp/plpFilterModal';
import PDPTitle, {links as pdpTitleStyles} from '../pdpTitle';
import PDPPrice, {links as pdpPriceStyles} from '../pdpPrice';
import PDPVariants, {links as pdpVariantsStyles} from '../pdpVariants';
import PDPAddToCart, {links as pdpAddToCartStyles} from '../../addToCartButton';
import ModalGeneric, {links as modalGenericStyles} from '../../modalGeneric';
import {CertifiedBadge, PDPBadges, links as badgesStyles} from '../../badges';
import PDPConditions, {links as pdpConditionsStyles} from '../pdpConditions';
import StickyAddToCart, {
  links as stickyAddToCartStyles,
} from '../../stickyAddToCart';
import PDPSubscription, {
  links as pdpSubscriptionStyles,
} from '../pdpSubscription';
import PDPAddToCartForm, {
  links as pdpAddToCartFormStyles,
} from '../pdpAddToCartForm';
import ConcealerVariant, {
  links as concealerVariantStyles,
} from '../concealerVariant';
import ShadeFinderVariant, {
  links as shadeFinderVariantStyles,
} from '../shadeFinderVariant';
import YotpoStarReviews, {
  links as YotpoStarReviewsStyles,
} from '~/modules/YotpoStarReviews';

import styles from './styles.css';
import useFeatureFlags from '~/hooks/useFeatureFlags';

export const links = () => {
  return [
    {rel: 'stylesheet', href: styles},
    ...pdpTitleStyles(),
    ...pdpPriceStyles(),
    ...pdpConditionsStyles(),
    ...pdpVariantsStyles(),
    ...pdpAddToCartFormStyles(),
    ...pdpAddToCartFormStyles(),
    ...pdpSubscriptionStyles(),
    ...badgesStyles(),
    ...stickyAddToCartStyles(),
    ...pdpAddToCartStyles(),
    ...shadeFinderVariantStyles(),
    ...concealerVariantStyles(),
    ...modalGenericStyles(),
    ...YotpoStarReviewsStyles(),
  ];
};

const PDPDetails = ({
  product,
  details = null,
  shadeVariantsOos,
  concealerImages = null,
}) => {
  const {SHOW_LOYALTY} = useFeatureFlags();
  const subscriptionEligibleTag = useRef(
    Boolean(details.tags.includes('subscriptionEligibleTag')),
  );
  const [viewType, setViewType] = useState('LIST');
  const shouldRenderSkinFinder =
    product?.handle === 'radiant-skin-brightening-serum-skin-tint-spf-30';
  const shouldRenderConcealer =
    product?.handle === 'radiant-skin-brightening-serum-concealer';

  var {certifiedBadges} = product;
  certifiedBadges = certifiedBadges ? certifiedBadges[0]?.badges : [];

  const singleColumnForCertifiedBadges = certifiedBadges?.some(
    (ele) => ele?.title.length > 37,
  );

  if (certifiedBadges?.length > 4) {
    certifiedBadges.length = 4;
  }

  const tulaSiteWide = useRef(null);

  if (
    typeof window === 'object' &&
    tulaSiteWide.current === null &&
    window?.localStorage?.getItem('tulaSitewide') !== null
  ) {
    tulaSiteWide.current = JSON.parse(
      window.localStorage.getItem('tulaSitewide'),
    );
  }

  const {store} = useStore();

  const getVariantsSelector = () => {
    if (shouldRenderSkinFinder || shouldRenderConcealer) {
      return (
        <>
          <div className={'sfContainer'}>
            <div>
              <div className={'sfText'}>Pick a shade</div>
            </div>
            <div>
              <ListViewIcon
                isSelected={viewType === 'LIST'}
                onClick={() => setViewType('LIST')}
              />
              <GridViewIcon
                isSelected={viewType === 'GRID'}
                onClick={() => setViewType('GRID')}
              />
            </div>
          </div>
          {shouldRenderConcealer ? (
            <>
              <ConcealerVariant
                classes={'order_0'}
                details={details}
                viewType={viewType}
                shadeVariantsOos={shadeVariantsOos}
                concealerImages={concealerImages}
              />
              <div
                className={'openSFButton'}
                onClick={() => switchSliderPanelVisibility('ConcealerSlider')}
              >
                find my shade <OpenSFButtonIcon />
              </div>
            </>
          ) : (
            <>
              <ShadeFinderVariant
                classes={'order_0'}
                details={details}
                viewType={viewType}
                shadeVariantsOos={shadeVariantsOos}
                concealerImages={concealerImages}
              />
              <div
                className={'openSFButton'}
                onClick={() => {
                  window?.dataLayer?.push({
                    event: 'shadeFinderFindMyShade',
                    details: {
                      source: 'inlineCta',
                    },
                  });

                  switchSliderPanelVisibility('ShadeFinderSlider');
                }}
              >
                find my shade <OpenSFButtonIcon />
              </div>
            </>
          )}
        </>
      );
    }

    return <PDPVariants classes={'order_0'} details={details} />;
  };

  const GridViewIcon = ({isSelected, onClick}) => (
    <svg
      className={'viewIcon'}
      onClick={() => onClick()}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.6 0H0V5.6H5.6V0ZM5.6 8.4H0V14H5.6V8.4ZM8.4 8.4H14V14H8.4V8.4ZM14 0H8.4V5.6H14V0Z"
        fill={isSelected ? '#47C6D9' : '#4C4E56'}
        fillOpacity={isSelected ? 1 : 0.2}
      />
    </svg>
  );

  const ListViewIcon = ({isSelected, onClick}) => (
    <svg
      className={'viewIcon'}
      onClick={() => onClick()}
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.8431 13.5882H4.39216C4.30588 13.5882 4.23529 13.5141 4.23529 13.4235V12.2706C4.23529 12.18 4.30588 12.1059 4.39216 12.1059H15.8431C15.9294 12.1059 16 12.18 16 12.2706V13.4235C16 13.5141 15.9294 13.5882 15.8431 13.5882ZM15.8431 7.74118H4.39216C4.30588 7.74118 4.23529 7.66706 4.23529 7.57647V6.42353C4.23529 6.33294 4.30588 6.25882 4.39216 6.25882H15.8431C15.9294 6.25882 16 6.33294 16 6.42353V7.57647C16 7.66706 15.9294 7.74118 15.8431 7.74118ZM15.8431 1.89412H4.39216C4.30588 1.89412 4.23529 1.82 4.23529 1.72941V0.57647C4.23529 0.485882 4.30588 0.411764 4.39216 0.411764H15.8431C15.9294 0.411764 16 0.485882 16 0.57647V1.72941C16 1.82 15.9294 1.89412 15.8431 1.89412ZM0 12.8471C-2.1487e-09 12.6957 0.0284017 12.5457 0.0835833 12.4058C0.138765 12.266 0.219646 12.1389 0.321608 12.0318C0.423571 11.9247 0.544618 11.8398 0.677838 11.7819C0.811058 11.7239 0.953843 11.6941 1.09804 11.6941C1.24224 11.6941 1.38502 11.7239 1.51824 11.7819C1.65146 11.8398 1.77251 11.9247 1.87447 12.0318C1.97643 12.1389 2.05731 12.266 2.1125 12.4058C2.16768 12.5457 2.19608 12.6957 2.19608 12.8471C2.19608 12.9985 2.16768 13.1484 2.1125 13.2883C2.05731 13.4282 1.97643 13.5553 1.87447 13.6623C1.77251 13.7694 1.65146 13.8543 1.51824 13.9122C1.38502 13.9702 1.24224 14 1.09804 14C0.953843 14 0.811058 13.9702 0.677838 13.9122C0.544618 13.8543 0.423571 13.7694 0.321608 13.6623C0.219646 13.5553 0.138765 13.4282 0.0835833 13.2883C0.0284017 13.1484 -2.1487e-09 12.9985 0 12.8471ZM0 7C-2.1487e-09 6.84859 0.0284017 6.69867 0.0835833 6.55879C0.138765 6.41891 0.219646 6.29181 0.321608 6.18475C0.423571 6.07769 0.544618 5.99276 0.677838 5.93482C0.811058 5.87688 0.953843 5.84706 1.09804 5.84706C1.24224 5.84706 1.38502 5.87688 1.51824 5.93482C1.65146 5.99276 1.77251 6.07769 1.87447 6.18475C1.97643 6.29181 2.05731 6.41891 2.1125 6.55879C2.16768 6.69867 2.19608 6.84859 2.19608 7C2.19608 7.15141 2.16768 7.30133 2.1125 7.44121C2.05731 7.58109 1.97643 7.70819 1.87447 7.81525C1.77251 7.92231 1.65146 8.00724 1.51824 8.06518C1.38502 8.12312 1.24224 8.15294 1.09804 8.15294C0.953843 8.15294 0.811058 8.12312 0.677838 8.06518C0.544618 8.00724 0.423571 7.92231 0.321608 7.81525C0.219646 7.70819 0.138765 7.58109 0.0835833 7.44121C0.0284017 7.30133 -2.1487e-09 7.15141 0 7ZM0 1.15294C-2.1487e-09 1.00153 0.0284017 0.85161 0.0835833 0.711729C0.138765 0.571848 0.219646 0.444749 0.321608 0.337688C0.423571 0.230628 0.544618 0.145703 0.677838 0.0877619C0.811058 0.0298214 0.953843 0 1.09804 0C1.24224 0 1.38502 0.0298214 1.51824 0.0877619C1.65146 0.145703 1.77251 0.230628 1.87447 0.337688C1.97643 0.444749 2.05731 0.571848 2.1125 0.711729C2.16768 0.85161 2.19608 1.00153 2.19608 1.15294C2.19608 1.30435 2.16768 1.45427 2.1125 1.59415C2.05731 1.73403 1.97643 1.86113 1.87447 1.96819C1.77251 2.07525 1.65146 2.16018 1.51824 2.21812C1.38502 2.27606 1.24224 2.30588 1.09804 2.30588C0.953843 2.30588 0.811058 2.27606 0.677838 2.21812C0.544618 2.16018 0.423571 2.07525 0.321608 1.96819C0.219646 1.86113 0.138765 1.73403 0.0835833 1.59415C0.0284017 1.45427 -2.1487e-09 1.30435 0 1.15294Z"
        fill={isSelected ? '#47C6D9' : '#4C4E56'}
        fillOpacity={isSelected ? '1' : '.2'}
      />
    </svg>
  );

  const generatePriceConfigs = (isStickyCta) => {
    return {
      discount: store?.productPage?.addToCart?.discount ?? 0,
      limitedOffer: details.selling_plans.autoDeliveryMessage,
      selectedVariant: store?.productPage?.selectedVariant ?? 0,
      tags: details.tags,
      promos: details.productPromos,
      product,
      isStickyCta,
    };
  };

  const getPrice = (selectedVariant = 0, isStickyCta = false) => {
    return selectedVariant !== 0
      ? {
          originalPrice: parseFloat(
            details.variants?.find((variant) => variant.id === selectedVariant)
              ?.compareAtPrice?.amount ?? 0,
          ),
          price: parseFloat(
            details.variants.find((variant) => variant.id === selectedVariant)
              ?.price?.amount ?? 0,
          ),
          ...generatePriceConfigs(isStickyCta),
        }
      : {
          originalPrice: parseFloat(
            details.variants[0]?.compareAtPrice?.amount ?? 0,
          ),
          price: parseFloat(details.variants[0]?.price?.amount ?? 0),
          ...generatePriceConfigs(isStickyCta),
        };
  };

  const getDescription = (defaultDescription = '', selectedVariant = 0) =>
    selectedVariant !== 0
      ? details.variants > 1
        ? details.variants
            ?.find((variant) => variant.externalId === selectedVariant)
            ?.metafields?.find((meta) => meta.key === 'variant-modal-text')
            ?.value || ''
        : defaultDescription
      : defaultDescription;

  const LoyaltyMessage = ({className}) => {
    const {isLoggedIn} = useCustomerState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleModalDisplay() {
      setIsModalOpen(!isModalOpen);
    }

    const Copy = () => {
      const IS_AD =
        store?.productPage?.addToCart?.selling_plan_id &&
        store?.productPage?.addToCart?.selling_plan_id !== 0;

      function getPoints() {
        const {
          price,
          discount: DISCOUNT_PERCENT,
          promos,
        } = getPrice(store?.productPage?.selectedVariant ?? 0);

        const MULTIPLIER = 10;
        const ADD_WHEN_AD = 300;
        const SHOW_SITE_WIDE_PROMO =
          tulaSiteWide.current?.promoDiscount &&
          !tulaSiteWide.current?.excludeList?.includes(product.handle);
        const SHOWING_PROMO =
          promos?.showPromo &&
          promos?.variantIds.includes(
            store?.productPage?.selectedVariant.toString(),
          );

        const PROMO_PRICE =
          tulaSiteWide.current?.promoDiscount || promos?.discount;

        const ROUNDED_PRICE = Math.floor(price);

        let curPrice;

        if ((SHOWING_PROMO || SHOW_SITE_WIDE_PROMO) && !IS_AD) {
          const PROMO_DISCOUNT = ROUNDED_PRICE * (PROMO_PRICE / 100);
          curPrice = ROUNDED_PRICE - PROMO_DISCOUNT;
        } else {
          const DISCOUNT = ROUNDED_PRICE * (DISCOUNT_PERCENT / 100);
          curPrice = DISCOUNT > 0 ? ROUNDED_PRICE - DISCOUNT : ROUNDED_PRICE;
        }

        const POINTS = IS_AD
          ? Math.round(curPrice) * MULTIPLIER + ADD_WHEN_AD
          : curPrice * MULTIPLIER;

        return Math.floor(POINTS);
      }

      return (
        <div className={'loyaltyMessageContainer__copy'}>
          {isLoggedIn ? (
            <span>
              You’re earning <b>{getPoints()} points</b> with TULA 24-7 Rewards!
            </span>
          ) : (
            <span>
              Earn <b>{getPoints()} points</b> with TULA 24-7 Rewards
            </span>
          )}
        </div>
      );
    };

    const ActionButton = () => (
      <div className={'loyaltyMessageContainer__action'}>
        {isLoggedIn ? (
          <span onClick={handleModalDisplay}>
            <QuestionMarkIcon />
          </span>
        ) : (
          <div
            className={'loyaltyMessageContainer__joinButton'}
            onClick={() => {
              switchSliderPanelVisibility('SliderAccount');
              triggerAnalyticsLoyaltyEvents('SignupBtnClick', {
                source: 'pdpPoints',
              });
            }}
          >
            Join now
            <ArrowIcon />
          </div>
        )}
      </div>
    );

    const Modal = () => {
      return (
        <ModalGeneric isOpen={isModalOpen} handleClose={handleModalDisplay}>
          <div className={'loyaltyMessageContainer__modalContent'}>
            <InfoIcon />
            <b>
              Points displayed is based on the product price. Final points you
              will earn will be calculated in checkout.
            </b>
          </div>
        </ModalGeneric>
      );
    };

    return (
      <span className={className}>
        <div className={'loyaltyMessageContainer'}>
          <RoundStarIcon />
          <Copy />
          <ActionButton />

          <Modal />
        </div>
      </span>
    );
  };

  return (
    (details && (
      <div className={'details_container'}>
        {/* PDP - TITLE */}
        <PDPTitle
          title={{
            name: details.title.name,
            alt: details.title.alt,
          }}
          mobileBreakpoint={false}
          productDetails={details}
          selectedVariant={store?.productPage?.selectedVariant}
          exclusiveProductTextColor={product?.exclusiveTextColor}
        />
        <div className={'badgesContainer'}>
          {!details.tags.find(
            (tag) => tag.toLowerCase().replace(' ', '-') === 'gift-card',
          ) ? (
            <PDPReviews product={product} />
          ) : (
            ''
          )}
          <div className={'badgesWraper'}>
            <PDPBadges productDetails={details} selectedVariant={0} />
          </div>
        </div>
        <PDPPrice
          pricing={getPrice(store?.productPage?.selectedVariant ?? 0)}
        />
        {SHOW_LOYALTY && <LoyaltyMessage className={'show_mobile'} />}
        <PDPDescription
          classes={'order_7'}
          description={getDescription(
            details.description,
            store?.productPage?.selectedVariant ?? 0,
          )}
          descriptionHtml={getDescription(
            details.descriptionHtml,
            store?.productPage?.selectedVariant ?? 0,
          )}
          size={details.size}
          details={details}
        />
        <PDPConditions classes={'order_4'} suitableFor={details.suitableFor} />
        {!details.tags.find(
          (tag) => tag.toLowerCase().replace(' ', '-') === 'gift-card',
        ) &&
          certifiedBadges?.length > 0 && (
            <div className={'certifiedBadgesContainer'}>
              {certifiedBadges?.map((badge) => (
                <CertifiedBadge
                  style={{
                    gridColumn: singleColumnForCertifiedBadges ? 'span 2' : '',
                  }}
                  image={badge.image.asset.url + '?auto=format'}
                  title={badge.title}
                  key={badge.title}
                />
              ))}
            </div>
          )}
        {details.variants !== null && getVariantsSelector()}
        {SHOW_LOYALTY && <LoyaltyMessage className={'show_desktop'} />}
        {subscriptionEligibleTag.current ? (
          <PDPSubscription
            classes={'order_0'}
            sellingPlans={{
              AutoDeliveryDiscount: details.selling_plans.autoDeliveryDiscount,
              AutoDeliveryMessage: details.selling_plans.autoDeliveryMessage,
              SellingPlans: details.selling_plans.sellingPlans,
              RecommendedSellingPlan: product.recommendedSellingPlan,
            }}
            autoDeliveryInfo={details.autoDeliveryInfo}
          />
        ) : null}
        <div className={'pdpAtcForm'}>
          <PDPAddToCartForm
            renderingShadeFinder={shouldRenderSkinFinder}
            renderingConcealer={shouldRenderConcealer}
            exclusiveProductAtcColor={product?.exclusiveAtcColor}
            exclusiveProductTextColor={product?.exclusiveTextColor}
            isGated={product?.isGated}
          />
        </div>

        <PDPLearnMore />

        <StickyAddToCart
          product={details}
          exclusiveProductAtcColor={product?.exclusiveAtcColor}
          exclusiveProductTextColor={product?.exclusiveTextColor}
          isGated={product?.isGated}
          Component={
            <div className={'ctaContainer'}>
              {shouldRenderSkinFinder &&
                store?.productPage?.selectedVariant === undefined && (
                  <div
                    className={'openSFButtonSticky'}
                    onClick={() => {
                      window.dataLayer.push({
                        event: 'shadeFinderFindMyShade',
                        details: {
                          source: 'stickyCta',
                        },
                      });

                      switchSliderPanelVisibility('ShadeFinderSlider');
                    }}
                  >
                    Find my shade
                  </div>
                )}

              {shouldRenderConcealer &&
                store?.productPage?.selectedVariant === undefined && (
                  <div
                    className={'openSFButtonSticky'}
                    onClick={() =>
                      switchSliderPanelVisibility('ConcealerSlider')
                    }
                  >
                    Find my shade
                  </div>
                )}
              <PDPAddToCart
                classes={['stickyAtc']}
                addItem={{
                  product: store?.product || {},
                  variantId: store?.productPage?.selectedVariant,
                  quantity: store?.productPage?.addToCart?.quantity,
                  ['selling_plan_id']:
                    store?.productPage?.addToCart?.selling_plan_id &&
                    store?.productPage?.addToCart?.selling_plan_id !== 0
                      ? store.productPage.addToCart.selling_plan_id
                      : null,
                }}
                exclusiveProductAtcColor={product?.exclusiveAtcColor}
                exclusiveProductTextColor={product?.exclusiveTextColor}
                isGated={product?.isGated}
                availableForSale={product?.totalInventory > 0}
              />
            </div>
          }
          PriceComponent={
            <PDPPrice
              pricing={getPrice(store?.productPage?.selectedVariant ?? 0, true)}
            />
          }
        />
      </div>
    )) || (
      <div className={'details_container'}>
        <LoadingPlaceholder />
      </div>
    )
  );
};

const ModalLearnMore = ({
  children,
  showLearnMoreModal = false,
  setShowLearnMoreModal = () => {},
}) => {
  return (
    (showLearnMoreModal && (
      <div className={'pdpDetails_modal__container'}>
        <div className={'learn_more__container'}>
          <div className={'pdpDetails_close__container'}>
            <div
              className={'close'}
              onClick={() => setShowLearnMoreModal(false)}
            >
              <IconClose />
            </div>
          </div>
          {children}
        </div>
      </div>
    )) ||
    null
  );
};

const PDPReviews = ({product}) => {
  const productID = product?.id.replace(/[^0-9]/g, '');

  return (
    <div className={'pdpReviews'}>
      <YotpoStarReviews productExternalID={productID} />
    </div>
  );
};

const PDPLearnMore = () => {
  const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);

  return (
    <div className={'pdpDetails_afterpayContainer'}>
      <ModalLearnMore
        showLearnMoreModal={showLearnMoreModal}
        setShowLearnMoreModal={setShowLearnMoreModal}
      >
        <p className={'learn_more__text'}>
          If for any reason you aren’t satisfied with your products, we will
          happily accept your return of items purchased in the last 60 days*.
          Shipping is covered by us and we will offer you a prepaid shipping
          label. Learn more at our{' '}
          <Link
            href={'https://returns.tula.com/'}
            className={'pdpDetails_cta__button'}
          >
            return center
          </Link>
          .
        </p>
      </ModalLearnMore>

      <p className={'returns_text_desktop'}>
        <small>
          free 60-day returns.{' '}
          <span
            className={'pdpDetails_cta__button'}
            onClick={() => setShowLearnMoreModal(true)}
          >
            Learn More
          </span>
        </small>
      </p>
    </div>
  );
};

const PDPDescription = ({classes, descriptionHtml, size}) => (
  <div className={classnames('description_container', classes)}>
    <div
      className={'description'}
      dangerouslySetInnerHTML={{__html: descriptionHtml}}
    />
    {size !== '' ? (
      !size.match(
        /<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>/g,
      ) ? (
        <p className={'description'}>
          <span className={'size_description'}>Size: {size}</span>
        </p>
      ) : (
        <div
          className={'description'}
          dangerouslySetInnerHTML={{__html: size}}
        />
      )
    ) : (
      ''
    )}
  </div>
);

export default PDPDetails;

const OpenSFButtonIcon = () => (
  <svg
    width={26}
    height={12}
    viewBox="0 0 26 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx={6} cy={6} r={5.5} fill="#38241D" stroke="white" />
    <circle cx={13} cy={6} r={5.5} fill="#B7875A" stroke="white" />
    <circle cx={20} cy={6} r={5.5} fill="#F2D1B8" stroke="white" />
  </svg>
);

const QuestionMarkIcon = () => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.7778 6C11.7778 7.5913 11.1573 9.11742 10.053 10.2426C8.94858 11.3679 7.45072 12 5.88889 12C4.32706 12 2.8292 11.3679 1.72482 10.2426C0.620435 9.11742 0 7.5913 0 6C0 4.4087 0.620435 2.88258 1.72482 1.75736C2.8292 0.632141 4.32706 0 5.88889 0C7.45072 0 8.94858 0.632141 10.053 1.75736C11.1573 2.88258 11.7778 4.4087 11.7778 6ZM4.04567 4.52475H4.65296C4.75454 4.52475 4.83551 4.44 4.84876 4.33725C4.91501 3.84525 5.24626 3.48675 5.83662 3.48675C6.3416 3.48675 6.80387 3.744 6.80387 4.36275C6.80387 4.839 6.52857 5.058 6.09353 5.391C5.59812 5.75775 5.20578 6.186 5.23375 6.88125L5.23596 7.044C5.23673 7.09321 5.25646 7.14013 5.29089 7.17465C5.32532 7.20916 5.37168 7.22851 5.41999 7.2285H6.01697C6.06578 7.2285 6.11259 7.20875 6.1471 7.17358C6.18161 7.13842 6.201 7.09073 6.201 7.041V6.96225C6.201 6.42375 6.40196 6.267 6.94447 5.84775C7.39276 5.5005 7.86019 5.115 7.86019 4.30575C7.86019 3.1725 6.92092 2.625 5.89257 2.625C4.95992 2.625 3.93819 3.0675 3.86826 4.3395C3.86726 4.36372 3.87112 4.3879 3.87962 4.41054C3.88812 4.43318 3.90108 4.45381 3.9177 4.47116C3.93431 4.48851 3.95424 4.50222 3.97625 4.51143C3.99825 4.52065 4.02188 4.52518 4.04567 4.52475ZM5.75712 9.357C6.20615 9.357 6.51458 9.0615 6.51458 8.66175C6.51458 8.24775 6.20542 7.95675 5.75712 7.95675C5.32724 7.95675 5.01439 8.24775 5.01439 8.66175C5.01439 9.0615 5.32724 9.357 5.75786 9.357H5.75712Z"
      fill="#D1CFDB"
    />
  </svg>
);
const ArrowIcon = () => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.16602 5.50004H9.83268M6.04102 1.70837L9.83268 5.50004L6.04102 9.29171"
      stroke="#47C6D9"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const RoundStarIcon = () => (
  <svg
    width={14}
    height={16}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7Z"
      fill="#47C6D9"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 12.95C10.2861 12.95 12.95 10.2861 12.95 7C12.95 3.71391 10.2861 1.05 7 1.05C3.71391 1.05 1.05 3.71391 1.05 7C1.05 10.2861 3.71391 12.95 7 12.95ZM7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z"
      fill="#B3E5ED"
    />
    <path
      d="M7.00022 3.11133L7.91826 6.08217H10.8891L8.48564 7.91826L9.40368 10.8891L7.00022 9.05302L4.59675 10.8891L5.51479 7.91826L3.11133 6.08217H6.08217L7.00022 3.11133Z"
      fill="white"
    />
  </svg>
);
const InfoIcon = () => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_2810_8335)">
      <path
        d="M19.6296 10C19.6296 12.6522 18.5956 15.1957 16.7549 17.0711C14.9143 18.9464 12.4179 20 9.81481 20C7.21176 20 4.71533 18.9464 2.87469 17.0711C1.03406 15.1957 0 12.6522 0 10C0 7.34784 1.03406 4.8043 2.87469 2.92893C4.71533 1.05357 7.21176 0 9.81481 0C12.4179 0 14.9143 1.05357 16.7549 2.92893C18.5956 4.8043 19.6296 7.34784 19.6296 10V10ZM6.74278 7.54125H7.75493C7.92424 7.54125 8.05919 7.4 8.08127 7.22875C8.19169 6.40875 8.74377 5.81125 9.72771 5.81125C10.5693 5.81125 11.3398 6.24 11.3398 7.27125C11.3398 8.065 10.8809 8.43 10.1559 8.985C9.33021 9.59625 8.6763 10.31 8.72292 11.4688L8.7266 11.74C8.72788 11.822 8.76077 11.9002 8.81815 11.9577C8.87553 12.0153 8.95281 12.0475 9.03331 12.0475H10.0283C10.1096 12.0475 10.1876 12.0146 10.2452 11.956C10.3027 11.8974 10.335 11.8179 10.335 11.735V11.6037C10.335 10.7062 10.6699 10.445 11.5741 9.74625C12.3213 9.1675 13.1003 8.525 13.1003 7.17625C13.1003 5.2875 11.5349 4.375 9.82095 4.375C8.26653 4.375 6.56366 5.1125 6.44711 7.2325C6.44543 7.27287 6.45187 7.31316 6.46604 7.3509C6.48021 7.38863 6.5018 7.42302 6.5295 7.45194C6.55719 7.48085 6.5904 7.5037 6.62708 7.51906C6.66375 7.53442 6.70313 7.54197 6.74278 7.54125V7.54125ZM9.59521 15.595C10.3436 15.595 10.8576 15.1025 10.8576 14.4362C10.8576 13.7462 10.3424 13.2613 9.59521 13.2613C8.87873 13.2613 8.35731 13.7462 8.35731 14.4362C8.35731 15.1025 8.87873 15.595 9.59643 15.595H9.59521Z"
        fill="#65CADB"
      />
    </g>
    <defs>
      <clipPath id="clip0_2810_8335">
        <rect width={20} height={20} fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const LoadingPlaceholder = () => {
  return (
    <div className={'lines'}>
      <div className={'line pulse w_20'}></div>
      <div className={'line pulse w_80'}></div>
      <div className={'line pulse w_35'}></div>
      <br />
      <br />
      <div className={'line pulse w_90'}></div>
      <div className={'line pulse w_90'}></div>
      <div className={'line pulse w_90'}></div>
      <div className={'line pulse w_90'}></div>
      <br />
      <br />
      <div className={'container__row'}>
        <div className={'line pulse w_45'}></div>
        <div className={'line pulse w_45'}></div>
        <div className={'line pulse w_45'}></div>
        <div className={'line pulse w_45'}></div>
        <div className={'line pulse w_45'}></div>
      </div>
      <div className={'line pulse w_90 p_50'}></div>
    </div>
  );
};
