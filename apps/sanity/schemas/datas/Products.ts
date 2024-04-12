import richBlockType from '../../customFields/richBlockType'
import ShopifyIcon from '../../customIcons/Shopify'

export default {
  name: 'products',
  description: 'sasdas',
  type: 'document',
  title: 'Products',
  icon: ShopifyIcon,
  preview: {
    select: {
      productId: 'productId',
      name: 'name',
      alt_title: 'alt_title',
    },
    prepare: ({productId, name, alt_title}) => {
      return {
        title: productId || 'No productID',
        subtitle: `${name || 'No name'} - ${alt_title || 'No alt_title'}`,
      }
    },
  },
  fields: [
    {
      title: '⚠️ Warning',
      name: 'warning',
      type: 'string',
      readOnly: true,
      initialValue: 'No Shopify product data present. Use Storefront API in Hydroxy to get them.',
    },
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'Rich',
      name: 'rich',
      ...richBlockType,
    },
    {
      title: 'Alt_title',
      name: 'alt_title',
      description: '',
      type: 'string',
    },
    {
      title: 'Reviews_average',
      name: 'reviews_average',
      description: '',
      type: 'string',
    },
    {
      title: 'Reviews_count',
      name: 'reviews_count',
      description: '',
      type: 'string',
    },
    {
      title: 'ShouldShowOOSForm',
      name: 'shouldShowOOSForm',
      description: '',
      type: 'boolean',
    },
    {
      title: 'Ingredients_list',
      name: 'ingredients_list',
      description: '',
      type: 'string',
    },
    {
      title: 'Full_ingredients_list',
      name: 'full_ingredients_list',
      description: '',
      type: 'string',
    },
    {
      title: 'ProductPromos',
      name: 'productPromos',
      description: '',
      type: 'reference',
      to: [{type: 'productPromos'}],
    },
    {
      title: 'RecommendedSellingPlan',
      name: 'recommendedSellingPlan',
      description: '',
      type: 'number',
    },
    {
      title: 'Sales_rank',
      name: 'sales_rank',
      description: '',
      type: 'number',
    },
    {
      title: 'WhatItDoes',
      name: 'whatItDoes',
      description: '',
      type: 'string',
    },
    {
      title: 'KeyIngredients',
      name: 'keyIngredients',
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
      title: 'Finish',
      name: 'finish',
      description: '',
      type: 'string',
    },
    {
      title: 'Tabs',
      name: 'tabs',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'reference',
          to: [{type: 'pdpTabSection'}],
        },
      ],
    },
    {
      title: 'CertifiedBadges',
      name: 'certifiedBadges',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'reference',
          to: [{type: 'certifiedBadges'}],
        },
      ],
    },
    {
      title: 'Description_WithPriority',
      name: 'description_WithPriority',
      description: '',
      type: 'string',
    },
    {
      title: 'Benefits_WithPriority',
      name: 'benefits_WithPriority',
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
      title: 'Gallery_WithPriority',
      name: 'gallery_WithPriority',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'image',
        },
      ],
    },
    {
      title: 'ExclusiveAtcColor',
      name: 'exclusiveAtcColor',
      description: '',
      type: 'string',
    },
    {
      title: 'ExclusiveTextColor',
      name: 'exclusiveTextColor',
      description: '',
      type: 'string',
    },
    {
      title: 'ProductId',
      name: 'productId',
      description: 'Add the product slug',
      type: 'string',
    },
  ],
}
