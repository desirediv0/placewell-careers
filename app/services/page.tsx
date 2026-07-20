'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { siteData } from '@/lib/data'
import {
  Briefcase, BarChart3, Map, Users, TrendingUp,
  ArrowRight, ChevronRight, ChevronDown,
  CheckCircle2, Search, FileSearch, UserCheck, Handshake,
  Target, Eye, Award, Shield, Clock, Zap,
  Landmark, WalletCards, Laptop, HeartPulse, Hotel, Sparkles,
  MessageSquare, Lightbulb, PhoneCall, ClipboardCheck, FileCheck, Trophy,
  BadgeCheck, Rocket, Building2
} from 'lucide-react'

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / 2000, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(value * easeOut))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isVisible, value])

  return (
    <div ref={ref} className="text-5xl md:text-6xl font-bold text-white">
      {count.toLocaleString()}{suffix}
    </div>
  )
}

const serviceDetails = [
  {
    icon: Briefcase,
    title: 'Recruitment Process Outsourcing (RPO)',
    subtitle: 'Core Offering',
    description: 'Placewell Careers takes complete ownership of your recruitment lifecycle - from sourcing and screening to onboarding - acting as a seamless extension of your HR team. Our RPO model is built to scale with your hiring volume, reduce time-to-fill, and improve quality of hire.',
    features: siteData.services[0].offerings,
    color: 'from-blue-600 to-blue-800',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    imagePath: '/service-rpo.png',
  },
  {
    icon: BarChart3,
    title: 'Market Research',
    subtitle: 'Hiring Insights',
    description: 'Before we recruit, we research. Our market research services give you a clear view of talent availability, compensation benchmarks, hiring trends, and competitor hiring patterns - so your workforce planning is grounded in facts, not assumptions.',
    features: siteData.services[1].offerings,
    color: 'from-indigo-600 to-indigo-800',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    imagePath: '/service-research.png',
  },
  {
    icon: Map,
    title: 'Talent Mapping',
    subtitle: 'Pipeline Building',
    description: 'Talent mapping is how we help you build a proactive hiring pipeline instead of reacting to open roles. We identify, profile, and track relevant talent pools — including passive candidates — mapped against skills, seniority, industry, and geography.',
    features: siteData.services[2].offerings,
    color: 'from-violet-600 to-violet-800',
    bgColor: 'bg-violet-50',
    iconColor: 'text-violet-600',
    imagePath: '/service-mapping.png',
  },
  {
    icon: Users,
    title: 'Leadership & Strategic Hiring',
    subtitle: 'Executive Search',
    description: 'Placewell Careers partners with organizations to identify and attract experienced professionals for middle management and senior leadership roles. Leveraging industry networks, talent intelligence, and a research-driven approach.',
    features: siteData.services[3].offerings,
    color: 'from-rose-600 to-rose-800',
    bgColor: 'bg-rose-50',
    iconColor: 'text-rose-600',
    imagePath: '/service-leadership.png',
  },
  {
    icon: TrendingUp,
    title: 'Industry Insights',
    subtitle: 'Market Intelligence',
    description: 'Our research-driven insights help leadership teams understand emerging skills, workforce trends, and changing talent dynamics across industries.',
    features: siteData.services[4].offerings,
    color: 'from-emerald-600 to-emerald-800',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    imagePath: '/service-insights.png',
  },
]

