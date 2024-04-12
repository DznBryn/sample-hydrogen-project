export default {
  name: 'globalPromoBar',
  description: '',
  type: 'document',
  title: 'GlobalPromoBar',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'Discount Codes',
      name: 'discountCodes',
      description: '',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      title: 'Promo Background Color',
      name: 'promoBackgroundColor',
      type: 'color',
      options: {
        disableAlpha: true,
      },
    },
    {
      title: 'Promo Text Color',
      name: 'promoTextColor',
      type: 'color',
      options: {
        disableAlpha: true,
      },
    },
    {
      title: 'Promo Message',
      name: 'promoMessage',
      description: '',
      type: 'string',
    },
  ],
}
