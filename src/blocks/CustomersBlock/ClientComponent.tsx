'use client'
import { Media } from '@/components/Media'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Customer } from '@/payload-types'
import { NextPage } from 'next'
import Marquee from "react-fast-marquee";
interface Props {
    customer: Customer
}

const ClientComponent: NextPage<Props> = ({ customer }) => {

    return <TooltipProvider key={customer.id}>
        <Tooltip>
            <TooltipTrigger asChild>
                {customer.logo && <div onClick={() => {
                    if (customer.companyUrl)
                        window.open(customer.companyUrl, '_blank');
                }}>
                    <Media className="max-w-20 md:max-w-28 hover:grayscale-0 grayscale hover:cursor-pointer hover:scale-110 transform" resource={customer.logo} /></div>}
            </TooltipTrigger>
            <TooltipContent>
                <p>{customer.companyName}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
}
const ClientMarqueeComponent: NextPage<{ customers: Customer[] }> = ({ customers }) => {
    if (customers.length === 0) return null
    return <div>
        <Marquee pauseOnHover autoFill delay={1} className='overflow-y-hidden py-4'>
            {customers.map(customer => (
                <div key={customer.id} className='md:mx-8 mx-4'>
                    <ClientComponent customer={customer} />
                </div>
            ))}
        </Marquee>
    </div>
}
export { ClientComponent, ClientMarqueeComponent }