const processSteps = [
  {
    number: '01',
    icon: ClipboardCheck,
    title: 'Requirement Discovery',
    description: 'Understand hiring goals, role expectations, company culture and business objectives.',
    duration: '1 Day',
  },
  {
    number: '02',
    icon: Search,
    title: 'Talent Research',
    description: 'Market research, talent mapping and sourcing from multiple channels.',
    duration: '2–3 Days',
  },
  {
    number: '03',
    icon: UserCheck,
    title: 'Candidate Screening',
    description: 'Resume review, skill evaluation and initial interviews.',
    duration: '3–5 Days',
  },
  {
    number: '04',
    icon: MessageSquare,
    title: 'Client Interviews',
    description: 'Interview scheduling, feedback coordination and assessment.',
    duration: '1 Week',
  },
  {
    number: '05',
    icon: BadgeCheck,
    title: 'Offer Management',
    description: 'Salary negotiation, documentation and offer rollout.',
    duration: '2–4 Days',
  },
  {
    number: '06',
    icon: Rocket,
    title: 'Successful Onboarding',
    description: 'Joining coordination and post-placement support.',
    duration: 'Ongoing',
  },
]

const industryIcons = [
  { icon: Landmark, name: 'BFSI', color: 'bg-blue-50 text-blue-600' },
  { icon: WalletCards, name: 'Fintech', color: 'bg-indigo-50 text-indigo-600' },
  { icon: Laptop, name: 'IT / EdTech', color: 'bg-violet-50 text-violet-600' },
  { icon: HeartPulse, name: 'Healthcare', color: 'bg-rose-50 text-rose-600' },
  { icon: Hotel, name: 'Hospitality', color: 'bg-amber-50 text-amber-600' },
  { icon: Building2, name: 'GCC', color: 'bg-emerald-50 text-emerald-600' },
]

