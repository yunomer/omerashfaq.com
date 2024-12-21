import { Suspense } from 'react'
import Link from 'next/link'

import { ScrollArea } from '@/components/scroll-area'
import { ScreenLoadingSpinner } from '@/components/screen-loading-spinner'
import { WritingList } from '@/components/writing-list'
import { FloatingHeader } from '@/components/floating-header'
import { PageTitle } from '@/components/page-title'
import { Button } from '@/components/ui/button.jsx'
import { getAllPosts } from '@/lib/contentful'
import { getSortedPosts, getItemsByYear } from '@/lib/utils'
import { ArrowUpRightIcon } from 'lucide-react'

async function fetchData() {
  const allPosts = await getAllPosts()
  const sortedPosts = getSortedPosts(allPosts)
  const items = getItemsByYear(sortedPosts)
  return { items }
}

export default async function Home() {
  const { items } = await fetchData()

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader scrollTitle="Omer Ashfaq" />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title="Home" className="lg:hidden" />
          <p>
            Hi 👋 I'm Omer, a <strong>software engineer</strong>, <strong>entrepreneur</strong>, and{' '}
            <strong>creative thinker</strong> based in Ontario, Canada.
          </p>
          <p>
            I build AI-driven solutions as a Software Engineer and Product Manager. Previously, I co-founded{' '}
            <a
              href="https://corp.comikey.com/about/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-600"
            >
              Comikey Media
              <ArrowUpRightIcon size={16} />
            </a>
            , led business development in emerging markets, and helped launch platforms like Manga Plus and Manga UP!
            Global.
          </p>
          <blockquote className="border-foreground/20 my-6 border-l-2 pl-6 italic">
            I believe that technology should break barriers, not create them. My mission is to build and contribute to
            high-impact solutions that enhance efficiency, accessibility, and innovation in the digital media,
            publishing, and tech space.
          </blockquote>
          <p>
            Now, I'm exploring AI applications in digital publishing with{' '}
            <a
              href="https://akita.studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-600"
            >
              Akita AI
              <ArrowUpRightIcon size={16} />
            </a>
            , developing tools that empower creators and streamline content workflows.
          </p>
          <Button asChild variant="link" className="inline px-0">
            <Link href="/writing">
              <h2 className="mb-4 mt-8">Writing</h2>
            </Link>
          </Button>
          <Suspense fallback={<ScreenLoadingSpinner />}>
            <WritingList items={items} header="Writing" />
          </Suspense>
        </div>
      </div>
    </ScrollArea>
  )
}
