import richBlockType from '../../customFields/richBlockType'
import {CogIcon, PlayIcon} from '@sanity/icons'

export default {
  name: 'playground',
  title: 'Playground',
  description: '',
  type: 'document',
  icon: PlayIcon,

  groups: [
    {
      name: 'testGroup',
      icon: CogIcon,
      title: 'TestGroup',
    },
    {
      name: 'anotherTestGroup',
      title: 'AnotherTestGroup',
    },
  ],

  //testing content preview
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({title, subtitle}: {title: string; subtitle: string}) {
      return {
        title: title,
        subtitle: `> ${subtitle}`,
        media: <span style={{fontSize: '2.5rem'}}>✅</span>,
      }
    },
  },

  fields: [
    {
      name: 'title',
      title: 'Title',
      description: 'This is a description text.',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      description: '',
      type: 'string',
      initialValue: 'Some other thing',
    },
    {
      title: 'Release date',
      name: 'releaseDate',
      type: 'date',
    },
    {
      title: 'Launch Scheduled At',
      name: 'launchAt',
      type: 'datetime',
    },
    {
      name: 'imageType',
      title: 'ImageType',
      description: '',
      type: 'image',
    },
    {
      title: 'Manuscript',
      name: 'manuscript',
      type: 'file',
    },
    {
      title: 'Launchpad Location',
      name: 'location',
      type: 'geopoint',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      description: 'Generate a slug from Title field',
      options: {
        source: 'title',
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
    },
    {
      title: 'Genre',
      name: 'genre',
      type: 'string',
      options: {
        list: [
          {title: 'Sci-Fi', value: 'sci-fi'},
          {title: 'Western', value: 'western'},
        ], // <-- predefined values
        layout: 'radio', // <-- defaults to 'dropdown'
      },
    },
    {
      title: 'Image URL',
      name: 'imageUrl',
      type: 'url',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
    },
    //testing conditions
    {
      name: 'hiddenCondition',
      title: 'HiddenCondition',
      description: '',
      type: 'string',
      hidden: ({document, parent, value, currentUser}) => !document?.title,
    },
    {
      name: 'readOnlyCondition',
      title: 'ReadOnlyCondition',
      description: '',
      type: 'string',
      readOnly: ({document}) => !document?.title,
    },
    {
      title: 'PromoText',
      name: 'promoText',
      ...richBlockType,
    },

    //testing groupw
    {
      name: 'seoTitle',
      title: 'SEO title',
      description: '',
      type: 'string',
      group: 'testGroup',
      options: {
        list: [
          {title: 'Alabama', value: 'AL'},
          {title: 'Alaska', value: 'AK'},
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'seoKeywords',
      title: 'Keywords',
      description: '',
      type: 'string',
      group: 'testGroup',
      validation: (Rule) => [
        Rule.required().min(10).error('A title of min. 10 characters is required'),
        Rule.max(15).warning('Shorter titles are usually better'),
      ],
    },
    {
      name: 'seoImage',
      title: 'Image',
      description: '',
      type: 'image',
      group: ['testGroup', 'anotherTestGroup'],
    },
    {
      name: 'icon',
      title: 'Icon',
      description: '',
      type: 'image',
      group: 'anotherTestGroup',
    },
  ],
}
