/* eslint-disable react/no-unknown-property */
import React, {useState, useEffect} from 'react';
import {useYotpo} from '~/hooks/useYotpo';
import classNames from 'classnames/bind';
import styles from './styles.css';
import {useStore} from '~/hooks/useStore';
import RedeemProductsSection, {
  links as redeemProductsSectionStyles,
} from '~/modules/redeemProductsSection';
import {mock} from '~/modules/redeemProductsSection/mock';
import {brandLogos} from '~/modules/rewardsEarnPoints';

const MOCK_QUESTION_LIST = [
  {question: 'Question #1', answer: 'Answer #1 '},
  {question: 'Question #2', answer: 'Answer #2'},
  {question: 'Question #3', answer: 'Answer #3'},
  {question: 'Question #4', answer: 'Answer #4'},
];

export function links() {
  return [{rel: 'stylesheet', href: styles}, ...redeemProductsSectionStyles()];
}

const Slider = () => (
  <div className="carousel-container">
    <div className="carousel-track">
      {Object.values(brandLogos).map((svg, index) => (
        <div key={index} className={'earn_points_svg'}>
          {svg}
        </div>
      ))}
      {Object.values(brandLogos).map((svg, index) => (
        <div key={index} className={'earn_points_svg'}>
          {svg}
        </div>
      ))}
    </div>
  </div>
);

const LoyaltyRewardsTab = ({
  products = mock,
  yotpoFAQ = MOCK_QUESTION_LIST,
}) => {
  const data = useStore((store) => store?.account?.data ?? null);
  const {refreshWidgets} = useYotpo();
  const isLoggedIn =
    data?.id !== '' || data?.id !== null || data?.id !== undefined;

  useEffect(() => {
    const slider = document.querySelectorAll('[id=\'slider-divider\']');
    for (const element of slider) {
      element.style.marginInline = 'auto';
    }

    refreshWidgets();
  }, []);

  return (
    <div className={'myRewards__container'}>
      <div className="yotpo-widget-instance" data-yotpo-instance-id="300765" />

      {isLoggedIn && (
        <a className={'myRewards__textLink'} href="#receipt_uploader">
          upload a receipt
        </a>
      )}
      <RedeemProductList products={products} />

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

export const RedeemProductList = ({products = null}) => (
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

    <RedeemProductsSection products={products} />
  </div>
);

const AccordionItem = ({showDescription, ariaExpanded, item, onClick}) => {
  const cx = classNames.bind(styles);

  return (
    <div key={item.question}>
      <dt>
        <button
          aria-expanded={ariaExpanded}
          className={'faq__questionButton'}
          onClick={onClick}
        >
          <span>{item.question}</span>
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
          <p dangerouslySetInnerHTML={{__html: item.answer}} />
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
    yotpoFAQ.map((item, index) => {
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
        <RenderedQuestionsAnswers />
      </dl>
    </div>
  );
};

export default LoyaltyRewardsTab;
