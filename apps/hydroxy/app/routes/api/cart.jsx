import {redirect} from '@remix-run/server-runtime';
import {json} from '@shopify/remix-oxygen';
import {
  cartAddItems,
  cartCreate,
  cartRemoveItems,
  cartUpdate,
  cartUpdateCustomerIdentity,
} from '~/utils/graphql/shopify/mutations/cart';
import {getCart} from '~/utils/graphql/shopify/queries/cart';

//

export async function action({request, context}) {
  const {session, storefront} = context;
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

  if (!cartAction || cartAction === '') {
    return json({message: 'Cart action not found'}, {status: 400});
  }

  if (cartAction === 'ADD_TO_CART') {
    const lines = formData.get('lines')
      ? JSON.parse(String(formData.get('lines')))
      : [];

    if (!cartId) {
      result = await cartCreate({
        input: countryCode ? {lines, buyerIdentity: {countryCode}} : {lines},
        storefront,
      });
    } else {
      result = await cartAddItems({
        cartId,
        lines,
        storefront,
      });
    }
    cartId = result?.cart?.id;
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

    cartId = result?.cart?.id;
  }

  if (cartAction === 'UPDATE_CART') {
    const updatesLines = formData.get('lines')
      ? JSON.parse(String(formData.get('lines')))
      : [];
    if (updatesLines.length === 0) {
      return json({message: 'No lines to update'}, {status: 400});
    }
    result = await cartUpdate({
      cartId,
      lines: updatesLines,
      storefront,
    });

    cartId = result?.cart?.id;
  }

  if (cartAction === 'UPDATE_BUYER_IDENTITY') {
    const customer = formData.get('buyerIdentity')
      ? JSON.parse(String(formData.get('buyerIdentity')))
      : {};

    result = cartId
      ? await cartUpdateCustomerIdentity({
          cartId,
          buyerIdentity: {
            ...customer,
            customerAccessToken,
          },
        })
      : await cartCreate({
          input: {
            buyerIdentity: {
              ...customer,
              customerAccessToken,
            },
          },
          storefront,
        });

    cartId = result?.cart?.id;
  }

  session.set('cartId', cartId);
  headers.set('Set-Cookie', await session.commit());

  const redirectTo = formData.get('redirectTo') ?? null;

  const isLocalPath = (url) => {
    try {
      new URL(url);
    } catch (error) {
      return true;
    }
    return false;
  };

  if (typeof redirectTo === 'string' && isLocalPath(redirectTo)) {
    status = 303;
    headers.set('Location', redirectTo);
  }

  const {cart, errors} = result;
  let cartData = null;

  if (!cart?.lines) {
    if (cart?.id) {
      cartData = await getCart(context, cart.id);
    }
  }
  return json({cart: cartData ?? cart, errors}, {status, headers});
}

//

export async function loader({context, request}) {
  const url = new URL(request.url);
  const fetcherLoad = url.searchParams.get('fetcherLoad');

  if (!fetcherLoad) return redirect('/', 302);

  //

  const [cartId] = await Promise.all([context.session.get('cartId')]);

  const cart = cartId ? await getCart(context, cartId) : {};

  return json({cart});
}
