import SliderPanel, { switchSliderPanelVisibility, links as sliderPanelStyles } from '~/modules/sliderPanel';

export const links = () => {
  return [
    ...sliderPanelStyles(),
  ];
};

const MainNavFooter = ({ children }) => {

  return (

    <>

      <button onClick={() => switchSliderPanelVisibility('test')}>
        open sliderPanel
      </button>

      <h3>NavPlaceHolder</h3>
      <h3>MainNav</h3>
      <h3>SliderCart</h3>
      {/* <h3>SliderAccount</h3> */}
      <SliderPanel id="test">
        test
      </SliderPanel>
      {children}
      <h3>BodyBottom</h3>
      <h3>Footer</h3>

    </>

  );

};

export default MainNavFooter;