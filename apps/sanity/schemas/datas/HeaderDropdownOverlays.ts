export default {
  name: 'headerDropdownOverlays',
  description: '',
  type: 'document',
  title: 'HeaderDropdownOverlays',
  fields: [
    {
      title: 'Name',
      name: 'name',
      description: '',
      type: 'string',
    },
    {
      title: 'CarouselProductCollection',
      name: 'carouselProductCollection',
      description: '',
      type: 'reference',
      to: [{type: 'productCollections'}],
    },
    {
      title: 'OverlayNavLinks',
      name: 'overlayNavLinks',
      description: '',
      type: 'array',
      of: [
        {
          description: '',
          type: 'reference',
          to: [{type: 'navLinks'}],
        },
      ],
    },
    {
      title: 'MegaMenuOverlay',
      name: 'megaMenuOverlay',
      description: '',
      type: 'reference',
      to: [{type: 'megaMenus'}],
    },
    {
      title: 'MegaMenuSplit',
      name: 'megaMenuSplit',
      description: '',
      type: 'reference',
      to: [{type: 'megaMenuSplit'}],
    },
  ],
}
