import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Manrope, Jost } from 'next/font/local'
import Layout from '@/components/layout/Layout'
import './globals.css'

const manrope = Manrope({
  src: './fonts/Manrope-VariableFont_wght.ttf',
  variable: '--font-heading',
  display: 'swap',
  weight: '200 800',
})

const jost = Jost({
  src: [
    { path: './fonts/Jost-VariableFont_wght.ttf', weight: '100 900' },
    { path: './fonts/Jost-Italic-VariableFont_wght.ttf', weight: '100 900', style: 'italic' },
  ],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Placewell Careers - Building Teams. Shaping Leaders.',
    template: '%s | Placewell Careers',
  },
  description: 'A trusted talent solutions partner serving organizations across BFSI, IT/EdTech, Healthcare, and Hospitality sectors.',
  keywords: ['recruitment', 'RPO', 'talent acquisition', 'executive search', 'hiring', 'talent solutions'],
  authors: [{ name: 'Placewell Careers' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Placewell Careers - Building Teams. Shaping Leaders.',
    description: 'A trusted talent solutions partner serving organizations across BFSI, IT/EdTech, Healthcare, and Hospitality sectors.',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FAF8F4',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${jost.variable} scroll-smooth`}>
      <body className="font-body antialiased bg-white text-[#2B3138]">
        <Layout>{children}</Layout>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}