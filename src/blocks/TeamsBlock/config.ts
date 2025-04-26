import type { Block, Field } from 'payload'
const Teams: Field[] = [
  {
    name: 'profilePicture',
    type: 'upload',
    relationTo: 'image',
    required: false,
  },
  {
    name: 'name',
    type: 'text',
    required: true
  },
  {
    name: 'position',
    type: 'text',
    required: true
  }
]
export const TeamsBlock: Block = {
  slug: 'teamsBlock',
  interfaceName: 'TeamsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      name: 'teams',
      type: 'array',
      fields: Teams
    },
  ],
}
