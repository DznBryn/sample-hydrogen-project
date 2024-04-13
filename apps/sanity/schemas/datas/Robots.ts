import {RobotIcon} from '@sanity/icons'

export default {
  name: 'robots',
  type: 'document',
  title: 'Robots.txt',
  icon: RobotIcon,
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
      initialValue: 'Content',
      readOnly: true,
    },
    {
      title: 'Text',
      name: 'content',
      description: '',
      type: 'text',
    },
  ],
}
