import { CMSLink } from "@/components/Link"
import { Media } from "@/components/Media"
import RichText from "@/components/RichText"
import { DiscussBlock as DiscussTypes } from "@/payload-types"
import { StaticImageData } from "next/image"
type Props = DiscussTypes & {
  staticImage?: StaticImageData
}
export const DiscussBlock: React.FC<Props> = (props) => {
  const {
    media,
    staticImage,
    title,
    link,
    description
  } = props
  let caption
  if (media && typeof media === 'object') caption = media.caption

  return <div className="relative flex items-center justify-center h-[60vh] w-full px-4 lg:px-0">
    <div className="w-[55%] hidden lg:block absolute right-0 top-1/2 -translate-y-1/2">
      {media && <Media className="object-contain" resource={media} />}
    </div>
    <div className="relative transform lg:-translate-x-20 z-10 shadow-[0_0_10px_rgba(0,0,0,0.3)] w-full max-w-sm py-6 lg:px-12 px-6 bg-white dark:bg-card flex flex-col gap-4 justify-center lg:justify-start">
      {title && <p className="font-bold lg:text-4xl sm:text-3xl text-2xl">{title}</p>}
      {description && <p className="text-xl text-slate-500/60 font-medium">{description}</p>}
      <div className="flex">
        {link && <CMSLink {...link} />}
      </div>
    </div>
  </div>
}