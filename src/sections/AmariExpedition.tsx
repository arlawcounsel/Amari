'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { usePassport } from '@/lib/PassportContext'

/* ── TYPES ── */
interface Item { x: number; y: number; collected: boolean; label: string; color: string }
interface Puzzle { x: number; y: number; solved: boolean; label: string; type: string; data?: number }

interface ChapterData {
  id: string
  title: string
  subtitle: string
  map: number[][]
  items: Item[]
  puzzles: Puzzle[]
  startX: number
  startY: number
  exitX: number
  exitY: number
}

/* ── CHAPTERS ── */
const TILE = 48
const ROWS = 14
const COLS = 18

const chapters: ChapterData[] = [
  {
    id: 'harvest',
    title: 'Harvest',
    subtitle: 'Collect African heirloom grains from the Kenyan highlands',
    map: (() => {
      const m = Array.from({ length: ROWS }, () => Array(COLS).fill(0))
      for (let r = 0; r < ROWS; r++) { for (let c = 0; c < COLS; c++) { if (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1) m[r][c] = 1 } }
      // inner walls
      for (let r = 3; r <= 6; r++) m[r][4] = 1
      for (let r = 8; r <= 11; r++) m[r][13] = 1
      for (let c = 8; c <= 12; c++) m[3][c] = 1
      m[6][10] = 1; m[7][10] = 1
      return m
    })(),
    items: [
      { x: 3, y: 3, collected: false, label: 'Grain', color: '#D4944A' },
      { x: 14, y: 3, collected: false, label: 'Grain', color: '#D4944A' },
      { x: 9, y: 10, collected: false, label: 'Grain', color: '#D4944A' },
      { x: 3, y: 10, collected: false, label: 'Grain', color: '#D4944A' },
      { x: 14, y: 8, collected: false, label: 'Grain', color: '#D4944A' },
    ],
    puzzles: [{ x: 8, y: 6, solved: false, label: 'Clear the field', type: 'click' }],
    startX: 2, startY: 2, exitX: 16, exitY: 12,
  },
  {
    id: 'distillation',
    title: 'Distillation',
    subtitle: 'Fire the copper stills for triple distillation',
    map: (() => {
      const m = Array.from({ length: ROWS }, () => Array(COLS).fill(0))
      for (let r = 0; r < ROWS; r++) { for (let c = 0; c < COLS; c++) { if (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1) m[r][c] = 1 } }
      for (let c = 3; c <= 7; c++) m[5][c] = 1
      for (let c = 10; c <= 14; c++) m[8][c] = 1
      m[2][10] = 1; m[3][10] = 1; m[4][10] = 1
      m[10][3] = 1; m[10][4] = 1; m[10][5] = 1
      return m
    })(),
    items: [
      { x: 9, y: 2, collected: false, label: 'Copper', color: '#B46A39' },
      { x: 2, y: 7, collected: false, label: 'Copper', color: '#B46A39' },
      { x: 16, y: 5, collected: false, label: 'Copper', color: '#B46A39' },
      { x: 5, y: 12, collected: false, label: 'Copper', color: '#B46A39' },
    ],
    puzzles: [{ x: 14, y: 2, solved: false, label: 'Light the furnace', type: 'click' }],
    startX: 2, startY: 2, exitX: 16, exitY: 12,
  },
  {
    id: 'oak-ageing',
    title: 'Oak Ageing',
    subtitle: 'Roll casks into the ageing cellar',
    map: (() => {
      const m = Array.from({ length: ROWS }, () => Array(COLS).fill(0))
      for (let r = 0; r < ROWS; r++) { for (let c = 0; c < COLS; c++) { if (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1) m[r][c] = 1 } }
      for (let r = 2; r <= 4; r++) m[r][5] = 1
      for (let r = 9; r <= 11; r++) m[r][12] = 1
      for (let c = 8; c <= 14; c++) m[4][c] = 1
      for (let c = 2; c <= 8; c++) m[10][c] = 1
      return m
    })(),
    items: [
      { x: 10, y: 2, collected: false, label: 'Oak', color: '#A67C6B' },
      { x: 3, y: 8, collected: false, label: 'Oak', color: '#A67C6B' },
      { x: 15, y: 10, collected: false, label: 'Oak', color: '#A67C6B' },
    ],
    puzzles: [
      { x: 7, y: 6, solved: false, label: 'Rotate barrel', type: 'click' },
      { x: 12, y: 7, solved: false, label: 'Rotate barrel', type: 'click' },
    ],
    startX: 2, startY: 2, exitX: 16, exitY: 12,
  },
  {
    id: 'sea-voyage',
    title: 'Sea Voyage',
    subtitle: 'Navigate the trade winds from Mombasa to Goa',
    map: (() => {
      const m = Array.from({ length: ROWS }, () => Array(COLS).fill(0))
      for (let r = 0; r < ROWS; r++) { for (let c = 0; c < COLS; c++) { if (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1) m[r][c] = 1 } }
      for (let c = 3; c <= 6; c++) m[3][c] = 1
      for (let c = 10; c <= 14; c++) m[10][c] = 1
      for (let r = 4; r <= 8; r++) m[r][8] = 1
      for (let r = 6; r <= 10; r++) m[r][14] = 1
      return m
    })(),
    items: [
      { x: 8, y: 2, collected: false, label: 'Seal', color: '#D4944A' },
      { x: 2, y: 12, collected: false, label: 'Seal', color: '#D4944A' },
      { x: 14, y: 5, collected: false, label: 'Seal', color: '#D4944A' },
    ],
    puzzles: [
      { x: 5, y: 6, solved: false, label: 'Repair the mast', type: 'click' },
      { x: 11, y: 11, solved: false, label: 'Hoist the sail', type: 'click' },
    ],
    startX: 2, startY: 2, exitX: 16, exitY: 12,
  },
  {
    id: 'goa',
    title: 'Goa',
    subtitle: 'Deliver the bottle to its new home',
    map: (() => {
      const m = Array.from({ length: ROWS }, () => Array(COLS).fill(0))
      for (let r = 0; r < ROWS; r++) { for (let c = 0; c < COLS; c++) { if (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1) m[r][c] = 1 } }
      for (let c = 5; c <= 8; c++) m[4][c] = 1
      for (let c = 9; c <= 13; c++) m[9][c] = 1
      for (let r = 2; r <= 5; r++) m[r][12] = 1
      for (let r = 8; r <= 11; r++) m[r][5] = 1
      return m
    })(),
    items: [
      { x: 4, y: 2, collected: false, label: 'Honey', color: '#D4944A' },
      { x: 14, y: 3, collected: false, label: 'Honey', color: '#D4944A' },
      { x: 2, y: 10, collected: false, label: 'Honey', color: '#D4944A' },
      { x: 15, y: 10, collected: false, label: 'Honey', color: '#D4944A' },
      { x: 12, y: 6, collected: false, label: 'Seal', color: '#B46A39' },
    ],
    puzzles: [
      { x: 7, y: 6, solved: false, label: 'Open the gate', type: 'click' },
      { x: 10, y: 3, solved: false, label: 'Push the cart', type: 'click' },
      { x: 13, y: 8, solved: false, label: 'Raise the flag', type: 'click' },
    ],
    startX: 2, startY: 2, exitX: 16, exitY: 12,
  },
]

