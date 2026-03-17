'use client'

import { useState, useRef, useEffect } from 'react'
import { ChatHeader } from './chat-header'
import { ChatInput } from './chat-input'
import { MessageBubble } from './message-bubble'
import { ThinkingIndicator } from './thinking-indicator'
import { ResultCard } from './result-card'
import { ChartSection } from './chart-section'
import { SuggestedQueries } from './suggested-queries'
import { getAIResponse, suggestedQueries, type QueryResult } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
  result?: QueryResult
}

interface ChatPanelProps {
  className?: string
}

const INITIAL_MESSAGE = 'Hello! I\'m TEMS AI Assistant. I can help you query telecom expense data, analyze vendor costs, and explore circuit inventory. What would you like to know?'

export function ChatPanel({ className }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isThinking, setIsThinking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Initialize with welcome message on client side only to avoid hydration mismatch
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          content: INITIAL_MESSAGE,
          isUser: false,
          timestamp: new Date(),
        },
      ])
    }
  }, [messages.length])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isThinking])

  const handleSendMessage = async (content: string) => {
    console.log("[v0] handleSendMessage called with:", content)
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    // Show thinking indicator
    setIsThinking(true)

    // Simulate AI thinking delay
    await new Promise((resolve) => setTimeout(resolve, 1200 + Math.random() * 800))

    // Get AI response
    console.log("[v0] About to call getAIResponse with:", content)
    const response = getAIResponse(content)
    console.log("[v0] getAIResponse returned:", response)

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response.message,
      isUser: false,
      timestamp: new Date(),
      result: response.result,
    }

    setIsThinking(false)
    setMessages((prev) => [...prev, aiMessage])
  }

  const handleNewQuery = () => {
    setMessages([
      {
        id: Date.now().toString(),
        content: 'Starting a new conversation. How can I help you with telecom expense data?',
        isUser: false,
        timestamp: new Date(),
      },
    ])
  }

  // Show loading state while initializing
  if (messages.length === 0) {
    return (
      <div
        className={cn(
          'flex flex-col bg-card border-l border-border h-full items-center justify-center',
          className
        )}
      >
        <div className="animate-pulse text-muted-foreground text-sm">Loading...</div>
      </div>
    )
  }

  const handleSuggestedQuery = (query: string) => {
    handleSendMessage(query)
  }

  // Determine if we should show chart as bar (for vendor data) or line (for time series)
  const getChartType = (title: string): 'bar' | 'line' => {
    if (title.toLowerCase().includes('vendor') || title.toLowerCase().includes('distribution')) {
      return 'bar'
    }
    return 'line'
  }

  return (
    <div
      className={cn(
        'flex flex-col bg-card border-l border-border h-full w-full',
        className
      )}
    >
      <ChatHeader onNewQuery={handleNewQuery} />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="space-y-3">
            <MessageBubble
              content={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />

            {/* Result Card */}
            {message.result && (
              <div className="ml-9 space-y-3">
                <ResultCard result={message.result} />

                {/* Chart */}
                {message.result.chartData && message.result.chartTitle && (
                  <ChartSection
                    data={message.result.chartData}
                    title={message.result.chartTitle}
                    chartType={getChartType(message.result.chartTitle)}
                  />
                )}

                {/* Suggested Queries after results */}
                <SuggestedQueries
                  queries={suggestedQueries.slice(0, 4)}
                  onSelect={handleSuggestedQuery}
                />
              </div>
            )}
          </div>
        ))}

        {isThinking && <ThinkingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={handleSendMessage} disabled={isThinking} />
    </div>
  )
}
