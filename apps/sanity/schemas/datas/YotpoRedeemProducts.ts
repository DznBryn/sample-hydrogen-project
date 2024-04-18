export default {
  name: 'yotpoRedeemProducts',
  description: '',
  type: 'document',
  title: 'YotpoRedeemProducts',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'Products',
      name: 'products',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'reference',
          to: [{type: 'yotpoProducts'}],
        },
      ],
    },
  ],
}
