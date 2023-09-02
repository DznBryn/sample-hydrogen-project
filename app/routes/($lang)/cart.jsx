import { Link, useFetcher, useLoaderData } from '@remix-run/react';
import { json } from '@shopify/remix-oxygen';
import { useEffect } from 'react';
import { API_METHODS } from '~/utils/constants';
import { cartAddItems, cartCreate, cartRemoveItems, cartUpdate, cartUpdateCustomerIdentity } from '~/utils/graphql/shopify/mutations/cart';
import { getCart } from '~/utils/graphql/shopify/queries/cart';

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

  if (!cartAction || cartAction === '') {
    return json({ message: 'Cart action not found' }, { status: 400 });
  }

  if (cartAction === 'ADD_TO_CART') {
    const lines = formData.get('lines') ? JSON.parse(String(formData.get('lines')))
      : [];

    // console.log('LINES:', lines);
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
    const updatesLines = formData.get('lines') ? JSON.parse(String(formData.get('lines'))) : [];
    if (updatesLines.length === 0) {
      return json({ message: 'No lines to update' }, { status: 400 });
    }

    result = await cartUpdate({
      cartId,
      lines: updatesLines,
      storefront
    });

    cartId = result?.cart?.id;
  }

  if (cartAction === 'UPDATE_BUYER_IDENTITY') {
    const customer = formData.get('buyerIdentity') ? JSON.parse(String(formData.get('buyerIdentity'))) : {};
    console.log('BUYER ID:', customer);

    result = cartId ? await cartUpdateCustomerIdentity({
      cartId,
      buyerIdentity: {
        ...customer,
        customerAccessToken
      }
    }) : await cartCreate({
      input: {
        buyerIdentity: {
          ...customer,
          customerAccessToken
        }
      },
      storefront
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

  const { cart, errors } = result;
  return json({ cart, errors }, { status, headers });
}

export async function loader({ context }) {
  const cart = await getCart(context);
  return { cart };
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
      </h2>
      <Link
        to="/"
        className=""
      >
        Continue shopping
      </Link>
    </div>
  );
}

export function UpdateCartButton({ /*children,*/ lines }) {
  const fetcher = useFetcher();
  useEffect(() => {
    console.log(fetcher.state);
    if (fetcher.state === 'submitting') {
      console.log(fetcher);
    }
  }, [fetcher.state]);
  return (
    <fetcher.Form action="/cart" method={API_METHODS.POST}>
      <input type="hidden" name="cartAction" value={'UPDATE_CART'} />
      <input type="hidden" name="lines" value={JSON.stringify(lines)} />
      <button
        className="plus"
        name="increase-quantity"
        type='submit'
        aria-label="Increase quantity"
      >
        <span></span><span style={{ display: 'none' }} className="ae-compliance-indent"> Increase Quantity </span>
        <span style={{ display: 'none' }} className="ae-compliance-indent">  </span>
      </button>
    </fetcher.Form>
  );
}