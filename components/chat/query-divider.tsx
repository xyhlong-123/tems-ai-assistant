'use client'

import { useState, useEffect } from 'react'
import { RotateCcw } from 'lucide-react'

interface QueryDividerProps {
  timestamp: Date
}

export function QueryDivider({ timestamp }: QueryDividerProps) {
  const [formattedTime, setFormattedTime] = useState<string | null>(null)

  useEffect(() => {
    setFormattedTime(timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
  }, [timestamp])

  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex-1 h-px bg-border" />
      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground whitespace-nowrap">
        <RotateCcw className="w-3 h-3" />
        <span>New Query</span>
        {formattedTime && <span>{formattedTime}</span>}
      </div>
      <div className="flex-1 h-px bg-border" />
    </div>
  )
}
