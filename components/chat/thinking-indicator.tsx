'use client'

import { Bot } from 'lucide-react'

export function ThinkingIndicator() {
  return (
    <div className="flex gap-2 max-w-[85%] mr-auto">
      <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-muted">
        <Bot className="w-3.5 h-3.5 text-muted-foreground" />
      </div>
      
      <div className="flex flex-col gap-1">
        <div className="px-3 py-2 rounded-xl rounded-bl-sm bg-muted">
          <div className="flex items-center gap-1.5">
            <span className="text-sm text-muted-foreground">AI is thinking</span>
            <div className="flex gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
