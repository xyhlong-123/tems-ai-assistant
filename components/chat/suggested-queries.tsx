'use client'

import { Button } from '@/components/ui/button'
import { Lightbulb } from 'lucide-react'

interface SuggestedQueriesProps {
  queries: string[]
  onSelect: (query: string) => void
}

export function SuggestedQueries({ queries, onSelect }: SuggestedQueriesProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Lightbulb className="w-3.5 h-3.5" />
        <span>Suggested queries</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {queries.map((query) => (
          <Button
            key={query}
            variant="outline"
            size="sm"
            onClick={() => onSelect(query)}
            className="h-7 text-xs font-normal hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors"
          >
            {query}
          </Button>
        ))}
      </div>
    </div>
  )
}
