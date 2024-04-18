import {defineField, defineArrayMember, isReference} from 'sanity'

export default {
  name: 'concealerQuizContent',
  description: '',
  type: 'document',
  title: 'ConcealerQuizContent',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'ConcealerQuizQuestions',
      name: 'concealerQuizQuestions',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'reference',
          to: [{type: 'concealerQuizQuestions'}],
        },
      ],
    },
    defineField({
      title: 'ConcealerQuizResults',
      name: 'concealerQuizResults',
      description: '',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'concealerQuizResults'}],
          options: {
            filter({document}) {
              const existingReferences = (
                Array.isArray(document.concealerQuizResults) ? document.concealerQuizResults : []
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
