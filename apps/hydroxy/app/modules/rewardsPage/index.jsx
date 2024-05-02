import {useEffect, useState} from 'react';
import {useCollection} from '~/hooks/useCollection';
import {useCustomerState} from '~/hooks/useCostumer';

import RewardEarnPoints, {
  links as rewardEarnPointsStyles,
} from '../rewardsEarnPoints';
import RewardPerks, {links as rewardPerksStyles} from '../rewardPerks';
import RewardsFAQSection, {
  links as loyaltyRewardsTabStyles,
} from '../loyaltyRewardsTab';
import RewardsHowItWorks, {
  links as rewardsHowItWorksStyles,
} from '../rewardsHowItWorks';
import RewardsHowToRedeem, {
  links as rewardsHowToRedeemStyles,
} from '../rewardsHowToRedeem';
import RedeemProductsSection, {
  links as redeemProductsSectionStyles,
} from '../redeemProductsSection';
import RewardChooseYourRewards, {
  links as rewardChooseYourRewards,
} from '../rewardChooseYourRewards';

import {handleGetProductByID} from '~/utils/functions/eventFunctions';

import styles from './styles.css';

export const links = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
    ...rewardEarnPointsStyles(),
    ...rewardPerksStyles(),
    ...loyaltyRewardsTabStyles(),
    ...rewardsHowItWorksStyles(),
    ...rewardsHowToRedeemStyles(),
    ...redeemProductsSectionStyles(),
    ...rewardChooseYourRewards(),
  ];
};

const RewardsPage = ({yotpoFaq, yotpoRedeemProducts}) => {
  const {isLoggedIn} = useCustomerState();
  const {state, products} = useCollection('all');
  const [data, setData] = useState({});

  useEffect(() => {
    if (state === 'loaded') {
      const productData =
        yotpoRedeemProducts &&
        yotpoRedeemProducts[0]?.products?.map((yotpoProduct) => {
          const productWithDetails = handleGetProductByID(
            yotpoProduct?.products[0]?.productId,
            products,
          );

          return {
            ...yotpoProduct,
            product: productWithDetails,
          };
        });

      setData(productData.filter((data) => data.product));
    }
  }, [state]);

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
    <section
      id={'rewards'}
      className={'section__rewards'}
      data-isloggedin={isLoggedIn}
    >
      <script
        src="https://cdn-widgetsrepository.yotpo.com/v1/loader/qfEoWaPmtkBoUMwPAGu1ow"
        async
      ></script>
      {isLoggedIn ? (
        <LoadingSkeleton minHeight={200}>
          <div className={'section__hero'}>
            <img
              className={'image'}
              src={
                'https://cdn.shopify.com/s/files/1/1736/9637/files/Mobile_background.png'
              }
              alt={'Rewards Product'}
            />
            <div className={'content__image'}>
              <MobileRewardsContentSVG />
            </div>
          </div>
          <div
            className="yotpo-widget-instance"
            data-yotpo-instance-id="300578"
          ></div>
        </LoadingSkeleton>
      ) : (
        <LoadingSkeleton minHeight={300}>
          <div
            className={'yotpo-widget-instance bannerSection'}
            data-yotpo-instance-id="295794"
          ></div>
        </LoadingSkeleton>
      )}
      {isLoggedIn ? (
        <>
          <div>
            <RewardsHowToRedeem />
          </div>
          <div className={'wrapper__redeem-products'}>
            <div className={'container__redeem-products'}>
              <div className={'section__heading-container'}>
                <p className={'section__heading'}>
                  redeem for full-size products
                </p>
                <p className={'section__heading-body'}>
                  Add your product to cart then click “redeem” to receive your
                  code to use at checkout.
                </p>
                <small className={'section__heading-subtext'}>
                  Must be redeemed with purchase.
                </small>
              </div>
              {yotpoRedeemProducts && <RedeemProductsSection products={data} />}
            </div>
          </div>
          <div className={'content__container'}>
            <LoadingSkeleton minHeight={100}>
              <div
                className={'yotpo-widget-instance'}
                data-yotpo-instance-id="295798"
              ></div>
            </LoadingSkeleton>
          </div>
        </>
      ) : (
        <RewardsHowItWorks />
      )}

      <RewardEarnPoints />
      <LoadingSkeleton minHeight={300}>
        <div
          className={'yotpo-widget-instance '}
          data-yotpo-instance-id="295796"
        ></div>
      </LoadingSkeleton>
      {isLoggedIn ? (
        <div className={'wrapper_rewards_page'}>
          <div className={'container_rewards_page'}>
            <LoadingSkeleton minHeight={300}>
              <div
                className={'yotpo-widget-instance '}
                data-yotpo-instance-id="295799"
              ></div>
            </LoadingSkeleton>
          </div>
        </div>
      ) : (
        <>
          <RewardChooseYourRewards />
          <div className={'wrapper__redeem-products'}>
            <div className={'container__redeem-products'}>
              <div className={'section__heading-container'}>
                <p className={'section__heading'}>
                  redeem for full-size products
                </p>
                <p className={'section__heading-body body-2'}>
                  Redeem with your next purchase.
                </p>
              </div>
              {yotpoRedeemProducts && <RedeemProductsSection products={data} />}
            </div>
          </div>
          <div id={'redemption__wrapper'} className={'content__container'}>
            <LoadingSkeleton minHeight={100}>
              <div
                className={'yotpo-widget-instance '}
                data-yotpo-instance-id="295798"
              ></div>
            </LoadingSkeleton>
          </div>
        </>
      )}
      <RewardPerks />
      {yotpoFaq ? <RewardsFAQSection yotpoFAQ={yotpoFaq} /> : null}
    </section>
  );
};

