export default {
  name: 'mobileNavbar',
  description: '',
  type: 'document',
  title: 'MobileNavbar',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'NavbarItems',
      name: 'navbarItems',
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
