/* eslint-disable react/no-unknown-property */
import React, {useState, useEffect} from 'react';
import {useYotpo} from '~/hooks/useYotpo';
import classNames from 'classnames/bind';
import styles from './styles.css';
import RedeemProductsSection, {
  links as redeemProductsSectionStyles,
} from '~/modules/redeemProductsSection';
import {brandLogos} from '~/modules/rewardsEarnPoints';
import {useCollection} from '~/hooks/useCollection';
import {handleGetProductByID} from '~/utils/functions/eventFunctions';
import {useLoaderData} from '@remix-run/react';
import {useCustomer} from '~/hooks/useCustomer';

export function links() {
  return [{rel: 'stylesheet', href: styles}, ...redeemProductsSectionStyles()];
}

const Slider = () => (
  <div className="carousel-track">
    {Object.values(brandLogos).map((svg, index) => (
      <div key={index} className={'earn_points_svg'}>
        {svg}
      </div>
    ))}
  </div>
);

const LoyaltyRewardsTab = () => {
  const {faqContent, yotpoRedeemProducts} = useLoaderData();
  const yotpoFAQ = faqContent?.[0]?.yotpoQuestions || null;
  const yotpoProducts = yotpoRedeemProducts?.[0]?.products || null;
  const data = useCustomer();
  const {refreshWidgets} = useYotpo();
  const isLoggedIn =
    data?.id !== '' || data?.id !== null || data?.id !== undefined;

  const {state, products} = useCollection('all');
  const [datax, setDatax] = useState({});

  useEffect(() => {
    if (state === 'loaded') {
      const productData =
        yotpoProducts &&
        yotpoProducts?.map((yotpoProduct) => {
          const productWithDetails = handleGetProductByID(
            yotpoProduct?.products[0]?.productId,
            products,
          );

          return {
            ...yotpoProduct,
            product: productWithDetails,
          };
        });

      setDatax(productData?.filter((data) => data.product));
      refreshWidgets();
    }
  }, [state]);

  return (
    <div className={'myRewards__container'}>
      <div className="yotpo-widget-instance" data-yotpo-instance-id="300765" />

      {isLoggedIn && (
        <a className={'myRewards__textLink'} href="#receipt_uploader">
          upload a receipt
        </a>
      )}
      <RedeemProductList products={datax} />

      <div className="yotpo-widget-instance" data-yotpo-instance-id="295798" />

      <h1>your points</h1>
      <div className={'faq__divider'} />

      <div className="yotpo-widget-instance" data-yotpo-instance-id="295796" />

      <p className={'receipt__message'}>
        <h3>upload a receipt</h3>
        Shopping in person? Don’t forget to submit your receipt and earn points
        for your purchase!
      </p>
      <div className={'faq__divider'} style={{marginTop: 48}} />

      <Slider />
      <div className={'faq__divider'} style={{marginBottom: 58}} />

      <div id="receipt_uploader" />

      <div
        className="yotpo-widget-instance"
        data-yotpo-instance-id={'264193'}
        logged-out-store-login-url="/account/login"
        logged-out-store-sign-up-url="/account/register"
      />

      <RewardsFAQSection yotpoFAQ={yotpoFAQ} />
    </div>
  );
};

export const RedeemProductList = (props) => {
  useEffect(() => {
    if (document) {
      const elements = document.getElementsByClassName(
        'yotpo-redemption-option-cost',
      );
      for (const element of elements) {
        element.style.display = 'none';
      }
    }
  });

  return (
    <div className={'redeemSectionContainer'}>
      <h1>your available rewards</h1>
      <div className={'faq__divider'} />
      <h3>redeem for full-size products</h3>
      <p>
        Add your product to cart then click “redeem” to receive your code to use
        at checkout.
        <br />
        <span>Must be redeemed with purchase.</span>
      </p>
      <div className="container__redeem-products-tab">
        <RedeemProductsSection products={props?.products} />
      </div>
    </div>
  );
};

const AccordionItem = ({showDescription, ariaExpanded, item, onClick}) => {
  const cx = classNames.bind(styles);

  return (
    <div key={item.questions}>
      <dt>
        <button
          aria-expanded={ariaExpanded}
          className={'faq__questionButton'}
          onClick={onClick}
        >
          <span>{item?.questions}</span>
          <span
            className={cx(
              'faq__questionCloseButton',
              showDescription && 'faq__questionCloseButtonRotate',
            )}
          >
            +
          </span>
        </button>
      </dt>
      <dd>
        <div
          className={cx(
            'faq__answer',
            showDescription && 'faq_showDescription',
          )}
        >
          <div className={'faq__divider'} />
          <p dangerouslySetInnerHTML={{__html: item?.answers}} />
        </div>
      </dd>
    </div>
  );
};

export const RewardsFAQSection = ({yotpoFAQ}) => {
  const [activeIndex, setActiveIndex] = useState();

  function handleToggleAccordion(index) {
    const tab = index !== activeIndex ? index : null;
    setActiveIndex(tab);
  }

  const RenderedQuestionsAnswers = () =>
    yotpoFAQ?.map((item, index) => {
      const showDescription = index === activeIndex ? true : false;
      const ariaExpanded = index === activeIndex ? true : false;

      return (
        <>
          <AccordionItem
            showDescription={showDescription}
            ariaExpanded={ariaExpanded}
            item={item}
            index={index}
            onClick={() => handleToggleAccordion(index)}
          />
          <div className={'faq__divider'} />
        </>
      );
    });

  return (
    <div className={'faq__container'}>
      <h1 className={'faq__title'}>rewards FAQ</h1>
      <div className={'faq__divider'} />

      <dl className="faq__list">
        {yotpoFAQ?.length > 0 && <RenderedQuestionsAnswers />}
      </dl>
    </div>
  );
};

export default LoyaltyRewardsTab;
