'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SiteContent from '@/components/SiteContent'

export default function HomePage() {
  const router = useRouter()
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('amari_age_verified')
      if (!stored) {
        router.replace('/age')
        return
      }
      try {
        const data = JSON.parse(stored)
        const expired = Date.now() - data.timestamp > 30 * 24 * 60 * 60 * 1000
        if (!data.verified || expired) {
          localStorage.removeItem('amari_age_verified')
          router.replace('/age')
          return
        }
        setAllowed(true)
      } catch {
        router.replace('/age')
      }
    }
  }, [router])

  if (!allowed) return null

  return <SiteContent />
}
