import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const HomepageShopByConcern = ({concerns}) => {
  /**
   * paleative approach to sort
   * the content since Sanity
   * doens't accept ordering
   * on CMS doc content.
   */

  const _1 = concerns[2];
  const _2 = concerns[0];
  const _3 = concerns[3];
  const _4 = concerns[1];

  return (
    <div className={'homepageShopByConcern'}>
      <a className={'concernBlock'} href={_1.collectionLink}>
        <div
          style={{
            backgroundImage: `url(${
              _1.concernImage.asset.url + '?auto=format'
            })`,
          }}
        >
          <h2>{_1.name}</h2>
          <p>{_1.linkText}</p>
        </div>
      </a>
      <a className={'concernBlock'} href={_2.collectionLink}>
        <div
          style={{
            backgroundImage: `url(${
              _2.concernImage.asset.url + '?auto=format'
            })`,
          }}
        >
          <h2>{_2.name}</h2>
          <p>{_2.linkText}</p>
        </div>
      </a>
      <a className={'concernBlock'} href={_3.collectionLink}>
        <div
          style={{
            backgroundImage: `url(${
              _3.concernImage.asset.url + '?auto=format'
            })`,
          }}
        >
          <h2>{_3.name}</h2>
          <p>{_3.linkText}</p>
        </div>
      </a>
      <a className={'concernBlock'} href={_4.collectionLink}>
        <div
          style={{
            backgroundImage: `url(${
              _4.concernImage.asset.url + '?auto=format'
            })`,
          }}
        >
          <h2>{_4.name}</h2>
          <p>{_4.linkText}</p>
        </div>
      </a>
    </div>
  );
};
export default HomepageShopByConcern;
