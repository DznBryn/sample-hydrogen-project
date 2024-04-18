export default {
  name: 'termsConditionsPage',
  description: '',
  type: 'document',
  title: 'TermsConditionsPage',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'content',
      name: 'Content',
      description: '',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
}
