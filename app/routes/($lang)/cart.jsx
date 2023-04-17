import { Link, useLoaderData} from '@remix-run/react';
import { json } from '@shopify/remix-oxygen';
import { cartAddItems, cartCreate, cartRemoveItems } from '~/utils/mutations/cart';
import { CART_QUERY } from '~/utils/queries/cart';

export async function action({ request, context }) {
  const { session, storefront } = context;
  const headers = new Headers();

  const [formData, storedCartId, customerAccessToken] = await Promise.all([
    request.formData(),
    session.get('cartId'),
    session.get('customerAccessToken'),
  ]);

  let cartId = storedCartId;
  let status = 200;
  let result;

  const cartAction = formData.get('cartAction');
  const countryCode = formData?.get('countryCode') ?? null;

  if (cartAction === 'ADD_TO_CART') {
    const lines = formData.get('lines') ? JSON.parse(String(formData.get('lines')))
      : [];

    if (!cartId) {
      result = await cartCreate({
        input: countryCode ? { lines, buyerIdentity: { countryCode } } : { lines },
        storefront,
      });
    } else {
      result = await cartAddItems({
        cartId,
        lines,
        storefront,
      });
    }
    cartId = result.cart.id;
  }

  if (cartAction === 'REMOVE_FROM_CART') {
    const lineIds = formData.get('linesIds')
      ? JSON.parse(String(formData.get('linesIds')))
      : [];

    if (!lineIds.length) {
      throw new Error('No line items to remove');
    }

    result = await cartRemoveItems({
      cartId,
      lineIds,
      storefront,
    });

    cartId = result.cart.id;
  }

  session.set('cartId', cartId);
  headers.set('Set-Cookie', await session.commit());

  const { cart, errors } = result;
  return json({ cart, errors }, { status, headers });
}

export async function loader({ context }) {
  const cartId = await context.session.get('cartId');
  
  const cartData = cartId ? (
    await context.storefront.query(CART_QUERY, {
      variables: {
        cartId,
        country: context.storefront?.i18n?.country,
        language: context.stroefront?.i18n?.language,
      },
      cache: context.storefront.CacheNone(),
    })
  ) : null;

  return json({ cart: cartData.cart });
}

export default function Cart() {
  const { cart } = useLoaderData();

  return cart?.totalQuantity > 0 ? (
    <div>
      <pre>{JSON.stringify(cart, null, 2)}</pre>
    </div>
  ) : (
    <div className="">
      <h2 className="">
        Your cart is empty
      </h2 >
      <Link
        to="/"
        className=""
      >
        Continue shopping
      </Link>
    </div >
  );
}
