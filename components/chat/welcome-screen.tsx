'use client'

import { TrendingUp, Database, BarChart3, Search, DollarSign, AlertCircle } from 'lucide-react'

interface WelcomeScreenProps {
  onSelect: (query: string) => void
}

const exampleQueries = [
  { icon: TrendingUp, label: 'Top 10 vendors cost', description: 'View highest-cost vendors' },
  { icon: BarChart3, label: 'Monthly fiber cost', description: 'Fiber cost trend this year' },
  { icon: Database, label: 'Bell circuit inventory', description: 'Bell circuit details' },
  { icon: Search, label: 'Rogers vs Bell spending', description: 'Vendor cost comparison' },
  { icon: DollarSign, label: 'Total telecom spend YTD', description: 'Year-to-date total spend' },
  { icon: AlertCircle, label: 'Inactive circuits count', description: 'Find potential savings' },
]

export function WelcomeScreen({ onSelect }: WelcomeScreenProps) {
  return (
    <div className="py-4 space-y-3">
      <p className="text-xs text-muted-foreground text-center">Try one of these queries to get started</p>
      <div className="grid grid-cols-2 gap-2">
        {exampleQueries.map(({ icon: Icon, label, description }) => (
          <button
            key={label}
            onClick={() => onSelect(label)}
            className="flex flex-col items-start gap-1.5 p-3 rounded-xl border border-border bg-background hover:bg-accent hover:border-primary/30 transition-colors text-left group"
          >
            <Icon className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors" />
            <span className="text-xs font-medium text-foreground leading-tight">{label}</span>
            <span className="text-[10px] text-muted-foreground leading-tight">{description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
