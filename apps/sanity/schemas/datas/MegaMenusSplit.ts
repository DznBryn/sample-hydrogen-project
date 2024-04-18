export default {
  name: 'megaMenuSplit',
  description: '',
  type: 'document',
  title: 'MegaMenuSplit',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'BackgroundImage',
      name: 'backgroundImage',
      description: '',
      type: 'image',
    },
    {
      title: 'ImageText',
      name: 'imageText',
      description: '',
      type: 'string',
    },
    {
      title: 'ImageTextCta',
      name: 'imageTextCta',
      description: '',
      type: 'string',
    },
    {
      title: 'ImageCollectionLink',
      name: 'imageCollectionLink',
      description: '',
      type: 'reference',
      to: [{type: 'productCollections'}],
    },
    {
      title: 'MenuCollections',
      name: 'menuCollections',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'reference',
          to: [{type: 'productCollections'}],
        },
      ],
    },
  ],
}
