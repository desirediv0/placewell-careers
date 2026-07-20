'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Users, BadgeCheck, Clock3, Handshake, TrendingUp } from 'lucide-react'

const pillars = [
  {
    icon: ShieldCheck,
    stat: '17+ Years',
    title: 'Trust in Talent Acquisition',
    description: 'A trusted recruitment partner backed by deep industry expertise.',
  },
  {
    icon: Users,
    stat: '10,000+',
    title: 'Placements Across India',
    description: 'Delivering talent across all levels with precision and consistency.',
  },
  {
    icon: BadgeCheck,
    stat: '95%',
    title: 'Offer Acceptance Rate',
    description: 'High candidate engagement ensuring successful onboarding.',
  },
  {
    icon: Clock3,
    stat: 'Faster',
    title: 'Hiring Turnaround',
    description: 'Efficient recruitment workflows that reduce hiring timelines.',
  },
  {
    icon: Handshake,
    stat: 'Long-Term',
    title: 'Client Partnerships',
    description: 'Built on trust, quality delivery, responsiveness and long-term relationships.',
  },
  {
    icon: TrendingUp,
    stat: 'Smart',
    title: 'Market Insights',
    description: 'Talent mapping, compensation benchmarking and hiring intelligence.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}

export default function Pillars() {
  return (
    <section className="py-12 md:py-16 px-5 md:px-8 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-h2 font-bold text-[#0f172a] mb-3">
            Our Pillars of Success
          </h2>
          <p className="text-body text-[#4B5563] max-w-2xl mx-auto">
            The key principles that drive our exceptional recruitment performance.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={idx}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={cardVariants}
                className={`group relative rounded-[6px] border border-gray-200 p-8 h-full hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ${
                  idx % 3 === 0 ? 'bg-[#f0f7ff]' : idx % 3 === 1 ? 'bg-[#f8fafc]' : 'bg-[#f5f3ff]'
                }`}
              >
                {/* Blue top accent */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#1D4ED8] rounded-t-[6px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                {/* Icon */}
                <div className="w-[48px] h-[48px] rounded-full bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={52} className="text-[#1D4ED8]" strokeWidth={1.5} />
                </div>

                {/* Stat */}
                <div className="text-[20px] font-bold text-[#0f172a] leading-none mb-1 tracking-tight">
                  {pillar.stat}
                </div>

                {/* Title */}
                <h3 className="text-[16px] font-bold text-[#1F2937] mb-3 leading-snug">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-[16px] text-[#4B5563] leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom */}
        <div className="mt-14 text-center">
          <div className="w-12 h-[2px] bg-[#1D4ED8] mx-auto mb-5" />
          <p className="text-body text-[#4B5563] italic">
            Committed to Excellence in Recruitment &amp; Talent Solutions.
          </p>
        </div>
      </div>
    </section>
  )
}
