import '@/globals.css'
import { draftMode } from 'next/headers'
import Script from 'next/script'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { EyeIcon } from 'lucide-react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { TailwindIndicator } from '@/components/tailwind-indicator'
import { SideMenu } from '@/components/side-menu'
import { MenuContent } from '@/components/menu-content'
import { preloadGetAllPosts, preloadGetAllCareerPosts } from '@/lib/contentful'
import { PROFILES } from '@/lib/constants'
import { sharedMetadata } from '@/app/shared-metadata'

export default async function RootLayout({ children }) {
  const { isEnabled } = draftMode()
  preloadGetAllPosts(isEnabled)
  preloadGetAllCareerPosts(isEnabled)

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <main vaul-drawer-wrapper="" className="min-h-screen bg-white">
          {isEnabled && (
            <div className="absolute inset-x-0 bottom-0 z-50 flex h-12 w-full items-center justify-center bg-green-500 text-center text-sm font-medium text-white">
              <div className="flex items-center gap-2">
                <EyeIcon size={16} />
                <span>Draft mode is enabled</span>
              </div>
            </div>
          )}
          <div className="lg:flex">
            <SideMenu className="relative hidden lg:flex">
              <MenuContent />
            </SideMenu>
            <div className="flex flex-1">{children}</div>
          </div>
        </main>
        <TailwindIndicator />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

export const metadata = {
  ...sharedMetadata,
  metadataBase: new URL('https://omerashfaq.com')
}

export const viewport = {
  themeColor: 'white',
  colorScheme: 'only light',
  width: 'device-width',
  initialScale: 1
}
