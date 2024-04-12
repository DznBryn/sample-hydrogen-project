export default {
  name: 'quizAttributes',
  description: '',
  type: 'document',
  title: 'QuizAttributes',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'Category',
      name: 'category',
      description: '',
      type: 'string',
    },
    {
      title: 'Default',
      name: 'default',
      description: '',
      type: 'boolean',
    },
    {
      title: 'PriorityOrder',
      name: 'priorityOrder',
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
  ],
}
