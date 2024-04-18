export default {
  name: 'quizBannerContent',
  type: 'document',
  title: 'QuizBannerContent',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'SkinQuizCopy',
      name: 'skinQuizCopy',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'richText'},
          ]
        }
      ]
    },
    {
      title: 'BackgroundImage',
      name: 'backgroundImage',
      type: 'array',
      of: [
        {
          type: 'image',
        }
      ]
    },
    {
      title: 'BackgroundColor',
      name: 'backgroundColor',
      type: 'string',
    },
    {
      title: 'CalloutPillColor',
      name: 'calloutPillColor',
      type: 'string',
    },
    {
      title: 'CalloutPillFontColor',
      name: 'calloutPillFontColor',
      type: 'string',
    },
    {
      title: 'HeaderFontColor',
      name: 'headerFontColor',
      type: 'string',
    },
    {
      title: 'CtaFontColor',
      name: 'ctaFontColor',
      type: 'string',
    },
    {
      title: 'CtaButtonColor',
      name: 'ctaButtonColor',
      type: 'string',
    },
    {
      title: 'CtaLink',
      name: 'ctaLink',
      type: 'string',
    },
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [
        {
          type: 'image',
        }
      ]
    },
    
  ],
}
