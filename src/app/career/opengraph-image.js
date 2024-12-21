import { ImageResponse } from 'next/og'

import { OpenGraphImage } from '@/components/og-image'
import { getRegularFont, getBoldFont } from '@/lib/fonts'
import { sharedMetadata } from '@/app/shared-metadata'

export const alt = 'Career'
export const size = {
  width: sharedMetadata.ogImage.width,
  height: sharedMetadata.ogImage.height
}
export const contentType = sharedMetadata.ogImage.type

export default async function Image() {
  const [regularFontData, boldFontData] = await Promise.all([getRegularFont(), getBoldFont()])

  return new ImageResponse(
    (
      <OpenGraphImage
        title="Career"
        description="Professional journey and experiences"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        }
        regularFont={regularFontData}
        boldFont={boldFontData}
      />
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Regular',
          data: regularFontData,
          style: 'normal',
          weight: 400
        },
        {
          name: 'Bold',
          data: boldFontData,
          style: 'normal',
          weight: 700
        }
      ]
    }
  )
}
