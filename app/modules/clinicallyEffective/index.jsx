import { Link } from '@remix-run/react';

import styles from './styles.css'

export const links = () => {
    return [{rel: 'stylesheet', href: styles}];
};

const ClinicallyEffective = () => (
    <div className={"clinicallyEffectiveContainer"}>
      <div className={"fullBanner"}>
        <div className={"headline"}>
          <h1>what does clinically effective mean at TULA? </h1>
          <p>We take skincare seriously. Our formulas are grounded in thorough scientific research so your products deliver the results you deserve.</p>
        </div>
      </div>
  
      <div className={"firstSection"}>
        <div className={"content"}> 
          <div className={"leftContent"}>
            <b>01</b><span>founded by an MD</span>
          </div>
          <div className={"rightContent"}>
            <span>
              TULA founder Dr. Roshini Raj is a board-certified, Harvard & New York University trained gastroenterologist. She has been studying probiotics & their microbiome-balancing benefits for over 20 years.<br/><br/>A breakthrough in skincare innovation, probiotic extracts are powerful ingredients that improve skin’s natural balance, nourish skin to improve hydration & soothe skin to calm the look of skin irritation.            
            </span>
          </div>
        </div>

        <div className={"content"}> 
          <div className={"leftContent"}>
            <b>02</b><span>clinically proven</span>
          </div>
          <div className={"rightContent"}>
            <span>
              When creating new TULA formulas, we make informed choices at every step of the product development process to ensure there’s real scientific evidence that our effective ingredients and final formulas deliver on our promises. That’s why we also share the results of our consumer studies — so you can see the proof that our products really work. 
            </span>
          </div>
        </div>

        <div className={"content"}> 
          <div className={"leftContent"}>
            <b>03</b><span>continued innovation</span>
          </div>
          <div className={"rightContent"}>
            <span>
              Probiotic extracts have been at the core of our brand since we first started, and the research has continued to advance since then — so our formulas have, too. After multiple years of scientific research, we developed & clinically tested the perfect blend of superfoods, prebiotics & probiotic extracts: Our US patent-pending S<sup>6</sup>Pro Complex™. It’s designed to deliver six clinically-proven benefits, helping to restore, nourish, soothe, strengthen, improve & protect all skin types. Look for it in our newest TULA formulas.
            </span>
          </div>
        </div>

      </div>

      <div className={"secondSection"}>
        <div className={"content"}> 
          <div className={"imgContent"}>
            <img src="https://cdn.shopify.com/s/files/1/1736/9637/files/desktop-clinical-img1-2x.jpg?v=1651516537"/>
          </div>
          <div className={"textContent"}>
            <b>formulas with integrity</b> 
            <span>
              It’s what’s inside that counts! We blend clinically-tested, carefully researched ingredients — like probiotic extracts, prebiotics & superfoods — with other key ingredients to create formulas that deliver real results. We exclusively work with ingredient suppliers who adhere to the industry’s strictest standards for cruelty-free products that are both high quality & highly effective.
            </span>
          </div>
        </div>

        <div className={"content"}>
          <div className={"textContent"}>
            <b>designed with safety & efficacy in mind</b> 
            <span>
              Once we’ve curated the perfect good-for-you ingredients & developed a formula we know you’ll love, we start our rigorous testing process. Beyond dermatologist testing, all TULA products are evaluated for stability, microbiology, irritation (safe for all skin types), safety, toxicology, clinical claims assessment & more. Unless it passes with flying colors, it won’t make it to shelves.
            </span>
          </div> 
          <div className={"imgContent"}>
            <img src="https://cdn.shopify.com/s/files/1/1736/9637/files/desktop-clinical-img2-2x.jpg?v=1651516537"/>
          </div>
        </div>

        <div className={"content"}> 
          <div className={"imgContent"}>
            <img src="https://cdn.shopify.com/s/files/1/1736/9637/files/desktop-clinical-img3-2x.jpg?v=1651516537"/>
          </div>
          <div className={"textContent"}>
            <b>formulated for your skin’s unique needs</b> 
            <span>
              Skincare isn’t always one size fits all, which is why we’ve developed collections tailored to help treat specific concerns. Beyond our universal formulas, we offer hardworking products designed to help you fight acne, not your skin™, gentle treatments for those who are sensitive on the outside, strong on the inside™, & more for people like us who believe that ageless is the new anti-aging™.
            </span>
          </div>
        </div>
      </div>

      <div className={"thirdSection"}>
        <div className={"imgContent"}>
          <img src="https://cdn.shopify.com/s/files/1/1736/9637/files/clinical-desktop-background2.jpg?v=1651281522"/>
        </div>
        <div className={"textContent"}>
          <b>what does clean mean at TULA?</b> 
          <span>
            We create hardworking formulas made with good-for-you ingredients so our community can feel confident in choosing TULA products. At TULA, clean isn’t just a buzzword, it’s part of our core philosophy. 
          </span>
          <Link href={"/pages/clean"}>
            <button className={"ctaBtn"}>Learn More</button>
          </Link>
        </div>
      </div>

    </div>
  
)

export default ClinicallyEffective

