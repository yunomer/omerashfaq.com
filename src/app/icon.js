import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32
}
export const contentType = 'image/png'

// Using a static SVG string instead of dynamic generation
export default function Icon() {
  return new Response(
    `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 16C0 4 4 0 16 0s16 4 16 16-4 16-16 16S0 28 0 16" fill="#000"/>
    </svg>`,
    {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    }
  )
}
