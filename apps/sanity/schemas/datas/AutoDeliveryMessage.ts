export default {
  name: 'autoDeliveryMessage',
  description: '',
  type: 'document',
  title: 'AutoDeliveryMessage',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'Message',
      name: 'message',
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
      title: 'PromoMessage',
      name: 'promoMessage',
      description: '',
      type: 'string',
    },
    {
      title: 'LimitedTimeBadge',
      name: 'limitedTimeBadge',
      description: '',
      type: 'boolean',
    },
  ],
}
