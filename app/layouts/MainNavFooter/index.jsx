import SliderAccount, { links as sliderAccountStyles} from '~/modules/sliderAccount';
import { switchSliderPanelVisibility } from '~/modules/sliderPanel';
import Footer, { links as footerStyles } from '~/modules/footer';

export const links = () => {
  return [
    ...sliderAccountStyles(),
    ...footerStyles(),

  ];
};

const MainNavFooter = ({ children, footers }) => {

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
      <h3>BodyBottom</h3>
      <Footer desktopFooter={desktopFooter} mobileFooter={mobileFooter}/>

    </>

  );

};

export default MainNavFooter;