import richBlockType from '../../customFields/richBlockType'

export default {
  name: 'quizQuestions',
  description: '',
  type: 'document',
  title: 'QuizQuestions',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'QuestionText',
      name: 'questionText',
      description: '',
      type: 'string',
    },
    {
      title: 'QuestionType',
      name: 'questionType',
      description: '',
      type: 'string',
    },
    {
      title: 'MultipleChoice',
      name: 'multipleChoice',
      description: '',
      type: 'number',
    },
    {
      title: 'TextBox',
      name: 'textBox',
      ...richBlockType,
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
          to: [{type: 'quizAnswers'}],
        },
      ],
    },
  ],
}
