import richBlockType from '../../customFields/richBlockType'

export default {
  name: 'announcementTopBanner',
  description: '',
  type: 'document',
  title: 'AnnouncementTopBanner',
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
      ...richBlockType,
    },
    {
      title: 'Background',
      name: 'background',
      description: '',
      type: 'string',
    },
    {
      title: 'CloseButtonColor',
      name: 'closeButtonColor',
      description: '',
      type: 'string',
    },
    {
      title: 'Available',
      name: 'available',
      description: '',
      type: 'boolean',
    },
  ],
}
