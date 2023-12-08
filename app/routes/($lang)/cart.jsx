import {redirect} from '@remix-run/server-runtime';
import {json} from '@shopify/remix-oxygen';
import {
  cartAddItems,
  cartCreate,
  cartRemoveItems,
  cartUpdate,
  cartUpdateCustomerIdentity,
} from '~/utils/graphql/shopify/mutations/cart';

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

    // console.log('LINES:', lines);
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
    console.log('Remove', formData.get('linesIds'));
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
    console.log('BUYER ID:', customer);

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
  return json({cart, errors}, {status, headers});
}

export async function loader() {
  return redirect('/?cart=show', 301);
}
