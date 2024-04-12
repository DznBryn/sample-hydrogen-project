export default {
  name: 'quizAnswers',
  description: '',
  type: 'document',
  title: 'QuizAnswers',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'AnswerText',
      name: 'answerText',
      description: '',
      type: 'string',
    },
    {
      title: 'AnswerType',
      name: 'answerType',
      description: '',
      type: 'string',
    },
    {
      title: 'Qualifiers',
      name: 'qualifiers',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'reference',
          to: [{type: 'qualifiers'}],
        },
      ],
    },
    {
      title: 'SubQuestion',
      name: 'subQuestion',
      description: '',
      type: 'reference',
      to: [{type: 'quizQuestions'}],
    },
    {
      title: 'Images',
      name: 'images',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'image',
        },
      ],
    },
    {
      title: 'AnswerSubCopy',
      name: 'answerSubCopy',
      description: '',
      type: 'string',
    },
  ],
}
