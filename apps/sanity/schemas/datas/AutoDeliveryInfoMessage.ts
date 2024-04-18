import richBlockType from '../../customFields/richBlockType'

export default {
  name: 'autoDeliveryInfoMessage',
  description: '',
  type: 'document',
  title: 'AutoDeliveryInfoMessage',
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
      title: 'DisableInfomessage',
      name: 'disableInfomessage',
      description: '',
      type: 'boolean',
    },
  ],
}
