import {redirect} from '@remix-run/server-runtime';

export function loader({params, request}) {
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
  const redirectLink = paramsArray.join('&').replace('?&', '?');

  const cookies = {
    tulaDiscountCode: `tulaDiscountCode=${params.code}; Path=/;  HttpOnly; Secure`,
    tulaDiscountText: `tulaDiscountText=${
      params.code ? '' : ''
    }; Path=/;  HttpOnly; Secure`,
  };
  headers.append('Set-Cookie', cookies.tulaDiscountCode);
  headers.append('Set-Cookie', cookies.tulaDiscountText);

  return redirect(redirectLink ?? '/', {
    headers,
  });
}
export default function Discount() {
  return (
    <div>
      <h1>Discount</h1>
    </div>
  );
}
