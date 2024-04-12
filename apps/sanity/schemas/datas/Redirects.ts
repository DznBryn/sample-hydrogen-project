import {ArrowRightIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'redirects',
  title: 'Redirects',
  type: 'document',
  icon: ArrowRightIcon,
  fields: [
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: '/example',
      validation: (Rule) =>
        Rule.required()
          .custom((name) => {
            return name?.startsWith('/') ? true : 'Start the slug with /'
          })
          .warning(),
    }),
    defineField({
      name: 'destination',
      title: 'Destination',
      type: 'string',
      description: '/example',
      validation: (Rule) =>
        Rule.required()
          .custom((name) => {
            return name?.startsWith('/') || name?.startsWith('https://')
              ? true
              : 'Start the path with "/" or "https://"'
          })
          .warning(),
    }),
    defineField({
      title: 'Redirect Type',
      name: 'statusCode',
      type: 'string',
      initialValue: '301',
      options: {
        list: [
          {title: 'Temporary (302)', value: '302'},
          {title: 'Permanent (301)', value: '301'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      source: 'source',
      destination: 'destination',
      statusCode: 'statusCode',
    },
    prepare: ({source, destination, statusCode}) => {
      return {
        title: source && destination ? `${source} to ${destination}` : 'New Redirect',
        subtitle: `Redirect type: ${statusCode}`,
      }
    },
  },
})
