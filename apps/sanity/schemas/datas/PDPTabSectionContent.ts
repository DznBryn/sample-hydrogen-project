import richBlockType from '../../customFields/richBlockType'

export default {
  name: 'pdpTabSectionContent',
  description: '',
  type: 'document',
  title: 'PDPTabSectionContent',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'Header',
      name: 'header',
      description: "WARNING: Don't edit the content using the block tools, only HTML.",
      ...richBlockType,
    },
    {
      title: 'Image',
      name: 'image',
      description: '',
      type: 'image',
    },
    {
      title: 'Subtitle',
      name: 'subtitle',
      description: '',
      type: 'string',
    },
    {
      title: 'Body',
      name: 'body',
      description: '',
      type: 'string',
    },
    {
      title: 'HtmlSubtitle',
      name: 'htmlSubtitle',
      description: "WARNING: Don't edit the content using the block tools, only HTML.",
      ...richBlockType,
    },
    {
      title: 'HtmlBody',
      name: 'htmlBody',
      description: "WARNING: Don't edit the content using the block tools, only HTML.",
      ...richBlockType,
    },
  ],
}
