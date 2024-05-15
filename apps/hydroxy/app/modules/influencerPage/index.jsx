import {useState, useEffect, useCallback} from 'react';
import PLPCollection, {links as plpStyles} from '~/modules/plp';
import ProductBox from '~/modules/plp/plpHorizontalProductBox';
import FireWorkCarousel from '~/modules/fireWorkCarousel';

import styles from './styles.css';
import {getIdFromGid} from '~/utils/functions/eventFunctions';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}, ...plpStyles()];
};

const InfluencerPage = ({influencer, cartConfig}) => {
  const [collection, setCollection] = useState(null);

  useEffect(() => removeDuplicateProductsFromCollection(), []);

  const removeDuplicateProductsFromCollection = useCallback(() => {
    if (influencer.influencerProducts?.length > 0) {
      const filteredProducts = influencer.plpCollection?.products?.filter(
        (product) => {
          const isDuplicated = influencer.influencerProducts.some(
            (p) => p.name === product.name,
          );
          return !isDuplicated;
        },
      );

      setCollection({
        ...collection,
        products: filteredProducts,
      });
    } else {
      setCollection(collection);
    }
  }, [influencer.plpCollection]);

  const collectionContainerStyle =
    'influencerPage_collection__container influencerPage_collection__container_2Collumns';
  const headerWrapperStyle = influencer.influencerBanner
    ? 'influencerPage_headerWrapper'
    : 'noBannerHeader';

  return (
    <div className={'influencerPage_container'}>
      <div className={headerWrapperStyle}>
        {influencer.influencerBanner && (
          <div className={'bannerBlock'}>
            {influencer.influencerBanner && (
              <img
                src={influencer.influencerBanner.asset.url + '?auto=format'}
              />
            )}
          </div>
        )}

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
        {influencer.influencerProducts?.slice(0, 4).map((product, index) => (
          <ProductBox
            key={product.id}
            is2Columns={true}
            product={product}
            analytics={{
              click: {
                actionField: {list: `${collection.name}`},
                products: [
                  {
                    name: product?.title,
                    id: getIdFromGid(product?.id),
                    price: parseFloat(
                      product?.priceRange?.minVariantPrice?.amount,
                    )?.toFixed(2),
                    category: product?.productType,
                    variant: '',
                    position: index,
                  },
                ],
              },
            }}
          />
        ))}
      </div>

      <div className={'fireWorkInfluencerWrapper'}>
        <FireWorkCarousel playlist="5zPz7g" />
      </div>

      <div className={collectionContainerStyle}>
        {influencer.influencerProducts?.slice(4, 8).map((product, index) => (
          <ProductBox
            key={product.id}
            is2Columns={true}
            product={product}
            analytics={{
              click: {
                actionField: {list: `${collection.name}`},
                products: [
                  {
                    name: product?.title,
                    id: getIdFromGid(product?.id),
                    price: parseFloat(
                      product?.priceRange?.minVariantPrice?.amount,
                    )?.toFixed(2),
                    category: product?.productType,
                    variant: '',
                    position: index,
                  },
                ],
              },
            }}
          />
        ))}
      </div>

      <div className={'influencerPage_plpWrapper'}>
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
