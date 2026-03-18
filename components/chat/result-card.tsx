'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, Code, ChevronDown, ChevronUp, Database, Info } from 'lucide-react'
import type { QueryResult } from '@/lib/mock-data'

interface ResultCardProps {
  result: QueryResult
}

export function ResultCard({ result }: ResultCardProps) {
  const [showSQL, setShowSQL] = useState(false)
  const [showMethodology, setShowMethodology] = useState(false)
  const [showTable, setShowTable] = useState(false)

  const handleDownloadCSV = () => {
    let csvContent: string
    if (result.tableData && result.tableColumns) {
      const headers = result.tableColumns.map(c => c.label).join(',')
      const rows = result.tableData.map(row =>
        result.tableColumns!.map(c => {
          const val = row[c.key]
          return typeof val === 'string' ? `"${val}"` : val
        }).join(',')
      ).join('\n')
      csvContent = `${headers}\n${rows}`
    } else {
      csvContent = `Title,Value,Source,Calculation\n"${result.title}","${result.value}","${result.source}","${result.calculation}"`
    }
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
      <CardContent className="px-3 pb-3 space-y-2">
        {/* Main Value */}
        <div className="text-xl font-semibold text-primary">
          {result.value}
        </div>

        {/* Methodology / Source (collapsible) */}
        <button
          onClick={() => setShowMethodology(!showMethodology)}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Data source & methodology</span>
          {showMethodology ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        {showMethodology && (
          <div className="p-2.5 bg-muted/50 rounded-lg space-y-1.5 text-xs text-muted-foreground">
            <div className="flex items-start gap-1.5">
              <span className="font-medium text-foreground/70 shrink-0">Source:</span>
              <span>{result.source}</span>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="font-medium text-foreground/70 shrink-0">Formula:</span>
              <code className="font-mono text-[11px] bg-muted px-1 py-0.5 rounded">
                {result.calculation}
              </code>
            </div>
          </div>
        )}

        {/* Data Table (collapsible) */}
        {result.tableData && result.tableColumns && (
          <>
            <button
              onClick={() => setShowTable(!showTable)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Database className="w-3.5 h-3.5" />
              <span>View detail data ({result.tableData.length} rows)</span>
              {showTable ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {showTable && (
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="bg-muted/50">
                      {result.tableColumns.map(col => (
                        <th
                          key={col.key}
                          className={`px-2 py-1.5 font-medium text-foreground/70 ${col.align === 'right' ? 'text-right' : 'text-left'}`}
                        >
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.tableData.map((row, i) => (
                      <tr key={i} className="border-t border-border/50 hover:bg-muted/30">
                        {result.tableColumns!.map(col => (
                          <td
                            key={col.key}
                            className={`px-2 py-1.5 text-foreground ${col.align === 'right' ? 'text-right tabular-nums' : 'text-left'}`}
                          >
                            {col.format ? col.format(row[col.key]) : String(row[col.key])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* SQL Query (collapsible) */}
        {result.sql && (
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSQL(!showSQL)}
              className="h-7 px-2 text-xs gap-1 text-muted-foreground hover:text-foreground"
            >
              <Code className="w-3.5 h-3.5" />
              {showSQL ? 'Hide SQL' : 'Show SQL'}
              {showSQL ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </Button>

            {showSQL && (
              <pre className="mt-1 p-2 bg-muted rounded-lg text-[11px] font-mono overflow-x-auto text-muted-foreground">
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
