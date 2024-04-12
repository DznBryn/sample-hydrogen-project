import richBlockType from "../../customFields/richBlockType";

export default {
  name: 'richText',
  type: 'document',
  title: 'RichText',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'RichTextBlock',
      name: 'richTextBlock',
          ...richBlockType,
    },
  ],
}
