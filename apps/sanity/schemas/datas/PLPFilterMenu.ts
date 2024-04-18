export default {
  name: 'plpFilterMenu',
  description: '',
  type: 'document',
  title: 'PLPFilterMenu',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'Type',
      name: 'type',
      description: '',
      type: 'string',
    },
    {
      title: 'Input',
      name: 'input',
      description: '',
      type: 'string',
    },
    {
      title: 'Children',
      name: 'children',
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
