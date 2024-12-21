import { cache } from 'react'
import 'server-only'

import { COLLECTION_IDS } from '@/lib/constants'

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_RAINDROP_ACCESS_TOKEN}`
  },
  next: {
    revalidate: 60 * 60 * 24 * 2 // 2 days
  }
}

const RAINDROP_API_URL = 'https://api.raindrop.io/rest/v1'

export const getBookmarkItems = cache(async (id, pageIndex = 0) => {
  try {
    const token = process.env.NEXT_PUBLIC_RAINDROP_ACCESS_TOKEN?.trim()
    if (!token) {
      console.error('Raindrop access token is not set')
      return null
    }

    const url = new URL(`${RAINDROP_API_URL}/raindrops/${id}`)
    url.search = new URLSearchParams({
      page: pageIndex,
      perpage: 50
    }).toString()

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      console.error('Raindrop API error:', response.status, response.statusText)
      return null
    }

    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      console.error('Received non-JSON response:', text.slice(0, 100))
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('Raindrop API exception:', error)
    return null
  }
})

export const getBookmarks = cache(async () => {
  try {
    const token = process.env.NEXT_PUBLIC_RAINDROP_ACCESS_TOKEN?.trim()
    if (!token) {
      console.error('Raindrop access token is not set')
      return []
    }
    const response = await fetch(`${RAINDROP_API_URL}/collections`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      console.error('Raindrop API error:', response.status, response.statusText)
      return []
    }

    const bookmarks = await response.json()

    if (!bookmarks?.items) {
      console.error('Invalid Raindrop API response:', bookmarks)
      return []
    }

    const filteredBookmarks = bookmarks.items.filter((bookmark) => {
      return COLLECTION_IDS.includes(bookmark._id)
    })
    return filteredBookmarks
  } catch (error) {
    console.error('Raindrop API exception:', error)
    return []
  }
})

export const getBookmark = cache(async (id) => {
  try {
    const response = await fetch(`${RAINDROP_API_URL}/collection/${id}`, options)
    return await response.json()
  } catch (error) {
    console.info(error)
    return null
  }
})
