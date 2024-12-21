import { ImageResponse } from 'next/og'

import { OpenGraphImage } from '@/components/og-image'
import { getRegularFont, getBoldFont } from '@/lib/fonts'
import { sharedMetadata } from '@/app/shared-metadata'

export const alt = 'Journey'
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
        title="Journey"
        description="Life experiences and personal growth"
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
            <path d="M12 22c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" />
            <path d="M12 8v4l3 3" />
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
