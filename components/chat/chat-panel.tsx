'use client'

import { useState, useRef, useEffect } from 'react'
import { ChatHeader } from './chat-header'
import { ChatInput } from './chat-input'
import { MessageBubble } from './message-bubble'
import { ThinkingIndicator } from './thinking-indicator'
import { ResultCard } from './result-card'
import { ChartSection } from './chart-section'
import { SuggestedQueries } from './suggested-queries'
import { ClarificationButtons } from './clarification-buttons'
import { WelcomeScreen } from './welcome-screen'
import { QueryDivider } from './query-divider'
import { getAIResponse, type QueryResult, type ClarificationOption } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
  result?: QueryResult
  clarification?: {
    question: string
    options: ClarificationOption[]
  }
  suggestedFollowUps?: string[]
  type?: 'message' | 'divider'
}

interface ChatPanelProps {
  className?: string
}

const INITIAL_MESSAGE = 'Hello! I\'m TEMS AI Assistant. I can help you query telecom expense data, analyze vendor costs, and explore circuit inventory.'

export function ChatPanel({ className }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isThinking, setIsThinking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Initialize with welcome message
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

  // Check if we're in the initial welcome state (only welcome message, no user interaction yet)
  const isWelcomeState = messages.length === 1 && !messages[0].isUser

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    setIsThinking(true)

    // Simulate AI thinking delay
    await new Promise((resolve) => setTimeout(resolve, 1200 + Math.random() * 800))

    const response = getAIResponse(content)

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response.message,
      isUser: false,
      timestamp: new Date(),
      result: response.result,
      clarification: response.clarification,
      suggestedFollowUps: response.suggestedFollowUps,
    }

    setIsThinking(false)
    setMessages((prev) => [...prev, aiMessage])
  }

  const handleNewQuery = () => {
    // Insert a divider instead of clearing history
    const divider: Message = {
      id: `divider-${Date.now()}`,
      content: '',
      isUser: false,
      timestamp: new Date(),
      type: 'divider',
    }
    const resetMessage: Message = {
      id: Date.now().toString(),
      content: 'New query started. Previous context has been cleared. How can I help you?',
      isUser: false,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, divider, resetMessage])
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

  const getChartType = (title: string): 'bar' | 'line' => {
    if (title.toLowerCase().includes('vendor') || title.toLowerCase().includes('distribution')) {
      return 'bar'
    }
    return 'line'
  }

  // Find the last divider index to determine which messages are "active"
  const lastDividerIndex = messages.reduce((lastIdx, msg, idx) => {
    return msg.type === 'divider' ? idx : lastIdx
  }, -1)

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
        {messages.map((message, index) => {
          // Check if this message is before the last divider (historical)
          const isHistorical = lastDividerIndex >= 0 && index < lastDividerIndex

          if (message.type === 'divider') {
            return <QueryDivider key={message.id} timestamp={message.timestamp} />
          }

          return (
            <div key={message.id} className={cn('space-y-3', isHistorical && 'opacity-40')}>
              <MessageBubble
                content={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />

              {/* Clarification buttons */}
              {message.clarification && !isHistorical && (
                <div className="ml-9">
                  <ClarificationButtons
                    question={message.clarification.question}
                    options={message.clarification.options}
                    onSelect={handleSuggestedQuery}
                  />
                </div>
              )}

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

                  {/* Context-aware suggested follow-ups */}
                  {message.suggestedFollowUps && !isHistorical && (
                    <SuggestedQueries
                      queries={message.suggestedFollowUps}
                      onSelect={handleSuggestedQuery}
                    />
                  )}
                </div>
              )}
            </div>
          )
        })}

        {/* Welcome screen with example queries (only show in initial state) */}
        {isWelcomeState && (
          <WelcomeScreen onSelect={handleSuggestedQuery} />
        )}

        {isThinking && <ThinkingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={handleSendMessage} disabled={isThinking} />
    </div>
  )
}
