export default {
  name: 'concealerQuizResults',
  description: '',
  type: 'document',
  title: 'ConcealerQuizResults',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'ShadeRecommended',
      name: 'shadeRecommended',
      description: '',
      type: 'string',
    },
    {
      title: 'AdditionalRecommendation',
      name: 'additionalRecommendation',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'string',
        },
      ],
    },
    {
      title: 'BackgroundColor',
      name: 'backgroundColor',
      description: '',
      type: 'string',
    },
    {
      title: 'RadiantRecommendation',
      name: 'radiantRecommendation',
      description: '',
      type: 'string',
    },
    {
      title: 'ResultImage',
      name: 'resultImage',
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
      title: 'QuizAttributes',
      name: 'quizAttributes',
      description: '',
      type: 'reference',
      to: [{type: 'quizAttributes'}],
    },
  ],
}
