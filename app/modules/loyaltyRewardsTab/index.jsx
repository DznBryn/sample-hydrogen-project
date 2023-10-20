/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import { useCustomerState } from '~/hooks/useCostumer';

import RedeemProductsSection, { link as redeemProductsSectionStyles } from '~/modules/redeemProductsSection';
import { Slider, link as uploadReceiptStyles } from '~/modules/uploadReceipt';
import getApiKeys from '~/utils/functions/getApiKeys';
import { triggerAnalyticsLoyaltyEvents } from '~/utils/functions/eventFunctions';

import { MOCK_QUESTION_LIST, mock } from './mock';

import styles from './styles.css';

export const links = () => {
  return [
    {
      rel: 'stylesheet', href: styles
    },
    ...redeemProductsSectionStyles(),
    ...uploadReceiptStyles()
  ];
};

const LoyaltyRewardsTab = ({ content }) => {
  const { products = mock, yotpoFAQ = MOCK_QUESTION_LIST } = content; 
  const { isLoggedIn } = useCustomerState();

  useEffect(() => {
    const slider = document.querySelectorAll('[id=\'slider-divider\']');
    for (const element of slider) {
      element.style.marginInline = 'auto';
    }

    if (typeof window === 'object') {
      if (window.addClickEventOnWidgetElement) addGATriggersOnLoyaltyWidgets();
    }
  }, []);

  return (
    <div className={styles.myRewards__container}>
      <div className="yotpo-widget-instance" data-yotpo-instance-id="300765" />

      {isLoggedIn && (
        <a className={styles.myRewards__textLink} href="#receipt_uploader">
          upload a receipt
        </a>
      )}

      <RedeemProductList products={products} />

      <div className="yotpo-widget-instance" data-yotpo-instance-id="295798" />

      <h1>your points</h1>
      <div className={styles.faq__divider} />

      <div className="yotpo-widget-instance" data-yotpo-instance-id="295796" />

      <p className={styles.receipt__message}>
        <h3>upload a receipt</h3>
        Shopping in person? Don’t forget to submit your receipt and earn points
        for your purchase!
      </p>

      <Slider />

      <div id="receipt_uploader" />

      <div
        className="yotpo-widget-instance"
        data-yotpo-instance-id={
          getApiKeys().YOTPO_LOYALTY_WIDGETS.receipt_uploader
        }
        logged-out-store-login-url="/account/login"
        logged-out-store-sign-up-url="/account/register"
      />

      <RewardsFAQSection yotpoFAQ={yotpoFAQ} />
    </div>
  );
};

export default LoyaltyRewardsTab;

export const RedeemProductList = ({products = mock}) => (
  <div className={styles.redeemSectionContainer}>
    <h1>your available rewards</h1>
    <div className={styles.faq__divider} />
    <h3>redeem for full-size products</h3>
    <p>
      Add your product to cart then click “redeem” to receive your code to use
      at checkout.
      <br />
      <span>Must be redeemed with purchase.</span>
    </p>

    <RedeemProductsSection products={products} parentComp={'account'} />
  </div>
);

const AccordionItem = ({showDescription, ariaExpanded, item, onClick}) => {
  const cx = classNames.bind(styles);

  return (
    <div key={item.question}>
      <dt>
        <button
          aria-expanded={ariaExpanded}
          className={styles.faq__questionButton}
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
          <div className={styles.faq__divider} />
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
          <div className={styles.faq__divider} />
        </>
      );
    });

  return (
    <div className={styles.faq__container}>
      <h1 className={styles.faq__title}>rewards FAQ</h1>
      <div className={styles.faq__divider} />

      <dl className="faq__list">
        <RenderedQuestionsAnswers />
      </dl>
    </div>
  );
};

function addGATriggersOnLoyaltyWidgets() {
  window.addClickEventOnWidgetElement(
    '[aria-label=\'CreateAccountCampaign\']',
    () => {
      triggerAnalyticsLoyaltyEvents('EarnBtnClick', {
        source: 'account',
        type: 'account',
      });
    },
  );

  window.addClickEventOnWidgetElement('[aria-label=\'BirthdayCampaign\']', () => {
    triggerAnalyticsLoyaltyEvents('EarnBtnClick', {
      source: 'account',
      type: 'birthday',
    });
  });

  window.addClickEventOnWidgetElement(
    '[aria-label=\'YotpoReviewCampaign\']',
    () => {
      triggerAnalyticsLoyaltyEvents('EarnBtnClick', {
        source: 'account',
        type: 'review',
      });
    },
  );

  window.addClickEventOnWidgetElement(
    '[aria-label=\'PointsForPurchasesCampaign\']',
    () => {
      triggerAnalyticsLoyaltyEvents('EarnBtnClick', {
        source: 'account',
        type: 'spend',
      });
    },
  );

  window.addClickEventOnWidgetElement(
    '[aria-label=\'FacebookPageVisitCampaign\']',
    () => {
      triggerAnalyticsLoyaltyEvents('EarnBtnClick', {
        source: 'account',
        type: 'tiktok',
      });
    },
  );

  window.addClickEventOnWidgetElement(
    '[aria-label=\'InstagramFollowCampaign\']',
    () => {
      triggerAnalyticsLoyaltyEvents('EarnBtnClick', {
        source: 'account',
        type: 'instagram',
      });
    },
  );

  window.addClickEventOnWidgetElement(
    '.flexified-item-count-8 [aria-label=\'ReceiptUploadCampaign\']',
    () => {
      triggerAnalyticsLoyaltyEvents('EarnBtnClick', {
        source: 'account',
        type: 'receipt',
      });
    },
  );

  window.addClickEventOnWidgetElement('[aria-label=\'FreeTextCampaign\']', () => {
    triggerAnalyticsLoyaltyEvents('EarnBtnClick', {
      source: 'account',
      type: 'refer',
    });
  });

  window.addClickEventOnWidgetElement(
    '.flexified-item-count-1 [aria-label=\'ReceiptUploadCampaign\']',
    () => {
      triggerAnalyticsLoyaltyEvents('UploadReceiptModuleClick', {
        source: 'account',
      });
    },
  );

  window.addClickEventOnWidgetElement('[aria-label=\'Redeem Points\']', () => {
    triggerAnalyticsLoyaltyEvents('RedeemPointsBtnClick', {source: 'account'});
  });

  window.addClickEventOnWidgetElement(
    '[aria-label=\'View Rewards History\']',
    () => {
      triggerAnalyticsLoyaltyEvents('PointsHistoryBtnClick', {
        source: 'account',
      });
    },
  );

  window.addClickEventOnWidgetElement(
    '[aria-label=\'Redeem 1250 points for $5 Off\']',
    () => {
      triggerAnalyticsLoyaltyEvents('RedeemDiscount', {source: 'account'});
    },
  );
}
