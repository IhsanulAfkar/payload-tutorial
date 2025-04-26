import { TeamsBlock as TeamsBlockTypes } from "@/payload-types"
import EmblaCarousel from "@/components/Carousel/EmblaCarousel"

export const TeamsBlock: React.FC<TeamsBlockTypes> = async (props) => {
  const {
    teams,
    title
  } = props
  return <div className="my-16 container">
    {title && <p className="text-center font-bold lg:text-4xl sm:text-3xl text-2xl">{title}</p>}
    {teams && teams.length > 0 && (
      <div className="mt-12">
        <EmblaCarousel slides={teams} />
      </div>
    )}
  </div>
}