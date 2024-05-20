import {useEffect, useState} from 'react';
import {useLocation} from '@remix-run/react';
import {rebuyRecommendationsRequest} from '~/utils/services/rebuy';
import {getIdFromGid} from '~/utils/functions/eventFunctions';
import RebuyProductBox from '../rebuyProductBox';
import styles from './styles.css';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

const RebuyRecommendation = ({widgetId, product}) => {
  let [rebuyData, setRebuyData] = useState(null);

  const variantIds = product.variants.map(
    (variant) => `${getIdFromGid(variant.id)}`,
  );

  const requestParameters = new URLSearchParams({
    format: 'pretty',
    shopify_product_ids: getIdFromGid(product.id),
    shopify_variant_ids: variantIds,
  });

  useEffect(() => {
    const callRebuy = async () => {
      try {
        const data = await rebuyRecommendationsRequest({
          widgetId,
          requestParameters,
        });
        if (typeof data === 'object') {
          setRebuyData(data);
          document
            .getElementById('rebuy-recommendations-wrapper')
            .scrollTo(0, 0);
        }
      } catch (err) {
        console.log(err);
      }
    };

    callRebuy();
  }, [useLocation().pathname]);

  return (
    <div id="rebuy-wrapper">
      <h2 className="section-title">you may also like</h2>
      <div id="rebuy-recommendations-wrapper" className="product-box-wrapper">
        {rebuyData?.data?.slice(0, 4).map((product) => (
          <RebuyProductBox key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RebuyRecommendation;
