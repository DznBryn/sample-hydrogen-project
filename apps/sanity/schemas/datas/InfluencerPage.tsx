import {BlockContentIcon} from '@sanity/icons'

export default {
  name: 'influencerPage',
  description: '',
  type: 'document',
  title: 'InfluencerPage',
  icon: () => <BlockContentIcon style={{color: '#ff5483'}} />,
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'PageSlug',
      name: 'pageSlug',
      description: '',
      type: 'string',
    },
    {
      title: 'InfluencerTitle',
      name: 'influencerTitle',
      description: '',
      type: 'string',
    },
    {
      title: 'InfluencerDescription',
      name: 'influencerDescription',
      description: '',
      type: 'string',
    },
    {
      title: 'InfluencerBanner',
      name: 'influencerBanner',
      description: '',
      type: 'image',
    },
    {
      title: 'InfluencerProducts',
      name: 'influencerProducts',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'reference',
          to: [{type: 'products'}],
        },
      ],
    },
    {
      title: 'PlpTitle',
      name: 'plpTitle',
      description: '',
      type: 'string',
    },
    {
      title: 'PlpCollection',
      name: 'plpCollection',
      description: '',
      type: 'reference',
      to: [{type: 'productCollections'}],
    },
  ],
}