const LoadingSkeleton = ({width, minHeight, style = {}, children}) => {
  return (
    <div className={'skeleton loading'} style={{...style, width, minHeight}}>
      <div className={'widget__container'}>{children}</div>
    </div>
  );
};

const MobileRewardsContentSVG = () => (
  <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 84.67">
    <defs></defs>
    <g id="Graphics">
      <g>
        <path fill="#fff" d="m24.97,72.22h1.12v9.45h-1.12v-9.45Z" />
        <path
          fill="#fff"
          d="m27.72,78.71c0-.43.08-.84.24-1.21.16-.38.39-.7.67-.99s.62-.51,1-.67c.38-.16.8-.24,1.24-.24s.85.08,1.24.24c.38.16.72.39,1,.67.28.28.51.61.67.99.16.38.24.78.24,1.21s-.08.84-.24,1.22c-.16.38-.38.71-.67.99-.28.28-.62.5-1,.66-.38.16-.8.24-1.24.24s-.85-.08-1.24-.24c-.38-.16-.72-.38-1-.66s-.51-.61-.67-.99c-.16-.38-.24-.79-.24-1.22Zm1.2,0c0,.3.04.58.14.83.09.25.22.47.39.65.17.18.37.32.61.42.24.1.51.16.81.16s.57-.05.81-.16c.24-.1.45-.25.61-.42.17-.18.29-.4.39-.65.09-.25.14-.53.14-.83s-.05-.58-.14-.83c-.09-.25-.22-.47-.39-.65-.17-.18-.37-.32-.61-.43-.24-.1-.51-.16-.81-.16s-.57.05-.81.16c-.24.1-.45.25-.61.43-.17.18-.3.4-.39.65-.09.25-.14.53-.14.83Z"
        />
        <path
          fill="#fff"
          d="m34.85,75.75h1.3l1.75,4.62h.03l1.68-4.62h1.2l-2.81,7.2c-.1.26-.2.49-.31.71-.11.21-.24.39-.39.54-.15.15-.33.27-.54.35-.21.08-.47.12-.78.12-.17,0-.33-.01-.5-.03-.17-.02-.33-.06-.49-.13l.14-1.03c.22.09.45.14.67.14.17,0,.32-.02.44-.07s.22-.11.31-.2c.09-.09.16-.19.22-.31.06-.12.12-.25.17-.4l.36-.94-2.45-5.96Z"
        />
        <path
          fill="#fff"
          d="m41.95,76.47c.32-.29.68-.51,1.1-.66.42-.15.83-.22,1.25-.22s.81.05,1.12.16.57.25.77.44c.2.18.35.39.44.63s.14.49.14.74v3.02c0,.21,0,.4.01.58,0,.17.02.34.04.5h-1c-.03-.3-.04-.6-.04-.9h-.02c-.25.38-.55.65-.89.81s-.74.24-1.19.24c-.28,0-.54-.04-.79-.11-.25-.07-.47-.19-.66-.34-.19-.15-.34-.34-.44-.56s-.16-.48-.16-.77c0-.38.08-.7.26-.96.17-.26.4-.47.7-.63s.64-.28,1.04-.35c.4-.07.82-.11,1.27-.11h.82v-.25c0-.15-.03-.3-.09-.45-.06-.15-.15-.29-.26-.41-.12-.12-.26-.22-.44-.29-.17-.07-.38-.11-.62-.11-.22,0-.41.02-.57.06-.16.04-.31.09-.44.16-.13.06-.25.14-.36.22s-.21.16-.31.24l-.67-.7Zm3.17,2.35c-.27,0-.54.01-.82.04-.28.03-.53.09-.76.17-.23.08-.42.2-.56.35-.15.15-.22.34-.22.57,0,.34.11.59.34.74.23.15.54.22.93.22.31,0,.57-.05.79-.16s.39-.24.52-.41c.13-.17.23-.35.29-.56.06-.2.09-.41.09-.61v-.38h-.6Z"
        />
        <path fill="#fff" d="m48.63,72.22h1.12v9.45h-1.12v-9.45Z" />
        <path
          fill="#fff"
          d="m54.84,76.72h-1.61v2.69c0,.17,0,.33.01.49,0,.16.04.31.09.44.05.13.14.23.25.31s.28.12.49.12c.13,0,.27-.01.41-.04.14-.03.27-.07.39-.14v1.03c-.13.08-.31.13-.52.16-.21.03-.38.04-.49.04-.43,0-.77-.06-1.01-.18-.24-.12-.41-.28-.53-.47s-.18-.41-.2-.64-.03-.48-.03-.72v-3.09h-1.3v-.97h1.3v-1.66h1.12v1.66h1.61v.97Z"
        />
        <path
          fill="#fff"
          d="m55.71,75.75h1.3l1.75,4.62h.03l1.68-4.62h1.2l-2.81,7.2c-.1.26-.2.49-.31.71-.11.21-.24.39-.39.54-.15.15-.33.27-.54.35-.21.08-.47.12-.78.12-.17,0-.33-.01-.5-.03-.17-.02-.33-.06-.49-.13l.14-1.03c.22.09.45.14.67.14.17,0,.32-.02.44-.07s.22-.11.31-.2c.09-.09.16-.19.22-.31.06-.12.12-.25.17-.4l.36-.94-2.45-5.96Z"
        />
        <path
          fill="#fff"
          d="m69.57,76.72h-1.61v2.69c0,.17,0,.33.01.49,0,.16.04.31.09.44.05.13.14.23.25.31.11.08.28.12.49.12.13,0,.27-.01.41-.04s.27-.07.39-.14v1.03c-.13.08-.31.13-.52.16s-.38.04-.49.04c-.43,0-.77-.06-1.01-.18s-.41-.28-.53-.47c-.11-.19-.18-.41-.2-.64-.02-.24-.03-.48-.03-.72v-3.09h-1.3v-.97h1.3v-1.66h1.12v1.66h1.61v.97Z"
        />
        <path
          fill="#fff"
          d="m71.14,72.22h1.12v4.44h.02c.14-.32.39-.57.74-.77.35-.2.75-.29,1.21-.29.28,0,.56.04.82.13.26.09.49.22.69.41.2.18.35.42.47.71.12.29.18.63.18,1.02v3.81h-1.12v-3.5c0-.28-.04-.51-.11-.71-.07-.2-.17-.35-.3-.48-.12-.12-.27-.21-.43-.26-.16-.05-.33-.08-.51-.08-.23,0-.45.04-.65.11-.2.07-.38.19-.53.36-.15.16-.27.37-.35.62-.08.25-.12.55-.12.89v3.05h-1.12v-9.45Z"
        />
        <path
          fill="#fff"
          d="m78.24,76.47c.32-.29.68-.51,1.1-.66.42-.15.83-.22,1.25-.22s.81.05,1.12.16.57.25.77.44c.2.18.35.39.44.63s.14.49.14.74v3.02c0,.21,0,.4.01.58,0,.17.02.34.04.5h-1c-.02-.3-.04-.6-.04-.9h-.03c-.25.38-.55.65-.89.81s-.74.24-1.19.24c-.27,0-.54-.04-.79-.11-.25-.07-.47-.19-.66-.34-.19-.15-.34-.34-.44-.56-.11-.22-.16-.48-.16-.77,0-.38.09-.7.26-.96.17-.26.4-.47.7-.63s.64-.28,1.04-.35c.4-.07.82-.11,1.27-.11h.83v-.25c0-.15-.03-.3-.09-.45s-.15-.29-.26-.41c-.12-.12-.26-.22-.44-.29-.17-.07-.38-.11-.62-.11-.22,0-.41.02-.57.06s-.31.09-.44.16c-.13.06-.25.14-.36.22s-.21.16-.31.24l-.67-.7Zm3.17,2.35c-.27,0-.54.01-.82.04-.28.03-.53.09-.76.17-.23.08-.42.2-.56.35-.15.15-.22.34-.22.57,0,.34.11.59.34.74.23.15.54.22.93.22.31,0,.57-.05.79-.16.22-.1.39-.24.53-.41.13-.17.23-.35.29-.56.06-.2.09-.41.09-.61v-.38h-.6Z"
        />
        <path
          fill="#fff"
          d="m88,76.72h-1.61v2.69c0,.17,0,.33.01.49,0,.16.04.31.09.44.05.13.14.23.25.31.11.08.28.12.49.12.13,0,.27-.01.41-.04s.27-.07.39-.14v1.03c-.13.08-.31.13-.52.16s-.38.04-.49.04c-.43,0-.77-.06-1.01-.18s-.41-.28-.53-.47c-.11-.19-.18-.41-.2-.64-.02-.24-.03-.48-.03-.72v-3.09h-1.3v-.97h1.3v-1.66h1.12v1.66h1.61v.97Z"
        />
        <path
          fill="#fff"
          d="m99.12,81.62c0,.45-.08.86-.23,1.23-.15.37-.37.69-.66.96s-.62.48-1.02.63c-.4.15-.84.22-1.33.22-.57,0-1.09-.08-1.56-.24s-.92-.43-1.34-.83l.76-.95c.29.32.61.56.95.72.34.16.73.24,1.16.24s.76-.06,1.04-.18c.27-.12.49-.28.66-.47.16-.19.28-.41.34-.66.07-.25.1-.49.1-.74v-.88h-.04c-.22.36-.51.62-.88.79-.37.17-.76.26-1.17.26-.43,0-.84-.08-1.21-.23-.37-.15-.69-.37-.96-.64-.27-.27-.47-.59-.62-.96-.15-.37-.22-.77-.22-1.21s.07-.84.21-1.22c.14-.38.34-.71.61-.99s.58-.5.95-.66c.37-.16.79-.24,1.24-.24.4,0,.79.09,1.17.26.38.17.68.42.89.74h.02v-.85h1.12v5.88Zm-3.08-4.98c-.3,0-.57.05-.81.16-.24.1-.45.25-.61.43-.17.18-.3.4-.39.65-.09.25-.14.53-.14.83,0,.6.17,1.08.52,1.44.35.36.83.54,1.42.54s1.08-.18,1.43-.54c.35-.36.52-.84.52-1.44,0-.3-.05-.58-.14-.83-.09-.25-.22-.47-.39-.65-.17-.18-.37-.32-.61-.43-.24-.1-.51-.16-.81-.16Z"
        />
        <path fill="#fff" d="m101.03,72.22h1.12v9.45h-1.12v-9.45Z" />
        <path
          fill="#fff"
          d="m103.78,78.71c0-.43.08-.84.24-1.21.16-.38.38-.7.67-.99.28-.28.62-.51,1-.67.38-.16.8-.24,1.24-.24s.85.08,1.24.24c.38.16.72.39,1,.67s.51.61.67.99.24.78.24,1.21-.08.84-.24,1.22c-.16.38-.38.71-.67.99s-.62.5-1,.66c-.38.16-.8.24-1.24.24s-.85-.08-1.24-.24-.72-.38-1-.66c-.28-.28-.51-.61-.67-.99-.16-.38-.24-.79-.24-1.22Zm1.2,0c0,.3.05.58.14.83.09.25.22.47.39.65.17.18.37.32.61.42.24.1.51.16.81.16s.57-.05.81-.16c.24-.1.45-.25.61-.42.17-.18.29-.4.39-.65.09-.25.14-.53.14-.83s-.04-.58-.14-.83c-.09-.25-.22-.47-.39-.65-.17-.18-.37-.32-.61-.43-.24-.1-.51-.16-.81-.16s-.57.05-.81.16c-.24.1-.45.25-.61.43-.17.18-.3.4-.39.65-.09.25-.14.53-.14.83Z"
        />
        <path
          fill="#fff"
          d="m110.9,75.75h1.26l1.33,4.42h.03l1.42-4.42h1.2l1.5,4.42h.03l1.26-4.42h1.2l-1.91,5.92h-1.14l-1.57-4.42h-.03l-1.43,4.42h-1.2l-1.95-5.92Z"
        />
        <path
          fill="#fff"
          d="m124.38,77.23c-.13-.17-.3-.31-.49-.42-.2-.11-.44-.17-.72-.17-.27,0-.5.06-.69.17-.2.11-.29.28-.29.49,0,.17.06.32.17.42s.25.2.4.26c.15.07.32.12.49.15.17.03.33.06.45.09.24.06.47.13.68.21.21.08.4.19.55.32.15.13.27.3.36.49.09.19.13.42.13.7,0,.33-.07.62-.21.86s-.33.43-.55.58c-.23.15-.48.26-.77.33-.29.07-.58.1-.87.1-.49,0-.92-.08-1.29-.23-.37-.15-.7-.42-.99-.83l.85-.7c.18.18.39.35.61.49s.5.21.83.21c.14,0,.29-.01.43-.04.15-.03.28-.08.39-.14s.2-.14.28-.24c.07-.1.11-.21.11-.33,0-.17-.05-.3-.16-.41-.1-.11-.23-.19-.38-.26-.15-.06-.3-.11-.46-.15s-.31-.07-.43-.09c-.24-.06-.47-.12-.69-.2s-.41-.17-.57-.3c-.17-.12-.3-.28-.4-.47-.1-.19-.15-.43-.15-.71,0-.31.06-.58.19-.81.13-.23.3-.42.51-.57.21-.15.45-.26.72-.34.27-.07.54-.11.82-.11.4,0,.78.08,1.15.23.37.15.66.4.88.75l-.88.66Z"
        />
      </g>
      <g>
        <path
          fill="#fff"
          d="m0,49.96l4.12-3.71c.21-.19.42-.41.63-.65.21-.24.31-.52.31-.84,0-.36-.13-.64-.39-.85-.26-.2-.57-.31-.92-.31-.42,0-.75.13-.98.39-.24.26-.37.58-.4.96l-2.25-.17c.03-.55.14-1.03.34-1.43s.46-.74.79-1.01c.33-.27.72-.47,1.16-.61.45-.13.93-.2,1.45-.2.48,0,.93.07,1.35.2s.79.33,1.09.6c.31.26.55.6.73,1,.17.4.26.87.26,1.39,0,.34-.04.65-.1.92-.07.28-.17.53-.29.75-.12.23-.27.43-.44.62-.17.19-.36.38-.55.55l-3.23,2.77h4.71v1.98H0v-2.38Z"
        />
        <path
          fill="#fff"
          d="m16.89,50.22h-4.64v-1.89l4.33-6.6h2.46v6.6h1.37v1.89h-1.37v2.13h-2.16v-2.13Zm0-5.55h-.03l-2.36,3.66h2.39v-3.66Z"
        />
        <path fill="#fff" d="m28.59,49.51h-3.69v-1.8h3.69v1.8Z" />
        <path
          fill="#fff"
          d="m38.52,43.8h-5.25v-2.07h7.77v1.98l-4.25,8.64h-2.62l4.35-8.55Z"
        />
        <path
          fill="#fff"
          d="m54.62,41.73h4.11c.54,0,1.05.05,1.54.16.48.11.91.28,1.27.53s.66.58.87.99.32.93.32,1.55c0,.75-.19,1.39-.58,1.91-.39.53-.96.86-1.71,1l2.7,4.49h-2.8l-2.22-4.25h-1.16v4.25h-2.34v-10.62Zm2.34,4.4h1.38c.21,0,.43,0,.67-.02.24-.02.45-.06.64-.14.19-.07.35-.19.47-.35.12-.16.19-.38.19-.67,0-.27-.05-.48-.17-.64s-.25-.28-.42-.37-.37-.14-.58-.17c-.22-.03-.43-.04-.64-.04h-1.53v2.42Z"
        />
        <path
          fill="#fff"
          d="m68.17,41.73h7.21v2.16h-4.88v1.98h4.61v2.16h-4.61v2.16h5.14v2.16h-7.48v-10.62Z"
        />
        <path
          fill="#fff"
          d="m80.17,41.73h2.55l1.69,6.81h.03l2.22-6.81h2.18l2.21,6.99h.03l1.79-6.99h2.37l-3.11,10.62h-2.08l-2.34-7.35h-.03l-2.34,7.35h-2.01l-3.15-10.62Z"
        />
        <path
          fill="#fff"
          d="m103.15,41.73h1.93l4.62,10.62h-2.64l-.92-2.25h-4.12l-.88,2.25h-2.58l4.59-10.62Zm.9,3.09l-1.29,3.3h2.59l-1.3-3.3Z"
        />
        <path
          fill="#fff"
          d="m114.52,41.73h4.11c.54,0,1.05.05,1.54.16.49.11.91.28,1.28.53.36.25.65.58.87.99.22.42.32.93.32,1.55,0,.75-.2,1.39-.58,1.91-.39.53-.96.86-1.71,1l2.7,4.49h-2.8l-2.22-4.25h-1.16v4.25h-2.34v-10.62Zm2.34,4.4h1.38c.21,0,.43,0,.67-.02.23-.02.45-.06.64-.14.19-.07.35-.19.47-.35.12-.16.19-.38.19-.67,0-.27-.05-.48-.17-.64-.11-.16-.25-.28-.42-.37s-.37-.14-.58-.17c-.22-.03-.43-.04-.64-.04h-1.53v2.42Z"
        />
        <path
          fill="#fff"
          d="m127.99,41.73h3.51c.85,0,1.66.1,2.42.29.76.19,1.43.5,2,.92.57.42,1.02.98,1.36,1.66s.5,1.5.5,2.47c0,.86-.16,1.62-.49,2.27-.33.66-.76,1.21-1.31,1.65s-1.19.78-1.91,1.01c-.72.23-1.47.34-2.26.34h-3.83v-10.62Zm2.34,8.46h1.21c.54,0,1.04-.05,1.51-.17.46-.11.87-.29,1.21-.55.34-.26.61-.59.8-1.01.2-.41.29-.92.29-1.52,0-.52-.1-.97-.29-1.36-.2-.38-.46-.7-.79-.95s-.72-.44-1.16-.56c-.44-.12-.91-.19-1.4-.19h-1.38v6.3Z"
        />
        <path
          fill="#fff"
          d="m148.38,44.32c-.19-.24-.45-.42-.77-.53-.33-.11-.63-.17-.92-.17-.17,0-.34.02-.52.06-.18.04-.35.1-.51.19s-.29.2-.39.34c-.1.14-.15.31-.15.51,0,.32.12.56.36.73.24.17.54.32.91.44s.76.24,1.18.36c.42.12.81.29,1.18.51s.67.51.91.88.36.87.36,1.49-.11,1.1-.33,1.54c-.22.44-.52.8-.89,1.09s-.81.5-1.3.64c-.5.14-1.02.21-1.57.21-.69,0-1.33-.1-1.92-.31-.59-.21-1.14-.55-1.65-1.02l1.67-1.83c.24.32.54.57.91.74s.74.26,1.13.26c.19,0,.38-.02.58-.07.2-.05.37-.11.53-.2.15-.09.28-.21.38-.34.09-.14.14-.3.14-.5,0-.32-.12-.57-.37-.76-.25-.18-.55-.34-.92-.47-.37-.13-.77-.26-1.2-.39-.43-.13-.83-.3-1.2-.52-.37-.22-.68-.51-.92-.87-.25-.36-.37-.83-.37-1.43s.11-1.07.34-1.5c.22-.43.52-.79.9-1.08s.81-.51,1.3-.65c.49-.14,1-.22,1.51-.22.6,0,1.18.08,1.74.25.56.17,1.07.46,1.51.85l-1.6,1.75Z"
        />
      </g>
      <g>
        <g>
          <polygon
            fill="#fff"
            points="37.64 0 54.51 0 54.51 2.29 47.3 2.29 47.3 19.68 44.87 19.68 44.87 2.29 37.64 2.29 37.64 0"
          />
          <polygon
            fill="#fff"
            points="90.94 17.35 90.94 19.68 77.98 19.68 77.98 0 80.42 0 80.42 17.35 90.94 17.35"
          />
          <path
            fill="#fff"
            d="m70.82,0h2.42v11.73c0,1.13-.13,2.21-.36,3.21-.25,1.03-.68,1.93-1.28,2.7-.6.77-1.41,1.39-2.4,1.83-.97.45-2.19.67-3.61.67s-2.66-.22-3.63-.67c-.99-.44-1.8-1.06-2.4-1.83-.6-.77-1.02-1.67-1.26-2.7-.25-.99-.36-2.08-.36-3.21V0h2.42v11.03c0,1.02.07,1.98.24,2.83.16.81.43,1.53.83,2.11.38.58.9,1.02,1.55,1.33.67.32,1.54.48,2.61.48s1.93-.16,2.6-.48c.67-.32,1.18-.75,1.55-1.33.39-.58.68-1.29.83-2.11.16-.86.25-1.81.25-2.83V0Z"
          />
        </g>
        <path
          fill="#fff"
          d="m104.23,0h-2.07l-8.04,19.68h2.63l2.39-6h8.01l2.42,6h2.72L104.23,0Zm-4.17,11.35l3.08-7.63,3.06,7.63h-6.14Z"
        />
      </g>
      <line
        fill="none"
        stroke="#fff"
        strokeMiterlimit={10}
        strokeWidth={'1.25px'}
        x1="0"
        y1="32.72"
        x2="150"
        y2="32.72"
      />
      <line
        fill="none"
        stroke="#fff"
        strokeMiterlimit={10}
        strokeWidth={'1.25px'}
        x1="0"
        y1="61.28"
        x2="150"
        y2="61.28"
      />
    </g>
  </svg>
);

export default RewardsPage;
