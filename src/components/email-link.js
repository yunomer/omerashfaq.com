'use client'

import { useState } from 'react'
import { CopyIcon, CheckIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const EmailLink = ({ href, label, icon }) => {
  const [copied, setCopied] = useState(false)
  const email = href.replace('mailto:', '')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="flex items-center justify-between gap-2 rounded-lg p-2 hover:bg-gray-200">
      <span className="inline-flex items-center gap-2 font-medium">
        {icon} {label}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="size-4 p-0 hover:bg-transparent"
        onClick={handleCopy}
        title={copied ? 'Copied!' : 'Copy to clipboard'}
      >
        {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
      </Button>
    </div>
  )
}
