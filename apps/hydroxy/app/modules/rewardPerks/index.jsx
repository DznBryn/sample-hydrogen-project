import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const RewardPerks = () => (
  <div className={'rewardPerks_section'}>
    <div className={'rewardPerks_container'}>
      <div className={'rewardPerks_header'}>
        <p className={'rewardPerks_section__subheading'}>PICK YOUR PERKS</p>
        <h2 className={'rewardPerks_section__heading'}>members-only benefits</h2>
        <p className={'rewardPerks_section__body'}>
          Choose your favorite perks from our exclusive members-only benefits.
        </p>
        <IconDownArrow />
      </div>
    </div>
    <div className={'rewardPerks_container'}>
      <ul className={'rewardPerks_list__container'}>
        {perks.map((perk, index) =>
          perk ? (
            <li key={index} className={'rewardPerks_list__item'}>
              {perk?.icon ? perk.icon : null}
              {perk?.header ? <p className={'rewardPerks_item__header'}>{perk.header}</p> : null}
              {perk?.content ? <p className={'rewardPerks_item__content'}>{perk.content}</p> : null}
            </li>
          ) : null,
        )}
      </ul>
    </div>
  </div>
);

const IconDownArrow = ({ color = '#4C4E56' }) => (
  <svg
    className={styles['icon__down-arrow']}
    width="29"
    height="17"
    viewBox="0 0 29 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.5 1.625L14.5 14.625L27.5 1.625"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconRewardsPhone = () => (
  <svg
    width="27"
    height="27"
    viewBox="0 0 27 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <rect id="phone" width="27" height="27" fill="url(#patternIconRewardsPhone)" />
    <defs>
      <pattern
        id="patternIconRewardsPhone"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0_3138_9947" transform="scale(0.00917431)" />
      </pattern>
      <image
        id="image0_3138_9947"
        data-name="phone.png"
        width="109"
        height="109"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);

const IconRewardsGift = () => (
  <svg
    width="27"
    height="27"
    viewBox="0 0 27 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <rect id="gift" width="27" height="27" fill="url(#patternIconRewardsGift)" />
    <defs>
      <pattern
        id="patternIconRewardsGift"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0_3138_9948" transform="scale(0.00917431)" />
      </pattern>
      <image
        id="image0_3138_9948"
        data-name="gift.png"
        width="109"
        height="109"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);

const IconRewardsLock = () => (
  <svg
    width="21"
    height="27"
    viewBox="0 0 21 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <rect id="unlock" width="21" height="27" fill="url(#patternIconRewardsLock)" />
    <defs>
      <pattern
        id="patternIconRewardsLock"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use
          xlinkHref="#image0_3138_9949"
          transform="matrix(0.0114796 0 0 0.00892857 0.00637755 0)"
        />
      </pattern>
      <image
        id="image0_3138_9949"
        data-name="unlock.png"
        width="86"
        height="112"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFYAAABwCAYAAACEo4fcAAAACXBIWXMAAC4jAAAuIwF4pT92AAAEtklEQVR42u2dMXLaXhDGPxj34gZ2p9KkVmFSRo25QbhBlBNEnCDKCSJugBu1f/1noh66qDM3wCcghZYEzHuSbCS0wPfNMHgwIPHTanef3r5Vb7PZQIv8LL8DMAYwBHAnz07JR/6X5xRAmnhuquW39LoGKzAn8rht4CufAMwTz42vEqwADQF8bmkTKwBR4rnRVYD1s3wgQL+caJMrAEHiufOLBetn+QhA3NAp/x4XMUk8d31RYP0sDwB8r/HW5TYYAVjbApK4km2AG8nDqWG948RzFxcB1s/yuMKXvoglR4nnPh+xnW0QfKjY1qhtuK2DrQH1B4CwyVNUXE4E4L4ruK2CrTj9l+LzFi1uPwTwrQu4rYEVq/mv60DiZ/lQ/LVj8bnDNvaj32JKZUtvZonnjk8VncUiR2Khr3Urvh1nAVb8m2OBOjl1nlUB99HP8rF6sOICPlt8atDVEHMHrtEQ5CxTbbGh5fWTJecVcKcWlxCoBStJuymHnJ4iKa8JN5Sz5+DAa7bY0JLWRNAlk3XeygBDJVhTEIi6dgEGq03x71pu1f53C1byRVMmEEOnYkuGMNBmsaajvTxm7N+y1caW9GukDezQ8NocupXW/B3qwKZnCFadxZouXi+UgzXtnzofa/Jj6zMEe68erHa1eeDbBLu65oPWJNjZmeSvJ9FNg6fVxM/yFMUE3+LU080XC3Yn6aauPXgRLMFSBEuwBEsRLMESLEWwBEuw1IGMZZxSuDAG8EhEVq1QzJmFppnoPbAdL744Zx1Upf8FK1b6k4zerSWKCvH1Xx8rVSyEepzusVNHsQ1ec3JpRA/bwrob+ePW4pyDa59iMWln/a9p4UgIIO59+vV7boj+rS16uDDAtrj0oQ9zSU1IqNWSOT5TEfO4D0PpJScF36Q5R14c0hIsRbAES7AUwRIswVIES7AESxEswRIsRbAES7BUPd1o30GpeRhhf1W2qrbRZwVWZkBDmKfmv/lZvm3iE2mc+OwrBDqQpaM/UV5D5qCY10/Fqgm2DCqKCr6HN3zsXiNcbRYb432NGBwAcdNt9C4CrJSQ2upxVyha501h7pe1tdxAy+/RFLxsUL6+brkvB2GOw2KTAPbeilfrCkzWOjXdx0BSLVOfL0egE+yOBb5WaU9EgWuqmxoSbLkWNfJTU93UgGDLNWjoPVcN9tkU5aXAt0zjmt91nWBlOY+pgWNU4pcDy8gsJdjDwcFBpuBn+XzXcmXIG8J8fwU13T815bERirp+x5CGPfpZvgSwrhjuhlp+jBqLFUsLK64JlEF90rQQRVVWIIOB2Ts+ukTDzcsvLt2SG1B8tQQzk35gZ0UgwVZb7lCgrSyjshmAj4nnBhovdKudQRCfGwAIdm6KBhQ3T9Pe8Ff/nNcO5GeckThLS7AESxEswRIsRbAES7AUwRIswVIES7AESxFsh2A1lp4r1p0NrKmQNySvaokBmm4gv+jDXLH36Ge5qtJzpVBTw79eAKS9T79+D1DMJzm2N0H/3TpPqQGKdWe2tRKzxHMnvc1msy0w+05mR+sFwF3iues+cFQFCrUPdb+VtMCdoCiQoN6ulUBdGNOtxHMDAB8BPJFVbaBTFE2M9+LQH+osvu/yXSqTAAAAAElFTkSuQmCC"
      />
    </defs>
  </svg>
);

const IconRewardsRecycle = () => (
  <svg
    width="27"
    height="26"
    viewBox="0 0 27 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <rect id="AD" width="27" height="26" fill="url(#patternIconDownArrow)" />
    <defs>
      <pattern
        id="patternIconDownArrow"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use
          xlinkHref="#image0_3138_9946"
          transform="matrix(0.00883452 0 0 0.00917431 0.0185185 0)"
        />
      </pattern>
      <image
        id="image0_3138_9946"
        data-name="AD.png"
        width="109"
        height="109"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);

const perks = [
  {
    icon: <IconRewardsLock />,
    header: 'early access',
    content: 'Learn about new products and promotions first.',
  },
  {
    icon: <IconRewardsGift />,
    header: 'surprise birthday gift',
    content: 'Receive a special gift on your birthday.',
  },
  {
    icon: <IconRewardsPhone />,
    header: 'dedicated concierge line',
    content: 'We’re here for you 24-7.',
  },
  {
    icon: <IconRewardsRecycle />,
    header: 'auto-delivery perk',
    content: 'Earn 300 bonus points on new auto-delivery orders.',
  },
];

export default RewardPerks;
