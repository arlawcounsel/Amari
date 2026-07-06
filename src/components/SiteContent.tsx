'use client'

import { useEffect } from 'react'
import { PassportProvider } from '@/lib/PassportContext'
import Nav from '@/components/Nav'
import Hero from '@/sections/Hero'
import AmariFlight from '@/sections/AmariFlight'
import Marquee from '@/components/Marquee'
import Story from '@/sections/Story'
import Craft from '@/sections/Craft'
import BarrelQuest from '@/sections/BarrelQuest'
import AmariExpedition from '@/sections/AmariExpedition'
import Availability from '@/sections/Availability'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'

export default function SiteContent() {
  useEffect(() => {
    document.body.style.overflow = ''
  }, [])

  return (
    <PassportProvider>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <AmariFlight />
        <Marquee />
        <Story />
        <Craft />
        <BarrelQuest />
        <AmariExpedition />
        <Availability />
      </main>
      <Footer />
    </PassportProvider>
  )
}
