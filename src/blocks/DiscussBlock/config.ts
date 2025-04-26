import { link } from '@/fields/link'
import type { Block } from 'payload'

export const DiscussBlock: Block = {
  slug: 'discussBlock',
  interfaceName: 'DiscussBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      name: 'description',
      type: 'text',
      required: false
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    link(),
  ],
}
