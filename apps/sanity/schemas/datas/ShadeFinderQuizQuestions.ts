export default {
  name: 'shadeFinderQuizQuestions',
  description: '',
  type: 'document',
  title: 'ShadeFinderQuizQuestions',
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
          to: [{type: 'shadeFinderQuizAnswers'}],
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
