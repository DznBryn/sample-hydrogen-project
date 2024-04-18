export default {
  name: 'yotpoProducts',
  description: '',
  type: 'document',
  title: 'YotpoProducts',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'Yotpo_Points_Value',
      name: 'yotpo_points_value',
      description: '',
      type: 'number',
    },
    {
      title: 'Variant_Id',
      name: 'variant_id',
      description: '',
      type: 'string',
    },
    {
      title: 'Variant_Name',
      name: 'variant_name',
      description: '',
      type: 'string',
    },
    {
      title: 'Widget_Id',
      name: 'widget_id',
      description: '',
      type: 'string',
    },
    {
      title: 'Variant_Image',
      name: 'variant_image',
      description: '',
      type: 'string',
    },
    {
      title: 'Products',
      name: 'products',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'reference',
          to: [{type: 'products'}],
        },
      ],
    },
  ],
}
