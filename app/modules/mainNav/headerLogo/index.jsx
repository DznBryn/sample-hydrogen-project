import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const defaultLogo = {
  image: {
    _type: 'image',
    alt: 'Welcome To Tula',
    height: 520,
    mimeType: 'image/png',
    name: 'tulaskincarelogo.png',
    size: 16397,
    src: 'https://cdn.shopify.com/s/files/1/1736/9637/files/5yOoDPBE.png?v=1671489084&width=82',
    storageID: 'ca3716fa-3bdc-47de-8a66-5eb981e14192',
    uuid: '956ad0db-7afb-47e8-9b4d-58b45ad0c119',
    width: 1200,
  },
  name: 'Header Logo',
};

const HeaderLogo = ({logo}) => {
  logo = logo || defaultLogo;

  return (
    <div id={'HeaderLogo'}>
      <a href="/">
        <img
          src={logo.image.src}
          className={'HeaderImg'}
          alt={logo.image.alt}
        />
      </a>
    </div>
  );
};

export default HeaderLogo;
