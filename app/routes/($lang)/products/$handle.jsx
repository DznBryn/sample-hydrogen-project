import Layouts from '~/layouts';

import {flattenConnection} from '@shopify/hydrogen-react';
import {useLoaderData} from 'react-router';
import {PRODUCT_QUERY} from '~/utils/graphql/shopify/queries/collections';
import {json} from '@shopify/remix-oxygen';

import PDP, {links as pdpStyles} from '~/modules/pdp';
import {useMatches} from '@remix-run/react';
import {
  getCMSDoc,
  getGroupOfCMSContent,
  getProductWithCMSData,
} from '~/utils/functions/eventFunctions';
import {useMemo} from 'react';
import {
  GET_AUTO_DELIVERY_INFO_MESSAGE,
  GET_CART_PAGE_CONFIG,
  GET_CONCEALER_SHADE_IMAGES,
  GET_EXCLUSIVE_PRODUCT_BANNER_RELEASE_CONTENT,
  GET_VARIANTS_OOS,
} from '~/utils/graphql/sanity/queries';

export const links = () => {
  return [...pdpStyles()];
};

export const loader = async ({params, context}) => {
  const {handle} = params;
  const queries = [
    GET_AUTO_DELIVERY_INFO_MESSAGE,
    GET_VARIANTS_OOS,
    GET_EXCLUSIVE_PRODUCT_BANNER_RELEASE_CONTENT,
    GET_CONCEALER_SHADE_IMAGES,
    GET_CART_PAGE_CONFIG,
  ];

  const [{product}, contents] = await Promise.all([
    context.storefront.query(PRODUCT_QUERY, {
      variables: {handle},
      cache: context.storefront.CacheLong(),
    }),
    getGroupOfCMSContent(context, queries),
  ]);

  if (!product) {
    throw new Response(null, {status: 404});
  }

  const data = product
    ? {
        ...product,
        images: flattenConnection(product.images),
        variants: flattenConnection(product.variants).map((variant) => {
          return {
            ...variant,
            metafields: variant.metafields.filter(
              (metafield) => metafield !== null,
            ),
          };
        }),
        metafields: product?.metafields.filter(
          (metafield) => metafield !== null,
        ),
      }
    : null;

  return json({
    product: data,
    ...contents,
  });
};

export default function PDPPage() {
  const [root] = useMatches();
  const {
    CartPageConfig,
    product,
    ConcealerShadeImages,
    AutoDeliveryInfoMessage,
    VariantsOOS,
    ExclusiveProductBannerReleaseContent,
  } = useLoaderData();

  const productsCMSData = root.data.globalCMSData.products;

  const currentProduct = useMemo(
    () => getProductWithCMSData(product, productsCMSData),
    [product, productsCMSData],
  );

  return (
    <Layouts.MainNavFooter>
      <PDP
        product={currentProduct}
        cart={getCMSDoc(CartPageConfig, 'DefaultCart')}
        autoDeliveryInfo={getCMSDoc(
          AutoDeliveryInfoMessage,
          'Auto Delivery Details',
        )}
        shadeVariantsOos={getCMSDoc(VariantsOOS, 'shadeFinderVariants')}
        exclusiveProductBannerContent={getCMSDoc(
          ExclusiveProductBannerReleaseContent,
          'rose glose test',
        )}
        concealerImages={ConcealerShadeImages}
      />
    </Layouts.MainNavFooter>
  );
}
