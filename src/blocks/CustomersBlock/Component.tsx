import { CustomersBlock as CustomersBlockTypes } from "@/payload-types"
import { getPayload } from "payload"
import configPromise from '@payload-config'
import { ClientComponent, ClientMarqueeComponent } from "./ClientComponent"
export const CustomersBlock: React.FC<CustomersBlockTypes> = async (props) => {
  const {
    toggle_full,
    customer_limit,
    title,
    style
  } = props
  const payload = await getPayload({ config: configPromise })
  const customers = await payload.find({
    collection: 'customers',
    depth: 1,
    limit: !toggle_full ? customer_limit : undefined,
  })
  return <div className="my-16 container">
    {title && <p className="text-center font-bold lg:text-4xl sm:text-3xl text-2xl">{title}</p>}
    {style === 'fixed' && (
      <>
        {customers.docs.length > 0 && (
          <div className="mt-12 flex gap-4 flex-wrap justify-center items-center">
            {customers.docs.map((customer, index) => (
              <ClientComponent key={index} customer={customer} />
            ))}
          </div>
        )}
      </>
    )}
    {style === 'marquee' && (
      <>
        {customers.docs.length > 0 && (
          <div className="mt-8 flex gap-4 flex-wrap justify-center items-center">

            <ClientMarqueeComponent customers={customers.docs} />
          </div>
        )}
      </>
    )}
  </div>
}