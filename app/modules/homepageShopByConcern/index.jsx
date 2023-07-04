import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const HomepageShopByConcern = ({ concerns }) => {
  return (
    <div className={'homepageShopByConcern'}>
      <a className={'concernBlock'} href={concerns[0].collectionLink}>
        <div style={{ backgroundImage: `url(${concerns[0].concernImage.asset.url})` }}>
          <h2>{concerns[0].name}</h2>
          <p>{concerns[0].linkText}</p>
        </div>
      </a>
      <a className={'concernBlock'} href={concerns[1].collectionLink}>
        <div style={{ backgroundImage: `url(${concerns[1].concernImage.asset.url})` }}>
          <h2>{concerns[1].name}</h2>
          <p>{concerns[1].linkText}</p>
        </div>
      </a>
      <a className={'concernBlock'} href={concerns[2].collectionLink}>
        <div style={{ backgroundImage: `url(${concerns[2].concernImage.asset.url})` }}>
          <h2>{concerns[2].name}</h2>
          <p>{concerns[2].linkText}</p>
        </div>
      </a>
      <a className={'concernBlock'} href={concerns[3].collectionLink}>
        <div style={{ backgroundImage: `url(${concerns[3].concernImage.asset.url})` }}>
          <h2>{concerns[3].name}</h2>
          <p>{concerns[3].linkText}</p>
        </div>
      </a>
    </div>
  );
};
export default HomepageShopByConcern;