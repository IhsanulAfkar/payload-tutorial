'use client'
import React, { useCallback, useEffect, useRef } from 'react'
import {
    EmblaCarouselType,
    EmblaEventType,
    EmblaOptionsType
} from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'

import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import { Image } from '@/payload-types'
import { Media } from '../Media'
const TWEEN_FACTOR_BASE = 0.52

const numberWithinRange = (number: number, min: number, max: number): number =>
    Math.min(Math.max(number, min), max)

type PropType = {
    slides: {
        profilePicture?: (number | null) | Image;
        name: string;
        position: string;
        id?: string | null;
    }[]
    options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)
    const tweenFactor = useRef(0)
    const tweenNodes = useRef<HTMLElement[]>([])

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi)
    const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
        tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
            return slideNode.querySelector('.embla__slide__image') as HTMLElement
        })
    }, [])

    const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
        tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
    }, [])

    const tweenScale = useCallback(
        (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
            const engine = emblaApi.internalEngine()
            const scrollProgress = emblaApi.scrollProgress()
            const slidesInView = emblaApi.slidesInView()
            const isScrollEvent = eventName === 'scroll'

            emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
                let diffToTarget = scrollSnap - scrollProgress
                const slidesInSnap = engine.slideRegistry[snapIndex]
                if (!slidesInSnap) return
                slidesInSnap.forEach((slideIndex) => {
                    if (isScrollEvent && !slidesInView.includes(slideIndex)) return

                    if (engine.options.loop) {
                        engine.slideLooper.loopPoints.forEach((loopItem) => {
                            const target = loopItem.target()

                            if (slideIndex === loopItem.index && target !== 0) {
                                const sign = Math.sign(target)

                                if (sign === -1) {
                                    diffToTarget = scrollSnap - (1 + scrollProgress)
                                }
                                if (sign === 1) {
                                    diffToTarget = scrollSnap + (1 - scrollProgress)
                                }
                            }
                        })
                    }

                    const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
                    const scale = numberWithinRange(tweenValue, 0, 1).toString()
                    const tweenNode = tweenNodes.current[slideIndex]
                    if (!tweenNode) return
                    tweenNode.style.transform = `scale(${scale})`
                })
            })
        },
        []
    )

    useEffect(() => {
        if (!emblaApi) return

        setTweenNodes(emblaApi)
        setTweenFactor(emblaApi)
        tweenScale(emblaApi)

        emblaApi
            .on('reInit', setTweenNodes)
            .on('reInit', setTweenFactor)
            .on('reInit', tweenScale)
            .on('scroll', tweenScale)
            .on('slideFocus', tweenScale)
    }, [emblaApi, tweenScale])
    const convertSlides = slides.map(team => {
        let profilePicture = null
        if (team.profilePicture && typeof team.profilePicture === 'object') {
            profilePicture = team.profilePicture
        }
        return {
            ...team,
            profilePicture
        }
    })
    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {convertSlides.map(team => (
                        <div className="embla__slide" key={team.id}>
                            <img className='embla__slide__img dark:bg-primary p-4' src={team.profilePicture?.url ?? '/assets/icons/user.png'} />
                            <p className='font-semibold md:text-2xl text-xl mt-4'>{team.name}</p>
                            <p className='font-semibold md:text-2xl text-xl text-[#9F9F9F]'>{team.position}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="embla__controls">
                <div className="embla__dots">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={'embla__dot'.concat(
                                index === selectedIndex ? ' embla__dot--selected' : ''
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EmblaCarousel
