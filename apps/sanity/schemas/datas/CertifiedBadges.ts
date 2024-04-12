export default {
  name: 'certifiedBadges',
  description: '',
  type: 'document',
  title: 'CertifiedBadges',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'Badges',
      name: 'badges',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'reference',
          to: [{type: 'customBadges'}],
        },
      ],
    },
  ],
}
