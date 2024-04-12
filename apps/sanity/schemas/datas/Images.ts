export default {
  name: 'images',
  description: '',
  type: 'document',
  title: 'Images',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'Alt',
      name: 'alt',
      description: '',
      type: 'string',
    },
    {
      title: 'Role',
      name: 'role',
      description: '',
      type: 'string',
    },
    {
      title: 'Images',
      name: 'images',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'image',
        },
      ],
    },
  ],
}
