import { Link } from '@remix-run/react';

import styles from './styles.css'

export const links = () => {
    return [{rel: 'stylesheet', href: styles}];
};

const Clean = () => (

    <div className={"clean-container"}>
      <div className={"fullBanner"}>
        <div className={"headline"}>
          <h1>what does clean mean at TULA?</h1>
          <p>We create hardworking formulas made with good-for-you ingredients so our community can feel confident in choosing dermatologist-tested TULA products. At TULA, clean isn’t just a buzzword, it’s part of our core philosophy.</p>
        </div>
      </div>

            {/**/}
  
      <div className={"firstSection"}>
        <div className={"content"}> 
          <div className={"leftContent"}>
            <b>01</b><span>clean ingredients</span>
          </div>
          <div className={"rightContent"}>
            <span>
              We believe in what works. Our goal is to help everyone understand what our ingredients do for your skin whether they’re found in nature or from a lab. We rely on clinical research &amp; scientific data on the ingredients we put in our formulas to make sure they’re good for you &amp; your skin.
            </span>
          </div>
        </div>

        <div className={"content"}> 
          <div className={"leftContent"}>
            <b>02</b><span>transparency</span>
          </div>
          <div className={"rightContent"}>
            <span>
              We’re open about our standards because we want you to feel confident every time you add a TULA product to your cart. Under every product page you’ll find full ingredient listings, independent clinical testing results and more! Have questions? Just ask!
            </span>
          </div>
        </div>

        <div className={"content"}> 
          <div className={"leftContent"}>
            <b>03</b><span>no judgment</span>
          </div>
          <div className={"rightContent"}>
            <span>
              We all have different skin, goals &amp; lifestyles — that’s what makes us unique. At TULA, we don’t believe in fear mongering or causing you to doubt other brands in your routine by trash talking other ingredients. We want you to do what’s best for you.
            </span>
          </div>
        </div>
      </div>

            {/**/}

      <div className={"secondSection"}>
        <div className={"content"}> 
          <div className={"imgContent"}>
            <img src="https://cdn.shopify.com/s/files/1/1736/9637/files/desktop-clean-img1-2x.jpg?v=1651506730"/>
          </div>
          <div className={"textContent"}>
            <b>a scientific approach to clean</b> 
            <span>
              Because there are no US government regulations around the definition of “clean,” we look to clean beauty authorities like industry experts & major retailers and formulate to European cosmetic standards. TULA products have been named Clean at Sephora and are part of Ulta Beauty’s Conscious Beauty Collection. Why choose between what’s healthy & what works? 
            </span>
          </div>
        </div>

        <div className={"content"}>
          <div className={"textContent"}>
            <b>our “thanks, but no thanks” list</b> 
            <span>
              If there's any doubt regarding an ingredient's safety, it goes on our "no" list — no excuses. There are over 1,600 ingredients that have no place in TULA formulas, including the below. <br/><b>• parabens • phthalates • sulfates (SLS & SLES) • formaldehyde-releasing preservatives • retinol • octinoxate or oxybenzone • mineral oil or petrolatum •</b>
            </span>
          </div> 
          <div className={"imgContent"}>
            <img src="https://cdn.shopify.com/s/files/1/1736/9637/files/desktop-clean-img2-2x.jpg?v=1651506730"/>
          </div>
        </div>

        <div className={"content"}> 
          <div className={"imgContent"}>
            <img src="https://cdn.shopify.com/s/files/1/1736/9637/files/desktop-clean-img3-2x.jpg?v=1651506833"/>
          </div>
          <div className={"textContent"}>
            <b>feed your skin the good stuff™</b> 
            <span>
              TULA uses powerful actives &amp; skin-health-supporting ingredients, to deliver results-driven approachable formulas that your skin will love &amp; you’ll love to use. Our entire collection is dermatologist-tested & approved — and that testing helps us continue to tweak & tighten our product development guidelines to ensure we only produce good-for-you skincare products.
            </span>
          </div>
        </div>
      </div>

            {/**/}

      <div className={"thirdSection"}>
        <div className={"imgContent"}>
          <img src="https://cdn.shopify.com/s/files/1/1736/9637/files/clean-desktop-background2.jpg?v=1651249826"/>
        </div>
        <div className={"textContent"}>
          <b>what does clinically effective mean at TULA?</b> 
          <span>
            We take skincare seriously. Our formulas are grounded in thorough scientific research so your products deliver the results you deserve.
          </span>
          <a href={"/pages/clinically-effective"}>
            <button className={"ctaBtn"}>Learn More</button>
          </a>
        </div>
      </div>
    </div>
  
)

export default Clean

