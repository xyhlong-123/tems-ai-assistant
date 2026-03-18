'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Sparkles } from 'lucide-react'

interface MessageBubbleProps {
  content: string
  isUser: boolean
  timestamp?: Date
}

export function MessageBubble({ content, isUser, timestamp }: MessageBubbleProps) {
  const [formattedTime, setFormattedTime] = useState<string | null>(null)

  useEffect(() => {
    if (timestamp) {
      setFormattedTime(timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }
  }, [timestamp])

  return (
    <div
      className={cn(
        'flex gap-2 max-w-[85%]',
        isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
      )}
    >
      <div
        className={cn(
          'flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center',
          isUser ? 'bg-primary' : 'bg-primary/10'
        )}
      >
        {isUser ? (
          <span className="text-[11px] font-semibold text-primary-foreground">U</span>
        ) : (
          <Sparkles className="w-3.5 h-3.5 text-primary" />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <div
          className={cn(
            'px-3 py-2 rounded-xl text-sm leading-relaxed',
            isUser
              ? 'bg-primary text-primary-foreground rounded-br-sm'
              : 'bg-muted text-foreground rounded-bl-sm'
          )}
        >
          {content}
        </div>
        {formattedTime && (
          <span
            className={cn(
              'text-[10px] text-muted-foreground',
              isUser ? 'text-right' : 'text-left'
            )}
          >
            {formattedTime}
          </span>
        )}
      </div>
    </div>
  )
}
