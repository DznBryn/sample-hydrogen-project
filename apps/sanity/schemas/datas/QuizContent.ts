import {defineField, defineArrayMember, isReference} from 'sanity'

export default {
  name: 'quizContent',
  description: '',
  type: 'document',
  title: 'QuizContent',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'QuizBannerContent',
      name: 'quizBannerContent',
      description: '',
      type: 'reference',
      to: [{type: 'quizBannerContent'}],
    },
    {
      title: 'QuizQuestions',
      name: 'quizQuestions',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'reference',
          to: [{type: 'quizQuestions'}],
        },
      ],
    },
    defineField({
      title: 'QuizResults',
      name: 'quizResults',
      description: '',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'quizResults'}],
          options: {
            filter({document}) {
              const existingReferences = (
                Array.isArray(document.quizResults) ? document.quizResults : []
              )
                .filter(isReference)
                .map((ref) => ref._ref)

              return existingReferences.length
                ? {
                    filter: `!(_id in $existingReferences)`,
                    params: {
                      existingReferences,
                    },
                  }
                : {}
            },
          },
        }),
      ],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      title: 'QuizAdvancedResults',
      name: 'quizAdvancedResults',
      description: '',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'quizAdvancedResults'}],
          options: {
            filter({document}) {
              const existingReferences = (
                Array.isArray(document.quizAdvancedResults) ? document.quizAdvancedResults : []
              )
                .filter(isReference)
                .map((ref) => ref._ref)

              return existingReferences.length
                ? {
                    filter: `!(_id in $existingReferences)`,
                    params: {
                      existingReferences,
                    },
                  }
                : {}
            },
          },
        }),
      ],
      validation: (rule) => rule.unique(),
    }),
  ],
}
