// import ResponsiveImage from 'frontend-ui/ResponsiveImage';
// import getResponsiveImageSrc from 'frontend-ui/getResponsiveImageSrc';
import styles from './styles.css';

const getResponsiveImageSrc = () => {};
const ResponsiveImage = () => <div></div>;

const RewardsHowToRedeem = () => (
  <div className={styles.section}>
    <p className={styles.section__heading}>how to redeem your free product</p>
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.card__container}>
          <div className={styles.card__number}><p className={styles.number}>1</p></div>
          <div className={styles.card__heading}><p className={styles.heading}>add a rewards product to cart</p></div>
          <div className={styles.card__image}>
            <ResponsiveImage className={styles.image} src={getResponsiveImageSrc('https://cdn.shopify.com/s/files/1/1736/9637/files/redeem-img-3.jpg')} alt={'Rewards Product'} />
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.card__container}>
          <div className={styles.card__number}><p className={styles.number}>2</p></div>
          <div className={styles.card__heading}><p className={styles.heading}>click “redeem” & copy code</p></div>
          <div className={styles.card__image}>
            <ResponsiveImage className={styles.image} src={getResponsiveImageSrc('https://cdn.shopify.com/s/files/1/1736/9637/files/redeem-img-2.jpg')} alt={'Rewards Product'} />
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.card__container}>
          <div className={styles.card__number}><p className={styles.number}>3</p></div>
          <div className={styles.card__heading}><p className={styles.heading}>paste code at checkout</p></div>
          <div className={styles.card__image}>
            <ResponsiveImage className={styles.image} src={getResponsiveImageSrc('https://cdn.shopify.com/s/files/1/1736/9637/files/redeem-img-1.jpg')} alt={'Rewards Product'} />
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.card__container}>
          <div className={styles.card__number}><p className={styles.number}>4</p></div>
          <div className={styles.card__heading}><p className={styles.heading}>redeem your free product!</p></div>
          <div className={styles.card__image}>
            <ResponsiveImage className={styles.image} src={getResponsiveImageSrc('https://cdn.shopify.com/s/files/1/1736/9637/files/redeem-img-4.jpg')} alt={'Rewards Product'} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RewardsHowToRedeem;
