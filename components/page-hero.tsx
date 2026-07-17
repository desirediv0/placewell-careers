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
    <section className="pt-28 pb-12 px-5 md:px-8 bg-[#F8FAFC] border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-5">
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="flex items-center gap-2">
                {idx > 0 && <span>/</span>}
                {crumb.href ? (
                  <a href={crumb.href} className="hover:text-[#223A8F] transition-colors">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-[#1F2937] font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </div>
        )}

        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl  font-bold text-[#1F2937] mb-3">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl text-[#2D6CDF] font-semibold mb-3">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="text-body-lg text-[#4B5563]">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}