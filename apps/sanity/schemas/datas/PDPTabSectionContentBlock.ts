export default {
  name: 'pdpTabSectionContentBlock',
  description: '',
  type: 'document',
  title: 'PDPTabSectionContentBlock',
  preview: {
    select: {
      name: 'name',
    },
    prepare({name}: {name: string}) {
      return {title: name}
    },
  },
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
      title: 'Contents',
      name: 'contents',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'reference',
          to: [{type: 'pdpTabSectionContent'}],
        },
      ],
    },
  ],
}
