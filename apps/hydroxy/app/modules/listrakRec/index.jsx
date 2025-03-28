import {useEffect, useState} from 'react';
import {useCollection} from '~/hooks/useCollection';
import {getIdFromGid, prepProduct} from '~/utils/functions/eventFunctions';
import ProductBoxLoading, {
  links as productBoxLoadingStyles,
} from '../productBoxLoading';
import PLPProductBox, {
  links as plpProductBoxStyles,
} from '../plp/plpProductBox';
import {
  PDPSliderPanelTitle,
  links as pdpPanelSliderStyles,
} from '../pdp/pdpPanelSlider';

import styles from './styles.css';

export const links = () => {
  return [
    {rel: 'stylesheet', href: styles},
    ...productBoxLoadingStyles(),
    ...plpProductBoxStyles(),
    ...pdpPanelSliderStyles(),
  ];
};

let listLoading = false;
let recs = [];
let recProducts = [];

const ListrakRec = ({listrak}) => {
  const listrackConfig = listrak;
  let [loader, setLoader] = useState(0);
  const {state, products} = useCollection('all');
  let [handles, setHandles] = useState([]);

  useEffect(() => {
    if (typeof _ltk !== 'undefined' && recs.length < 4) {
      window._ltk.Recommender.Render();
    }

    if (recs.length === 0 && recs.length < 3) {
      setTimeout(() => {
        document.querySelectorAll('.product_img').forEach((elem) => {
          if (
            recs.indexOf(elem.href) === -1 &&
            elem.href.indexOf('@Recommendation.LinkUrl') === -1
          ) {
            recs.push(elem.href);
          }
        });
        listLoading = true;
        setLoader(++loader);
      }, 2000);
    }

    if (recProducts.length === 0 && recs.length > 0) {
      let a = [];

      recs.forEach((rec) => {
        let handle = rec.replace(window.location.origin + '/products/', '');
        handle = handle.substring(0, handle.indexOf('?'));

        if (handle !== null && handle !== '24-7-hydrating-day-night-eye-balm') {
          a.push(handle);
        }
      });

      setHandles(a);
    }
  });

  useEffect(() => {
    if (state === 'loaded') {
      recProducts = handles
        .map((slug) => {
          return products.filter((product) => product.handle === slug)[0];
        })
        .filter((prod) => prod !== undefined);
    }
  }, [state, handles]);

  return (
    <div className={'listrakRecWrap'}>
      <div className={'listrackWrap'}>
        <div
          className="product-grid product_list"
          data-ltk-merchandiseblock={listrak?.listrakId}
          data-quickbuy-wrapper
        >
          <script type="text/html">
            <div
              className="item product product_item"
              data-quickbuy="true"
              data-handle="@Recommendation.Meta5"
            >
              <a
                className="product_img main-img"
                href="@Recommendation.LinkUrl"
              >
                <img src="@Recommendation.ImageUrl" />
              </a>
              <div className="product_info">
                <h4>
                  <a href="@Recommendation.LinkUrl">
                    @(Recommendation.Meta1 != &quot;null&quot; ? &apos;
                    <span className="alt-title">
                      &apos; + Recommendation.Meta1 + &apos;
                    </span>
                    &apos; : &apos;&apos;)
                    <span className="main-title">@Recommendation.Title</span>
                  </a>
                </h4>
              </div>
            </div>
          </script>
        </div>
      </div>
      {listLoading && (
        <div className={'listrakRec'}>
          <PDPSliderPanelTitle data={{title: listrackConfig.title}} />
          <div className={'listProducts'}>
            {recProducts.length === 0 &&
              [1, 2, 3, 4].map((n) => {
                return <ProductBoxLoading key={n} />;
              })}
            {recProducts.length > 0 &&
              recProducts.map((product) => {
                return (
                  <PLPProductBox
                    analytics={{
                      click: {
                        actionField: {list: 'PDP Recommendation'},
                        products: [
                          {
                            name: product?.title,
                            id: getIdFromGid(product?.id),
                            price: parseFloat(
                              product?.priceRange?.minVariantPrice?.amount,
                            )?.toFixed(2),
                            category: product?.productType,
                            variant: '',
                          },
                        ],
                      },
                    }}
                    product={prepProduct(product)}
                    key={product.handle}
                    fromLt
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
export default ListrakRec;
