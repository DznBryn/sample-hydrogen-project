import { useRef, useState, useEffect } from 'react';
import { useCartActions } from '~/hooks/useCart';
import { triggerAnalyticsOnScroll, prepProduct } from '~/utils/functions/eventFunctions';
import ProductBoxLoading, { links as productBoxLoadingStyles } from '../productBoxLoading';
import PLPProductBox, { links as plpProductBoxStyles } from '../plpProductBox';
import { PDPSliderPanelTitle, links as pdpPanelSliderStyles } from '../pdpPanelSlider';

import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...productBoxLoadingStyles(),
    ...pdpPanelSliderStyles(),
    ...plpProductBoxStyles(),
  ];
};

const mockListrak = {
  listrakId: 'fb44285e-a4de-45ab-97a5-46db11bced2c',
  title: 'boost your tula routine with these',
  name: 'Shopping Cart',
};

let listLoading = false;
let recs = [];
let products = [];

const PDPListrakRec = ({ listrak, product, title }) => {
  
  //useYotpoReviewsRefresh();
  
  const listrackConfig = listrak?.listrakId ? listrak : mockListrak;
  const { fetchProduct } = useCartActions();
  let [loader, setLoader] = useState(0);
  const getProductData = async productHandle => {
    return await fetchProduct(productHandle);
  };

  const getProduct = handle => {
    return new Promise((resolve, reject) => {
      try {
        getProductData({ id: handle }).then(result => {
          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  const getProductPromise = async handle => {
    return getProduct(handle);
  };

  const getReccomededProducts = handles => {
    return Promise.all(
      handles.map(handle => {
        return getProductPromise(handle);
      }),
    );
  };

  const ListrakProductsContainer = useRef(null);
  useEffect(() => {
    const dlProducts = [];
    if (typeof window._ltk !== 'undefined' && recs.length < 4) {
      window._ltk.Recommender.AddSku(product?.variants[0].externalId);
      window._ltk.Recommender.Render();
    }
    if (recs.length === 0 && recs.length < 3) {
      setTimeout(() => {
        document.querySelectorAll('.product_img').forEach(elem => {
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
    } //else{
    if (products.length === 0 && recs.length > 0) {
      //const handleRegex = /(?<=products\/)((?!\?|\$).)+/;
      const handles = [];
      recs.forEach(rec => {
        let handle = rec.replace(window.location.origin + '/products/', '');
        handle = handle.substring(0, handle.indexOf('?'));
        if (handle !== null && handle !== '24-7-hydrating-day-night-eye-balm') {
          handles.push(handle);
        }
      });
      getReccomededProducts(handles)
        .then(results => {
          if (results.length > 0) {
            products = results;

            setLoader(++loader);
          }
          // Product list here

          results.forEach((prod, index) => {
            return dlProducts.push({
              name: `${prod.name}`,
              id: `${prod.id}`,
              price: `${prod.price}`,
              category: `${prod.type}`,
              position: index,
            });
          });
          // console.log('PLP PDP', dlProducts)

          triggerAnalyticsOnScroll(ListrakProductsContainer.current, dlProducts, 'Product Page');
        })
        .catch(() => {});
    }
    //}
  });

  return (
    <div className={'listrakRecWrap'}>
      <div className={'listrackWrap'}>
        <div
          className="product-grid product_list"
          data-ltk-merchandiseblock={listrackConfig?.listrakId}
          data-quickbuy-wrapper
        >
          <script type="text/html">
            <div
              className="item product product_item"
              data-quickbuy="true"
              data-handle="@Recommendation.Meta5"
            >
              <a className="product_img main-img" href="@Recommendation.LinkUrl">
                <img src="@Recommendation.ImageUrl" />
              </a>
              <div className="product_info">
                <h4>
                  <a href="@Recommendation.LinkUrl">
                    @(Recommendation.Meta1 != &quot;null&quot; ? &apos;
                    <span className="alt-title">&apos; + Recommendation.Meta1 + &apos;</span>&apos; : &apos;&apos;)
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
          <div className={'listHeader'}>
            <PDPSliderPanelTitle data={{ title: (title || listrackConfig.title) }} />
          </div>
          <div className={'listProducts'} ref={ListrakProductsContainer}>
            {products.length === 0 &&
              [1, 2, 3, 4].map((value) => {
                return <ProductBoxLoading key={value}/>;
              })}
            {products.length > 0 &&
              products.map((product, index) => {
                return (
                  <PLPProductBox
                    key={product.id}
                    product={prepProduct(product)}
                    analytics={{
                      click: {
                        actionField: { list: 'Product Page' },
                        products: [
                          {
                            name: product?.title,
                            id: product?.id,
                            price: parseFloat(product?.priceRange?.minVariantPrice?.amount)?.toFixed(2),
                            category: product?.productType,
                            variant: '',
                            position: index,
                          },
                        ],
                      },
                    }}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PDPListrakRec;
