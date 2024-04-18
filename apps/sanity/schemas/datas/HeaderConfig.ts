export default {
  name: 'headerConfig',
  description: '',
  type: 'document',
  title: 'HeaderConfig',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'HeaderNavItems',
      name: 'headerNavItems',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'reference',
          to: [{type: 'headerNavItems'}],
        },
      ],
    },
  ],
}
