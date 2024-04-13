export default {
  name: 'smsSignUp',
  description: '',
  type: 'document',
  title: 'SmsSignUp',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'Headline',
      name: 'headline',
      description: '',
      type: 'string',
    },
    {
      title: 'SubCopy',
      name: 'subCopy',
      description: '',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      title: 'CtaLabel',
      name: 'ctaLabel',
      description: '',
      type: 'string',
    },
    {
      title: 'Disclaimer',
      name: 'disclaimer',
      description: '',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      title: 'ImageText',
      name: 'imageText',
      description: '',
      type: 'string',
    },
    {
      title: 'BackgroundImage',
      name: 'backgroundImage',
      description: '',
      type: 'image',
    },
  ],
}
