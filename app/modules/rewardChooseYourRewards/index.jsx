import styles from './styles.css';

export const links = () => {
  return [
    {
      rel: 'stylesheet', href: styles
    },
  ];
}; 

export default function RewardChooseYourRewards() {
  return (
    <div className={'rewardChooseYourRewards_section'}>
      <div className={'rewardChooseYourRewards_container'}>
        <div className={'rewardChooseYourRewards_header'}>
          <p className={'rewardChooseYourRewards_section__subheading'}>HOW TO REDEEM</p>
          <h2 className={'rewardChooseYourRewards_section__heading'}>choose your rewards</h2>
        </div>
      </div>
      <div className={'rewardChooseYourRewards_container'}>
        <div className={'rewardChooseYourRewards_animation'}>
          <div className={'rewardChooseYourRewards_progress__bar'}>
            <div className={'rewardChooseYourRewards_progress__bar--animate'}></div>
          </div>
          <div className={'rewardChooseYourRewards_row'}>
            <div className={'rewardChooseYourRewards_col'}>
              <div className={'rewardChooseYourRewards_checkmark'}>
                <Checkmark />
              </div>
              <div className={'rewardChooseYourRewards_points'}>
                <IconLoyaltyStar />
                <p>1250 pts</p>
              </div>
              <div className={'rewardChooseYourRewards_reward'}>
                <p>$5 reward</p>
              </div>
            </div>
            <div className={'rewardChooseYourRewards_col'}>
              <div className={'rewardChooseYourRewards_checkmark'}>
                <Checkmark />
              </div>
              <div className={'rewardChooseYourRewards_points'}>
                <IconLoyaltyStar />
                <p>2000 pts</p>
              </div>
              <div className={'rewardChooseYourRewards_reward'}>
                <p>free full-size product</p>
              </div>
            </div>
            <div className={'rewardChooseYourRewards_col'}>
              <div className={'rewardChooseYourRewards_checkmark'}>
                <Checkmark />
              </div>
              <div className={'rewardChooseYourRewards_points'}>
                <IconLoyaltyStar />
                <p>5000 pts</p>
              </div>
              <div className={'rewardChooseYourRewards_reward'}>
                <p>free full-size deluxe product</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Checkmark = () => (
  <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.16699 6.5L5.91699 11.25L13.8337 1.75"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconLoyaltyStar = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z"
      fill="#47C6D9"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 18.5C14.6944 18.5 18.5 14.6944 18.5 10C18.5 5.30558 14.6944 1.5 10 1.5C5.30558 1.5 1.5 5.30558 1.5 10C1.5 14.6944 5.30558 18.5 10 18.5ZM10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
      fill="#B3E5ED"
    />
    <path
      d="M9.99989 4.44434L11.3114 8.6884H15.5554L12.1219 11.3114L13.4334 15.5554L9.99989 12.9325L6.56637 15.5554L7.87786 11.3114L4.44434 8.6884H8.6884L9.99989 4.44434Z"
      fill="white"
    />
  </svg>
);
