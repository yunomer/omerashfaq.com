import { cache } from 'react'
import 'server-only'

import { isDevelopment } from '@/lib/utils'

const fetchGraphQL = cache(async (query, preview = isDevelopment) => {
  try {
    console.log('🔍 Making GraphQL request to Contentful...')
    console.log('📝 Query:', query)
    console.log('🔑 Using preview:', preview)

    const url = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`
    const token = preview ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN

    console.log('🌐 URL:', url)
    console.log('🔑 Token available:', !!token)

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ query })
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error('❌ Contentful Error:', {
        status: res.status,
        statusText: res.statusText,
        error: errorText,
        headers: Object.fromEntries(res.headers.entries())
      })
      return null
    }

    const data = await res.json()
    console.log('✅ Contentful response received')
    return data
  } catch (error) {
    console.error('❌ Contentful Exception:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    return null
  }
})

// https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#preloading-data
export const preloadGetAllPosts = (preview = isDevelopment) => {
  void getAllPosts(preview)
}

export const getAllPosts = cache(async (preview = isDevelopment) => {
  try {
    const entries = await fetchGraphQL(
      `query {
        postCollection(preview: ${preview}) {
          items {
            title
            slug
            date
            sys {
              firstPublishedAt
              publishedAt
            }
          }
        }
      }`,
      preview
    )

    return entries?.data?.postCollection?.items ?? []
  } catch (error) {
    console.info(error)
    return []
  }
})

export const getPost = cache(async (slug, preview = isDevelopment) => {
  try {
    const entry = await fetchGraphQL(
      `query {
        postCollection(where: { slug: "${slug}" }, preview: ${preview}, limit: 1) {
          items {
            title
            slug
            date
            seo {
              title
              description
            }
            content {
              json
              links {
                assets {
                  block {
                    sys {
                      id
                    }
                    url(transform: {
                      format: AVIF,
                      quality: 50
                    })
                    title
                    width
                    height
                    description
                    contentfulMetadata {
                      tags {
                        name
                      }
                    }
                  }
                }
                entries {
                  inline {
                    sys {
                      id
                    }
                    __typename
                    ... on ContentEmbed {
                      title
                      embedUrl
                      type
                    }
                    ... on CodeBlock {
                      title
                      code
                    }
                    ... on Carousel {
                      imagesCollection {
                        items {
                          title
                          description
                          url(transform: {
                            format: AVIF,
                            quality: 50
                          })
                        }
                      }
                    }
                  }
                }
              }
            }
            sys {
              firstPublishedAt
              publishedAt
            }
          }
        }
      }`,
      preview
    )

    return entry?.data?.postCollection?.items?.[0] ?? null
  } catch (error) {
    console.info(error)
    return null
  }
})

export const getWritingSeo = cache(async (slug, preview = isDevelopment) => {
  try {
    const entry = await fetchGraphQL(
      `query {
        postCollection(where: { slug: "${slug}" }, preview: ${preview}, limit: 1) {
          items {
            date
            seo {
              title
              description
              ogImageTitle
              ogImageSubtitle
              keywords
            }
            sys {
              firstPublishedAt
              publishedAt
            }
          }
        }
      }`,
      preview
    )

    return entry?.data?.postCollection?.items?.[0] ?? null
  } catch (error) {
    console.info(error)
    return null
  }
})

export const getPageSeo = cache(async (slug, preview = isDevelopment) => {
  try {
    const entry = await fetchGraphQL(
      `query {
        pageCollection(where: { slug: "${slug}" }, preview: ${preview}, limit: 1) {
          items {
            seo {
              title
              description
              ogImageTitle
              ogImageSubtitle
              keywords
            }
          }
        }
      }`,
      preview
    )

    return entry?.data?.pageCollection?.items?.[0] ?? null
  } catch (error) {
    console.info(error)
    return null
  }
})

export const getAllPageSlugs = cache(async (preview = isDevelopment) => {
  try {
    const entries = await fetchGraphQL(
      `query {
        pageCollection(preview: ${preview}) {
          items {
            slug
            hasCustomPage
            sys {
              id
              firstPublishedAt
              publishedAt
            }
          }
        }
      }`,
      preview
    )

    return entries?.data?.pageCollection?.items ?? []
  } catch (error) {
    console.info(error)
    return []
  }
})

export const getAllPostSlugs = cache(async (preview = isDevelopment) => {
  try {
    const entries = await fetchGraphQL(
      `query {
        postCollection(preview: ${preview}) {
          items {
            slug
          }
        }
      }`,
      preview
    )

    return entries?.data?.postCollection?.items ?? []
  } catch (error) {
    console.info(error)
    return []
  }
})

export const getPage = cache(async (slug, preview = isDevelopment) => {
  try {
    const entry = await fetchGraphQL(
      `query {
        pageCollection(where: { slug: "${slug}" }, preview: ${preview}, limit: 1) {
          items {
            title
            slug
            content {
              json
              links {
                assets {
                  block {
                    sys {
                      id
                    }
                    url(transform: {
                      format: AVIF,
                      quality: 50
                    })
                    title
                    width
                    height
                    description
                  }
                }
              }
            }
            sys {
              id
              firstPublishedAt
              publishedAt
            }
          }
        }
      }`,
      preview
    )

    return entry?.data?.pageCollection?.items?.[0] ?? null
  } catch (error) {
    console.info(error)
    return null
  }
})

export const getAllLogbook = cache(async (preview = isDevelopment) => {
  try {
    const entries = await fetchGraphQL(
      `query {
        logbookCollection(order: date_DESC, preview: ${preview}) {
          items {
            title
            date
            description
            image {
              url(transform: {
                format: AVIF,
                quality: 50
              })
              title
              description
              width
              height
            }
          }
        }
      }`,
      preview
    )

    return entries?.data?.logbookCollection?.items ?? []
  } catch (error) {
    console.info(error)
    return []
  }
})

export const preloadGetAllCareerPosts = (preview = isDevelopment) => {
  void getAllCareerPosts(preview)
}

export const getAllCareerPosts = cache(async (preview = isDevelopment) => {
  try {
    const entries = await fetchGraphQL(
      `query {
        careerCollection(preview: ${preview}) {
          items {
            title
            slug
            date
            sys {
              firstPublishedAt
              publishedAt
            }
          }
        }
      }`,
      preview
    )

    return entries?.data?.careerCollection?.items ?? []
  } catch (error) {
    console.info(error)
    return []
  }
})

export const getCareerPost = cache(async (slug, preview = isDevelopment) => {
  try {
    const entry = await fetchGraphQL(
      `query {
        careerCollection(where: { slug: "${slug}" }, preview: ${preview}, limit: 1) {
          items {
            title
            slug
            date
            seo {
              title
              description
            }
            content {
              json
              links {
                assets {
                  block {
                    sys {
                      id
                    }
                    url(transform: {
                      format: AVIF,
                      quality: 50
                    })
                    title
                    width
                    height
                    description
                    contentfulMetadata {
                      tags {
                        name
                      }
                    }
                  }
                }
                entries {
                  block {
                    sys {
                      id
                    }
                    __typename
                    ... on ContentEmbed {
                      title
                      embedUrl
                      type
                    }
                    ... on CodeBlock {
                      title
                      code
                    }
                    ... on Carousel {
                      imagesCollection {
                        items {
                          title
                          description
                          url(transform: {
                            format: AVIF,
                            quality: 50
                          })
                        }
                      }
                    }
                  }
                  inline {
                    sys {
                      id
                    }
                    __typename
                    ... on ContentEmbed {
                      title
                      embedUrl
                      type
                    }
                    ... on CodeBlock {
                      title
                      code
                    }
                    ... on Carousel {
                      imagesCollection {
                        items {
                          title
                          description
                          url(transform: {
                            format: AVIF,
                            quality: 50
                          })
                        }
                      }
                    }
                  }
                }
              }
            }
            sys {
              firstPublishedAt
              publishedAt
            }
          }
        }
      }`,
      preview
    )

    return entry?.data?.careerCollection?.items?.[0] ?? null
  } catch (error) {
    console.info(error)
    return null
  }
})
