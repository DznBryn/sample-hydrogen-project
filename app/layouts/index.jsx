import MainNavFooter, { links as mainNavFooterStyles } from './MainNavFooter';

export const links = () => {
  return {
    mainNavFooterStyles: [...mainNavFooterStyles()],
  };
};

const Layouts = {
  
  MainNavFooter,

};

export default Layouts;