export default {
  name: 'cookiePolicyPage',
  description: '',
  type: 'document',
  title: 'CookiePolicyPage',
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
    {
      title: 'contentThree',
      name: 'ContentThree',
      description: '',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      title: 'contentFour',
      name: 'ContentFour',
      description: '',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
}
