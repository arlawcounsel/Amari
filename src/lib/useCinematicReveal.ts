'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type RevealType = 'clipLeft' | 'clipBottom' | 'clipRight' | 'scale' | 'fadeUp' | 'perspective'

export function useCinematicReveal<T extends HTMLElement>(type: RevealType = 'fadeUp', options: {
  delay?: number
  duration?: number
  stagger?: number
  start?: string
} = {}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const start = options.start || 'top 85%'

      switch (type) {
        case 'clipLeft':
          gsap.fromTo(el,
            { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
            {
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              duration: options.duration || 1.2,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start, toggleActions: 'play none none none' },
            }
          )
          break

        case 'clipBottom':
          gsap.fromTo(el,
            { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
            {
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              duration: options.duration || 1.2,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start, toggleActions: 'play none none none' },
            }
          )
          break

        case 'clipRight':
          gsap.fromTo(el,
            { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' },
            {
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              duration: options.duration || 1.2,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start, toggleActions: 'play none none none' },
            }
          )
          break

        case 'scale':
          gsap.fromTo(el,
            { scale: 0.92, opacity: 0 },
            {
              scale: 1, opacity: 1,
              duration: options.duration || 1,
              ease: 'power2.out',
              scrollTrigger: { trigger: el, start, toggleActions: 'play none none none' },
            }
          )
          break

        case 'perspective':
          gsap.fromTo(el,
            { rotationX: 8, y: 40, opacity: 0 },
            {
              rotationX: 0, y: 0, opacity: 1,
              duration: options.duration || 1.1,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start, toggleActions: 'play none none none' },
            }
          )
          break

        case 'fadeUp':
        default:
          gsap.fromTo(el,
            { y: 30, opacity: 0 },
            {
              y: 0, opacity: 1,
              duration: options.duration || 0.9,
              ease: 'power2.out',
              scrollTrigger: { trigger: el, start, toggleActions: 'play none none none' },
            }
          )
          break
      }

      // Stagger children with [data-reveal]
      const children = el.querySelectorAll('[data-reveal]')
      if (children.length) {
        gsap.fromTo(children,
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.7,
            stagger: options.stagger || 0.08,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start, toggleActions: 'play none none none' },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [type, options.delay, options.duration, options.stagger, options.start])

  return ref
}
