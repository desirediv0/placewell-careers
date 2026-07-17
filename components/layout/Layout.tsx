'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main key={pathname} className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}