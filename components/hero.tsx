'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { siteData } from '@/lib/data'

const slides = [
  {
    badge: `Trusted Recruitment Partner Since ${siteData.founded} · 18+ Years Experience`,
    title: 'Building Teams.\nShaping Leaders.',
    highlight: 'Mostly Working for Listed Clients and Fortune 500 Clients.',
    paragraphs: [
      'Founded in 2008, Placewell Careers is a trusted talent solutions partner serving organizations across BFSI, Fintech, IT/EdTech, Healthcare, Hospitality, and emerging sectors.',
      'Backed by a team of 50+ experienced professionals, we combine industry expertise, agility, and a client-centric approach to help businesses build high-performing teams.',
    ],
    bgImage: '/hero-1.jpg',
    fallbackBg: '/hero-bg.png',
    primaryCta: { text: 'Drop Your CV', href: '/contact', icon: Upload },
    secondaryCta: { text: 'Enquiry', href: '/contact', icon: ArrowUpRight },
  },
  {
    badge: 'Specialized Leadership & Executive Search Practice',
    title: 'Executive Search.\nLeadership Hiring.',
    paragraphs: [
      'Partnering with forward-thinking organizations to identify, attract, and secure visionary leaders across senior management and executive positions nationwide.',
      'Our research-driven search methodology and deep industry relationships ensure high placement accuracy and strategic cultural alignment.',
    ],
    bgImage: '/hero-2.jpg',
    fallbackBg: '/hero-bg.png',
    primaryCta: { text: 'Explore Services', href: '/services', icon: ArrowUpRight },
    secondaryCta: { text: 'Meet Our Team', href: '/team', icon: ArrowUpRight },
  },
  {
    badge: 'Proactive Workforce Planning & Talent Intelligence',
    title: 'Talent Mapping.\nRPO Solutions.',
    paragraphs: [
      'Proactive candidate mapping, compensation benchmarking, and end-to-end recruitment process outsourcing to help you scale hiring seamlessly.',
      'We act as an extension of your internal HR team, driving down hiring turnaround time while maintaining uncompromising quality.',
    ],
    bgImage: '/hero-3.jpg',
    fallbackBg: '/hero-bg.png',
    primaryCta: { text: 'Book Consultation', href: '/contact', icon: ArrowUpRight },
    secondaryCta: { text: 'Office Locations', href: '/contact', icon: ArrowUpRight },
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  // Auto scroll every 9 seconds continuously
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 9000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[currentSlide]
  const PrimaryIcon = slide.primaryCta.icon
  const SecondaryIcon = slide.secondaryCta.icon

  return (
    <section 
      className="relative min-h-[90vh] md:min-h-screen flex items-end pt-32 md:pt-40 lg:pt-44 pb-16 md:pb-24 px-5 md:px-8 lg:px-24 bg-[#FAF8F4] overflow-hidden select-none"
    >
      {/* Background Image Carousel with Smooth Fade */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slide.bgImage}
            onError={(e) => {
              e.currentTarget.src = slide.fallbackBg
            }}
            alt="Corporate Hero Background"
            className="w-full h-full object-cover object-center photo-light"
          />
          {/* A light scrim behind the copy only — kept just strong enough to hold
              the text, and clear of the image from ~65% across. */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F4]/92 via-[#FAF8F4]/65 via-48% to-transparent to-78%" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F4]/45 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="space-y-5 md:space-y-6"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#E8F4F1] border border-[#0E6F66]/20 backdrop-blur-md">
                <Sparkles size={14} className="text-[#0E6F66] animate-pulse" />
                <span className="text-xs font-semibold tracking-wider text-[#0E6F66] uppercase">
                  {slide.badge}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#14181D] tracking-tight whitespace-pre-line leading-[1.1]">
                {slide.title}
              </h1>

              {slide.highlight && (
                <p className="text-lg md:text-xl font-semibold text-[#0E6F66] tracking-wide">
                  {slide.highlight}
                </p>
              )}

              {/* Description */}
              <div className="text-body-lg text-[#22282F] leading-relaxed font-light max-w-2xl space-y-3">
                {slide.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
                <Link
                  href={slide.primaryCta.href}
                  className="inline-flex items-center justify-center gap-2.5 h-[52px] px-8 bg-[#2F68AB] hover:bg-[#27578F] text-white font-semibold text-sm rounded-[6px] transition-all duration-300 shadow-lg shadow-[#2F68AB]/25 hover:scale-[1.02]"
                >
                  {slide.primaryCta.text} <PrimaryIcon size={16} />
                </Link>
                <Link
                  href={slide.secondaryCta.href}
                  className="inline-flex items-center justify-center gap-2.5 h-[52px] px-8 border border-[#0E6F66]/30 bg-white/80 hover:bg-white text-[#0E6F66] font-semibold text-sm rounded-[6px] transition-all duration-300 hover:border-[#0E6F66] backdrop-blur-sm"
                >
                  {slide.secondaryCta.text} <SecondaryIcon size={16} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Controls */}
        <div className="mt-10 md:mt-12 pt-6 border-t border-[#14181D]/12 flex flex-wrap items-center justify-between gap-4">
          {/* Progress Indicators / Dots */}
          <div className="flex items-center gap-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`relative h-2 rounded-full transition-all duration-500 ${
                  currentSlide === idx ? 'w-10 bg-[#0E6F66]' : 'w-2 bg-[#14181D]/20 hover:bg-[#14181D]/40'
                }`}
              />
            ))}
            <span className="ml-2 text-xs font-mono text-[#3B434C]">
              0{currentSlide + 1} / 0{slides.length}
            </span>
          </div>

          {/* Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="w-11 h-11 rounded-full bg-white/85 border border-[#E6E2DB] hover:border-[#0E6F66] hover:bg-[#E8F4F1] text-[#14181D] flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="w-11 h-11 rounded-full bg-white/85 border border-[#E6E2DB] hover:border-[#0E6F66] hover:bg-[#E8F4F1] text-[#14181D] flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}