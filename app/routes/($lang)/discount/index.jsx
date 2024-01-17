import {useEffect} from 'react';
import {
  createCookie,
  eraseCookie,
  getCookie,
} from '~/utils/functions/eventFunctions';

export default function Discount(discountCode) {
  const discountCodeMock = {
    name: 'TestDiscount',
    confirmationText: 'You have received a discount, congrats',
    landingUrl: '/collections/facial-cleanser',
  };
  const discount = discountCode.discountCode
    ? discountCode.discountCode
    : discountCodeMock;
  if (discount.name !== '') {
    useEffect(() => {
      if (getCookie('tulaDiscountCode') !== '') {
        eraseCookie('tulaDiscountCode');
      }
      if (getCookie('tulaDiscountText') !== '') {
        eraseCookie('tulaDiscountText');
      }
      const code = discount.code === '' ? discount.code : discount.name;
      createCookie('tulaDiscountCode', code, false);
      createCookie('tulaDiscountText', discount.confirmationText, false);
      window.location.replace(discount.landingUrl);
    });
  }
  return (
    <div>
      <h1>Discount</h1>
    </div>
  );
}
