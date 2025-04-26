import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";
import { link } from "@/fields/link";
import { CollectionConfig } from "payload";

export const Customers: CollectionConfig = {
    slug: 'customers',
    access: {
        create: authenticated,
        delete: authenticated,
        read: anyone,
        update: authenticated,
    },
    fields: [
        {
            name: 'logo',
            type: 'upload',
            relationTo: 'media',
            required: true
        },
        {
            name: 'companyName',
            type: 'text',
            required: true
        },
        {
            name: 'companyUrl',
            type: 'text',
            label: 'Company Url',
            required: false
        }
    ]
}