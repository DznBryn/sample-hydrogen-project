export default {
  name: 'headerNavItems',
  description: '',
  type: 'document',
  title: 'HeaderNavItems',
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
      title: 'LinkUrl',
      name: 'linkUrl',
      description: '',
      type: 'string',
    },
    {
      title: 'DropdownOverlay',
      name: 'dropdownOverlay',
      description: '',
      type: 'reference',
      to: [{type: 'headerDropdownOverlays'}],
    },
    {
      title: 'Emoji',
      name: 'emoji',
      description: '',
      type: 'image',
    },
    {
      title: 'FontColorHex',
      name: 'fontColorHex',
      description: '',
      type: 'string',
    },
    {
      title: 'ViewAllText',
      name: 'viewAllText',
      description: '',
      type: 'string',
    },
    {
      title: 'ViewAllLink',
      name: 'viewAllLink',
      description: '',
      type: 'string',
    },
  ],
}
