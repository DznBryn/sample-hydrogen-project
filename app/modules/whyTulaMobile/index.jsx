import {Link} from '@remix-run/react';

import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const WhyTulaMobile = ({content}) => {
  return (
    <div className={'whyTulaMobile'}>
      <div className={'blockOne'}>
        <img
          className={'whyImages'}
          src={content?.[0]?.imageOneMobile.asset.url + '?auto=format'}
          alt="Why Tula"
        />
        <div className={'container'}>
          <h1>
            Healthy, balanced skin begins with{' '}
            <span>
              TULA<sup className={'trademark'}>®</sup>
            </span>
          </h1>
        </div>
      </div>

      <div className={'blockTwo'}>
        <img
          className={'whyImages'}
          src={content?.[0]?.imageTwoMobile.asset.url + '?auto=format'}
          alt="Why Tula"
        />
        <div className={'container'}>
          <h2>
            <span>
              Feed your skin the good stuff
              <sup className={'trademark'} style={{marginLeft: '0.5em'}}>
                &trade;
              </sup>
            </span>
          </h2>
          <p>
            TULA founder, Dr. Roshini Raj is a practicing gastroenterologist who
            has been studying probiotics for 20 years. A breakthrough innovation
            in skincare, probiotic extracts are a powerful ingredient that help
            soothe, hydrate and nourish skin to improve its balance and calm the
            look of irritation. That&apos;s why 100% of TULA skincare products
            are powered by probiotic extracts & superfoods.
          </p>
          <Link to={content?.[0]?.sectionLinks[0]}>
            <button className={'ctaBtn'}>Learn More</button>
          </Link>
        </div>
      </div>

      <div className={'blockThree'}>
        <img
          className={'whyImages'}
          src={content?.[0]?.imageThreeMobile.asset.url + '?auto=format'}
          alt="Why Tula"
        />
        <div className={'container'}>
          <h2>what does clean mean at TULA?</h2>
          <p>
            We create hardworking formulas made with good-for-you ingredients so
            our community can feel confident in choosing TULA products. At TULA,
            clean isn&apos;t just a buzzword, it&apos;s part of our core
            philosophy.
          </p>
          <Link to={content?.[0]?.sectionLinks[1]}>
            <button className={'ctaBtn'}>Learn More</button>
          </Link>
        </div>
        <div className={'container'}>
          <h2>what does clinically effective mean at TULA?</h2>
          <p>
            We take skincare seriously. Our formulas are grounded in thorough
            scientific research so your products deliver the results you
            deserve.
          </p>
          <Link to={content?.[0]?.sectionLinks[2]}>
            <button className={'ctaBtn'}>Learn More</button>
          </Link>
        </div>
      </div>

      <div className={'blockFour'}>
        <img
          className={'whyImages'}
          src={content?.[0]?.imageFourMobile.asset.url + '?auto=format'}
          alt="Why Tula"
        />
        <div className={'container'}>
          <h2>#EmbraceYourSkin</h2>
          <p>
            Our vision is to inspire confidence. We embrace skin positivity and
            approach beauty from the inside out. That&apos;s why we promise to
            reimagine social norms around beauty standards and to never retouch
            any photos of skin. You&apos;ll see “Untouched Beauty” badges on all
            of our photos to solidify this promise.
          </p>
          <p className={'slideFirstHeader'}>We Promise to</p>
          <p className={'slideSubheader'}>REIMAGINE what&apos;s important.</p>
          <p className={'slideText'}>Being kind looks good on everyone.</p>
          <p className={'slideSubheader'}>REIMAGINE language.</p>
          <p className={'slideText'}>Ageless is the new anti-aging.™</p>
          <p className={'slideSubheader'}>REIMAGINE imagery.</p>
          <p className={'slideText'}>Healthy, not “perfect.”</p>
          <p className={'slideSubheader'}>REIMAGINE skincare.</p>

          <Link to={content?.[0]?.sectionLinks[3]}>
            <button className={'ctaBtn'}>Learn More</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WhyTulaMobile;
