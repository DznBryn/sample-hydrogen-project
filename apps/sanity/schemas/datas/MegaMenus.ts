export default {
  name: 'megaMenus',
  description: '',
  type: 'document',
  title: 'MegaMenus',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'LeftBackgroundMedia',
      name: 'leftBackgroundMedia',
      description: '',
      type: 'image',
    },
    {
      title: 'LeftCta',
      name: 'leftCta',
      description: '',
      type: 'string',
    },
    {
      title: 'LeftCtaUrl',
      name: 'leftCtaUrl',
      description: '',
      type: 'string',
    },
    {
      title: 'RightBackgroundMedia',
      name: 'rightBackgroundMedia',
      description: '',
      type: 'image',
    },
    {
      title: 'RightCta',
      name: 'rightCta',
      description: '',
      type: 'string',
    },
    {
      title: 'RightCtaUrl',
      name: 'rightCtaUrl',
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
