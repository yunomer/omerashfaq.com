'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LazyMotion, domAnimation } from 'framer-motion'

import { cn, getDateTimeFormat } from '@/lib/utils'

export const CareerListLayout = ({ list, isMobile }) => {
  const pathname = usePathname()

  return (
    <div className={cn(!isMobile && 'flex flex-col gap-1 text-sm')}>
      {list.map((career) => {
        const isActive = pathname === `/career/${career.slug}`
        const date = career.date || career.sys.firstPublishedAt
        const formattedDate = getDateTimeFormat(date)

        return (
          <Link
            key={career.slug}
            href={`/career/${career.slug}`}
            className={cn(
              'flex flex-col gap-1 transition-colors duration-300',
              !isMobile && isActive ? 'bg-black text-white' : 'hover:bg-gray-200',
              isMobile ? 'border-b px-4 py-3 text-sm hover:bg-gray-100' : 'rounded-lg p-2'
            )}
          >
            <span className="font-medium">{career.title}</span>
            <span className={cn('transition-colors duration-300', isActive ? 'text-slate-400' : 'text-slate-500')}>
              <time dateTime={date}>{formattedDate}</time>
            </span>
          </Link>
        )
      })}
    </div>
  )
}
