export default {
  name: 'quizAdvancedResults',
  description: '',
  type: 'document',
  title: 'QuizAdvancedResults',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'ProductId',
      name: 'productId',
      description: '',
      type: 'string',
    },
    {
      title: 'QuizAttributes',
      name: 'quizAttributes',
      description: '',
      type: 'reference',
      to: [{type: 'quizAttributes'}],
    },
  ],
}
