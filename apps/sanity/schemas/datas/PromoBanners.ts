export default {
  name: 'promoBanners',
  description: 'PLP Promo Banners',
  type: 'document',
  title: 'PromoBanners',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'ImageMobile',
      name: 'imageMobile',
      description: '',
      type: 'image',
    },
    {
      title: 'ImageDesktop',
      name: 'imageDesktop',
      description: '',
      type: 'image',
    },
    {
      title: 'Url',
      name: 'url',
      description: 'Link to go on click.',
      type: 'string',
    },
  ],
}
