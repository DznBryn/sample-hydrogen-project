export default {
  name: 'carouselSlidesGroup',
  description: '',
  type: 'document',
  title: 'CarouselSlidesGroup',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'Slides',
      name: 'slides',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'reference',
          to: [{type: 'homepageCarouselv2'}],
        },
      ],
    },
  ],
}
