'use client'

import { useState } from 'react'
import { Landmark, WalletCards, ArrowRight, Building2 } from 'lucide-react'

const industries = [
  {
    icon: Landmark,
    name: 'BFSI',
    description: 'Banking, Financial Services and Insurance hiring across sales, operations, technology, compliance and leadership positions.',
    tag: 'Leadership Hiring',
    color: 'from-blue-600 to-blue-800',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: WalletCards,
    name: 'Fintech',
    description: 'Supporting high-growth fintech companies with technology, operations, product and leadership recruitment.',
    tag: 'Digital Talent',
    color: 'from-indigo-600 to-indigo-800',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
  {
    icon: Building2,
    name: 'GCC',
    description: 'Global Capability Centers hiring across technology, operations, analytics and leadership functions.',
    tag: 'Global Delivery',
    color: 'from-violet-600 to-violet-800',
    bgColor: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
]

export default function Industries() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-12 md:py-16 px-5 md:px-8 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-[2px] bg-[#1D4ED8]" />
            <span className="text-[#1D4ED8] text-sm font-semibold tracking-wider uppercase">Our Expertise</span>
            <div className="w-8 h-[2px] bg-[#1D4ED8]" />
          </div>
          <h2 className="text-h2 font-bold text-[#0f172a] mb-3">Industries We Serve</h2>
          <p className="text-body-lg text-[#64748b] max-w-2xl mx-auto">
            Delivering specialized recruitment solutions across India&apos;s fastest growing industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {industries.map((industry, idx) => {
            const Icon = industry.icon
            const isHovered = hoveredIndex === idx

            return (
              <div
                key={idx}
                className={`group relative rounded-[6px] border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
                  idx % 3 === 0 ? 'bg-[#f0f7ff]' : idx % 3 === 1 ? 'bg-[#f8fafc]' : 'bg-[#f5f3ff]'
                }`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={`h-1 bg-gradient-to-r ${industry.color} transition-all duration-300 ${isHovered ? 'h-1.5' : 'h-1'}`} />
                <div className="p-6">
                  <div className={`w-14 h-14 ${industry.bgColor} rounded-[6px] flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-105`}>
                    <Icon size={28} strokeWidth={1.5} className={`${industry.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-[#0f172a] mb-2">{industry.name}</h3>
                  <p className="text-sm text-[#64748b] leading-relaxed mb-4">{industry.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className={`inline-block px-3 py-1.5 bg-gradient-to-r ${industry.color} text-white text-[11px] font-semibold rounded-full tracking-wide`}>
                      {industry.tag}
                    </span>
                    <div className={`flex items-center gap-1.5 text-sm font-medium transition-all duration-300 ${isHovered ? 'text-[#1D4ED8] opacity-100' : 'text-gray-400 opacity-0'}`}>
                      <span>Learn more</span>
                      <ArrowRight size={14} className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}