// import ResponsiveImage from 'frontend-ui/ResponsiveImage';
// import getResponsiveImageSrc from 'frontend-ui/getResponsiveImageSrc';
import styles from './styles.css';

const getResponsiveImageSrc = () => null;

export const links = () => {
  return [
    {
      rel: 'stylesheet', href: styles
    },
  ];
};

const RewardsHowItWorks = () => (
  <div className={styles.section}>
    <div className={styles.container}>
      <h2 className={`${styles['section__heading']} ${styles.mobile}`}>how it works</h2>
      <div className={styles['image__container']}>
        <picture>
          <source
            srcSet="https://cdn.shopify.com/s/files/1/1736/9637/files/reward-chart.gif"
            media="(min-width: 600px)"
          />
          <img
            className={styles.image}
            src={getResponsiveImageSrc(
              'https://cdn.shopify.com/s/files/1/1736/9637/files/reward-chart.gif',
            )}
            alt={'Rewards Chart'}
          />
        </picture>
      </div>
      <div className={styles.content}>
        <h2 className={`${styles['section__heading']} ${styles.desktop}`}>how it works</h2>
        <div className={styles.list}>
          <div className={styles['list__container']}>
            <div className={styles['list__icon']}>
              <IconAccount />
            </div>
            <div className={styles['list__item']}>
              <p className={styles['content__subheading']}>create an account</p>
              <p className={styles['content__body']}>
                Choose your favorite perks from our exclusive members-only benefits.
              </p>
            </div>
          </div>
          <div className={styles['list__container']}>
            <div className={styles['list__icon']} style={{ marginTop: '.5em' }}>
              <IconUptrend />
            </div>
            <div className={styles['list__item']}>
              <p className={styles['content__subheading']}>earn points</p>
              <p className={styles['content__body']}>
                Earn online and in-store! Plus earn bonus points for engaging with TULA online.
              </p>
            </div>
          </div>
          <div className={styles['list__container']}>
            <div id={styles.rewards__icon} className={styles['list__icon']}>
              <picture>
                <source
                  srcSet="https://cdn.shopify.com/s/files/1/1736/9637/files/Redeem_Rewards__coin_flip_animation.gif"
                  media="(min-width: 600px)"
                />
                <img
                  className={styles.image}
                  src={getResponsiveImageSrc(
                    'https://cdn.shopify.com/s/files/1/1736/9637/files/Redeem_Rewards__coin_flip_animation.gif',
                  )}
                  alt="redeem rewards"
                />
              </picture>
            </div>
            <div className={styles['list__item']}>
              <p className={styles['content__subheading']}>redeem rewards</p>
              <p className={styles['content__body']}>
                Redeem your points for full-size products, discounts, and members-only perks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const IconUptrend = () => (
  <svg
    width="26"
    height="15"
    viewBox="0 0 26 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xlinkHref="http://www.w3.org/1999/xlink"
  >
    <rect width="26" height="15" fill="url(#pattern0)" />
    <defs>
      <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use
          xlinkHref="#image0_3136_9840"
          transform="matrix(0.00874126 0 0 0.0151515 0.0236014 0)"
        />
      </pattern>
      <image
        id="image0_3136_9840"
        width="109"
        height="66"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG0AAABCCAYAAABdAli1AAAACXBIWXMAAC4jAAAuIwF4pT92AAACx0lEQVR42u3dO07DQBAG4D8RfTgCnUvo3bglDdyAcINwA7hBboC5ATRuCRLpQ0c6uEE4QSiySAjlMVnvY8b8U2IpXu2X2d2xd0NvtVqBsT2Gs8UtgDGAgYLmfAEY94i2E6wC8KytXX3S7IxKY6OItjumRDMWTVlMAdy5uURNcE7TNYeeueweMNM6BEY0g2BE0w/2BeCTaLbAKgAfRDME1pTFnMOjHrDKF4xoecBGWD8a8wIjWh6w+y2XRWBE0wP2JgUDgCN2pxqwpfTzmGnGwIhmEIxoBsGIFg9sEguMC5E4YDWAq1hgzLS0YC8hwJhp6cAemrIYhboXM80YGNEMghHNIBjnNH+sYwA1gIvUYCrRNhSl4qffCcGmAE5zgKkbHt1w87coHQCYuje9/x5MFdqe+SE7nADsJgWYGrQ9YNnhBGDXTVlMUrWnbwQsG5wQrE7ZZ33FYE/YvIc+GZxGsKxoghrnEut9f1nghrPFiUawbGjSotQt8/fBXUZo3xmAuRKwv3PlW9JTM75FqWCve7BOTHmvA9pUuS/vEkCdDK1tjeM6s4757Rfs+h01ZfGYe/GWBC1UURpzYdBmm3bn5rSQRal7gVhh/QZ4U9y7x2CdBYueabEyI+TnWgOLmmkxh7JQGWcRLBpaiqK0LZy7Zg4syvCY+imCz/1CHYToRKa54eYjZVF6aMbtAfvUDhY003IXpZKM+0Hccj3InkQzaFqKUgEcrIMFQdO2AvOAMwXWek7TuGQWzHGmwVqhaa5xhHAmwbzRLBSlv+AeugTmNae591e1paJ0OFuMARz/+tPEKtjBaNaL0q5En2AdRRMcRT0hmCK0mGeHGRHQCGYMjWDG0NwSmWBK42gDWI3Ip/MZATONYMbQBPvqCaZpeMx1dpjhF73z1/cK2/8JDsGM1WkEM4ZGMOVz2hLr3236iXlTFmN2jd74Bj50QYNr1D69AAAAAElFTkSuQmCC"
      />
    </defs>
  </svg>
);

const IconAccount = () => (
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <rect id="updated icon - blue 1" width="23" height="23" fill="url(#patternIconUser)" />
    <defs>
      <pattern id="patternIconUser" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_3136_9842" transform="translate(-0.00462963) scale(0.00925926)" />
      </pattern>
      <image
        id="image0_3136_9842"
        data-name="updated icon - blue.png"
        width="109"
        height="108"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);

export default RewardsHowItWorks;
