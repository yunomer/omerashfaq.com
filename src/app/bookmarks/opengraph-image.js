import { ImageResponse } from 'next/og'

import { OpenGraphImage } from '@/components/og-image'
import { getRegularFont, getBoldFont } from '@/lib/fonts'
import { sharedMetadata } from '@/app/shared-metadata'

export const alt = 'Bookmarks'
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
        title="Bookmarks"
        description="A curated collection of interesting links"
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
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
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
