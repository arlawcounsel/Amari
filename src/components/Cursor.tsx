'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: -100, y: -100 })
  const pos = useRef({ x: -100, y: -100 })
  const raf = useRef(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1'
      if (ringRef.current) ringRef.current.style.opacity = '1'
    }

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0'
      if (ringRef.current) ringRef.current.style.opacity = '0'
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    const loop = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.12
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x - 1.5}px, ${mouse.current.y - 1.5}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.x - 16}px, ${pos.current.y - 16}px)`
      }
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)

    const applyHover = (el: HTMLElement, type: string) => {
      el.addEventListener('mouseenter', () => {
        if (!ringRef.current || !dotRef.current) return
        if (type === 'button') {
          ringRef.current.style.width = '48px'
          ringRef.current.style.height = '48px'
          ringRef.current.style.borderColor = 'rgba(167, 100, 54, 0.25)'
          ringRef.current.style.background = 'rgba(167, 100, 54, 0.04)'
          dotRef.current.style.width = '3px'
          dotRef.current.style.height = '3px'
        } else if (type === 'image') {
          ringRef.current.style.width = '56px'
          ringRef.current.style.height = '56px'
          ringRef.current.style.borderColor = 'rgba(167, 100, 54, 0.15)'
          ringRef.current.style.background = 'rgba(167, 100, 54, 0.03)'
          dotRef.current.style.width = '3px'
          dotRef.current.style.height = '3px'
        } else if (type === 'nav') {
          ringRef.current.style.width = '32px'
          ringRef.current.style.height = '32px'
          ringRef.current.style.borderColor = 'rgba(167, 100, 54, 0.2)'
          ringRef.current.style.background = 'transparent'
          dotRef.current.style.width = '3px'
          dotRef.current.style.height = '3px'
        } else {
          ringRef.current.style.width = '32px'
          ringRef.current.style.height = '32px'
          ringRef.current.style.borderColor = 'rgba(167, 100, 54, 0.2)'
          ringRef.current.style.background = 'transparent'
          dotRef.current.style.width = '3px'
          dotRef.current.style.height = '3px'
        }
      })

      el.addEventListener('mouseleave', () => {
        if (!ringRef.current || !dotRef.current) return
        ringRef.current.style.width = '32px'
        ringRef.current.style.height = '32px'
        ringRef.current.style.borderColor = 'rgba(167, 100, 54, 0.08)'
        ringRef.current.style.background = 'transparent'
        dotRef.current.style.width = '3px'
        dotRef.current.style.height = '3px'
      })
    }

    const bindListeners = () => {
      document.querySelectorAll('a, button, [data-cursor="button"]').forEach((el) => {
        if ((el as HTMLElement).dataset.cursorBound) return
        ;(el as HTMLElement).dataset.cursorBound = '1'
        applyHover(el as HTMLElement, 'button')
      })
      document.querySelectorAll('[data-cursor="image"], img').forEach((el) => {
        if (el.tagName === 'IMG' && !(el as HTMLElement).dataset.cursor) return
        if ((el as HTMLElement).dataset.cursorBound) return
        ;(el as HTMLElement).dataset.cursorBound = '1'
        applyHover(el as HTMLElement, 'image')
      })
      document.querySelectorAll('nav a, header a').forEach((el) => {
        if ((el as HTMLElement).dataset.cursorBound) return
        ;(el as HTMLElement).dataset.cursorBound = '1'
        applyHover(el as HTMLElement, 'nav')
      })
    }

    const t = setTimeout(bindListeners, 300)
    const t2 = setInterval(bindListeners, 2000)

    return () => {
      cancelAnimationFrame(raf.current)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      clearTimeout(t)
      clearInterval(t2)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 3, height: 3,
          borderRadius: '50%',
          background: '#A76436',
          zIndex: 9999,
          pointerEvents: 'none',
          opacity: 0,
          transition: 'width 0.3s, height 0.3s, opacity 0.25s',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 32, height: 32,
          borderRadius: '50%',
          border: '1px solid rgba(167, 100, 54, 0.08)',
          zIndex: 9998,
          pointerEvents: 'none',
          opacity: 0,
          transition: 'width 0.4s, height 0.4s, border-color 0.4s, background 0.4s, opacity 0.25s',
          willChange: 'transform',
        }}
      />
    </>
  )
}
