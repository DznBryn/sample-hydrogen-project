import SliderAccount, { links as sliderAccountStyles} from '~/modules/sliderAccount';
import { switchSliderPanelVisibility } from '~/modules/sliderPanel';
import Footer, { links as footerStyles } from '~/modules/footer';


import BodyBottom, { links as BodyBottomStyles } from '~/modules/bodyBottom';

export const links = () => {
  return [
    ...sliderAccountStyles(),
    ...BodyBottomStyles(),
    ...footerStyles(),
  ];
};

const MainNavFooter = ({ children, footers, productsList, emailSmsSignupContent }) => {

  const desktopFooter = footers.find(doc => doc.name === 'Desktop');
  const mobileFooter = footers.find(doc => doc.name === 'Mobile');

  return (

    <>
      <button className="btn" onClick={() => switchSliderPanelVisibility('SliderAccount')}>
        open slider account
      </button>
      <br/>

      <h3>NavPlaceHolder</h3>
      <h3>MainNav</h3>
      <h3>SliderCart</h3>
      <SliderAccount/>
      {
        children
      }
      <BodyBottom emailSmsSignupContent={emailSmsSignupContent} productList={productsList}/>
      <Footer desktopFooter={desktopFooter} mobileFooter={mobileFooter}/>
    </>

  );

};

export default MainNavFooter;