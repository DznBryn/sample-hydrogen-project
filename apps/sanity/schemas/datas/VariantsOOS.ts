export default {
  name: 'variantsOOS',
  description: '',
  type: 'document',
  title: 'VariantsOOS',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'StorefrontId',
      name: 'storefrontId',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'string',
        },
      ],
    },
  ],
}
