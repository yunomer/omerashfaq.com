import { Suspense } from 'react'

import { ScrollArea } from '@/components/scroll-area'
import { FloatingHeader } from '@/components/floating-header'
import { ScreenLoadingSpinner } from '@/components/screen-loading-spinner'
import { CareerListLayout } from '@/components/career/career-list-layout'
import { getPageSeo, getAllCareerPosts } from '@/lib/contentful'
import { getSortedPosts } from '@/lib/utils'

async function fetchData() {
  try {
    console.log('🔍 Starting to fetch career posts...')

    // Check if we can access the function
    if (typeof getAllCareerPosts !== 'function') {
      console.error('❌ getAllCareerPosts is not a function')
      return { sortedPosts: [] }
    }

    // Try to get career posts
    const careerPosts = await getAllCareerPosts()
    console.log('📝 Raw career posts:', careerPosts)

    // Validate career posts
    if (!careerPosts) {
      console.error('❌ Career posts is null or undefined')
      return { sortedPosts: [] }
    }

    if (!Array.isArray(careerPosts)) {
      console.error('❌ Career posts is not an array:', typeof careerPosts)
      return { sortedPosts: [] }
    }

    if (careerPosts.length === 0) {
      console.log('ℹ️ No career posts found')
      return { sortedPosts: [] }
    }

    // Try to sort posts
    console.log('🔄 Attempting to sort career posts...')
    const sortedCareerPosts = getSortedPosts(careerPosts)
    console.log('✅ Successfully sorted career posts:', sortedCareerPosts)

    return { sortedPosts: sortedCareerPosts }
  } catch (error) {
    console.error('❌ Error in fetchData:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    return { sortedPosts: [] }
  }
}

export default async function Career() {
  try {
    const { sortedPosts } = await fetchData()
    console.log('🎯 Final sorted posts:', sortedPosts)

    return (
      <ScrollArea className="lg:hidden">
        <FloatingHeader title="Career" />
        <Suspense fallback={<ScreenLoadingSpinner />}>
          <CareerListLayout list={sortedPosts} isMobile />
        </Suspense>
      </ScrollArea>
    )
  } catch (error) {
    console.error('❌ Error in Career component:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    return <div>Error loading career posts</div>
  }
}

export async function generateMetadata() {
  const seoData = await getPageSeo('Career')
  if (!seoData) return null

  const {
    seo: { title, description }
  } = seoData
  const siteUrl = '/career'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteUrl
    },
    alternates: {
      canonical: siteUrl
    }
  }
}
