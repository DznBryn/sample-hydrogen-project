import {
  getCMSContent,
  getCMSDoc,
  getProductWithCMSData,
} from '~/utils/functions/eventFunctions';
import {
  GET_AUTO_DELIVERY_INFO_MESSAGE,
  GET_CART_PAGE_CONFIG,
  GET_CONCEALER_SHADE_IMAGES,
  GET_EXCLUSIVE_PRODUCT_BANNER_RELEASE_CONTENT,
  GET_VARIANTS_OOS,
} from '~/utils/graphql/sanity/queries';
import {PRODUCT_QUERY} from '~/utils/graphql/shopify/queries/collections';
import {flattenConnection} from '@shopify/hydrogen-react';
import PDP, {links as pdpStyles} from '~/modules/pdp';
import {useMatches} from '@remix-run/react';
import {useLoaderData} from 'react-router';
import {json} from '@shopify/remix-oxygen';
import Layouts from '~/layouts';
import {useMemo} from 'react';

export const links = () => {
  return [...pdpStyles()];
};

export const meta = ({data}) => {
  return [
    {title: data?.product?.seo?.title || data?.product?.handle},
    {
      name: 'description',
      content: data?.product?.seo?.description,
    },
  ];
};

export const loader = async ({params, context}) => {
  const {handle} = params;

  const [
    {product},
    AutoDeliveryInfoMessage,
    VariantsOOS,
    ExclusiveProductBannerReleaseContent,
    ConcealerShadeImages,
    CartPageConfig,
  ] = await Promise.all([
    context.storefront.query(PRODUCT_QUERY, {
      variables: {handle},
      cache: context.storefront.CacheLong(),
    }),
    getCMSContent(context, GET_AUTO_DELIVERY_INFO_MESSAGE),
    getCMSContent(context, GET_VARIANTS_OOS),
    getCMSContent(context, GET_EXCLUSIVE_PRODUCT_BANNER_RELEASE_CONTENT),
    getCMSContent(context, GET_CONCEALER_SHADE_IMAGES),
    getCMSContent(context, GET_CART_PAGE_CONFIG),
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
    AutoDeliveryInfoMessage,
    VariantsOOS,
    ExclusiveProductBannerReleaseContent,
    ConcealerShadeImages,
    CartPageConfig,
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

  const {productsCMSData} = root.data;

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
