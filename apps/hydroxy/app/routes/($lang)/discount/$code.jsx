import {redirect} from '@remix-run/server-runtime';

export async function loader({params, request}) {
  const headers = new Headers();
  const parsedUrl = new URL(request.url);

  let paramsArray = [];
  parsedUrl.searchParams.forEach((value, key) => {
    if (key === 'redirect') {
      paramsArray.push(`${value}?`);
    }
    if (key !== 'redirect') {
      paramsArray.push(`${key}=${value}`);
    }
  });

  let redirectLink;
  if (paramsArray.length === 0) {
    redirectLink = `/${parsedUrl?.pathname?.split('/')[2]}`;
  } else {
    redirectLink =
      paramsArray.join('&').replace('?&', '?') +
      `&discount_code=${params.code}`;
  }

  const cookies = {
    tulaDiscountCode: `discount_code=${params.code};Path=/;HttpOnly;Secure`,
    tulaDiscountText: `tulaDiscountText=${
      params.code ? '' : ''
    };Path=/;HttpOnly;Secure`,
  };

  headers.append('Set-Cookie', cookies.tulaDiscountCode);
  headers.append('Set-Cookie', cookies.tulaDiscountText);

  return redirect(redirectLink ?? '/', {
    headers,
  });
}
