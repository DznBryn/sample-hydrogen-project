import styles from './styles.css';

export const links = () => {
  return [
    {
      rel: 'stylesheet', href: styles
    }
    ];
  };

const RewardsHowToRedeem = () => (
  <div className={'rewardsHowToRedeem_section'}>
    <p className={'rewardsHowToRedeem_section__heading'}>how to redeem your free product</p>
    <div className={'rewardsHowToRedeem_container'}>
      <div className={'rewardsHowToRedeem_card'}>
        <div className={'rewardsHowToRedeem_card__container'}>
          <div className={'rewardsHowToRedeem_card__number'}><p className={'rewardsHowToRedeem_number'}>1</p></div>
          <div className={'rewardsHowToRedeem_card__heading'}><p className={'rewardsHowToRedeem_heading'}>add a rewards product to cart</p></div>
          <div className={'rewardsHowToRedeem_card__image'}>
            <img className={'rewardsHowToRedeem_image'} src={'https://cdn.shopify.com/s/files/1/1736/9637/files/redeem-img-3.jpg'} alt={'Rewards Product'} />
          </div>
        </div>
      </div>
      <div className={'rewardsHowToRedeem_card'}>
        <div className={'rewardsHowToRedeem_card__container'}>
          <div className={'rewardsHowToRedeem_card__number'}><p className={'rewardsHowToRedeem_number'}>2</p></div>
          <div className={'rewardsHowToRedeem_card__heading'}><p className={'rewardsHowToRedeem_heading'}>click “redeem” & copy code</p></div>
          <div className={'rewardsHowToRedeem_card__image'}>
            <img className={'rewardsHowToRedeem_image'} src={'https://cdn.shopify.com/s/files/1/1736/9637/files/redeem-img-2.jpg'} alt={'Rewards Product'} />
          </div>
        </div>
      </div>
      <div className={'rewardsHowToRedeem_card'}>
        <div className={'rewardsHowToRedeem_card__container'}>
          <div className={'rewardsHowToRedeem_card__number'}><p className={'rewardsHowToRedeem_number'}>3</p></div>
          <div className={'rewardsHowToRedeem_card__heading'}><p className={'rewardsHowToRedeem_heading'}>paste code at checkout</p></div>
          <div className={'rewardsHowToRedeem_card__image'}>
            <img className={'rewardsHowToRedeem_image'} src={'https://cdn.shopify.com/s/files/1/1736/9637/files/redeem-img-1.jpg'} alt={'Rewards Product'} />
          </div>
        </div>
      </div>
      <div className={'rewardsHowToRedeem_card'}>
        <div className={'rewardsHowToRedeem_card__container'}>
          <div className={'rewardsHowToRedeem_card__number'}><p className={'rewardsHowToRedeem_number'}>4</p></div>
          <div className={'rewardsHowToRedeem_card__heading'}><p className={'rewardsHowToRedeem_heading'}>redeem your free product!</p></div>
          <div className={'rewardsHowToRedeem_card__image'}>
            <img className={'rewardsHowToRedeem_image'} src={'https://cdn.shopify.com/s/files/1/1736/9637/files/redeem-img-4.jpg'} alt={'Rewards Product'} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RewardsHowToRedeem;
