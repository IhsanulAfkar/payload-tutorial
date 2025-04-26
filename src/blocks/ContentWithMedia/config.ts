import { defaultLexical } from '@/fields/defaultLexical'
import type { Block } from 'payload'

export const ContentMediaBlock: Block = {
  slug: 'contentMediaBlock',
  interfaceName: 'ContentMediaBlock',
  labels: {
    singular: 'Content with media block',
    plural: 'Content with media blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'paragraphAlign',
      label: 'Paragraph Alignment',
      type: 'select',
      options: [
        {
          label: 'Left',
          value: 'text-left',
        },
        {
          label: 'Center',
          value: 'text-center',
        },
        {
          label: 'Right',
          value: 'text-right',
        },
        {
          label: 'Justify',
          value: 'text-justify',
        },
      ],
      defaultValue: 'text-left',
      required: true
    },
    {
      type: 'richText',
      name: 'content',
      required: true,
      editor: defaultLexical,
      label: false,
    },
    {
      name: 'switchPosition',
      type: 'checkbox',
    },
  ],
}
