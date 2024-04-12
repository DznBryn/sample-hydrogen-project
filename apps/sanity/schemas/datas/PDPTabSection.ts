export default {
  name: 'pdpTabSection',
  description: '',
  type: 'document',
  title: 'PDPTabSection',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'TabName',
      name: 'tabName',
      description: '',
      type: 'string',
    },
    {
      title: 'Button',
      name: 'button',
      description: '',
      type: 'reference',
      to: [{type: 'pdpTabSectionButton'}],
    },
    {
      title: 'ContentBlock',
      name: 'contentBlock',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'reference',
          to: [{type: 'pdpTabSectionContentBlock'}],
        },
      ],
    },
    {
      title: 'UseBackgroundGradient',
      name: 'useBackgroundGradient',
      description: '',
      type: 'boolean',
    },
  ],
}
