import { link } from '@/fields/link'
import type { Block } from 'payload'

export const CustomersBlock: Block = {
  slug: 'customersBlock',
  interfaceName: 'CustomersBlock',
  fields: [
    {
      name: 'toggle_full',
      type: 'checkbox',
      label: 'Show All Customers'
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true
    },
    {
      name: 'customer_limit',
      type: 'number',
      label: 'Number of Customers',
      max: 20,
      min: 1,
      defaultValue: 10,
      required: true
    },
    {
      name: 'style',
      type: 'select',
      options: [
        {
          label: 'Fixed',
          value: 'fixed',
        },
        {
          label: 'Marquee',
          value: 'marquee',
        }
      ],
      required: true
    }
  ],
}
