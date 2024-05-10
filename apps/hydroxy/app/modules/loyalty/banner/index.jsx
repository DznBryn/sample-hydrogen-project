import React from 'react';
import {switchSliderPanelVisibility} from '~/modules/sliderPanel';
import styles from './styles.css';
import {triggerAnalyticsLoyaltyEvents} from '~/utils/functions/eventFunctions';
import {useStore} from '~/hooks/useStore';
import {useCustomer} from '~/hooks/useCustomer';

export function links() {
  return [{rel: 'stylesheet', href: styles}];
}

export default function Banner({
  points = 200,
  isEmpty = false,
  isAbleToRedeem = true,
  userName = 'Jane',
  onClick = () => {},
}) {
  const {id: customerId = ''} = useCustomer();
  return isEmpty
    ? EmptyCart()
    : isAbleToRedeem
    ? AbleToRedeem({userName, onClick})
    : FullCart({loggedIn: customerId !== '', points, onClick});
}

export const SkinQuizCartBanner = () => (
  <a href={'/pages/skincare-finder'} className={'skinQuizBannerContainer'}>
    <h2>Take our free Skin Quiz</h2>
    <p>Get a personalized skincare routine</p>
  </a>
);

const EmptyCart = () => (
  <a
    href={'/rewards'}
    className={'emptyCartBannerContainer'}
    onClick={() =>
      triggerAnalyticsLoyaltyEvents('LearnMoreBtnClick', {
        source: 'emptySliderCart',
      })
    }
  >
    <span className={'emptyCartBadge'}>INTRODUCING</span>
    <h2>TULA 24-7 Rewards</h2>
    <p>Sign up and earn points, rewards & exclusive access</p>
  </a>
);

const FullCart = ({points = 200, loggedIn = false, onClick = () => {}}) => {
  const toggleCart = useStore((store) => store?.cart?.toggleCart ?? (() => {}));
  return loggedIn ? (
    <div className={'loyaltyBannerContainer loggedinContainer'}>
      <p>
        Awesome! You’re earning{' '}
        <span className={'pointSentence'}>{points} points</span> on this
        purchase with TULA 24-7 Rewards!
      </p>
      <ExclamationIcon onClick={onClick} />
    </div>
  ) : (
    <div className={'loyaltyBannerContainer'}>
      <p>Earn points, rewards, and exclusive access with TULA 24-7 Rewards </p>
      <div
        className={'bannerButton'}
        onClick={() => {
          toggleCart();
          switchSliderPanelVisibility('SliderAccount');
          triggerAnalyticsLoyaltyEvents('SignupBtnClick', {
            source: 'sliderCart',
          });
        }}
      >
        <span>Join now</span>
        <LeftArrow />
      </div>
    </div>
  );
};

const AbleToRedeem = ({userName = 'Jane', onClick = () => {}}) => (
  <div className={'loyaltyBannerContainer ableToRedeemContainer'}>
    <div>
      <h3>{userName}, ready to redeem your free rewards product?</h3>
      <p>
        make sure to copy the code from your account & paste at checkout to
        redeem!
      </p>
    </div>
    <QuestionMarkIcon onClick={onClick} />
  </div>
);

const LeftArrow = () => (
  <svg
    width={9}
    height={9}
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.5 4.5H7.5M4.875 1.875L7.5 4.5L4.875 7.125"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ExclamationIcon = ({
  color = 'white',
  onClick,
  size = 15,
  ...rest
}) => (
  <svg
    style={{cursor: 'pointer'}}
    onClick={onClick}
    width={size}
    height={size}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <g clipPath="url(#clip0_923_8215)">
      <path
        d="M7.5 0.9375C3.87598 0.9375 0.9375 3.87598 0.9375 7.5C0.9375 11.124 3.87598 14.0625 7.5 14.0625C11.124 14.0625 14.0625 11.124 14.0625 7.5C14.0625 3.87598 11.124 0.9375 7.5 0.9375ZM7.5 12.9492C4.49121 12.9492 2.05078 10.5088 2.05078 7.5C2.05078 4.49121 4.49121 2.05078 7.5 2.05078C10.5088 2.05078 12.9492 4.49121 12.9492 7.5C12.9492 10.5088 10.5088 12.9492 7.5 12.9492Z"
        fill={color}
      />
      <path
        d="M6.79688 4.92188C6.79688 5.10836 6.87095 5.2872 7.00282 5.41906C7.13468 5.55092 7.31352 5.625 7.5 5.625C7.68648 5.625 7.86532 5.55092 7.99718 5.41906C8.12905 5.2872 8.20312 5.10836 8.20312 4.92188C8.20312 4.73539 8.12905 4.55655 7.99718 4.42469C7.86532 4.29283 7.68648 4.21875 7.5 4.21875C7.31352 4.21875 7.13468 4.29283 7.00282 4.42469C6.87095 4.55655 6.79688 4.73539 6.79688 4.92188ZM7.85156 6.5625H7.14844C7.08398 6.5625 7.03125 6.61523 7.03125 6.67969V10.6641C7.03125 10.7285 7.08398 10.7812 7.14844 10.7812H7.85156C7.91602 10.7812 7.96875 10.7285 7.96875 10.6641V6.67969C7.96875 6.61523 7.91602 6.5625 7.85156 6.5625Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0_923_8215">
        <rect width={size} height={size} fill={color} />
      </clipPath>
    </defs>
  </svg>
);

const QuestionMarkIcon = ({onClick, ...rest}) => (
  <svg
    style={{cursor: 'pointer'}}
    onClick={onClick}
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M8 15C6.14348 15 4.36301 14.2625 3.05025 12.9497C1.7375 11.637 1 9.85652 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8C15 9.85652 14.2625 11.637 12.9497 12.9497C11.637 14.2625 9.85652 15 8 15ZM8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16Z"
      fill="white"
    />
    <path
      d="M5.25412 5.786C5.25275 5.81829 5.258 5.85053 5.26955 5.88072C5.2811 5.91091 5.2987 5.93841 5.32127 5.96155C5.34385 5.98468 5.37091 6.00296 5.40081 6.01524C5.43071 6.02753 5.4628 6.03357 5.49512 6.033H6.32012C6.45812 6.033 6.56812 5.92 6.58612 5.783C6.67612 5.127 7.12612 4.649 7.92812 4.649C8.61412 4.649 9.24212 4.992 9.24212 5.817C9.24212 6.452 8.86812 6.744 8.27712 7.188C7.60412 7.677 7.07112 8.248 7.10912 9.175L7.11212 9.392C7.11317 9.45761 7.13997 9.52017 7.18674 9.5662C7.23351 9.61222 7.2965 9.63801 7.36212 9.638H8.17312C8.23942 9.638 8.30301 9.61166 8.3499 9.56478C8.39678 9.51789 8.42312 9.4543 8.42312 9.388V9.283C8.42312 8.565 8.69612 8.356 9.43312 7.797C10.0421 7.334 10.6771 6.82 10.6771 5.741C10.6771 4.23 9.40112 3.5 8.00412 3.5C6.73712 3.5 5.34912 4.09 5.25412 5.786ZM6.81112 11.549C6.81112 12.082 7.23612 12.476 7.82112 12.476C8.43012 12.476 8.84912 12.082 8.84912 11.549C8.84912 10.997 8.42912 10.609 7.82012 10.609C7.23612 10.609 6.81112 10.997 6.81112 11.549Z"
      fill="white"
    />
  </svg>
);
