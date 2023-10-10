import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const mockLogo = {
  image:
    'https://cdn.shopify.com/s/files/1/1736/9637/t/77/assets/tula-skincare-logo.png?v=5746727401723605709&width=150',
  linkUrl: '/',
};

const FooterLogo = ({logo, ...rest}) => {
  logo = logo || mockLogo;

  return (
    <div {...rest} id={'footerLogo'}>
      <a alt="Tula Logo" href={logo.linkUrl}>
        <img loading="lazy" src={logo.image} className={'footerImg'} />
      </a>
    </div>
  );
};

export default FooterLogo;
