import { ImageResponse } from 'next/og'

import { OpenGraphImage } from '@/components/og-image'
import { getRegularFont, getBoldFont } from '@/lib/fonts'
import { sharedMetadata } from '@/app/shared-metadata'

export const alt = 'Writing'
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
        title="Writing"
        description="Articles, thoughts, and stories"
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
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
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
