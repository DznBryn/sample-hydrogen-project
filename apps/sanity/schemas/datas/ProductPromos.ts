export default {
  name: 'productPromos',
  description: '',
  type: 'document',
  title: 'ProductPromos',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'PromoMessage',
      name: 'promoMessage',
      description: '',
      type: 'string',
    },
    {
      title: 'Discount',
      name: 'discount',
      description: '',
      type: 'number',
    },
    {
      title: 'VariantIds',
      name: 'variantIds',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'string',
        },
      ],
    },
    {
      title: 'ShowPromo',
      name: 'showPromo',
      description: '',
      type: 'boolean',
    },
  ],
}
