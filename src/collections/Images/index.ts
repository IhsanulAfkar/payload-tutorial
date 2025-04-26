import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";
import path from "path";
import { CollectionConfig } from "payload";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
export const Images: CollectionConfig = {
    slug: 'image',
    access: {
        create: authenticated,
        delete: authenticated,
        read: anyone,
        update: authenticated,
    },
    fields: [
        {
            name: 'alt',
            type: 'text'
        },
    ],
    upload: {
        staticDir: path.resolve(dirname, '../../public/image'),
        mimeTypes: ['image/*'],
    }
}