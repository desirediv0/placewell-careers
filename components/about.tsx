'use client'

import { siteData } from '@/lib/data'
import { Flag, Handshake, Users, Rocket, Target, Eye } from 'lucide-react'

export default function About() {
  const timelineIcons = [Flag, Handshake, Users, Rocket]

  return (
    <section id="about-us" className="py-12 md:py-16 px-5 md:px-8 bg-[#FAF8F4]">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-[2px] bg-[#0E6F66]" />
            <span className="text-[#0E6F66] text-sm font-semibold tracking-wider uppercase">About Us</span>
            <div className="w-8 h-[2px] bg-[#0E6F66]" />
          </div>
          <h2 className="text-h2 font-bold text-[#2B3138] mb-3">Our Journey</h2>
          <p className="text-body-lg text-[#6B7480] max-w-2xl mx-auto">
            Building India&apos;s Most Trusted Talent Solutions Partner Since 2008
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mb-16">
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

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-3.5 items-start p-6 bg-white rounded-[6px] border border-gray-200 shadow-sm">
            <div className="w-10 h-10 bg-[#E8F4F1] rounded-[6px] flex items-center justify-center text-[#0E6F66] flex-shrink-0">
              <Eye size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#2B3138] mb-2">Our Vision</h3>
              <p className="text-sm text-[#565E69] leading-relaxed">
                {siteData.vision}
              </p>
            </div>
          </div>

          <div className="flex gap-3.5 items-start p-6 bg-white rounded-[6px] border border-gray-200 shadow-sm">
            <div className="w-10 h-10 bg-[#E8F4F1] rounded-[6px] flex items-center justify-center text-[#0E6F66] flex-shrink-0">
              <Target size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#2B3138] mb-2">Our Mission</h3>
              <p className="text-sm text-[#565E69] leading-relaxed">
                {siteData.mission}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}