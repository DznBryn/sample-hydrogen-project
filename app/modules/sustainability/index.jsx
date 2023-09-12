import React, {useEffect, useState} from 'react'
import { Link } from '@remix-run/react';

import styles from './styles.css'

export const links = () => {
    return [{rel: 'stylesheet', href: styles}];
};


const Sustainability = () => {

  function getBlockData(blockName){
    const CMS_BlockData = blocksContent?.find(data => data.name === blockName.toLowerCase());
    const mock = { title: "Title",  content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur suscipit placerat.` };
    return CMS_BlockData || mock;
  }

  return (
    <div className={"fixedWidthPage minHeight sustainability"}>
      <div className={"contain"}>

        <div className={"hero"}>
          <div className={"section left"}>
            <h1>Sustainability at TULA</h1>
            <h2>This is the start of our journey. We're continuing to evaluate opportunities that make a more thoughtful impact on the environment &amp; help you make choices that keep your skin &amp; our planet healthy.</h2>
          </div>
          <div className={"section right"}></div>
        </div>

        <div className={"gridWrapper"}>
          <div className={"blockOne gridBlock"}>
            <img src="https://cdn.shopify.com/s/files/1/1736/9637/files/Official_TerraCycle_Logo.png?v=1610141256" alt="TerraCycle" />
            <h3>TULA<sup>®</sup> Skincare Recycling Program</h3>
            <p>Recycle TULA jars &amp; tubes that can’t be curbside recycled, free of charge, thanks to our partnership with TerraCycle<sup>®</sup>. <Link to="https://www.terracycle.com/en-US/brigades/tula" target="_blank" rel="noopener noreferrer">How it works</Link>. </p>
          </div>
          
          <div className={"blockTwo gridBlock"}>
            <img src="https://cdn.shopify.com/s/files/1/1736/9637/files/Cloverly_Logo.png?v=1610141255" alt="Cloverly" />
            <h3>carbon neutral shipping</h3>
            <p>Choose “carbon neutral shipping” at checkout to help offset the environmental impact of your delivery, thanks to our partnership with Cloverly<sup>®</sup>.</p>
          </div>
          
          <div className={"blockThree gridBlock"}>
            <img src="https://cdn.shopify.com/s/files/1/1736/9637/files/sfc.png?v=1610141256" alt="Sustainable Forestry Initiative" />
            <h3>SFI<sup>®</sup>-certified</h3>
            <p>Our TULA.com mailer box is 100% curbside recyclable. It’s made from materials certified to the Sustainable Forestry Initiative standard &amp; has eco-friendly, pine-based resin ink.</p>
          </div>
          
          <div className={"blockFour gridBlock"}>
            <img src="https://cdn.shopify.com/s/files/1/1736/9637/files/FSC_N003491_571dd9f2-7b08-4a06-b22f-26d65cda6a45.png?v=1617902829" alt="Recycle" />
            <h3>FSC<sup>®</sup>-certified N003491</h3>
            <p>100% of our product cartons will include an FSC<sup>®</sup> label, certifying that the materials came from responsibly managed forests &amp; other controlled sources. Our cartons can be curbside recycled.</p>
          </div>
          
          <div className={"blockFive gridBlock"}>
            <img src="https://cdn.shopify.com/s/files/1/1736/9637/files/cruelty_free.png?v=1610141255" alt="Cruelty-free" />
            <h3>certified cruelty-free</h3>
            <p>100% of our products are cruelty-free, we don’t test on animals.</p>
          </div>
          
          <div className={"blockSix gridBlock"}>
            <img src="https://cdn.shopify.com/s/files/1/1736/9637/files/planet-icon-2x.png?v=1610464319" alt="Sustainability" />
            <h3>This is the start of our journey</h3>
            <p>We're continuing to evaluate opportunities that make a more thoughtful impact on the environment &amp; help you make choices that keep your skin &amp; our planet healthy.</p>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Sustainability