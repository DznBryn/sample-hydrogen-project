import richBlockType from '../../customFields/richBlockType'

export default {
  name: 'pdpTabSectionsSliderPanel',
  description: '',
  type: 'document',
  title: 'PDPTabSectionsSliderPanel',

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
      title: 'Content',
      name: 'content',
      description: "WARNING: Don't edit the content using the block tools, only HTML.",
      // type: 'minimalPTE',
      ...richBlockType,
    },
  ],
}
