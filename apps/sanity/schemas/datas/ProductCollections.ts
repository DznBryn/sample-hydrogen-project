import {ImageIcon} from '@sanity/icons'
import ShopifyIcon from '../../customIcons/Shopify'

export default {
  name: 'productCollections',
  description: '',
  type: 'document',
  title: 'ProductCollections',
  icon: ShopifyIcon,
  groups: [
    {
      name: 'promoBanners',
      icon: ImageIcon,
      title: 'PromoBanners',
    },
  ],
  preview: {
    select: {
      name: 'name',
      collectionId: 'collectionId',
    },
    prepare: ({collectionId, name}) => {
      return {
        title: `${name || 'No name'}`,
        subtitle: `${collectionId || 'No collectionId'}`,
      }
    },
  },
  fields: [
    {
      title: '⚠️ Warning',
      name: 'warning',
      type: 'string',
      readOnly: true,
      initialValue:
        'No Shopify collection data present. Use Storefront API in Hydroxy to get them.',
    },
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'PromoBanner1',
      name: 'promoBanner1',
      group: 'promoBanners',
      description: '',
      type: 'reference',
      to: [{type: 'promoBanners'}],
    },
    {
      title: 'PromoPosition1',
      name: 'promoPosition1',
      group: 'promoBanners',
      description: '',
      type: 'number',
    },
    {
      title: 'PromoBanner2',
      name: 'promoBanner2',
      group: 'promoBanners',
      description: '',
      type: 'reference',
      to: [{type: 'promoBanners'}],
    },
    {
      title: 'PromoPosition2',
      name: 'promoPosition2',
      group: 'promoBanners',
      description: '',
      type: 'number',
    },
    {
      title: 'PromoBanner3',
      name: 'promoBanner3',
      group: 'promoBanners',
      description: '',
      type: 'reference',
      to: [{type: 'promoBanners'}],
    },
    {
      title: 'PromoPosition3',
      name: 'promoPosition3',
      group: 'promoBanners',
      description: '',
      type: 'number',
    },
    {
      title: 'FireworkStoryBannerID',
      name: 'fireworkStoryBannerID',
      group: 'promoBanners',
      description: 'Add the Firework Story ID',
      type: 'string',
    },
    {
      title: 'FireworkStoryPosition',
      name: 'fireworkStoryPosition',
      group: 'promoBanners',
      description: '',
      type: 'number',
    },
    {
      title: 'AdditionalProductsTitle',
      name: 'additionalProductsTitle',
      description: '',
      type: 'string',
    },
    {
      title: 'AdditionalProducts',
      name: 'additionalProducts',
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
      title: 'ShowCompareButton',
      name: 'showCompareButton',
      description: '',
      type: 'boolean',
    },
    {
      title: 'CollectionId',
      name: 'collectionId',
      description: 'Add the collection slug',
      type: 'string',
    },
  ],
}
