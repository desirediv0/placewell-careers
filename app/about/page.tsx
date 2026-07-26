'use client'

import Link from 'next/link'
import { siteData } from '@/lib/data'
import { ChevronRight, Target, Eye, Flag, Handshake, Users, Rocket } from 'lucide-react'

export default function AboutPage() {
  const timelineIcons = [Flag, Handshake, Users, Rocket]

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-[#FAF8F4]">
        <div className="absolute inset-0">
          <img src="/about-hero-bg.png" alt="Placewell Careers Office" className="w-full h-full object-cover photo-light" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F4] via-[#FAF8F4]/88 to-[#FAF8F4]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F4] via-transparent to-[#FAF8F4]/45" />
        </div>
        <div className="relative z-10 w-full pb-16 px-5 md:px-8">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-2 text-sm text-[#6B7480] mb-8">
              <Link href="/" className="hover:text-[#0E6F66] transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-[#2B3138] font-medium">About Us</span>
            </div>
            <h1 className="text-h1 font-bold text-[#2B3138] leading-[1.1] mb-4">
              Our Journey
            </h1>
            <p className="text-body-lg text-[#565E69] max-w-lg">
              Building India&apos;s Most Trusted Talent Solutions Partner Since 2008
            </p>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-12 md:py-16 px-5 md:px-8 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative">
            <div className="absolute top-[36px] left-[10%] right-[10%] h-[2px] bg-[#CFE8E3] hidden md:block z-0" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
              {siteData.about.timeline.map((item, idx) => {
                const IconComponent = timelineIcons[idx] || Flag
                return (
                  <div key={idx} className="flex flex-col items-center text-center">
                    <div className="px-2.5 py-1 bg-[#2B3138] text-white text-[10px] font-semibold rounded-full mb-2.5 uppercase tracking-wider">
                      {item.year}
                    </div>
                    <div className="w-11 h-11 rounded-full bg-[#E8F4F1] border-2 border-white shadow-md flex items-center justify-center text-[#0E6F66] mb-3">
                      <IconComponent size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#2B3138] mb-1.5">{item.title}</h4>
                      <p className="text-xs text-[#565E69] leading-relaxed max-w-[220px] mx-auto">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-12 md:py-16 px-5 md:px-8 bg-[#FAF8F4]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-bold text-[#2B3138] mb-3">Vision &amp; Mission</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex gap-3.5 items-start p-6 bg-white rounded-[6px] border border-gray-200 shadow-sm">
              <div className="w-10 h-10 bg-[#E8F4F1] rounded-[6px] flex items-center justify-center text-[#0E6F66] flex-shrink-0">
                <Eye size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#2B3138] mb-2">Our Vision</h3>
                <p className="text-sm text-[#565E69] leading-relaxed">{siteData.vision}</p>
              </div>
            </div>
            <div className="flex gap-3.5 items-start p-6 bg-white rounded-[6px] border border-gray-200 shadow-sm">
              <div className="w-10 h-10 bg-[#E8F4F1] rounded-[6px] flex items-center justify-center text-[#0E6F66] flex-shrink-0">
                <Target size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#2B3138] mb-2">Our Mission</h3>
                <p className="text-sm text-[#565E69] leading-relaxed">{siteData.mission}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}