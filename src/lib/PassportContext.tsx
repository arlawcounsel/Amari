'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

export interface PassportEntry {
  id: string
  label: string
  completed: boolean
}

interface PassportState {
  chapters: PassportEntry[]
  completionCount: number
  totalChapters: number
  complete: boolean
}

interface PassportContextType extends PassportState {
  stampChapter: (id: string) => void
  resetPassport: () => void
}

const defaultChapters = [
  { id: 'harvest', label: 'Harvest', completed: false },
  { id: 'distillation', label: 'Distillation', completed: false },
  { id: 'oak-ageing', label: 'Oak Ageing', completed: false },
  { id: 'sea-voyage', label: 'Sea Voyage', completed: false },
  { id: 'goa', label: 'Goa', completed: false },
]

const PassportContext = createContext<PassportContextType | null>(null)

export function PassportProvider({ children }: { children: ReactNode }) {
  const [chapters, setChapters] = useState<PassportEntry[]>(() => {
    if (typeof window === 'undefined') return defaultChapters
    const saved = localStorage.getItem('amari_passport')
    if (saved) {
      try { return JSON.parse(saved) } catch {}
    }
    return defaultChapters
  })

  useEffect(() => {
    localStorage.setItem('amari_passport', JSON.stringify(chapters))
  }, [chapters])

  const stampChapter = useCallback((id: string) => {
    setChapters((prev) => prev.map((c) => c.id === id && !c.completed ? { ...c, completed: true } : c))
  }, [])

  const resetPassport = useCallback(() => {
    setChapters(defaultChapters)
  }, [])

  const completionCount = chapters.filter((c) => c.completed).length
  const totalChapters = chapters.length
  const complete = completionCount === totalChapters

  return (
    <PassportContext.Provider value={{ chapters, completionCount, totalChapters, complete, stampChapter, resetPassport }}>
      {children}
    </PassportContext.Provider>
  )
}

export function usePassport() {
  const ctx = useContext(PassportContext)
  if (!ctx) throw new Error('usePassport must be used within PassportProvider')
  return ctx
}
