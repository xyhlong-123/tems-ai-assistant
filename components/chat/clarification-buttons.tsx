'use client'

import { Button } from '@/components/ui/button'
import { HelpCircle } from 'lucide-react'
import type { ClarificationOption } from '@/lib/mock-data'

interface ClarificationButtonsProps {
  question: string
  options: ClarificationOption[]
  onSelect: (query: string) => void
}

export function ClarificationButtons({ question, options, onSelect }: ClarificationButtonsProps) {
  return (
    <div className="space-y-2 py-1">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <HelpCircle className="w-3.5 h-3.5" />
        <span>{question}</span>
      </div>
      <div className="flex flex-col gap-1.5">
        {options.map((option) => (
          <Button
            key={option.label}
            variant="outline"
            size="sm"
            onClick={() => onSelect(option.query)}
            className="h-8 text-xs font-normal justify-start hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors"
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
