import { useState, useEffect, useCallback } from 'react';
import PLPCollection, { links as plpStyles } from '~/modules/plp';
import ProductBox from '~/modules/plp/plpHorizontalProductBox';
import FireWorkCarousel from '~/modules/fireWorkCarousel';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...plpStyles(),
  ];
};

const InfluencerPage = ({ influencer, cartConfig }) => {

  const [collection, setCollection] = useState(null);

  useEffect(() => removeDuplicateProductsFromCollection(), []);

  const removeDuplicateProductsFromCollection = useCallback(() => {
    if (influencer.influencerProducts?.length > 0) {
      const filteredProducts = influencer.plpCollection?.products?.filter(product => {
        const isDuplicated = influencer.influencerProducts.some(p => p.name === product.name);
        return !isDuplicated;
      });

      setCollection({
        ...collection,
        products: filteredProducts
      });
    }
    else {
      setCollection(collection);
    }
  }, [influencer.plpCollection]);

  const collectionContainerStyle = 'collection__container collection__container_2Collumns';
  const headerWrapperStyle = influencer.influencerBanner ? 'influencerPage_headerWrapper' : 'noBannerHeader';

  return (
    <div className={'influencerPage_container'}>
      <div className={headerWrapperStyle}>
        {influencer.influencerBanner &&
          <div className={'bannerBlock'}>{influencer.influencerBanner && <img src={influencer.influencerBanner.asset.url} />}
          </div>}

        <div className={'infoBlock'}>
          <span className={'influencerTitle'}>
            {influencer.influencerTitle}
          </span>
          <span className={'influencerDescription'}>
            {influencer.influencerDescription}
          </span>
        </div>
      </div>

      <div className={collectionContainerStyle}>
        {influencer.influencerProducts?.slice(0, 4).map(product => (
          <ProductBox
            key={product.id}
            is2Columns={true}
            product={product}
          />
        ))}
      </div>

      <div className={'fireWorkInfluencerWrapper'}>
        <FireWorkCarousel playlist="5zPz7g" />
      </div>

      <div className={collectionContainerStyle}>
        {influencer.influencerProducts?.slice(4, 8).map(product => (
          <ProductBox
            key={product.id}
            is2Columns={true}
            product={product}
          />
        ))}
      </div>

      <div className={'plpWrapper'}>
        <div className={'productsTitle'}>
          <h2>{influencer.plpTitle}</h2>
        </div>

        {collection && (
          <PLPCollection
            collection={collection}
            isInfluencerPage={true}
            cartConfig={cartConfig}
          />
        )}
      </div>
    </div>
  );
};

export default InfluencerPage;