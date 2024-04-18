import richBlockType from '../../customFields/richBlockType'

export default {
  name: 'announcementHeaders',
  description: '',
  type: 'document',
  title: 'AnnouncementHeaders',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'BackgroundColorHex',
      name: 'backgroundColorHex',
      description: '',
      type: 'string',
    },
    {
      title: 'FontColorHex',
      name: 'fontColorHex',
      description: '',
      type: 'string',
    },
    {
      title: 'ReferralText',
      name: 'referralText',
      description: '',
      type: 'string',
    },
    {
      title: 'ReferralUrl',
      name: 'referralUrl',
      description: '',
      type: 'string',
    },
    {
      title: 'PromoText',
      name: 'promoText',
      ...richBlockType,
    },
    {
      title: 'PromoModalLinkText',
      name: 'promoModalLinkText',
      description: '',
      type: 'string',
    },
    {
      title: 'Modal',
      name: 'modal',
      ...richBlockType,
    },
    {
      title: 'Emoji',
      name: 'emoji',
      description: '',
      type: 'image',
    },
    {
      title: 'Messages',
      name: 'messages',
      description: '',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'announcementMessages'}],
        },
      ],
    },
  ],
}
