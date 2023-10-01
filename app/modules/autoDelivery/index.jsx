import {useCollection} from '~/hooks/useCollection';
import Product, {links as productStyles} from '../plp/plpProductBox';
import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}, ...productStyles()];
};

const AutoDelivery = ({content}) => {
  const {state, products} = useCollection(
    content[0].featuredCollection.collectionId,
  );

  return (
    <div id="ad-page">
      <div className={'AutoDeliveryHero'}>
        <div
          id="desktopBg"
          className={'backgroundImage'}
          style={{
            backgroundImage: `url("${
              content[0].heroBackgroundImage.asset.url + '?auto=format'
            }")`,
          }}
        >
          <div className={'textWrapper'} style={{color: '#fff'}}>
            <h1>Major Benefits with our Auto-Delivery Program</h1>
            <p>
              Never run out of your favorites again. Subscribe now for
              auto-delivery for exclusive TULA perks &amp; glow on repeat.
            </p>
            <a href="/collections/all">
              <button className={'heroCtaBtn'}>Shop all</button>
            </a>
          </div>
        </div>

        <div
          id="mobileBg"
          className={'backgroundMobileImage'}
          style={{
            backgroundImage: `url("${
              content[0].heroBackgroundMobileImage.asset.url + '?auto=format'
            }")`,
          }}
        >
          <div className={'textWrapper'} style={{color: '#fff'}}>
            <h1>Major Benefits with our Auto-Delivery Program</h1>
            <p>
              Never run out of your favorites again. Subscribe now for
              auto-delivery for exclusive TULA perks &amp; glow on repeat.
            </p>
            <a href="/collections/all">
              <button className={'heroCtaBtn'}>Shop all</button>
            </a>
          </div>
        </div>
      </div>

      <div className={'autoDeliverySectionThree'}>
        <div className={'fixedWrapper'}>
          <div className={'sectionsWrapper'}>
            <div className={'sectionLeft'}>
              <img
                className={'sectionThreeBigImage'}
                src={content[0].sectionThreeBigImage.asset.url + '?auto=format'}
                alt={'Auto Delivery'}
              />
              <img
                className={'sectionThreeSmallImage'}
                src={
                  content[0].sectionThreeSmallImage.asset.url + '?auto=format'
                }
                alt="Auto Delivery"
              />
            </div>
            <div className={'sectionRight'}>
              <h2>Why auto-delivery?</h2>

              <div className={'checkboxGrid'}>
                <div className={'checkbox'}>
                  <img
                    src={content[0].checkmark.asset.url + '?auto=format'}
                    alt="Checkmark"
                  />
                </div>
                <div className={'checkboxDetails'}>
                  <h3>Exclusive Discount</h3>
                  <p>15% off every auto-delivery order</p>
                </div>
              </div>

              <div className={'checkboxGrid'}>
                <div className={'checkbox'}>
                  <img
                    src={content[0].checkmark.asset.url + '?auto=format'}
                    alt="Checkmark"
                  />
                </div>
                <div className={'checkboxDetails'}>
                  <h3>Free Shipping</h3>
                  <p>On every auto-delivery order. No minimum, at all.</p>
                </div>
              </div>

              <div className={'checkboxGrid'}>
                <div className={'checkbox'}>
                  <img
                    src={content[0].checkmark.asset.url + '?auto=format'}
                    alt="Checkmark"
                  />
                </div>
                <div className={'checkboxDetails'}>
                  <h3>Flexible Ordering</h3>
                  <p>
                    Decide when you want your delivery. Easily adjust order
                    frequency, delivery schedule or quantity before your next
                    delivery through the &quot;My Account&quot; section.
                  </p>
                </div>
              </div>

              <div className={'checkboxGrid'}>
                <div className={'checkbox'}>
                  <img
                    src={content[0].checkmark.asset.url + '?auto=format'}
                    alt="Checkmark"
                  />
                </div>
                <div className={'checkboxDetails'}>
                  <h3>Hassle-Free Pause or Cancel</h3>
                  <p>
                    Rest easy knowing you can pause or cancel online anytime for
                    any reason.
                  </p>
                </div>
              </div>

              <div className={'checkboxGrid'}>
                <div className={'checkbox'}>
                  <img
                    src={content[0].checkmark.asset.url + '?auto=format'}
                    alt="Checkmark"
                  />
                </div>
                <div className={'checkboxDetails'}>
                  <h3>Easy Product Swap</h3>
                  <p>
                    Easily swap products to all upcoming auto-delivery orders
                    through the &quot;My Account&quot; section.
                  </p>
                </div>
              </div>

              <div className={'checkboxGrid'}>
                <div className={'checkbox'}>
                  <img
                    src={content[0].checkmark.asset.url + '?auto=format'}
                    alt="Checkmark"
                  />
                </div>
                <div className={'checkboxDetails'}>
                  <h3>Personalized Communications</h3>
                  <p>
                    Sign up for emails to receive order reminders,
                    confirmations, all updates regarding your auto-delivery.
                  </p>
                </div>
              </div>

              <div id="lastCheckboxGrid" className={'checkboxGrid'}>
                <div className={'checkbox'}>
                  <img
                    src={content[0].checkmark.asset.url + '?auto=format'}
                    alt="Checkmark"
                  />
                </div>
                <div className={'checkboxDetails'}>
                  <h3>Early Access</h3>
                  <p>
                    Subscribe to auto-delivery and get early access to our new
                    product launches &amp; more!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          className={'mobileImage'}
          src={content[0].sectionThreeMobileImage.asset.url + '?auto=format'}
          alt="Auto delivery"
        />
      </div>

      <div className={'autoDeliverySectionTwo'}>
        <div className={'fixedWrapper'}>
          <h2>How does it work?</h2>
          <div className={'wrapper'}>
            <div className={'contentBlock'}>
              <img
                src={content[0].sectionTwoIconOne.asset.url + '?auto=format'}
                alt="Auto delivery subscription"
              />
              <p className={'step'}>Step 1</p>
              <p className={'contentDescription'}>
                Pick your favorite product &amp; select
                &quot;auto-delivery&quot; with your desired frequency on the
                product page, then head to checkout.
              </p>
            </div>
            <div className={'contentBlock'}>
              <img
                src={content[0].sectionTwoIconTwo.asset.url + '?auto=format'}
                alt="Account icon"
              />
              <p className={'step'}>Step 2</p>
              <p className={'contentDescription'}>
                Create an account or log into your account to manage your
                frequency, delivery, quantity or product swap at anytime.
              </p>
            </div>
            <div id={styles.lastContentBlock} className={'contentBlock'}>
              <img
                src={content[0].sectionTwoIconThree.asset.url + '?auto=format'}
                alt="Delivery truck"
              />
              <p className={'step'}>Step 3</p>
              <p className={'contentDescription'}>
                Enjoy your favorite products shipped to you free &amp; keep on
                glowing.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={'autoDeliverySectionFour'}
        style={{
          backgroundImage: `url("${
            content[0].fullWidthBannerImage.asset.url + '?auto=format'
          }")`,
        }}
      >
        <div className={'sectionLeft'}>
          <img
            className={'mobileImage'}
            src={
              content[0].fullWidthBannerMobileImage.asset.url + '?auto=format'
            }
            alt="TULA Skincare Products"
          />
        </div>
        <div className={'sectionRight'}>
          <div className={'textWrapper'}>
            <h2>Sign in or create an account to enjoy all the perks.</h2>
            <p>
              If you are an active subscriber, you must be logged into your
              account to make adjustments to your auto-delivery orders.
            </p>
            <div className={'btnWrapper'}>
              <a href="/account/login">
                <button>Log in</button>
              </a>
              <a href="/account/register">
                <button>Create Account</button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={'autoDeliverySectionFive'}>
        <div className="fixedWidthPage">
          <h2>Subscribe to our glow getter favorites</h2>

          <div className={'recommendationWrapper'}>
            {/*
                    
                    {content[0].featuredCollection.products.slice(0,4).map((product) => {
                        return <Product product={product} key={product._id} className={styles.product}/>
                    })}
                    
                    */}
            {state === 'loaded' &&
              products.slice(0, 4).map((product, index) => {
                return (
                  <Product
                    product={product}
                    key={product?.id}
                    className={'product'}
                    analytics={{
                      click: {
                        actionField: {list: 'Auto Delivery'},
                        products: [
                          {
                            name: product?.title,
                            id: window.btoa(product?.id),
                            price: parseInt(
                              product?.priceRange?.minVariantPrice?.amount,
                            )?.toFixed(2),
                            category: product?.productType,
                            variant: '',
                            position: index,
                          },
                        ],
                      },
                    }}
                  />
                );
              })}
          </div>
        </div>
      </div>

      <div className={'autoDeliverySectionSix'}>
        <div className="fixedWidthPage">
          <h2>Hear from our glow getters</h2>
          <div className={'reviewsWrapper'}>
            <div className={'review'}>
              <p className={'reviewerName'}>Cami</p>
              <p>
                &quot;Consistently is key. It truly has <br />
                helped my skin so much. The <br />
                ingredients to the products are what <br />
                set Tula [apart] from anything else!&quot;
              </p>
            </div>

            <div className={'review'}>
              <p className={'reviewerName'}>Maddy</p>
              <p>
                &quot;I have been consistently using this <br />
                product once a day for 6 months and my <br />
                pores are almost non existent... <br />
                Worth every penny.&quot;
              </p>
            </div>

            <div className={'review'}>
              <p className={'reviewerName'}>Katie</p>
              <p>
                &quot;I can tell a huge difference in <br />
                my face. My complexion is clear, <br />
                my face is smooth and hydrated <br />
                and I feel beautiful with no <br />
                make-up on.&quot;
              </p>
            </div>
          </div>
        </div>

        <p className={'bottomText'}>
          Still have questions? <br />
          Visit{' '}
          <a href="/pages/faq" target="_blank">
            FAQ
          </a>{' '}
          or{' '}
          <a href="/pages/contact-us" target="_blank">
            Contact Us
          </a>
        </p>
      </div>
    </div>
  );
};

export default AutoDelivery;
