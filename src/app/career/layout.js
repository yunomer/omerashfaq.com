import { Suspense } from 'react'

import { SideMenu } from '@/components/side-menu'
import { ScreenLoadingSpinner } from '@/components/screen-loading-spinner'
import { CareerListLayout } from '@/components/career/career-list-layout'
import { getAllCareerPosts } from '@/lib/contentful'
import { getSortedPosts } from '@/lib/utils'

async function fetchData() {
  try {
    console.log('🔍 Fetching career posts for layout...')
    const allPosts = await getAllCareerPosts()
    console.log('📝 Career posts:', allPosts)
    const sortedPosts = getSortedPosts(allPosts)
    console.log('✅ Sorted career posts:', sortedPosts)
    return { sortedPosts }
  } catch (error) {
    console.error('❌ Error in career layout:', error)
    return { sortedPosts: [] }
  }
}

export default async function CareerLayout({ children }) {
  const { sortedPosts } = await fetchData()

  return (
    <>
      <SideMenu title="Career" isInner>
        <Suspense fallback={<ScreenLoadingSpinner />}>
          <CareerListLayout list={sortedPosts} />
        </Suspense>
      </SideMenu>
      <div className="lg:bg-dots flex-1">{children}</div>
    </>
  )
}
