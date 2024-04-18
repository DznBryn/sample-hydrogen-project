export default {
  name: 'searchConfig',
  description: '',
  type: 'document',
  title: 'SearchConfig',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'SearchTags',
      name: 'searchTags',
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
      title: 'SearchProducts',
      name: 'searchProducts',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'reference',
          to: [{type: 'products'}],
        },
      ],
    },
  ],
}
