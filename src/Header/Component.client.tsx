'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="shadow relative z-20 bg-white dark:bg-black " {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-8 flex justify-between container">
        <Link href="/">
          {!data.headerImage && <Logo loading="eager" priority="high" className="invert dark:invert-0" />}
          {data.headerImage && typeof data.headerImage === 'object' && <img
            alt='header logo'
            src={data.headerImage.url!}
            loading="eager"
            className='max-w-[9.375rem] w-full h-[34px] '
            width={193}
            height={34} />}
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
