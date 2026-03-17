'use client'

import { useState } from 'react'
import { ChatPanel } from '@/components/chat/chat-panel'
import { Button } from '@/components/ui/button'
import { MessageSquare, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

// TEMS original interface screenshot
const TEMS_BACKGROUND = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YtWJ4VLVEaP1YkSZbKDExtbcQA54Xg.png'

export default function TEMSPage() {
  const [showChat, setShowChat] = useState(true)

  return (
    <div className="min-h-screen bg-background relative">
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-card fixed top-0 left-0 right-0 z-20">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">TEMS AI Assistant</span>
        </div>
        <Button
          variant={showChat ? 'default' : 'outline'}
          size="sm"
          onClick={() => setShowChat(!showChat)}
          className="gap-1.5"
        >
          {showChat ? <X className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
          <span>{showChat ? 'View TEMS' : 'AI Assistant'}</span>
        </Button>
      </header>

      {/* Full screen TEMS Background */}
      <div className="h-screen pt-[57px] lg:pt-0 relative">
        <Image
          src={TEMS_BACKGROUND}
          alt="TEMS Invoice Search Interface"
          fill
          className="object-cover object-top"
          priority
        />
        
        {/* Floating AI Assistant Toggle Button */}
        <Button
          variant="default"
          className={cn(
            "fixed bottom-6 right-6 gap-2 shadow-lg z-30 transition-all duration-300",
            showChat ? "lg:right-[396px]" : "right-6"
          )}
          onClick={() => setShowChat(!showChat)}
        >
          {showChat ? (
            <>
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Hide AI Assistant</span>
            </>
          ) : (
            <>
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Open AI Assistant</span>
            </>
          )}
        </Button>
      </div>

      {/* Single Chat Panel - responds to both mobile and desktop */}
      <div
        className={cn(
          'fixed right-0 top-0 h-screen transition-transform duration-300 ease-in-out z-40 shadow-2xl',
          'pt-[57px] lg:pt-0',
          'w-full lg:w-[380px]',
          showChat ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <ChatPanel className="h-full" />
      </div>
    </div>
  )
}
