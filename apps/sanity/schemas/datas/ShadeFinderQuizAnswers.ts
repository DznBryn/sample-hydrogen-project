export default {
  name: 'shadeFinderQuizAnswers',
  description: '',
  type: 'document',
  title: 'ShadeFinderQuizAnswers',
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
      title: 'Image',
      name: 'image',
      description: '',
      type: 'reference',
      to: [{type: 'shadeFinderQuizImages'}],
    },
    {
      title: 'HelpingText',
      name: 'helpingText',
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
      title: 'SubQuestion',
      name: 'subQuestion',
      description: '',
      type: 'reference',
      to: [{type: 'shadeFinderQuizQuestions'}],
    },
  ],
}
