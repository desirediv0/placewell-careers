'use client'

import { useState } from 'react'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { siteData } from '@/lib/data'

export default function Team() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  return (
    <section id="team" className="py-12 md:py-16 px-5 md:px-8 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-[2px] bg-[#1D4ED8]" />
            <span className="text-[#1D4ED8] text-sm font-semibold tracking-wider uppercase">Our Team</span>
            <div className="w-8 h-[2px] bg-[#1D4ED8]" />
          </div>
          <h2 className="text-h2 font-bold text-[#0f172a] mb-3">Our Team</h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteData.team.map((member, idx) => {
            const isHovered = hoveredIndex === idx
            const isExpanded = expandedId === idx

            return (
              <div
                key={idx}
                className="group relative bg-white rounded-[6px] border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Blue Top Accent Line */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-[#1D4ED8] transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

                {/* Portrait Section */}
                <div className="relative h-96 min-h-[384px] bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden rounded-t-[6px]">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[11px] font-semibold text-[#1D4ED8] shadow-sm">
                    {member.experience}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#0f172a] mb-1">{member.name}</h3>
                  <p className="text-sm font-medium text-[#1D4ED8] mb-3">{member.role}</p>
                  <div className="w-8 h-[2px] bg-gray-200 mb-3" />
                  <p className="text-sm text-[#64748b] leading-relaxed mb-4 line-clamp-3">{member.bio}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {member.expertise.slice(0, 3).map((skill, skillIdx) => (
                      <span key={skillIdx} className="px-2.5 py-1 bg-gray-100 text-[#475569] text-xs font-medium rounded-[4px]">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <a href={member.linkedin || "https://www.linkedin.com/company/placewell-careers/"} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-medium text-[#0A66C2] hover:text-[#004182] transition-colors"
                      onClick={(e) => e.stopPropagation()}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : idx)}
                      className="flex items-center gap-1 text-sm font-medium text-[#1D4ED8] hover:text-[#1e3a8a] transition-colors">
                      {isExpanded ? 'Show Less' : 'Full Profile'}
                      <ChevronRight size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-sm text-[#64748b] leading-relaxed">{member.bio}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {member.expertise.map((skill, skillIdx) => (
                          <span key={skillIdx} className="px-2.5 py-1 bg-blue-50 text-[#1D4ED8] text-xs font-medium rounded-[4px]">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Team Note - Text Left, Images Right */}
        <div className="mt-12 bg-[#f8fafc] border border-gray-200 rounded-[6px] p-8 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Text */}
            <div>
              <h3 className="text-xl font-bold text-[#0f172a] mb-4">Team Placewell: Built on Partnerships. Driven by Expertise.</h3>
              {siteData.teamNote.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-sm text-[#4B5563] leading-relaxed mb-3 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
            {/* Right Side - Team Photo */}
            <div className="flex justify-center items-center">
              <img src="/team/team.jpg" alt="Team Placewell" className="w-full h-auto max-h-[350px] object-contain rounded-[6px] shadow-sm" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}