export default {
  name: 'yotpoFaq',
  description: '',
  type: 'document',
  title: 'YotpoFaq',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'YotpoQuestions',
      name: 'yotpoQuestions',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'reference',
          to: [{type: 'yotpoQuestions'}],
        },
      ],
    },
  ],
}
