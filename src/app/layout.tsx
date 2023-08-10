import './globals.scss'
import '@/styles/theme.scss'

import { Instrument_Sans } from 'next/font/google'
import type { Metadata } from 'next'

const instrumentSans = Instrument_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Link sharing app',
  description:
    'Discover and share valuable developer links with DevLinks, the Next.js-powered app for developers.',
}

interface IProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body className={instrumentSans.className}>{children}</body>
    </html>
  )
}
