import {defineField, defineArrayMember, isReference} from 'sanity'

export default {
  name: 'shadeFinderQuizContent',
  description: '',
  type: 'document',
  title: 'ShadeFinderQuizContent',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'ShadeFinderQuizQuestions',
      name: 'shadeFinderQuizQuestions',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'reference',
          to: [{type: 'shadeFinderQuizQuestions'}],
        },
      ],
    },
    defineField({
      title: 'ShadeFinderQuizResults',
      name: 'shadeFinderQuizResults',
      description: '',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'shadeFinderQuizResults'}],
          options: {
            filter({document}) {
              const existingReferences = (
                Array.isArray(document.shadeFinderQuizResults)
                  ? document.shadeFinderQuizResults
                  : []
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
