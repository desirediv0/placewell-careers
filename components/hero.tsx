'use client'

import { siteData } from '@/lib/data'
import { Upload, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end pb-16 md:pb-20 px-5 md:px-8 lg:px-24 bg-[#030d1e] overflow-hidden">
      {/* Background Image with Dark Blue Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.png"
          alt="Modern Executive Office Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030d1e] via-[#030d1e]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030d1e]/80 via-transparent to-[#030d1e]/20" />
      </div>

      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        <div className="max-w-3xl space-y-6">
          {/* Top Badge */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-[#2D6CDF]" />
            <span className="text-xs font-semibold tracking-wider text-blue-300 uppercase">
              Trusted Recruitment Partner Since {siteData.founded}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Building Teams.<br />
            Shaping Leaders.
          </h1>

          {/* Description - DOCX exact */}
          <div className="text-body-lg text-slate-300 leading-relaxed font-light max-w-2xl space-y-4">
            <p>
              Founded in 2008, Placewell Careers is a trusted talent solutions partner serving organizations across BFSI, IT/EdTech, Healthcare, and Hospitality sectors.
            </p>
            <p>
              Backed by a team of 50+ experienced professionals, we combine industry expertise, agility, and a client-centric approach to help businesses build high-performing teams and professionals advance their careers. Our commitment to quality, excellence, and long-term partnerships has made us a preferred recruitment partner across industries.
            </p>
          </div>

          {/* Call to Actions - DOCX: "Drop Your CV" | "Enquiry" */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 h-[52px] px-7 bg-[#2D6CDF] hover:bg-[#2250b8] text-white font-semibold text-sm rounded-[6px] transition-all duration-300 shadow-lg shadow-blue-500/20"
            >
              Drop Your CV <Upload size={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 h-[52px] px-7 border border-slate-500 bg-blue-950/20 hover:bg-blue-950/40 text-white font-semibold text-sm rounded-[6px] transition-all duration-300"
            >
              Enquiry <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}