import { ImageResponse } from 'next/og'

import { OpenGraphImage } from '@/components/og-image'
import { getRegularFont, getBoldFont } from '@/lib/fonts'
import { sharedMetadata } from '@/app/shared-metadata'

export const alt = 'Workspace'
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
        title="Workspace"
        description="Tools, setup, and productivity"
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
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="M6 8h4" />
            <path d="M16 8h2" />
            <path d="M6 12h2" />
            <path d="M12 12h4" />
            <path d="M6 16h4" />
            <path d="M14 16h4" />
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
