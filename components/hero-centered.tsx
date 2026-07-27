'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, ArrowUpRight, ChevronLeft, ChevronRight, Sparkles, ArrowDown } from 'lucide-react'
import { siteData } from '@/lib/data'

const SLIDE_DURATION = 9000

// Kept self-contained so this variant can be swapped in or deleted without
// touching the original hero.
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
    focus: 'center 38%',
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
    focus: 'center center',
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
    focus: 'center center',
    primaryCta: { text: 'Book Consultation', href: '/contact', icon: ArrowUpRight },
    secondaryCta: { text: 'Office Locations', href: '/contact', icon: ArrowUpRight },
  },
]

const RING = 2 * Math.PI * 20

export default function HeroCentered() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  // Keyed on currentSlide so manual navigation restarts the countdown.
  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [currentSlide, nextSlide])

  const slide = slides[currentSlide]
  const PrimaryIcon = slide.primaryCta.icon
  const SecondaryIcon = slide.secondaryCta.icon
  const titleLines = slide.title.split('\n')

  return (
    <section className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-[#0b0f14] px-5 md:px-8 pt-32 pb-28 md:pb-24 select-none">
      {/* Photograph, with a slow push-in that runs the length of the slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 z-0"
        >
          <motion.img
            src={slide.bgImage}
            onError={(e) => {
              e.currentTarget.src = slide.fallbackBg
            }}
            alt="Corporate Hero Background"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: SLIDE_DURATION / 1000 + 2, ease: 'linear' }}
            style={{ objectPosition: slide.focus }}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays sit outside the crossfade so they never flicker between slides */}
      <div className="absolute inset-0 z-[1] bg-[#0B0F14]/40" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0B0F14]/90 via-[#0B0F14]/20 to-[#0B0F14]/75" />
      {/* Brand tint — keeps the three very different photographs on one palette */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[#0E6F66]/35 via-transparent to-[#C9821F]/28 mix-blend-soft-light" />
      {/* Vignette. Holds a little weight at the centre too, so the body copy stays
          crisp over busy areas of the photograph rather than only at the edges. */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(11,15,20,0.30) 0%, rgba(11,15,20,0.62) 100%)',
        }}
      />

      {/* Arrows sit at the edges on desktop. Hidden below md, where the centred
          column runs full width and the dots handle navigation instead. */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/25 bg-white/10 hover:bg-white/20 hover:border-white/50 text-white hidden md:flex items-center justify-center transition-all duration-300 backdrop-blur-md"
      >
        <ChevronLeft size={20} />
      </button>
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 hidden md:block">
        {/* Ring doubles as a countdown to the next slide */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <motion.circle
            key={currentSlide}
            cx="22"
            cy="22"
            r="20"
            fill="none"
            stroke="#5EC4B6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={RING}
            initial={{ strokeDashoffset: RING }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
          />
        </svg>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute inset-0 rounded-full border border-white/25 bg-white/10 hover:bg-white/20 hover:border-white/50 text-white flex items-center justify-center transition-all duration-300 backdrop-blur-md"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Centred content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        <AnimatePresence mode="wait">
          <motion.div key={currentSlide} className="flex flex-col items-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md"
            >
              <Sparkles size={14} className="text-[#5EC4B6] shrink-0" />
              <span className="text-xs font-semibold tracking-wider text-white/90 uppercase">
                {slide.badge}
              </span>
            </motion.div>

            {/* Title, revealed a line at a time */}
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.05]">
              {titleLines.map((line, idx) => (
                <span key={idx} className="block">
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, y: '100%' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.7, delay: 0.1 + idx * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Brand rule */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-7 h-[3px] w-28 rounded-full bg-gradient-to-r from-[#0E6F66] via-[#5EC4B6] to-[#E9B65C]"
            />

            {slide.highlight && (
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6 text-lg md:text-xl font-semibold text-[#E9B65C] tracking-wide"
              >
                {slide.highlight}
              </motion.p>
            )}

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-5 text-body-lg text-white/80 leading-relaxed font-light max-w-2xl mx-auto space-y-3"
            >
              {slide.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-9 flex flex-col sm:flex-row gap-3.5 justify-center w-full sm:w-auto"
            >
              <Link
                href={slide.primaryCta.href}
                className="inline-flex items-center justify-center gap-2.5 h-[54px] px-8 bg-[#2F68AB] hover:bg-[#27578F] text-white font-semibold text-sm rounded-[6px] transition-all duration-300 shadow-lg shadow-black/30 hover:scale-[1.02]"
              >
                {slide.primaryCta.text} <PrimaryIcon size={16} />
              </Link>
              <Link
                href={slide.secondaryCta.href}
                className="inline-flex items-center justify-center gap-2.5 h-[54px] px-8 border border-white/35 bg-white/10 hover:bg-white hover:text-[#14181D] text-white font-semibold text-sm rounded-[6px] transition-all duration-300 backdrop-blur-md"
              >
                {slide.secondaryCta.text} <SecondaryIcon size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Dots + counter */}
        <div className="mt-12 flex items-center justify-center gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-500 ${
                currentSlide === idx ? 'w-10 bg-[#5EC4B6]' : 'w-2 bg-white/35 hover:bg-white/60'
              }`}
            />
          ))}
          <span className="ml-2 text-xs font-mono text-white/60">
            0{currentSlide + 1} / 0{slides.length}
          </span>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-[11px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.div>
    </section>
  )
}
