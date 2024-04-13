export default {
  name: 'shadeFinderQuizImages',
  description: '',
  type: 'document',
  title: 'ShadeFinderQuizImages',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'LabelColor',
      name: 'labelColor',
      description: '',
      type: 'string',
    },
    {
      title: 'SkinTone',
      name: 'skinTone',
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
      title: 'HelpingText',
      name: 'helpingText',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'string',
        },
      ],
    },
    {
      title: 'Image',
      name: 'image',
      description: '',
      type: 'image',
    },
  ],
}
