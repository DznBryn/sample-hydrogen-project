export default {
  name: 'concealerQuizQuestions',
  description: '',
  type: 'document',
  title: 'ConcealerQuizQuestions',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'Answers',
      name: 'answers',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'reference',
          to: [{type: 'concealerQuizAnswers'}],
        },
      ],
    },
    {
      title: 'MultipleChoice',
      name: 'multipleChoice',
      description: '',
      type: 'number',
    },
    {
      title: 'QuestionText',
      name: 'questionText',
      description: '',
      type: 'string',
    },
  ],
}
