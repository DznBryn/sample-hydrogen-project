export default {
  name: 'footers',
  description: '',
  type: 'document',
  title: 'Footers',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'NavLinkGroups',
      name: 'navLinkGroups',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'reference',
          to: [{type: 'navLinkGroups'}],
        },
      ],
    },
  ],
}
