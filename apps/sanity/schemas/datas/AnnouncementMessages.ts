import richBlockType from '../../customFields/richBlockType'

export default {
  name: 'announcementMessages',
  description: '',
  type: 'document',
  title: 'AnnouncementMessages',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'AnnouncementText',
      name: 'announcementText',
      ...richBlockType,
    },
    {
      title: 'AnnouncementURL',
      name: 'announcementURL',
      description: '',
      type: 'string',
    },
    {
      title: 'Emoji',
      name: 'emoji',
      description: '',
      type: 'image',
    },
    {
      title: 'ShouldOpenModal',
      name: 'shouldOpenModal',
      description: '',
      type: 'boolean',
    },
    {
      title: 'ModalLinkText',
      name: 'modalLinkText',
      description: '',
      type: 'string',
    },
    {
      title: 'ModalContent',
      name: 'modalContent',
      ...richBlockType,
    },
    {
      title: 'ShouldOpenLink',
      name: 'shouldOpenLink',
      description: '',
      type: 'boolean',
    },
    {
      title: 'LinkToGo',
      name: 'linkToGo',
      description: '',
      type: 'string',
    },
  ],
}
