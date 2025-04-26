import { Media } from "@/components/Media"
import RichText from "@/components/RichText"
import { ContentMediaBlock as ContentMediaTypes } from "@/payload-types"
import { StaticImageData } from "next/image"
type Props = ContentMediaTypes & {
  staticImage?: StaticImageData
}
export const ContentMediaBlock: React.FC<Props> = (props) => {
  const {
    media,
    staticImage,
    content,
    title,
    switchPosition,
  } = props
  let caption
  if (media && typeof media === 'object') caption = media.caption
  const Section1 = <div className={"w-full flex items-center " + (switchPosition ? "justify-start" : "justify-end")}>
    {(media || staticImage) && (
      <Media
        imgClassName={'border border-border rounded-[0.8rem] shadow-xl h-full object-cover'}
        resource={media}
        src={staticImage}
      />
    )}
  </div>
  const Section2 = <div className="w-full">
    <div className="">
      {title && <p className="font-bold lg:text-4xl sm:text-3xl text-2xl text-center">{title}</p>}
      {content &&
        <RichText data={content} className="mt-8 list-inside leading-snug" />
      }
    </div>
  </div>
  return <div className="container my-16 flex flex-col md:flex-row gap-4">
    {switchPosition ? (
      <>
        {Section2}
        {Section1}
      </>
    ) : (
      <>
        {Section1}
        {Section2}
      </>
    )}

  </div>
}