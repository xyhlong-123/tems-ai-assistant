'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, Code, ChevronDown, ChevronUp, Database, Calculator } from 'lucide-react'
import type { QueryResult } from '@/lib/mock-data'

interface ResultCardProps {
  result: QueryResult
}

export function ResultCard({ result }: ResultCardProps) {
  const [showSQL, setShowSQL] = useState(false)

  const handleDownloadCSV = () => {
    // Simulate CSV download
    const csvContent = `Title,Value,Source,Calculation\n"${result.title}","${result.value}","${result.source}","${result.calculation}"`
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${result.title.replace(/\s+/g, '_')}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-2 pt-3 px-3">
        <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
          <Database className="w-4 h-4 text-primary" />
          {result.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-3 space-y-3">
        {/* Main Value */}
        <div className="text-xl font-semibold text-primary">
          {result.value}
        </div>
        
        {/* Source */}
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/70">Source:</span>
          <span>{result.source}</span>
        </div>
        
        {/* Calculation */}
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <Calculator className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <code className="font-mono text-[11px] bg-muted px-1.5 py-0.5 rounded">
            {result.calculation}
          </code>
        </div>
        
        {/* SQL Query (collapsible) */}
        {result.sql && (
          <div className="pt-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSQL(!showSQL)}
              className="h-7 px-2 text-xs gap-1 text-muted-foreground hover:text-foreground"
            >
              <Code className="w-3.5 h-3.5" />
              {showSQL ? 'Hide SQL' : 'Show SQL'}
              {showSQL ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </Button>
            
            {showSQL && (
              <pre className="mt-2 p-2 bg-muted rounded-lg text-[11px] font-mono overflow-x-auto text-muted-foreground">
                {result.sql}
              </pre>
            )}
          </div>
        )}
        
        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadCSV}
            className="h-7 text-xs gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Download CSV
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
