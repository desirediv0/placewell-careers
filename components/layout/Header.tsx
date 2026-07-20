'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { siteData } from '@/lib/data'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const isActive = (route: string) => {
    if (route === '/') return pathname === '/'
    return pathname === route
  }

  return (
    <header className={`fixed top-0 w-full bg-white z-50 transition-all duration-300 ${scrolled ? 'border-b border-gray-200 shadow-sm' : 'border-b border-transparent'
      }`}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-3 md:py-4 flex items-center justify-between">
        {/* Logo + Tagline */}
        <Link href="/" className="flex items-center flex-shrink-0 gap-3">
          <img src={siteData.logo} alt={siteData.company} className="h-14 md:h-20 w-auto" />
          <span className="hidden lg:block text-[11px] font-semibold text-[#64748b] tracking-wide leading-tight max-w-[120px]">
            Building Teams.<br />Shaping Leaders
          </span>
        </Link>

        {/* Center Navigation - Desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          {siteData.navigation.map((item) => {
            const route = siteData.routes[item as keyof typeof siteData.routes]
            const active = isActive(route)
            return (
              <Link
                key={item}
                href={route}
                className={`relative text-sm font-medium transition-colors py-1 ${active
                  ? 'text-[#223A8F]'
                  : 'text-[#475569] hover:text-[#223A8F]'
                  }`}
              >
                {item}
                {active && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#223A8F] rounded-full" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right Side CTAs - Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact">
            <button className="h-[42px] px-5 border border-[#223A8F] text-[#223A8F] font-medium text-sm rounded-[6px] hover:bg-[#F5F7FA] transition-colors">
              Drop Your CV
            </button>
          </Link>
          <Link href="/contact">
            <button className="h-[42px] px-5 bg-[#223A8F] text-white font-medium text-sm rounded-[6px] hover:bg-[#1a2a6f] transition-colors">
              Enquiry
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-[#1F2937] p-2 -mr-2"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Fullscreen Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-0 bg-white z-50 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center flex-shrink-0" onClick={() => setIsOpen(false)}>
              <img src={siteData.logo} alt={siteData.company} className="h-10 md:h-12 w-auto" />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#1F2937] p-2 -mr-2"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] gap-6 px-6">
            {siteData.navigation.map((item) => {
              const route = siteData.routes[item as keyof typeof siteData.routes]
              const active = isActive(route)
              return (
                <Link
                  key={item}
                  href={route}
                  onClick={() => setIsOpen(false)}
                  className={`text-xl font-semibold transition-colors ${active
                    ? 'text-[#223A8F]'
                    : 'text-[#1F2937] hover:text-[#223A8F]'
                    }`}
                >
                  {item}
                </Link>
              )
            })}

            <div className="flex flex-col gap-3 mt-6 w-full max-w-xs">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <button className="w-full h-[48px] border border-[#223A8F] text-[#223A8F] font-semibold text-sm rounded-[6px] hover:bg-[#F5F7FA] transition-colors">
                  Drop Your CV
                </button>
              </Link>
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <button className="w-full h-[48px] bg-[#223A8F] text-white font-semibold text-sm rounded-[6px] hover:bg-[#1a2a6f] transition-colors">
                  Enquiry
                </button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}