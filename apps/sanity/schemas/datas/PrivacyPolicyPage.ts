export default {
  name: 'privacyPolicyPage',
  description: '',
  type: 'document',
  title: 'PrivacyPolicyPage',
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
    {
      title: 'contentTwo',
      name: 'ContentTwo',
      description: '',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
}
