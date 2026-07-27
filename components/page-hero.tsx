'use client'

import { ReactNode } from 'react'

interface PageHeroProps {
  title: string
  subtitle?: string
  description?: string
  breadcrumbs?: { label: string; href?: string }[]
  children?: ReactNode
}

export default function PageHero({ title, subtitle, description, breadcrumbs, children }: PageHeroProps) {
  return (
    <section className="pt-28 pb-12 px-5 md:px-8 bg-[#FAF8F4] border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-[#3B434C] mb-5">
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="flex items-center gap-2">
                {idx > 0 && <span>/</span>}
                {crumb.href ? (
                  <a href={crumb.href} className="hover:text-[#0E6F66] transition-colors">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-[#14181D] font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </div>
        )}

        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl  font-bold text-[#14181D] mb-3">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl text-[#0E6F66] font-semibold mb-3">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="text-body-lg text-[#22282F]">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}