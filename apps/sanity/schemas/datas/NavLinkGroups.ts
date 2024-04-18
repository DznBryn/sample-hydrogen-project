export default {
  name: 'navLinkGroups',
  description: '',
  type: 'document',
  title: 'NavLinkGroups',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'DisplayText',
      name: 'displayText',
      description: '',
      type: 'string',
    },
    {
      title: 'Url',
      name: 'url',
      description: '',
      type: 'string',
    },
    {
      title: 'NavLinks',
      name: 'navLinks',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'reference',
          to: [{type: 'navLinks'}],
        },
      ],
    },
    {
      title: 'FontColorHex',
      name: 'fontColorHex',
      description: '',
      type: 'string',
    },
    {
      title: 'Emoji',
      name: 'emoji',
      description: '',
      type: 'image',
    },
    {
      title: 'Order',
      name: 'order',
      description: '',
      type: 'number',
    },
  ],
}
