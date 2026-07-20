'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { siteData } from '@/lib/data'
import { ChevronRight, ChevronRightIcon, Eye, Target } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}

export default function TeamPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-[#0b1a30]">
        <div className="absolute inset-0">
          <img src="/team-hero-bg.png" alt="Placewell Careers Leadership" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a30] via-[#0b1a30]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a30]/80 via-transparent to-[#0b1a30]/20" />
        </div>

        <div className="relative z-10 w-full pb-16 px-5 md:px-8">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-2 text-sm text-[#8b9dc3] mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-white">Team</span>
            </div>

            <h1 className="text-h1 font-bold text-white leading-[1.1] mb-4">
              Meet The People<br />Driving Recruitment Excellence.
            </h1>
            <p className="text-body-lg text-[#b8c7de] max-w-lg">
              Experienced professionals with decades of combined expertise in talent acquisition and strategic hiring across India&apos;s leading industries.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team Cards */}
      <section className="py-12 md:py-16 px-5 md:px-8 bg-[#f8fafc]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {siteData.team.map((member, idx) => {
              const isHovered = hoveredIndex === idx
              const isExpanded = expandedId === idx

              return (
                <motion.div
                  key={idx}
                  custom={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  variants={fadeUp}
                >
                  <div
                    className="group relative bg-white rounded-[6px] border border-gray-200 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer h-full"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-[#1D4ED8] transition-all duration-500 z-10 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

                    <div className="relative h-96 min-h-[384px] bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden rounded-t-[6px]">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-[#1D4ED8] shadow-sm">
                        {member.experience}
                      </div>
                    </div>

                    <div className="p-7">
                      <h3 className="text-xl font-bold text-[#0f172a] mb-1">{member.name}</h3>
                      <p className="text-sm font-medium text-[#1D4ED8] mb-4">{member.role}</p>
                      <div className="w-10 h-[2px] bg-gray-200 mb-4" />
                      <p className="text-[15px] text-[#64748b] leading-relaxed mb-5 line-clamp-3">{member.bio}</p>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {member.expertise.slice(0, 3).map((skill, skillIdx) => (
                          <span key={skillIdx} className="px-3 py-1.5 bg-gray-100 text-[#475569] text-xs font-medium rounded-md">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
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
                          className="flex items-center gap-1.5 text-sm font-medium text-[#1D4ED8] hover:text-[#1e3a8a] transition-colors"
                        >
                          {isExpanded ? 'Show Less' : 'Full Profile'}
                          <ChevronRightIcon size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-[14px] text-[#64748b] leading-relaxed">{member.bio}</p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {member.expertise.map((skill, skillIdx) => (
                              <span key={skillIdx} className="px-3 py-1.5 bg-blue-50 text-[#1D4ED8] text-xs font-medium rounded-md">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Team Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16"
          >
            <div className="bg-white border border-gray-200 rounded-[6px] p-10 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Side - Text */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0f172a] mb-6">
                    Team Placewell: Built on Partnerships. Driven by Expertise.
                  </h3>
                  <p className="text-body-lg text-[#64748b] leading-relaxed whitespace-pre-line">
                    {siteData.teamNote}
                  </p>
                </div>
                {/* Right Side - 3 Image Collage */}
                <div className="flex gap-3 justify-center items-center">
                  <img src="/team/saveena-grover.jpg" alt="Saveena Grover" className="w-1/3 h-56 object-cover object-center rounded-[6px] shadow-sm" />
                  <img src="/team/sandeep-grover.jpg" alt="Sandeep Grover" className="w-1/3 h-56 object-cover object-center rounded-[6px] shadow-sm" />
                  <img src="/team/seema-bhatia.jpg" alt="Seema Bhatia" className="w-1/3 h-56 object-cover object-center rounded-[6px] shadow-sm" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-12 md:py-16 px-5 md:px-8 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-bold text-[#0f172a] mb-3">Vision &amp; Mission</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex gap-3.5 items-start p-6 bg-[#f8fafc] rounded-[6px] border border-gray-200 shadow-sm">
              <div className="w-10 h-10 bg-blue-50 rounded-[6px] flex items-center justify-center text-[#2D6CDF] flex-shrink-0">
                <Eye size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1F2937] mb-2">Our Vision</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">{siteData.vision}</p>
              </div>
            </div>
            <div className="flex gap-3.5 items-start p-6 bg-[#f8fafc] rounded-[6px] border border-gray-200 shadow-sm">
              <div className="w-10 h-10 bg-blue-50 rounded-[6px] flex items-center justify-center text-[#2D6CDF] flex-shrink-0">
                <Target size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1F2937] mb-2">Our Mission</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">{siteData.mission}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
