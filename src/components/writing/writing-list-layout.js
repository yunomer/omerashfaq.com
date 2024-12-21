'use client'

import { usePathname } from 'next/navigation'

import { WritingLink } from '@/components/writing-link'
import { cn } from '@/lib/utils'

export const WritingListLayout = ({ list, isMobile }) => {
  const pathname = usePathname()

  return (
    <div className={cn(!isMobile && 'flex flex-col gap-1 text-sm')}>
      {list.map((post) => {
        const isActive = pathname === `/writing/${post.slug}`

        return <WritingLink key={post.slug} post={post} isMobile={isMobile} isActive={isActive} />
      })}
    </div>
  )
}
