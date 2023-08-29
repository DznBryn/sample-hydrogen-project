import React, {useEffect, useState} from 'react'
import { Link } from '@remix-run/react';

import styles from './styles.css'

export const links = () => {
    return [{rel: 'stylesheet', href: styles}];
};

const WhyTulaDesktop = ({content}) => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    // Scroll effects
    document.addEventListener('scroll', function(e) {
      let oneHundredVh = window.innerHeight + 92; //92 = size of the navBar
      let scrollPosition = window.pageYOffset;

      // First Image Transition
      if(scrollPosition < oneHundredVh){
        document.getElementById("imgOne").style.opacity = 1 - (scrollPosition / window.innerHeight);
        document.getElementById("colorOne").style.opacity = 1 - (scrollPosition / window.innerHeight);
      }

      // Second Image Transition
      if(document.getElementById("imgOne").style.opacity < 0.1){
        document.getElementById("imgTwo").style.opacity = 1 - ((scrollPosition - window.innerHeight) / window.innerHeight);
        document.getElementById("colorTwo").style.opacity = 1 - ((scrollPosition - window.innerHeight) / window.innerHeight);
      }

      // Third Image Transition
      if(document.getElementById("imgTwo").style.opacity < 0.1){
        document.getElementById("imgThree").style.opacity = 1 - ((scrollPosition - (window.innerHeight * 2)) / window.innerHeight);
        document.getElementById("colorThree").style.opacity = 1 - ((scrollPosition - (window.innerHeight * 2)) / window.innerHeight);
      }

      // Slide Effects for Slide 2 through 4
      const positionOnSlide = 0.15;
      if( (scrollPosition/oneHundredVh) > positionOnSlide && (scrollPosition/oneHundredVh) <= 1 ){
        if(!(count >= 2)){
          setCount(2);
        }
      } else if( (scrollPosition/(oneHundredVh * 2)) > positionOnSlide && (scrollPosition/(oneHundredVh * 2)) <= 1 ){
        if(!(count >= 3)){
          setCount(3);
        };
      } else if( (scrollPosition/(oneHundredVh * 3.5)) > positionOnSlide && (scrollPosition/(oneHundredVh * 3.5)) <= 1 ){
        if(!(count >= 3)){
          setCount(4);
        };
      } else {

      }
    });
  });

  return (
      <div className={"whyTula"}>
        <div className={"bgColors"}>
          <div className={"contain"}>
            <div id="colorOne" className={"colorOne"}></div>
            <div id="colorTwo" className={"colorTwo"}></div>
            <div id="colorThree" className={"colorThree"}></div>
            <div id="colorFour" className={"colorFour"}></div>
          </div>
        </div>
        <div className={"section left"}>
          <div className={"imgWrapper"}>
            <div className={"contain"}>
              <img id="imgOne" className={"imgSlide"} src={content[0].imageOne.asset.url} alt="Why Tula" />
              <img id="imgTwo" className={"imgSlide"} src={content[0].imageTwo.asset.url} alt="Why Tula" />
              <img id="imgThree" className={"imgSlide"} src={content[0].imageThree.asset.url} alt="Why Tula" />
              <img id="imgFour" className={"imgSlide"} src={content[0].imageFour.asset.url} alt="Why Tula" />
            </div>
          </div>
        </div>

        <div id="slidesWrapper" className={ "section right"}>

          <div className={"slide"}>
            <div id="slideCopyOne" className={"copy.active fadeIn"}>
              <h1>
                Healthy, balanced skin begins with <span>TULA<sup className={"trademark"}>®</sup></span>
              </h1>
            </div>
            <div className={"scrollDown"}>
              Scroll Down
              <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 8.93746L0.770996 1.12143L1.51476 0.414856L8.99996 7.5258L16.4852 0.414856L17.2289 1.12143L9 8.93746Z" fill="#4C4E56"/>
              </svg>
            </div>
          </div>


          <div className={"slide"}>
            <div id="slideCopyTwo" className={"copy.active fadeIn"}>
              <h2 className={"fadeIn"}>
                <span>Feed your skin the good stuff<sup className={"trademark"} style={{marginLeft: '0.5em'}}>&trade;</sup></span>
              </h2>
              <p className={"fadeInParagraph"}>
                TULA founder, Dr. Roshini Raj is a practicing gastroenterologist who has been studying probiotics for 20 years. A breakthrough innovation in skincare, probiotic extracts are a powerful ingredient that help soothe, hydrate and nourish skin to improve its balance and calm the look of irritation. That’s why 100% of TULA skincare products are powered by probiotic extracts & superfoods.
              </p>
              <Link href={content[0].sectionLinks[0]}>
                <button className={"ctaBtn"}>Learn More</button>
              </Link>
            </div>
          </div>


          <div className={"slide slideCopyThree"}>
            <div  className={"copy.active fadeIn"}>
              <h2 className={"fadeIn"}>
                what does clean <br/> mean at TULA?
              </h2>
              <p className={"fadeInParagraph"}>
                We create hardworking formulas made with good-for-you ingredients so our community can feel confident in choosing TULA products. At TULA, clean isn’t just a buzzword, it’s part of our core philosophy.
              </p>
              <a href={content[0].sectionLinks[1]}>
                <button className={"ctaBtn"}>Learn More</button>
              </a>
              <h2 style={{paddingTop: '1em'}} className={"fadeIn"}>
                what does clinically effective mean at TULA?
              </h2>
              <p className={"fadeInParagraph"}>
                We take skincare seriously. Our formulas are grounded in thorough scientific research so your products deliver the results you deserve.
              </p>
              <Link href={content[0].sectionLinks[2]}>
                <button className={"ctaBtn"}>Learn More</button>
              </Link>
            </div>
          </div>

          <div className={"slide longerSlide"}>
            <div id="slideCopyFour" className={"copy.active fadeIn slideFour"}>
              <h2 className={"fadeIn"}>
                #EmbraceYourSkin
              </h2>

              <p className={"fadeInParagraph"}>
                Our vision is to inspire confidence. We embrace skin positivity and approach beauty from the inside out. That’s why we promise to reimagine social norms around beauty standards and to never retouch any photos of skin. You’ll see “Untouched Beauty” badges on all of our photos to solidify this promise.
              </p>

              <p className={"hideParaTwo showParaTwo"}>
                We Promise to
              </p>

              <p className={"hideParaThree showParaThree"}>
                REIMAGINE what's important.
              </p>

              <p className={"hideParaFour showParaFour"}>
                Being kind looks good on everyone.
              </p>

              <p className={"hideParaFive showParaFive"}>
                REIMAGINE language.
              </p>


              <p className={"hideParaSix showParaSix"}>
                Ageless is the new anti-aging.&#8482;
              </p>


              <p className={"hideParaSeven showParaSeven"}>
                REIMAGINE imagery.
              </p>

              <p className={"hideParaEight, styles.showParaEight"}>
                Healthy, not 'perfect.'
              </p>

              <p className={"hideParaNine showParaNine"}>
                REIMAGINE skincare.
              </p>

              <Link href={content[0].sectionLinks[3]}>
                <button className={"ctaBtn"}>Learn More</button>
              </Link>

            </div>
          </div>
        </div>
      </div>
  )
}

export default WhyTulaDesktop