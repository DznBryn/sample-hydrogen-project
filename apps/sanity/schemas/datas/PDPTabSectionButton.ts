export default {
  name: 'pdpTabSectionButton',
  description: '',
  type: 'document',
  title: 'PDPTabSectionButton',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'ShowButton',
      name: 'showButton',
      description: '',
      type: 'boolean',
    },
    {
      title: 'Text',
      name: 'text',
      description: '',
      type: 'string',
    },
    {
      title: 'ButtonOutlineStyle',
      name: 'buttonOutlineStyle',
      description: '',
      type: 'boolean',
    },
    {
      title: 'SlideContent',
      name: 'slideContent',
      description: '',
      type: 'reference',
      to: [{type: 'pdpTabSectionsSliderPanel'}],
    },
  ],
}
