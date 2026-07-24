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
    <footer className="bg-[#E8EEFB] text-[#1F2937]">
      {/* Main Footer Content */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 pt-14 md:pt-18 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Company Info - 4 columns */}
          <div className="lg:col-span-4">
            <div className="mb-4">
              <img src={siteData.logo} alt={siteData.company} className="h-24 w-auto" />
            </div>

            <p className="text-[#4B5563] text-sm leading-relaxed mb-5 max-w-sm">
              A trusted talent solutions partner serving organizations across multiple sectors since {siteData.founded}. Building teams and shaping leaders across India.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://www.linkedin.com/company/placewell-careers/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white rounded-[6px] flex items-center justify-center hover:bg-[#223A8F] hover:text-white transition-colors text-[#223A8F] shadow-sm"
                aria-label="LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="mailto:support@placewellcareers.com"
                className="w-9 h-9 bg-white rounded-[6px] flex items-center justify-center hover:bg-[#223A8F] hover:text-white transition-colors text-[#223A8F] shadow-sm"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
              <a
                href="tel:+919815087070"
                className="w-9 h-9 bg-white rounded-[6px] flex items-center justify-center hover:bg-[#223A8F] hover:text-white transition-colors text-[#223A8F] shadow-sm"
                aria-label="Phone"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links - 2 columns */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1F2937] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#4B5563] text-sm hover:text-[#223A8F] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - 3 columns */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1F2937] mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-[#4B5563] text-sm hover:text-[#223A8F] transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - 3 columns */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1F2937] mb-4">
              Contact Us
            </h4>

            <div className="space-y-3.5">
              {/* Head Office */}
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 bg-white rounded-[6px] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <MapPin size={14} className="text-[#223A8F]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#1F2937] mb-0.5">Head Office</p>
                  <p className="text-xs text-[#4B5563] leading-relaxed">
                    39, Anand Shopping Complex<br />
                    (Opp. Hotel Taj), Sector 17 A<br />
                    Chandigarh
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-white rounded-[6px] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Phone size={14} className="text-[#223A8F]" />
                </div>
                <a href="tel:+919815087070" className="text-sm text-[#4B5563] hover:text-[#223A8F] transition-colors">
                  +91 98150 87070
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-white rounded-[6px] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Mail size={14} className="text-[#223A8F]" />
                </div>
                <a href="mailto:support@placewellcareers.com" className="text-xs text-[#4B5563] hover:text-[#223A8F] transition-colors break-all">
                  support@placewellcareers.com
                </a>
              </div>

              {/* Business Hours */}
              <div className="pt-3 border-t border-[#223A8F]/15">
                <p className="text-xs text-[#4B5563]">
                  <span className="text-[#1F2937] font-medium">Mon - Fri:</span> 9:00 AM - 6:00 PM
                </p>
                <p className="text-xs text-[#4B5563]">
                  <span className="text-[#1F2937] font-medium">Saturday:</span> 9:00 AM - 1:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>


      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#223A8F]/15">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#64748b]">
            <p>&copy; {currentYear} {siteData.company}. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <Link href="#" className="hover:text-[#223A8F] transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-[#223A8F] transition-colors">Terms & Conditions</Link>
              <Link href="#" className="hover:text-[#223A8F] transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