export default function ServicesPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <>
      {/* ============================================ */}
      {/* SECTION 1: Premium Hero */}
      {/* ============================================ */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-[#0b1a30]">
        <div className="absolute inset-0">
          <img src="/services-hero-bg.png" alt="Placewell Careers Services" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a30] via-[#0b1a30]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a30]/80 via-transparent to-[#0b1a30]/20" />
        </div>

        <div className="relative z-10 w-full pb-16 px-5 md:px-8">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-2 text-sm text-[#8b9dc3] mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-white">Our Services</span>
            </div>

            <h1 className="text-h1 font-bold text-white leading-[1.1] mb-4">
              Strategic Talent Solutions<br />Built for Modern Businesses.
            </h1>
            <p className="text-body-lg text-[#b8c7de] max-w-lg">
              End-to-end recruitment and talent solutions designed to help organizations build high-performing teams.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 2: Services - Alternating Layouts */}
      {/* ============================================ */}
      {serviceDetails.map((service, idx) => {
        const Icon = service.icon
        const isReversed = idx % 2 === 1

        return (
          <section
            key={idx}
            className={`py-12 md:py-16 px-5 md:px-8 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#f8fafc]'}`}
          >
            <div className="max-w-[1400px] mx-auto">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 items-center ${isReversed ? 'lg:direction-rtl' : ''}`}>
                {/* Content */}
                <div className={`${isReversed ? 'lg:order-2' : ''}`}>
                  <div className={`w-16 h-16 ${service.bgColor} rounded-[6px] flex items-center justify-center mb-6`}>
                    <Icon size={32} className={service.iconColor} />
                  </div>

                  <span className="text-sm font-semibold text-[#1D4ED8] tracking-wider uppercase mb-3 block">
                    {service.subtitle}
                  </span>

                  <h2 className="text-2xl md:text-4xl  font-bold text-[#0f172a] mb-5">
                    {service.title}
                  </h2>

                  <p className="text-body-lg text-[#475569] leading-relaxed mb-8">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {service.features.slice(0, 4).map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#1D4ED8] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 size={12} className="text-white" />
                        </div>
                        <span className="text-[15px] text-[#475569]">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/contact">
                    <button className="group inline-flex items-center gap-2 px-5 md:px-8 py-3 bg-[#1D4ED8] text-white font-semibold rounded-lg hover:bg-[#1e40af] transition-colors">
                      Learn More
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>

                {/* Image/Visual */}
                <div className={`${isReversed ? 'lg:order-1' : ''}`}>
                  <div className="relative">
                    <div className="relative rounded-[6px] overflow-hidden shadow-lg border border-gray-200 min-h-[400px]">
                      <img 
                        src={service.imagePath} 
                        alt={service.title} 
                        className="absolute inset-0 w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-8 text-white">
                        <h3 className="text-xl font-bold mb-1">{service.title.split('(')[0].trim()}</h3>
                        <p className="text-sm text-slate-300">{service.subtitle}</p>
                      </div>
                    </div>

                    {/* Floating Benefits Card */}
                    <div className="absolute -bottom-6 -right-6 bg-white rounded-[6px] shadow-xl p-5 max-w-[200px] hidden md:block">
                      <div className="text-xs text-[#64748b] font-semibold uppercase tracking-wider mb-2">Key Benefits</div>
                      <div className="space-y-1.5">
                        {(service.features ?? []).slice(0, 3).map((benefit, bIdx) => (
                          <div key={bIdx} className="flex items-center gap-2 text-xs text-[#475569]">
                            <div className="w-1.5 h-1.5 bg-[#1D4ED8] rounded-full flex-shrink-0" />
                            <span className="line-clamp-1">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </section>
    )
  })}


      {/* SECTION 3: How We Work - Redesigned Vertical Process */}
      {/* ============================================ */}
      <section className="py-[120px] px-6 md:px-8 bg-white relative overflow-hidden font-sans">
        {/* Subtle Background Abstract Network Pattern & Gradient Circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-300 rounded-full blur-[100px]" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#223a8f 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Header */}
          <div className="mb-20 max-w-3xl">
            <span className="text-[#2D6CDF] text-xs font-bold uppercase tracking-wider block mb-3">
              OUR RECRUITMENT PROCESS
            </span>
            <h2 className="text-4xl md:text-[52px] font-bold text-[#1F2937] leading-tight mb-4">
              Our Proven Recruitment Process
            </h2>
            <p className="text-[17px] text-[#4B5563] leading-relaxed">
              A structured hiring methodology designed to deliver exceptional talent with speed, precision, and quality.
            </p>
          </div>

          {/* Desktop/Tablet Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left Side (40%) - Visual Container */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="relative">
                {/* Large Premium Image */}
                <div className="h-[650px] w-full rounded-[8px] overflow-hidden shadow-2xl relative">
                  <img
                    src="/services-meeting.png"
                    alt="Placewell Recruitment Team Collaboration"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                </div>

                {/* Floating Experience Badge */}
                <div className="absolute -bottom-6 -right-6 md:right-6 bg-[#030d1e] text-white border border-blue-900/50 rounded-full p-6 shadow-2xl flex items-center gap-3 transform hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#2D6CDF] flex items-center justify-center text-white font-bold text-lg">
                    17+
                  </div>
                  <div>
                    <div className="font-bold text-sm tracking-tight text-white leading-tight">Years</div>
                    <div className="text-xs text-slate-400">Hiring Experience</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side (60%) - Vertical Process Timeline */}
            <div className="lg:col-span-7 relative">
              {/* Vertical Growing Line */}
              <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-slate-100 z-0">
                <motion.div
                  className="w-full bg-[#2D6CDF] origin-top h-full"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </div>

              {/* Cards List */}
              <div className="space-y-8 relative z-10">
                {processSteps.map((step, idx) => {
                  const Icon = step.icon
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className={`flex gap-6 items-start ${idx % 2 === 1 ? 'lg:translate-x-2' : ''}`}
                    >
                      {/* Timeline Node Badge with Icon */}
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-[#2D6CDF] shadow-md flex items-center justify-center text-[#2D6CDF] flex-shrink-0 z-10 transition-transform duration-300 hover:scale-110">
                        <Icon size={20} />
                      </div>

                      {/* Card Content */}
                      <div className="flex-1 bg-white border border-slate-100 rounded-[8px] p-6 hover:border-[#2D6CDF]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative">
                        {/* Number Badge and Duration Row */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[20px] font-bold text-slate-400 group-hover:text-[#2D6CDF] transition-colors duration-300 leading-none">
                            {step.number}
                          </span>
                          <span className="px-3 py-1 bg-blue-50 text-[#2D6CDF] text-xs font-semibold rounded-full uppercase tracking-wider">
                            Duration: {step.duration}
                          </span>
                        </div>

                        {/* Title (28px) */}
                        <h3 className="text-xl md:text-[28px] font-bold text-[#1F2937] leading-snug mb-2 group-hover:text-[#2D6CDF] transition-colors duration-300">
                          {step.title}
                        </h3>

                        {/* Description (17px) */}
                        <p className="text-[17px] text-[#4B5563] leading-relaxed mb-4">
                          {step.description}
                        </p>

                        {/* CTA Arrow */}
                        <div className="flex justify-end">
                          <span className="text-[#2D6CDF] group-hover:translate-x-1.5 transition-transform duration-300">
                            <ArrowRight size={18} />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================ */}
      {/* SECTION 4: Industries Supported */}
      {/* ============================================ */}
      <section className="py-12 md:py-16 px-5 md:px-8 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="w-8 h-[2px] bg-[#1D4ED8]" />
              <span className="text-[#1D4ED8] text-sm font-semibold tracking-wider uppercase">Industries</span>
              <div className="w-8 h-[2px] bg-[#1D4ED8]" />
            </div>
            <h2 className="text-2xl md:text-4xl  font-bold text-[#0f172a] mb-4">
              Industries We Serve
            </h2>
            <p className="text-body-lg text-[#64748b] max-w-2xl mx-auto">
              Specialized recruitment across India&apos;s fastest growing sectors
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {industryIcons.map((industry, idx) => {
              const Icon = industry.icon
              return (
                <div
                  key={idx}
                  className="bg-white rounded-[6px] border border-gray-200 p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                >
                  <div className={`w-16 h-16 ${industry.color} rounded-[6px] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="text-sm font-bold text-[#0f172a]">{industry.name}</h3>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 5: Why Choose Placewell - Bento Grid */}
      {/* ============================================ */}
      <section className="py-12 md:py-16 px-5 md:px-8 bg-[#f8fafc]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="w-8 h-[2px] bg-[#1D4ED8]" />
              <span className="text-[#1D4ED8] text-sm font-semibold tracking-wider uppercase">Why Us</span>
              <div className="w-8 h-[2px] bg-[#1D4ED8]" />
            </div>
            <h2 className="text-2xl md:text-4xl  font-bold text-[#0f172a] mb-4">
              Why Choose Placewell
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2 bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] rounded-[6px] p-8 md:p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#1D4ED8]/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="text-6xl md:text-7xl font-bold mb-2">17+</div>
                <div className="text-xl font-semibold text-[#94a3b8] mb-4">Years Experience</div>
                <p className="text-[#94a3b8] max-w-md">Trusted by leading organizations for over 17 years of excellence in talent acquisition.</p>
              </div>
            </div>

            <div className="bg-white rounded-[6px] p-8 border border-gray-200 hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-[#EFF6FF] rounded-[6px] flex items-center justify-center mb-5 group-hover:bg-[#1D4ED8] transition-colors">
                <CheckCircle2 size={28} className="text-[#1D4ED8] group-hover:text-white transition-colors" />
              </div>
              <div className="text-4xl font-bold text-[#0f172a] mb-1">10,000+</div>
              <div className="text-sm text-[#64748b]">Placements</div>
            </div>

            <div className="bg-white rounded-[6px] p-8 border border-gray-200 hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-[#EFF6FF] rounded-[6px] flex items-center justify-center mb-5 group-hover:bg-[#1D4ED8] transition-colors">
                <Award size={28} className="text-[#1D4ED8] group-hover:text-white transition-colors" />
              </div>
              <div className="text-4xl font-bold text-[#0f172a] mb-1">95%</div>
              <div className="text-sm text-[#64748b]">Offer Acceptance</div>
            </div>

            <div className="bg-white rounded-[6px] p-8 border border-gray-200 hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-[#EFF6FF] rounded-[6px] flex items-center justify-center mb-5 group-hover:bg-[#1D4ED8] transition-colors">
                <Users size={28} className="text-[#1D4ED8] group-hover:text-white transition-colors" />
              </div>
              <div className="text-4xl font-bold text-[#0f172a] mb-1">50+</div>
              <div className="text-sm text-[#64748b]">Recruitment Experts</div>
            </div>

            <div className="md:col-span-2 bg-white rounded-[6px] p-8 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-[#EFF6FF] rounded-[6px] flex items-center justify-center flex-shrink-0">
                  <Target size={28} className="text-[#1D4ED8]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0f172a] mb-2">Leadership Hiring</h3>
                  <p className="text-[#64748b]">Specialized executive search for senior management and leadership positions across industries.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 bg-gradient-to-r from-[#1D4ED8] to-[#2563eb] rounded-[6px] p-8 text-white">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white/20 rounded-[6px] flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Research Driven Recruitment</h3>
                  <p className="text-white/80">Data-backed hiring decisions powered by market intelligence and talent mapping expertise.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 6: Statistics */}
      {/* ============================================ */}
      <section className="py-12 md:py-16 px-5 md:px-8 bg-[#0f172a]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
            <div className="text-center">
              <AnimatedCounter value={17} suffix="+" />
              <div className="text-[#94a3b8] mt-2 font-medium">Years</div>
            </div>
            <div className="text-center">
              <AnimatedCounter value={10000} suffix="+" />
              <div className="text-[#94a3b8] mt-2 font-medium">Placements</div>
            </div>
            <div className="text-center">
              <AnimatedCounter value={95} suffix="%" />
              <div className="text-[#94a3b8] mt-2 font-medium">Offer Acceptance</div>
            </div>
            <div className="text-center">
              <AnimatedCounter value={50} suffix="+" />
              <div className="text-[#94a3b8] mt-2 font-medium">Experts</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 7: FAQ */}
      {/* ============================================ */}
      <section className="py-12 md:py-16 px-5 md:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="w-8 h-[2px] bg-[#1D4ED8]" />
              <span className="text-[#1D4ED8] text-sm font-semibold tracking-wider uppercase">FAQ</span>
              <div className="w-8 h-[2px] bg-[#1D4ED8]" />
            </div>
            <h2 className="text-2xl md:text-4xl  font-bold text-[#0f172a]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {siteData.faq.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-[6px] overflow-hidden hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <span className="text-body-lg font-semibold text-[#0f172a] pr-4">{item.question}</span>
                  <ChevronDown
                    size={20}
                    className={`text-[#1D4ED8] flex-shrink-0 transition-transform duration-300 ${expandedFaq === idx ? 'rotate-180' : ''}`}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="px-5 md:px-8 pb-6 border-t border-gray-100">
                    <p className="text-[#64748b] leading-relaxed pt-4">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 8: Final CTA */}
      {/* ============================================ */}
      <section className="relative py-12 md:py-16 px-5 md:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/hero-bg.png" alt="Office" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0b1a30]/90" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl  font-bold text-white mb-5 leading-tight">
            Ready to Build Your Next<br />Winning Team?
          </h2>
          <p className="text-body-lg text-[#94a3b8] mb-8 max-w-xl mx-auto">
            Partner with Placewell Careers to find the exceptional talent your organization needs to succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="w-full sm:w-auto h-[52px] px-7 bg-[#2D6CDF] text-white font-semibold rounded-lg hover:bg-[#223A8F] transition-colors">
                Book Consultation
              </button>
            </Link>
            <Link href="/contact">
              <button className="w-full sm:w-auto h-[52px] px-7 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}