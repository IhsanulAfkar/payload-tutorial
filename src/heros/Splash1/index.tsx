'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const Splash1: React.FC<Page['hero']> = ({ links, media, richText }) => {

  return (
    <div className="-mt-20 flex flex-col-reverse md:flex-row gap-8 items-stretch  dark:text-white relative h-[70vh]">
      <div className='w-full md:w-[45%] px-4 md:px-20 py-20'>
        <div>
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
        </div>
        <div className='mt-20'>
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className='w-full md:w-[55%] relative h-full'>
        {media && typeof media === 'object' && (
          <>
            <Media fill imgClassName="object-cover -z-10 md:-z-10" priority resource={media} />
          </>
        )}
      </div>
    </div>
  )
}
