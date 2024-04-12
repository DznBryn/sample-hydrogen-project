export default {
  name: 'siteWideSettingsList',
  description: '',
  type: 'document',
  title: 'SiteWideSettingsList',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'PromoDiscountMessage',
      name: 'promoDiscountMessage',
      description: '',
      type: 'string',
    },
    {
      title: 'PromoDiscount',
      name: 'promoDiscount',
      description: '',
      type: 'string',
    },
    {
      title: 'ExcludeList',
      name: 'excludeList',
      description: 'Add the slugs of the excluded products',
      type: 'array',
      of: [
        {
          description: '',
          type: 'string',
        },
      ],
    },
  ],
}
