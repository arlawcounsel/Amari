'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

type GameState = 'menu' | 'playing' | 'gameover'

interface Obstacle {
  x: number
  gapY: number
  gapH: number
  passed: boolean
}

interface Collectable {
  x: number
  y: number
  collected: boolean
  sparkle: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
}

interface Cloud {
  x: number
  y: number
  w: number
  speed: number
  opacity: number
}

interface Bird {
  x: number
  y: number
  speed: number
  opacity: number
}

const GRAVITY = 0.45
const FLAP = -7.5
const PLAYER_SIZE = 50
const OBSTACLE_WIDTH = 60
const OBSTACLE_GAP = 170
const OBSTACLE_SPEED = 2.8
const COLLECTABLE_SIZE = 24
const GROUND_HEIGHT = 60

export default function AmariFlight() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [gameState, setGameState] = useState<GameState>('menu')
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [muted, setMuted] = useState(true)
  const gameRef = useRef<{
    player: { y: number; vel: number; rotation: number }
    obstacles: Obstacle[]
    collectables: Collectable[]
    particles: Particle[]
    clouds: Cloud[]
    bgBirds: Bird[]
    score: number
    distance: number
    groundOffset: number
    animFrame: number
    lastObstacle: number
    frameCount: number
    started: boolean
  } | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('amari_flight_best')
    if (saved) setBestScore(parseInt(saved, 10))
  }, [])

  const playSound = useCallback((type: 'flap' | 'collect' | 'hit' | 'wind') => {
    if (muted) return
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new AudioContext()
      const ctx = audioCtxRef.current
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)

      if (type === 'flap') {
        osc.frequency.setValueAtTime(400, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1)
        gain.gain.setValueAtTime(0.1, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.15)
      } else if (type === 'collect') {
        osc.frequency.setValueAtTime(800, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15)
        gain.gain.setValueAtTime(0.08, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.2)
      } else if (type === 'hit') {
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(200, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.3)
        gain.gain.setValueAtTime(0.12, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.3)
      }
    } catch {}
  }, [muted])

  const startGame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    gameRef.current = {
      player: { y: canvas.height / 2, vel: 0, rotation: 0 },
      obstacles: [],
      collectables: [],
      particles: [],
      clouds: Array.from({ length: 6 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height * 0.4),
        w: 60 + Math.random() * 100,
        speed: 0.3 + Math.random() * 0.5,
        opacity: 0.15 + Math.random() * 0.2,
      })),
      bgBirds: Array.from({ length: 4 }, () => ({
        x: Math.random() * canvas.width,
        y: 40 + Math.random() * 120,
        speed: 0.5 + Math.random() * 1,
        opacity: 0.2 + Math.random() * 0.3,
      })),
      score: 0,
      distance: 0,
      groundOffset: 0,
      animFrame: 0,
      lastObstacle: 0,
      frameCount: 0,
      started: true,
    }
    setScore(0)
    setGameState('playing')
  }, [])

  const flap = useCallback(() => {
    if (!gameRef.current) return
    gameRef.current.player.vel = FLAP
    playSound('flap')
  }, [playSound])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
    resize()
    window.addEventListener('resize', resize)

    const drawBackground = (frameCount: number) => {
      const w = canvas.width
      const h = canvas.height - GROUND_HEIGHT

      const skyGrad = ctx.createLinearGradient(0, 0, 0, h)
      skyGrad.addColorStop(0, '#2A221C')
      skyGrad.addColorStop(0.3, '#4A3C30')
      skyGrad.addColorStop(0.6, '#A76436')
      skyGrad.addColorStop(0.85, '#C47A2C')
      skyGrad.addColorStop(1, '#D8CDBF')
      ctx.fillStyle = skyGrad
      ctx.fillRect(0, 0, w, h)

      // Sun
      const sunY = h * 0.55
      const sunGrad = ctx.createRadialGradient(w * 0.65, sunY, 0, w * 0.65, sunY, 120)
      sunGrad.addColorStop(0, 'rgba(216, 205, 191, 0.8)')
      sunGrad.addColorStop(0.3, 'rgba(196, 122, 44, 0.4)')
      sunGrad.addColorStop(1, 'rgba(196, 122, 44, 0)')
      ctx.fillStyle = sunGrad
      ctx.beginPath()
      ctx.arc(w * 0.65, sunY, 120, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = 'rgba(216, 205, 191, 0.7)'
      ctx.beginPath()
      ctx.arc(w * 0.65, sunY, 30, 0, Math.PI * 2)
      ctx.fill()

      // Distant mountains
      ctx.fillStyle = 'rgba(42, 36, 29, 0.6)'
      ctx.beginPath()
      ctx.moveTo(0, h * 0.7)
      for (let x = 0; x <= w; x += 3) {
        const y = h * 0.7 - Math.sin(x * 0.003) * 40 - Math.sin(x * 0.007) * 25
        ctx.lineTo(x, y)
      }
      ctx.lineTo(w, h)
      ctx.lineTo(0, h)
      ctx.fill()

      // Closer hills
      ctx.fillStyle = 'rgba(46, 36, 29, 0.5)'
      ctx.beginPath()
      ctx.moveTo(0, h * 0.78)
      for (let x = 0; x <= w; x += 3) {
        const y = h * 0.78 - Math.sin(x * 0.005 + 1) * 30 - Math.sin(x * 0.002) * 20
        ctx.lineTo(x, y)
      }
      ctx.lineTo(w, h)
      ctx.lineTo(0, h)
      ctx.fill()

      // Clouds
      const g = gameRef.current
      if (g) {
        g.clouds.forEach((cloud) => {
          ctx.fillStyle = `rgba(216, 205, 191, ${cloud.opacity})`
          ctx.beginPath()
          ctx.ellipse(cloud.x, cloud.y, cloud.w * 0.5, cloud.w * 0.15, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.ellipse(cloud.x - cloud.w * 0.2, cloud.y - cloud.w * 0.05, cloud.w * 0.3, cloud.w * 0.1, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.ellipse(cloud.x + cloud.w * 0.25, cloud.y + cloud.w * 0.03, cloud.w * 0.25, cloud.w * 0.08, 0, 0, Math.PI * 2)
          ctx.fill()
        })
      }

      // Acacia trees
      const drawAcacia = (x: number, baseY: number, scale: number) => {
        ctx.fillStyle = `rgba(30, 24, 20, ${0.5 * scale})`
        ctx.fillRect(x - 2 * scale, baseY - 60 * scale, 4 * scale, 60 * scale)
        ctx.beginPath()
        ctx.ellipse(x, baseY - 65 * scale, 40 * scale, 12 * scale, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.ellipse(x - 10 * scale, baseY - 70 * scale, 25 * scale, 8 * scale, 0, 0, Math.PI * 2)
        ctx.fill()
      }

      const treeOffset = (frameCount * 0.3) % 400
      drawAcacia(200 - treeOffset, h * 0.82, 1.2)
      drawAcacia(600 - treeOffset, h * 0.85, 0.8)
      drawAcacia(1000 - treeOffset, h * 0.8, 1.0)
      drawAcacia(1400 - treeOffset, h * 0.83, 0.9)

      // Background birds
      if (g) {
        g.bgBirds.forEach((bird) => {
          ctx.strokeStyle = `rgba(216, 205, 191, ${bird.opacity})`
          ctx.lineWidth = 1.5
          ctx.beginPath()
          const wingY = Math.sin(frameCount * 0.05 + bird.x) * 4
          ctx.moveTo(bird.x - 8, bird.y + wingY)
          ctx.quadraticCurveTo(bird.x, bird.y - 4, bird.x + 8, bird.y + wingY)
          ctx.stroke()
        })
      }

      // Ground
      const groundY = h
      ctx.fillStyle = '#1E1814'
      ctx.fillRect(0, groundY, canvas.width, GROUND_HEIGHT)

      // Grass line
      ctx.strokeStyle = 'color-mix(in srgb, #A76436 30%, transparent)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(0, groundY)
      ctx.lineTo(canvas.width, groundY)
      ctx.stroke()

      // Grass tufts
      const grassOffset = (frameCount * 1.5) % 40
      ctx.strokeStyle = 'color-mix(in srgb, #A76436 20%, transparent)'
      ctx.lineWidth = 1
      for (let x = -grassOffset; x < canvas.width + 40; x += 20) {
        ctx.beginPath()
        ctx.moveTo(x, groundY)
        ctx.lineTo(x + 3, groundY - 8)
        ctx.moveTo(x + 6, groundY)
        ctx.lineTo(x + 8, groundY - 6)
        ctx.stroke()
      }
    }

    const drawObstacle = (obs: Obstacle) => {
      const x = obs.x
      const topH = obs.gapY - obs.gapH / 2
      const botY = obs.gapY + obs.gapH / 2

      // Top obstacle
      ctx.fillStyle = '#2A241E'
      ctx.fillRect(x, 0, OBSTACLE_WIDTH, topH)

      ctx.strokeStyle = 'color-mix(in srgb, #A76436 15%, transparent)'
      ctx.lineWidth = 1
      for (let y = 10; y < topH; y += 15) {
        ctx.beginPath()
        ctx.moveTo(x + 5, y)
        ctx.lineTo(x + OBSTACLE_WIDTH - 5, y + 3)
        ctx.stroke()
      }

      // Top canopy
      ctx.fillStyle = '#1E1814'
      ctx.beginPath()
      ctx.ellipse(x + OBSTACLE_WIDTH / 2, topH, OBSTACLE_WIDTH * 0.9, 18, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(x + OBSTACLE_WIDTH / 2 - 10, topH - 8, OBSTACLE_WIDTH * 0.5, 12, 0, 0, Math.PI * 2)
      ctx.fill()

      // Bottom obstacle
      ctx.fillStyle = '#2A241E'
      ctx.fillRect(x, botY, OBSTACLE_WIDTH, canvas.height - botY - GROUND_HEIGHT)

      ctx.strokeStyle = 'color-mix(in srgb, #A76436 15%, transparent)'
      for (let y = botY + 10; y < canvas.height - GROUND_HEIGHT; y += 15) {
        ctx.beginPath()
        ctx.moveTo(x + 5, y)
        ctx.lineTo(x + OBSTACLE_WIDTH - 5, y + 3)
        ctx.stroke()
      }

      // Bottom canopy
      ctx.fillStyle = '#1E1814'
      ctx.beginPath()
      ctx.ellipse(x + OBSTACLE_WIDTH / 2, botY, OBSTACLE_WIDTH * 0.9, 18, 0, 0, Math.PI * 2)
      ctx.fill()
    }

    const drawCollectable = (c: Collectable) => {
      if (c.collected) {
        if (c.sparkle > 0) {
          const alpha = c.sparkle / 15
          ctx.fillStyle = `rgba(196, 122, 44, ${alpha})`
          ctx.beginPath()
          ctx.arc(c.x, c.y, COLLECTABLE_SIZE * (1 + (15 - c.sparkle) * 0.05), 0, Math.PI * 2)
          ctx.fill()
        }
        return
      }

      ctx.save()
      ctx.translate(c.x, c.y)
      const pulse = Math.sin(Date.now() * 0.003) * 2

      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, COLLECTABLE_SIZE + 8 + pulse)
      glow.addColorStop(0, 'rgba(196, 122, 44, 0.3)')
      glow.addColorStop(1, 'rgba(196, 122, 44, 0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(0, 0, COLLECTABLE_SIZE + 8 + pulse, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = '#A76436'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(0, 0, COLLECTABLE_SIZE * 0.6, 0, Math.PI * 2)
      ctx.stroke()

      ctx.fillStyle = '#A76436'
      ctx.beginPath()
      ctx.arc(0, 0, COLLECTABLE_SIZE * 0.3, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#C47A2C'
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2
        const r = COLLECTABLE_SIZE * 0.45
        ctx.beginPath()
        ctx.arc(Math.cos(angle) * r, Math.sin(angle) * r, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    const drawPlayer = (player: { y: number; vel: number; rotation: number }) => {
      const x = canvas.width * 0.28
      const y = player.y

      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(player.rotation * 0.05)

      // Bottle body
      ctx.fillStyle = '#2A241E'
      ctx.beginPath()
      ctx.roundRect(-PLAYER_SIZE * 0.22, -PLAYER_SIZE * 0.4, PLAYER_SIZE * 0.44, PLAYER_SIZE * 0.8, 4)
      ctx.fill()

      // Bottle neck
      ctx.fillStyle = '#2A241E'
      ctx.beginPath()
      ctx.roundRect(-PLAYER_SIZE * 0.12, -PLAYER_SIZE * 0.55, PLAYER_SIZE * 0.24, PLAYER_SIZE * 0.2, [2, 2, 0, 0])
      ctx.fill()

      // Cap
      ctx.fillStyle = '#A76436'
      ctx.fillRect(-PLAYER_SIZE * 0.1, -PLAYER_SIZE * 0.6, PLAYER_SIZE * 0.2, PLAYER_SIZE * 0.08)

      // Label area
      ctx.fillStyle = 'rgba(167, 100, 54, 0.15)'
      ctx.fillRect(-PLAYER_SIZE * 0.18, -PLAYER_SIZE * 0.15, PLAYER_SIZE * 0.36, PLAYER_SIZE * 0.3)

      // Label text
      ctx.fillStyle = 'rgba(167, 100, 54, 0.6)'
      ctx.font = `bold ${PLAYER_SIZE * 0.1}px "Manrope", sans-serif`
      ctx.textAlign = 'center'
      ctx.fillText('AMARI', 0, PLAYER_SIZE * 0.05)

      // Liquid line
      ctx.strokeStyle = 'color-mix(in srgb, #A76436 50%, transparent)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(-PLAYER_SIZE * 0.15, PLAYER_SIZE * 0.15)
      ctx.lineTo(PLAYER_SIZE * 0.15, PLAYER_SIZE * 0.15)
      ctx.stroke()

      // Glass reflection
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(-PLAYER_SIZE * 0.15, -PLAYER_SIZE * 0.35)
      ctx.lineTo(-PLAYER_SIZE * 0.15, PLAYER_SIZE * 0.35)
      ctx.stroke()

      // Ambient glow
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, PLAYER_SIZE * 0.8)
      glow.addColorStop(0, 'rgba(167, 100, 54, 0.06)')
      glow.addColorStop(1, 'rgba(167, 100, 54, 0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(0, 0, PLAYER_SIZE * 0.8, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    const drawParticles = (particles: Particle[]) => {
      particles.forEach((p) => {
        const alpha = p.life / p.maxLife
        ctx.fillStyle = p.color.replace('1)', `${alpha})`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const drawUI = (score: number, best: number) => {
      ctx.fillStyle = '#F4EFE7'
      ctx.font = '700 36px "Manrope", sans-serif'
      ctx.textAlign = 'right'
      ctx.fillText(String(score), canvas.width - 40, 60)

      ctx.fillStyle = 'rgba(184, 170, 152, 0.4)'
      ctx.font = '400 11px "IBM Plex Mono", monospace'
      ctx.textAlign = 'right'
      ctx.fillText(`best ${best}`, canvas.width - 40, 80)

      const dist = gameRef.current ? Math.floor(gameRef.current.distance / 10) : 0
      ctx.fillStyle = 'rgba(184, 170, 152, 0.3)'
      ctx.font = '400 10px "IBM Plex Mono", monospace'
      ctx.textAlign = 'left'
      ctx.fillText(`${dist} km`, 40, 60)
    }

    const gameLoop = () => {
      const g = gameRef.current
      if (!g || gameState !== 'playing') return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      g.frameCount++
      g.distance += OBSTACLE_SPEED

      // Update clouds
      g.clouds.forEach((cloud) => {
        cloud.x -= cloud.speed
        if (cloud.x + cloud.w < -50) {
          cloud.x = canvas.width + 50
          cloud.y = Math.random() * (canvas.height * 0.3)
        }
      })

      // Update bg birds
      g.bgBirds.forEach((bird) => {
        bird.x -= bird.speed
        if (bird.x < -20) {
          bird.x = canvas.width + 20
          bird.y = 40 + Math.random() * 120
        }
      })

      // Player physics
      g.player.vel += GRAVITY
      g.player.y += g.player.vel
      g.player.rotation = Math.max(-20, Math.min(45, g.player.vel * 4))

      // Spawn obstacles
      if (g.frameCount - g.lastObstacle > 100) {
        const minY = 100
        const maxY = canvas.height - GROUND_HEIGHT - 100
        const gapY = minY + Math.random() * (maxY - minY)
        g.obstacles.push({
          x: canvas.width + 20,
          gapY,
          gapH: OBSTACLE_GAP,
          passed: false,
        })

        if (Math.random() > 0.4) {
          g.collectables.push({
            x: canvas.width + 20 + OBSTACLE_WIDTH / 2,
            y: gapY + (Math.random() - 0.5) * (OBSTACLE_GAP * 0.4),
            collected: false,
            sparkle: 0,
          })
        }

        g.lastObstacle = g.frameCount
      }

      // Update obstacles
      g.obstacles = g.obstacles.filter((obs) => {
        obs.x -= OBSTACLE_SPEED
        if (!obs.passed && obs.x + OBSTACLE_WIDTH < canvas.width * 0.28) {
          obs.passed = true
          g.score++
          setScore(g.score)
        }
        return obs.x > -OBSTACLE_WIDTH
      })

      // Update collectables
      g.collectables.forEach((c) => {
        c.x -= OBSTACLE_SPEED
        if (c.collected && c.sparkle > 0) c.sparkle--
      })
      g.collectables = g.collectables.filter((c) => c.x > -50 && (!c.collected || c.sparkle > 0))

      // Collision detection
      const px = canvas.width * 0.28
      const py = g.player.y
      const pr = PLAYER_SIZE * 0.35

      if (py + pr > canvas.height - GROUND_HEIGHT || py - pr < 0) {
        playSound('hit')
        endGame()
        return
      }

      for (const obs of g.obstacles) {
        const ox = obs.x
        const ow = OBSTACLE_WIDTH
        const topH = obs.gapY - obs.gapH / 2
        const botY = obs.gapY + obs.gapH / 2

        if (px + pr > ox && px - pr < ox + ow) {
          if (py - pr < topH || py + pr > botY) {
            playSound('hit')
            endGame()
            return
          }
        }
      }

      g.collectables.forEach((c) => {
        if (c.collected) return
        const dx = px - c.x
        const dy = py - c.y
        if (Math.sqrt(dx * dx + dy * dy) < pr + COLLECTABLE_SIZE) {
          c.collected = true
          c.sparkle = 15
          g.score += 3
          setScore(g.score)
          playSound('collect')

          for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2
            g.particles.push({
              x: c.x,
              y: c.y,
              vx: Math.cos(angle) * (1 + Math.random() * 2),
              vy: Math.sin(angle) * (1 + Math.random() * 2),
              life: 20 + Math.random() * 10,
              maxLife: 30,
              size: 2 + Math.random() * 3,
              color: 'rgba(196, 122, 44, 1)',
            })
          }
        }
      })

      g.particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.05
        p.life--
      })
      g.particles = g.particles.filter((p) => p.life > 0)

      drawBackground(g.frameCount)
      g.obstacles.forEach(drawObstacle)
      g.collectables.forEach(drawCollectable)
      drawParticles(g.particles)
      drawPlayer(g.player)
      drawUI(g.score, bestScore)

      g.animFrame = requestAnimationFrame(gameLoop)
    }

    const endGame = () => {
      const g = gameRef.current
      if (!g) return
      cancelAnimationFrame(g.animFrame)
      setGameState('gameover')
      if (g.score > bestScore) {
        setBestScore(g.score)
        localStorage.setItem('amari_flight_best', String(g.score))
      }
    }

    if (gameState === 'playing' && gameRef.current) {
      gameRef.current.animFrame = requestAnimationFrame(gameLoop)
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawBackground(0)
    }

    return () => {
      window.removeEventListener('resize', resize)
      if (gameRef.current) cancelAnimationFrame(gameRef.current.animFrame)
    }
  }, [gameState, bestScore, playSound])

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        if (gameState === 'playing') flap()
        else if (gameState === 'menu') startGame()
        else if (gameState === 'gameover') startGame()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [gameState, flap, startGame])

  // Touch controls
  const handleTouch = useCallback(() => {
    if (gameState === 'playing') flap()
    else if (gameState === 'menu') startGame()
    else if (gameState === 'gameover') startGame()
  }, [gameState, flap, startGame])

  // Scroll to next section
  const scrollToNext = useCallback(() => {
    const next = document.getElementById('marquee')
    if (next) next.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="flight"
      style={{
        position: 'relative',
        height: '100dvh',
        width: '100%',
        overflow: 'hidden',
        zIndex: 2,
        background: 'var(--color-glass)',
        cursor: gameState === 'playing' ? 'none' : 'pointer',
      }}
    >
      <canvas
        ref={canvasRef}
        onClick={handleTouch}
        onTouchStart={(e) => { e.preventDefault(); handleTouch() }}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />

      {/* Menu overlay */}
      {gameState === 'menu' && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: 'color-mix(in srgb, #2E241D 50%, transparent)',
          backdropFilter: 'blur(2px)',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            padding: '20px 24px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            zIndex: 10,
          }}>
            <span style={{ fontFamily: '"Manrope", sans-serif', fontSize: '1rem', fontWeight: 800, color: 'rgba(244, 239, 231, 0.5)', letterSpacing: '0.04em' }}>
              Amari Flight
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); setMuted(!muted) }}
              style={{ background: 'none', border: 'none', color: 'rgba(184, 170, 152, 0.4)', cursor: 'pointer', fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.65rem', letterSpacing: '0.08em' }}
            >
              {muted ? 'muted' : 'sound on'}
            </button>
          </div>

          <h2 style={{ fontFamily: '"Manrope", sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', color: '#F4EFE7', textAlign: 'center', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Amari Flight
          </h2>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.72rem', color: '#B8AA98', letterSpacing: '0.08em', marginTop: 12, textAlign: 'center' }}>
            The journey across the savannah
          </p>
          <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <button
              onClick={(e) => { e.stopPropagation(); startGame() }}
              style={{
                fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', letterSpacing: '0.08em',
                padding: '14px 36px', background: '#A76436', color: '#F4EFE7',
                border: 'none', cursor: 'pointer', fontWeight: 500,
                transition: 'background 0.3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#C07E4A' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#A76436' }}
            >
              Begin journey
            </button>
            <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.62rem', color: 'rgba(184, 170, 152, 0.4)', letterSpacing: '0.08em' }}>
              Space / click to fly
            </p>
          </div>
        </div>
      )}

      {/* Game over overlay */}
      {gameState === 'gameover' && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: 'color-mix(in srgb, #2E241D 60%, transparent)',
          backdropFilter: 'blur(3px)',
        }}>
          <h2 style={{ fontFamily: '"Manrope", sans-serif', fontWeight: 800, fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)', color: '#F4EFE7', textAlign: 'center' }}>
            The journey ends.
          </h2>
          <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.92rem', color: '#B8AA98', marginTop: 14, textAlign: 'center' }}>
            You travelled {Math.floor((gameRef.current?.distance || 0) / 10)} km across the savannah.
          </p>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.72rem', color: 'rgba(184, 170, 152, 0.5)', marginTop: 8, letterSpacing: '0.08em' }}>
            Score: {score} · Best: {bestScore}
          </p>
          <div style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={(e) => { e.stopPropagation(); startGame() }}
              style={{
                fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.72rem', letterSpacing: '0.08em',
                padding: '13px 28px', background: '#A76436', color: '#F4EFE7',
                border: 'none', cursor: 'pointer', fontWeight: 500,
                transition: 'background 0.3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#C07E4A' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#A76436' }}
            >
              Play again
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); scrollToNext() }}
              style={{
                fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.72rem', letterSpacing: '0.08em',
                padding: '13px 28px', background: 'transparent', color: '#B8AA98',
                border: '1px solid rgba(167, 100, 54, 0.3)', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center',
                transition: 'border-color 0.3s, color 0.3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#A76436'; e.currentTarget.style.color = '#F4EFE7' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(167, 100, 54, 0.3)'; e.currentTarget.style.color = '#B8AA98' }}
            >
              Continue exploring
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
