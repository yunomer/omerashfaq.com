import Link from 'next/link'
import { LazyMotion, domAnimation, m } from 'framer-motion'

import { cn, getDateTimeFormat } from '@/lib/utils'

export const WritingLink = ({ post, isMobile, isActive }) => {
  const date = post.date || post.sys.firstPublishedAt
  const formattedDate = getDateTimeFormat(date)

  return (
    <LazyMotion features={domAnimation}>
      <Link
        key={post.slug}
        href={`/writing/${post.slug}`}
        className={cn(
          'flex flex-col gap-1 transition-colors duration-300',
          !isMobile && isActive ? 'bg-black text-white' : 'hover:bg-gray-200',
          isMobile ? 'border-b px-4 py-3 text-sm hover:bg-gray-100' : 'rounded-lg p-2'
        )}
      >
        <span className="font-medium">{post.title}</span>
        <span className={cn('transition-colors duration-300', isActive ? 'text-slate-400' : 'text-slate-500')}>
          <time dateTime={date}>{formattedDate}</time>
        </span>
      </Link>
    </LazyMotion>
  )
}