/* ── HELPERS ── */
function drawTile(ctx: CanvasRenderingContext2D, c: number, r: number, val: number, chapterId: string, _tick: number) {
  const x = c * TILE, y = r * TILE
  if (val === 1) {
    const isSea = chapterId === 'sea-voyage'
    ctx.fillStyle = isSea ? '#1a2835' : '#23211D'
    ctx.fillRect(x, y, TILE, TILE)
    ctx.fillStyle = 'rgba(180,106,57,0.06)'
    ctx.fillRect(x, y, TILE, 1)
  } else {
    const hue = chapterId === 'harvest' ? 35 : chapterId === 'distillation' ? 20 : chapterId === 'oak-ageing' ? 28 : chapterId === 'sea-voyage' ? 200 : 30
    ctx.fillStyle = `hsla(${hue}, 15%, 12%, 0.6)`
    ctx.fillRect(x, y, TILE, TILE)
  }
}

function drawPlayer(ctx: CanvasRenderingContext2D, px: number, py: number, tick: number) {
  const cx = px * TILE + TILE / 2, cy = py * TILE + TILE / 2
  // shadow
  ctx.beginPath(); ctx.ellipse(cx, cy + 14, 10, 4, 0, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fill()
  // body
  ctx.beginPath(); ctx.arc(cx, cy - 2, 10, 0, Math.PI * 2)
  ctx.fillStyle = '#F0ECE4'; ctx.fill()
  // bottle
  const bob = Math.sin(tick * 0.08) * 2
  ctx.fillStyle = '#B46A39'
  ctx.fillRect(cx + 6, cy - 16 + bob, 5, 14)
  ctx.fillStyle = '#8C5637'
  ctx.fillRect(cx + 5, cy - 18 + bob, 7, 4)
  // head
  ctx.beginPath(); ctx.arc(cx, cy - 12, 6, 0, Math.PI * 2)
  ctx.fillStyle = '#D8D2C6'; ctx.fill()
}

function drawItem(ctx: CanvasRenderingContext2D, c: number, r: number, item: Item, tick: number) {
  if (item.collected) return
  const x = c * TILE + TILE / 2, y = r * TILE + TILE / 2
  const bob = Math.sin(tick * 0.06 + item.x + item.y) * 3
  // glow
  ctx.beginPath(); ctx.arc(x, y + bob, 12, 0, Math.PI * 2)
  ctx.fillStyle = item.color + '20'; ctx.fill()
  // shape
  ctx.beginPath(); ctx.arc(x, y + bob, 6, 0, Math.PI * 2)
  ctx.fillStyle = item.color; ctx.fill()
  ctx.strokeStyle = '#F0ECE4'; ctx.lineWidth = 1.5
  ctx.stroke()
}

function drawPuzzle(ctx: CanvasRenderingContext2D, c: number, r: number, puzzle: Puzzle, tick: number) {
  if (puzzle.solved) {
    const x = c * TILE + TILE / 2, y = r * TILE + TILE / 2
    ctx.fillStyle = 'rgba(180, 106, 57, 0.15)'
    ctx.fillRect(c * TILE, r * TILE, TILE, TILE)
    ctx.fillStyle = '#495042'; ctx.font = '16px sans-serif'
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText('✓', x, y)
    return
  }
  const x = c * TILE + TILE / 2, y = r * TILE + TILE / 2
  const pulse = Math.sin(tick * 0.05) * 0.15 + 0.85
  ctx.strokeStyle = `rgba(180,106,57,${pulse * 0.5})`
  ctx.lineWidth = 2; ctx.setLineDash([4, 4])
  ctx.strokeRect(c * TILE + 6, r * TILE + 6, TILE - 12, TILE - 12)
  ctx.setLineDash([])
  ctx.fillStyle = '#D8D2C6'; ctx.font = '11px IBM Plex Mono, monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText('⚙', x, y)
}

function drawMapBorder(ctx: CanvasRenderingContext2D, chapterId: string, tick: number) {
  const W = COLS * TILE, H = ROWS * TILE
  const isSea = chapterId === 'sea-voyage'
  // top
  const grad = ctx.createLinearGradient(0, 0, W, 0)
  if (isSea) {
    grad.addColorStop(0, 'rgba(26,40,53,0.8)'); grad.addColorStop(0.5, 'rgba(26,40,53,0.95)'); grad.addColorStop(1, 'rgba(26,40,53,0.8)')
  } else {
    grad.addColorStop(0, 'rgba(35,33,29,0.8)'); grad.addColorStop(0.5, 'rgba(35,33,29,0.95)'); grad.addColorStop(1, 'rgba(35,33,29,0.8)')
  }
  ctx.fillStyle = grad; ctx.fillRect(0, 0, W, 2)
  // bottom
  ctx.fillRect(0, H - 2, W, 2)
  // corners
  ctx.fillStyle = `rgba(180,106,57,${0.15 + Math.sin(tick * 0.03) * 0.05})`
  ctx.fillRect(0, 0, 2, 20); ctx.fillRect(0, 0, 20, 2)
  ctx.fillRect(W - 2, 0, 2, 20); ctx.fillRect(W - 20, 0, 20, 2)
  ctx.fillRect(0, H - 2, 2, 20); ctx.fillRect(0, H - 20, 20, 2)
  ctx.fillRect(W - 2, H - 2, 2, 20); ctx.fillRect(W - 20, H - 2, 20, 2)
}

/* ── JOYSTICK ── */
function VirtualJoystick({ onMove, onEnd }: { onMove: (dx: number, dy: number) => void; onEnd: () => void }) {
  const stickRef = useRef<HTMLDivElement>(null)
  const baseRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const origin = useRef({ x: 0, y: 0 })

  const handleStart = useCallback((x: number, y: number) => {
    dragging.current = true
    origin.current = { x, y }
  }, [])

  const handleMove = useCallback((x: number, y: number) => {
    if (!dragging.current || !stickRef.current || !baseRef.current) return
    const dx = x - origin.current.x, dy = y - origin.current.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    const max = 35
    const clamped = Math.min(dist, max)
    const angle = Math.atan2(dy, dx)
    const nx = Math.cos(angle) * clamped, ny = Math.sin(angle) * clamped
    stickRef.current.style.transform = `translate(${nx}px, ${ny}px)`
    onMove(nx / max, ny / max)
  }, [onMove])

  const handleEnd = useCallback(() => {
    dragging.current = false
    if (stickRef.current) stickRef.current.style.transform = 'translate(0,0)'
    onEnd()
  }, [onEnd])

  return (
    <div ref={baseRef} style={{ position: 'absolute', bottom: 32, left: 32, width: 80, height: 80, borderRadius: '50%', background: 'rgba(180,106,57,0.1)', border: '1px solid rgba(180,106,57,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', touchAction: 'none' }}
      onTouchStart={(e) => { const t = e.touches[0]; handleStart(t.clientX, t.clientY) }}
      onTouchMove={(e) => { const t = e.touches[0]; handleMove(t.clientX, t.clientY) }}
      onTouchEnd={handleEnd}
      onMouseDown={(e) => { handleStart(e.clientX, e.clientY) }}
      onMouseMove={(e) => { if (dragging.current) handleMove(e.clientX, e.clientY) }}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      <div ref={stickRef} style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(180,106,57,0.3)', border: '1px solid rgba(180,106,57,0.3)', transition: 'transform 0.05s' }} />
    </div>
  )
}

/* ── MAIN COMPONENT ── */
export default function AmariExpedition() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [chapterIdx, setChapterIdx] = useState(0)
  const [msg, setMsg] = useState('')
  const [showFinal, setShowFinal] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const gameState = useRef({
    px: 2, py: 2, dir: 0,
    chapterItems: chapters[0].items.map((i) => ({ ...i })),
    chapterPuzzles: chapters[0].puzzles.map((p) => ({ ...p })),
  })
  const keys = useRef<Set<string>>(new Set())
  const tickRef = useRef(0)
  const rafRef = useRef(0)
  const chapterDone = useRef(false)
  const moveInterval = useRef(0)
  const { stampChapter, chapters: passportChapters } = usePassport()

  useEffect(() => {
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  // Reset game state when chapter changes
  useEffect(() => {
    const ch = chapters[chapterIdx]
    gameState.current = {
      px: ch.startX, py: ch.startY, dir: 0,
      chapterItems: ch.items.map((i) => ({ ...i })),
      chapterPuzzles: ch.puzzles.map((p) => ({ ...p })),
    }
    chapterDone.current = false
    setMsg(`Chapter ${chapterIdx + 1}: ${ch.title}`)
    setTimeout(() => setMsg(''), 2000)
  }, [chapterIdx])

  // Check if chapter complete
  const checkChapterComplete = useCallback(() => {
    const gs = gameState.current
    const allItems = gs.chapterItems.every((i) => i.collected)
    const allPuzzles = gs.chapterPuzzles.every((p) => p.solved)
    return allItems && allPuzzles
  }, [])

  const handleAdvance = useCallback(() => {
    const ch = chapters[chapterIdx]
    stampChapter(ch.id)
    if (chapterIdx >= chapters.length - 1) {
      setShowFinal(true)
      return
    }
    setChapterIdx((p) => p + 1)
  }, [chapterIdx, stampChapter])

  // Movement
  const movePlayer = useCallback((dx: number, dy: number) => {
    const gs = gameState.current
    const ch = chapters[chapterIdx]
    const nx = gs.px + dx, ny = gs.py + dy
    if (nx < 1 || nx >= COLS - 1 || ny < 1 || ny >= ROWS - 1) return
    if (ch.map[ny][nx] === 1) return
    gs.px = nx; gs.py = ny
    // Collect items
    gs.chapterItems.forEach((item) => {
      if (!item.collected && Math.abs(nx - item.x) < 0.8 && Math.abs(ny - item.y) < 0.8) {
        item.collected = true
        setMsg(`+ ${item.label}`); setTimeout(() => setMsg(''), 1200)
      }
    })
    // Check puzzles proximity
    gs.chapterPuzzles.forEach((p) => {
      if (!p.solved && Math.abs(nx - p.x) < 1.5 && Math.abs(ny - p.y) < 1.5) {
        setMsg(`Press SPACE near ${p.label}`); setTimeout(() => setMsg(''), 2000)
      }
    })
    if (Math.abs(nx - ch.exitX) < 0.5 && Math.abs(ny - ch.exitY) < 0.5 && checkChapterComplete()) {
      chapterDone.current = true
      setMsg('Chapter complete!'); setTimeout(() => { handleAdvance() }, 1000)
    }
  }, [chapterIdx, checkChapterComplete, handleAdvance])

  const interact = useCallback(() => {
    const gs = gameState.current
    gs.chapterPuzzles.forEach((p) => {
      if (!p.solved && Math.abs(gs.px - p.x) < 1.5 && Math.abs(gs.py - p.y) < 1.5) {
        p.solved = true
        setMsg(`${p.label} — done!`); setTimeout(() => setMsg(''), 1200)
      }
    })
  }, [])

  // Keyboard
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      keys.current.add(e.key)
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); interact() }
      if (e.key === 'w' || e.key === 'ArrowUp') movePlayer(0, -1)
      if (e.key === 's' || e.key === 'ArrowDown') movePlayer(0, 1)
      if (e.key === 'a' || e.key === 'ArrowLeft') movePlayer(-1, 0)
      if (e.key === 'd' || e.key === 'ArrowRight') movePlayer(1, 0)
    }
    const onUp = (e: KeyboardEvent) => keys.current.delete(e.key)
    window.addEventListener('keydown', onDown); window.addEventListener('keyup', onUp)
    return () => { window.removeEventListener('keydown', onDown); window.removeEventListener('keyup', onUp) }
  }, [movePlayer, interact])

  // Touch/mouse move
  const handleJoystickMove = useCallback((dx: number, dy: number) => {
    const threshold = 0.5
    clearInterval(moveInterval.current)
    moveInterval.current = window.setInterval(() => {
      if (Math.abs(dx) > threshold) movePlayer(dx > 0 ? 1 : -1, 0)
      if (Math.abs(dy) > threshold) movePlayer(0, dy > 0 ? 1 : -1)
    }, 180)
  }, [movePlayer])

  const handleJoystickEnd = useCallback(() => {
    clearInterval(moveInterval.current)
  }, [])

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const parent = canvas.parentElement!
      const w = Math.min(parent.clientWidth, COLS * TILE)
      const h = Math.min(parent.clientHeight || 600, ROWS * TILE)
      const scale = Math.min(w / (COLS * TILE), h / (ROWS * TILE))
      canvas.style.width = `${COLS * TILE * scale}px`
      canvas.style.height = `${ROWS * TILE * scale}px`
      canvas.width = COLS * TILE; canvas.height = ROWS * TILE
    }
    resize(); window.addEventListener('resize', resize)

    const loop = () => {
      tickRef.current++
      const t = tickRef.current
      const ch = chapters[chapterIdx]
      const gs = gameState.current

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw map
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          drawTile(ctx, c, r, ch.map[r][c], ch.id, t)
        }
      }

      // Draw decorative elements per chapter
      if (ch.id === 'harvest') {
        ctx.fillStyle = 'rgba(212,148,74,0.04)'
        for (let i = 0; i < 8; i++) {
          const sx = 60 + i * 90, sy = 120 + Math.sin(i * 2 + t * 0.01) * 10
          ctx.beginPath(); ctx.arc(sx, sy, 20, 0, Math.PI * 2); ctx.fill()
        }
      }
      if (ch.id === 'sea-voyage') {
        ctx.fillStyle = 'rgba(180,106,57,0.03)'
        for (let i = 0; i < 6; i++) {
          const sx = 80 + i * 120, sy = 80 + Math.sin(i * 3 + t * 0.02) * 20
          ctx.beginPath(); ctx.arc(sx, sy, 25, 0, Math.PI * 2); ctx.fill()
        }
      }

      // Exit marker
      const ex = ch.exitX * TILE + TILE / 2, ey = ch.exitY * TILE + TILE / 2
      const exitPulse = Math.sin(t * 0.05) * 0.2 + 0.8
      ctx.fillStyle = `rgba(180,106,57,${exitPulse * 0.15})`
      ctx.beginPath(); ctx.arc(ex, ey, 16, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = `rgba(180,106,57,${exitPulse * 0.4})`; ctx.lineWidth = 1
      ctx.beginPath(); ctx.arc(ex, ey, 14, 0, Math.PI * 2); ctx.stroke()

      // Items
      gs.chapterItems.forEach((item) => drawItem(ctx, item.x, item.y, item, t))

      // Puzzles
      gs.chapterPuzzles.forEach((puzzle) => drawPuzzle(ctx, puzzle.x, puzzle.y, puzzle, t))

      // Player
      drawPlayer(ctx, gs.px, gs.py, t)

      // Border
      drawMapBorder(ctx, ch.id, t)

      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [chapterIdx])

  // Held keys for continuous movement
  useEffect(() => {
    const interval = setInterval(() => {
      const k = keys.current
      if (k.has('w') || k.has('ArrowUp')) movePlayer(0, -1)
      if (k.has('s') || k.has('ArrowDown')) movePlayer(0, 1)
      if (k.has('a') || k.has('ArrowLeft')) movePlayer(-1, 0)
      if (k.has('d') || k.has('ArrowRight')) movePlayer(1, 0)
    }, 160)
    return () => clearInterval(interval)
  }, [movePlayer])

  return (
    <section style={{ position: 'relative', zIndex: 2, padding: '100px 0', background: 'linear-gradient(180deg, transparent 0%, rgba(35,33,29,0.3) 20%, rgba(35,33,29,0.3) 80%, transparent 100%)' }}>
      <div className="container">
        {!showFinal ? (
          <>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48 }}>
              <div>
                <div className="eyebrow">AMARI Expedition</div>
                <h2 style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)' }}>{chapters[chapterIdx].title}</h2>
                <p style={{ color: 'var(--color-stone)', fontSize: '0.92rem', marginTop: 8 }}>{chapters[chapterIdx].subtitle}</p>
              </div>
              {/* Passport mini */}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {chapters.map((ch, i) => (
                  <div key={ch.id} style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: i <= chapterIdx && passportChapters[i]?.completed ? 'var(--color-copper)' : i <= chapterIdx ? 'var(--color-copper-dim)' : 'var(--color-charcoal)',
                    border: '1px solid rgba(180,106,57,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
                    color: i <= chapterIdx && passportChapters[i]?.completed ? 'var(--color-black)' : 'var(--color-stone-dim)',
                    transition: 'all 0.5s',
                  }}>
                    {i <= chapterIdx && passportChapters[i]?.completed ? '✓' : i + 1}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: 'relative', width: '100%', maxWidth: COLS * TILE, margin: '0 auto', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--color-line)', background: 'var(--color-black)' }}>
              <canvas ref={canvasRef} style={{ width: '100%', display: 'block' }} />

              {isMobile && <VirtualJoystick onMove={handleJoystickMove} onEnd={handleJoystickEnd} />}

              {/* Message overlay */}
              {msg && (
                <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', background: 'rgba(23,23,23,0.9)', border: '1px solid var(--color-line)', padding: '8px 20px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-warm-ivory)', pointerEvents: 'none', zIndex: 10 }}>
                  {msg}
                </div>
              )}

              {/* Controls hint */}
              <div style={{ position: 'absolute', bottom: 16, right: 16, fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--color-stone-dim)', opacity: 0.4 }}>
                {isMobile ? 'Touch joystick to move' : 'WASD / Arrows · SPACE to interact'}
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginTop: 24, fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-stone-dim)', letterSpacing: '0.04em' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#B46A39' }} /> Collect
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: 0, border: '1px dashed rgba(180,106,57,0.4)' }} /> Interact
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(180,106,57,0.3)' }} /> Exit
              </span>
            </div>
          </>
        ) : (
          /* Final Completion */
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', border: '2px solid var(--color-copper)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', animation: 'pulse-glow 3s ease-in-out infinite' }}>
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="var(--color-copper)" strokeWidth="1.5">
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: 16 }}>
              The journey is complete.
            </h2>
            <p style={{ color: 'var(--color-stone)', fontSize: '1.05rem', marginBottom: 8, maxWidth: 500, margin: '0 auto 8px' }}>
              You have delivered AMARI safely across continents.
            </p>
            <p style={{ color: 'var(--color-copper)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.08em', marginBottom: 40 }}>
              NOW AVAILABLE EXCLUSIVELY IN GOA
            </p>
            <a href="#availability" className="btn btn-primary">
              Find AMARI in Goa
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
