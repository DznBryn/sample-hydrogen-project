import {ReactNode} from 'react'

const defaultDecorators = [
  {title: 'Strong', value: 'strong'},
  {title: 'Emphasis', value: 'em'},
  {title: 'Code', value: 'code'},
  {title: 'Underline', value: 'underline'},
  {title: 'Strike', value: 'strike-through'},
]

const defaultAnnotations = [
  {
    description: '',
    type: 'object',
    name: 'link',
    options: {
      modal: {description: '', type: 'popover'},
    },
    fields: [
      {
        name: 'href',
        type: 'url',
        title: 'Link',
        description: 'A valid web, email, phone, or relative link.',
        validation: (Rule: any) =>
          Rule.uri({
            scheme: ['http', 'https', 'tel', 'mailto'],
            allowRelative: true,
          }),
      },
    ],
  },
]

//superscriptDecorator

type Props = {children: ReactNode}

const SupIcon = () => <sup>sup</sup>

const ColorIcon = () => <span>🎨</span>

const SupDecorator = ({children}: Props) => <sup>{children}</sup>

const superscriptDecorator = {
  title: 'Superscript',
  value: 'superscript',
  icon: SupIcon,
  component: SupDecorator,
}

const colorAnnotation = {
  name: 'color',
  title: 'Color',
  type: 'color',
  icon: ColorIcon,
}

//

const richBlockType = {
  type: 'array',
  of: [
    {
      type: 'block',
      marks: {
        decorators: [...defaultDecorators, superscriptDecorator],
        annotations: [...defaultAnnotations, colorAnnotation],
      },
    },
  ],
}

export default richBlockType
