'use client'

import Link from 'next/link'
import { siteData } from '@/lib/data'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Team', href: '/team' },
    { name: 'Contact', href: '/contact' },
  ]

  const serviceLinks = [
    'Recruitment Process Outsourcing',
    'Market Research',
    'Talent Mapping',
    'Leadership Hiring',
    'Industry Insights',
  ]

  return (
    <footer className="bg-[#071A3D] text-white">
      {/* Main Footer Content */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 pt-14 md:pt-18 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Company Info - 4 columns */}
          <div className="lg:col-span-4">
            <div className="mb-4">
              <img src={siteData.logo} alt={siteData.company} className="h-24 w-auto brightness-0 invert" />
            </div>

            <p className="text-[#94a3b8] text-sm leading-relaxed mb-5 max-w-sm">
              A trusted talent solutions partner serving organizations across multiple sectors since {siteData.founded}. Building teams and shaping leaders across India.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-[6px] flex items-center justify-center hover:bg-[#1D4ED8] transition-colors"
                aria-label="LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="mailto:sandeep.grover@placewellcareers.com"
                className="w-9 h-9 bg-white/10 rounded-[6px] flex items-center justify-center hover:bg-[#1D4ED8] transition-colors"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
              <a
                href="tel:+919815087070"
                className="w-9 h-9 bg-white/10 rounded-[6px] flex items-center justify-center hover:bg-[#1D4ED8] transition-colors"
                aria-label="Phone"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links - 2 columns */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#94a3b8] text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - 3 columns */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-[#94a3b8] text-sm hover:text-white transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - 3 columns */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Contact Us
            </h4>

            <div className="space-y-3.5">
              {/* Head Office */}
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 bg-white/10 rounded-[6px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={14} className="text-[#94a3b8]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white mb-0.5">Head Office</p>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    39, Anand Shopping Complex<br />
                    (Opp. Hotel Taj), Sector 17 A<br />
                    Chandigarh
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-white/10 rounded-[6px] flex items-center justify-center flex-shrink-0">
                  <Phone size={14} className="text-[#94a3b8]" />
                </div>
                <a href="tel:+919815087070" className="text-sm text-[#94a3b8] hover:text-white transition-colors">
                  +91 98150 87070
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-white/10 rounded-[6px] flex items-center justify-center flex-shrink-0">
                  <Mail size={14} className="text-[#94a3b8]" />
                </div>
                <a href="mailto:sandeep.grover@placewellcareers.com" className="text-xs text-[#94a3b8] hover:text-white transition-colors break-all">
                  sandeep.grover@placewellcareers.com
                </a>
              </div>

              {/* Business Hours */}
              <div className="pt-3 border-t border-white/10">
                <p className="text-xs text-[#64748b]">
                  <span className="text-[#94a3b8]">Mon - Fri:</span> 9:00 AM - 6:00 PM
                </p>
                <p className="text-xs text-[#64748b]">
                  <span className="text-[#94a3b8]">Saturday:</span> 9:00 AM - 1:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Subscribe to Insights</h4>
              <p className="text-xs text-[#94a3b8]">Get the latest recruitment insights and industry updates.</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-60 h-[42px] px-4 bg-white/10 border border-white/10 rounded-l-[6px] text-sm text-white placeholder-[#64748b] focus:outline-none focus:border-[#1D4ED8] transition-colors"
              />
              <button className="h-[42px] px-4 bg-[#1D4ED8] text-white text-sm font-semibold rounded-r-[6px] hover:bg-[#1e40af] transition-colors flex items-center gap-2">
                <Send size={14} />
                <span className="hidden sm:inline">Subscribe</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#64748b]">
            <p>&copy; {currentYear} {siteData.company}. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
              <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}