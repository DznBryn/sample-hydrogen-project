import AddToCartButton, {
  links as addToCartButtonStyle,
} from '~/modules/addToCartButton';

import styles from './styles.css';
import {Link} from '@remix-run/react';

export const links = () => {
  return [{rel: 'stylesheet', href: styles}, ...addToCartButtonStyle()];
};

const ComparePage = ({collectionHandle, products}) => {
  function getImagesSrc(handle) {
    const product = products.filter((data) => data.handle === handle) || [{}];
    const media = product[0]?.images.nodes || [];

    return [media[0]?.url, media[1]?.url];
  }

  /* */

  return (
    <div className={'comparePage'}>
      <div className={'header'}>Compare Products</div>

      <div className={'swipeMessage'}>Swipe {<SwipeIcon />} to compare</div>

      <div className={'optionsWrapper'}>
        {products &&
          (products.length > 1 ? (
            products.map((product) => (
              <div key={product.name} className={'option'}>
                <div className={'imgContainer'}>
                  <img
                    src={getImagesSrc(product.handle)[0]}
                    alt={getImagesSrc(product.handle)[1]}
                  />
                </div>

                <div className={'title'}>
                  {product.alt_title}
                  <h2>{product.title}</h2>
                </div>

                {product.variants.nodes.length === 1 ? (
                  <AddToCartButton
                    displayPrice
                    classes={['comparePageAddToCart']}
                    availableForSale={product?.totalInventory > 0}
                    addItem={{
                      variantId: product.variants.nodes[0].id,
                      quantity: 1,
                      selling_plan_id: 0,
                      product: {
                        ...product,
                        price: parseInt(
                          product.priceRange.minVariantPrice.amount,
                        ),
                      },
                    }}
                  />
                ) : (
                  <Link
                    className={'showOptions'}
                    to={`/products/${product.handle}`}
                  >
                    Show Options
                  </Link>
                )}

                <div className={'description'}>
                  <div className={'whatItDoes'}>
                    <p>What it does:</p>
                    {product.whatItDoes}
                  </div>

                  <div className={'keyIngredints'}>
                    <p>Key Ingredients:</p>
                    <ul>
                      {product.keyIngredients &&
                        product.keyIngredients.map((data) => (
                          <li key={data}>• {data}</li>
                        ))}
                    </ul>
                  </div>

                  {product.finish?.length > 0 && (
                    <div className={'finish'}>
                      <span>Finish</span> {product.finish}
                    </div>
                  )}

                  <i>Does not contain live cultures</i>
                </div>

                <Link
                  className={'viewMoreDetails'}
                  to={`/products/${product.handle}`}
                >
                  View more details
                </Link>
              </div>
            ))
          ) : (
            <p>No products to compare</p>
          ))}
      </div>

      <Link
        className={'backToProducts'}
        to={`/collections/${collectionHandle || 'all'}`}
      >
        {'< back to products'}
      </Link>
    </div>
  );
};

export default ComparePage;

const SwipeIcon = () => (
  <svg
    width={17}
    height={17}
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.3803 10.4482L10.4832 9.00324C10.2848 8.90408 10.0723 8.85449 9.85275 8.85449H9.20817V4.60449C9.20817 4.01658 8.73359 3.54199 8.14567 3.54199C7.55775 3.54199 7.08317 4.01658 7.08317 4.60449V12.212L4.78109 11.6878C4.66456 11.6628 4.54358 11.6678 4.42955 11.7025C4.31553 11.7373 4.21224 11.8004 4.12942 11.8862L3.5415 12.4812L6.75734 15.8741C7.0265 16.1432 7.56484 16.292 7.94025 16.292H12.3036C13.0119 16.292 13.6069 15.7749 13.7061 15.0737L14.1523 11.9145C14.2373 11.3124 13.9257 10.7245 13.3803 10.4482Z"
      fill="#4C4E56"
      fillOpacity={0.8}
    />
    <path
      d="M14.2586 2.74092C13.2386 1.53676 11.0498 0.708008 8.49984 0.708008C5.94984 0.708008 3.76109 1.53676 2.74109 2.74092L1.4165 1.41634V4.95801H4.95817L3.49192 3.49176C4.20025 2.57801 6.11275 1.77051 8.49984 1.77051C10.8869 1.77051 12.7994 2.57801 13.5078 3.49176L12.0415 4.95801H15.5832V1.41634L14.2586 2.74092Z"
      fill="#4C4E56"
      fillOpacity={0.8}
    />
  </svg>
);
