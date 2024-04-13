export default {
  name: 'autoDelivery',
  description: '',
  type: 'document',
  title: 'AutoDelivery',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'FeaturedCollection',
      name: 'featuredCollection',
      description: '',
      type: 'reference',
      to: [{type: 'productCollections'}],
    },
    {
      title: 'HeroBackgroundImage',
      name: 'heroBackgroundImage',
      description: '',
      type: 'image',
    },
    {
      title: 'HeroBackgroundMobileImage',
      name: 'heroBackgroundMobileImage',
      description: '',
      type: 'image',
    },
    {
      title: 'SectionTwoIconOne',
      name: 'sectionTwoIconOne',
      description: '',
      type: 'image',
    },
    {
      title: 'SectionTwoIconTwo',
      name: 'sectionTwoIconTwo',
      description: '',
      type: 'image',
    },
    {
      title: 'SectionTwoIconThree',
      name: 'sectionTwoIconThree',
      description: '',
      type: 'image',
    },
    {
      title: 'SectionThreeBigImage',
      name: 'sectionThreeBigImage',
      description: '',
      type: 'image',
    },
    {
      title: 'SectionThreeSmallImage',
      name: 'sectionThreeSmallImage',
      description: '',
      type: 'image',
    },
    {
      title: 'SectionThreeMobileImage',
      name: 'sectionThreeMobileImage',
      description: '',
      type: 'image',
    },
    {
      title: 'Checkmark',
      name: 'checkmark',
      description: '',
      type: 'image',
    },
    {
      title: 'FullWidthBannerImage',
      name: 'fullWidthBannerImage',
      description: '',
      type: 'image',
    },
    {
      title: 'FullWidthBannerMobileImage',
      name: 'fullWidthBannerMobileImage',
      description: '',
      type: 'image',
    },
  ],
}
