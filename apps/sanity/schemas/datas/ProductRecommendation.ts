export default {
  name: 'productRecommendation',
  description: '',
  type: 'document',
  title: 'ProductRecommendation',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'Title',
      name: 'title',
      description: '',
      type: 'string',
    },
    {
      title: 'Products',
      name: 'Products',
      description: '',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'products'}],
        },
      ],
    },
  ],
}
