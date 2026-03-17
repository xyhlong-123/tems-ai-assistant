'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Plus, MoreHorizontal, Sparkles, Settings, Download, Trash2 } from 'lucide-react'

interface ChatHeaderProps {
  onNewQuery: () => void
}

export function ChatHeader({ onNewQuery }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-foreground">TEMS AI Assistant</h1>
          <p className="text-xs text-muted-foreground">Telecom Data Query</p>
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onNewQuery}
          className="gap-1.5 text-xs h-8"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Query</span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="w-4 h-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="gap-2 text-sm">
              <Settings className="w-4 h-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-sm">
              <Download className="w-4 h-4" />
              Export History
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-sm text-destructive">
              <Trash2 className="w-4 h-4" />
              Clear History
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
