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
    <div className="min-h-[100dvh] bg-background relative">
      {/* Mobile Header - only show when chat is hidden */}
      <header className={cn(
        "lg:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-card fixed top-0 left-0 right-0 z-20",
        showChat && "hidden"
      )}>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">TEMS AI Assistant</span>
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={() => setShowChat(true)}
          className="gap-1.5"
        >
          <MessageSquare className="w-4 h-4" />
          <span>AI Assistant</span>
        </Button>
      </header>

      {/* Full screen TEMS Background - hidden on mobile when chat is shown */}
      <div className={cn(
        "h-[100dvh] pt-[57px] lg:pt-0 relative",
        showChat && "hidden lg:block"
      )}>
        <Image
          src={TEMS_BACKGROUND}
          alt="TEMS Invoice Search Interface"
          fill
          className="object-cover object-top"
          priority
        />

        {/* Floating AI Assistant Toggle Button - desktop only */}
        <Button
          variant="default"
          className={cn(
            "fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-6 gap-2 shadow-lg z-30 transition-all duration-300 hidden lg:flex",
            showChat ? "lg:right-[396px]" : "right-6"
          )}
          onClick={() => setShowChat(!showChat)}
        >
          {showChat ? (
            <>
              <X className="w-4 h-4" />
              <span>Hide AI Assistant</span>
            </>
          ) : (
            <>
              <MessageSquare className="w-4 h-4" />
              <span>Open AI Assistant</span>
            </>
          )}
        </Button>
      </div>

      {/* Chat Panel */}
      <div
        className={cn(
          // Mobile: full screen when visible
          'fixed right-0 top-0 h-[100dvh] z-40',
          'w-full lg:w-[380px]',
          // Desktop: slide animation
          'lg:transition-transform lg:duration-300 lg:ease-in-out lg:shadow-2xl lg:border-l lg:border-border',
          // Mobile: just show/hide, no slide
          showChat ? 'block lg:translate-x-0' : 'hidden lg:block lg:translate-x-full'
        )}
      >
        <ChatPanel className="h-full" />
      </div>
    </div>
  )
}
