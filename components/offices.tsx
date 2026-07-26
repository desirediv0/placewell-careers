'use client'

import { MapPin, Phone, Mail, ExternalLink, Building2, ChevronRight } from 'lucide-react'
import { siteData } from '@/lib/data'

export default function Offices() {
  return (
    <section id="office-locations" className="py-12 md:py-16 px-5 md:px-8 bg-[#FAF8F4]">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-[2px] bg-[#0E6F66]" />
            <span className="text-[#0E6F66] text-sm font-semibold tracking-wider uppercase">
              Our Presence
            </span>
            <div className="w-8 h-[2px] bg-[#0E6F66]" />
          </div>

          <h2 className="text-2xl md:text-4xl  font-bold text-[#2B3138] mb-3">
            Office Locations
          </h2>

          <p className="text-body-lg text-[#6B7480] max-w-2xl mx-auto">
            Connect with our teams across North India — dedicated professionals serving your hiring needs locally and regionally.
          </p>
        </div>

        {/* Offices Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {siteData.offices.map((office, idx) => (
            <div
              key={idx}
              className={`group relative rounded-[6px] border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden ${
                office.isHeadquarters
                  ? 'border-[#0E6F66] shadow-md bg-[#F1F8F6]'
                  : `border-gray-200 hover:border-[#0E6F66]/30 ${
                      idx % 3 === 0 ? 'bg-[#FAF8F4]' : idx % 3 === 1 ? 'bg-white' : 'bg-[#FDF7EF]'
                    }`
              }`}
            >
              {/* Top Accent */}
              <div className={`h-0.5 ${office.isHeadquarters ? 'bg-[#0E6F66]' : 'bg-gray-200 group-hover:bg-[#0E6F66]'} transition-colors duration-300`} />

              <div className="p-5">
                {/* City & Badge */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-[6px] flex items-center justify-center ${office.isHeadquarters ? 'bg-[#0E6F66]' : 'bg-gray-100 group-hover:bg-[#0E6F66]'
                      } transition-colors duration-300`}>
                      <Building2 size={16} className={`${office.isHeadquarters ? 'text-white' : 'text-gray-500 group-hover:text-white'} transition-colors duration-300`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#2B3138]">{office.city}</h3>
                      {office.isHeadquarters && (
                        <span className="text-[9px] font-semibold text-[#0E6F66] uppercase tracking-wider">Head Office</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Person */}
                <div className="mb-3">
                  <p className="text-[10px] text-[#6B7480] uppercase tracking-wider mb-0.5">Contact Person</p>
                  <p className="text-sm font-medium text-[#4A525C]">{office.contact}</p>
                </div>

                {/* Address */}
                {office.address && (
                  <div className="mb-3">
                    <div className="flex items-start gap-2">
                      <MapPin size={12} className="text-[#6B7480] mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-[#6B7480] leading-relaxed">{office.address}</p>
                    </div>
                  </div>
                )}

                {/* Divider */}
                <div className="border-t border-gray-100 my-3" />

                {/* Contact Links */}
                <div className="space-y-2">
                  <a
                    href={`tel:${office.phone}`}
                    className="flex items-center gap-2 text-sm text-[#4A525C] hover:text-[#0E6F66] transition-colors group/link"
                  >
                    <div className="w-6 h-6 rounded-[4px] bg-gray-100 group-hover/link:bg-[#E8F4F1] flex items-center justify-center transition-colors">
                      <Phone size={11} className="text-[#6B7480] group-hover/link:text-[#0E6F66]" />
                    </div>
                    <span className="text-xs">{office.phone}</span>
                  </a>

                  <a
                    href={`mailto:${office.email}`}
                    className="flex items-center gap-2 text-sm text-[#4A525C] hover:text-[#0E6F66] transition-colors group/link"
                  >
                    <div className="w-6 h-6 rounded-[4px] bg-gray-100 group-hover/link:bg-[#E8F4F1] flex items-center justify-center transition-colors">
                      <Mail size={11} className="text-[#6B7480] group-hover/link:text-[#0E6F66]" />
                    </div>
                    <span className="text-xs truncate">{office.email}</span>
                  </a>
                </div>

                {/* View on Map */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address ? `${office.address}, ${office.city}` : `${office.city}, India`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-[#0E6F66] bg-[#E8F4F1] rounded-[6px] hover:bg-[#0E6F66] hover:text-white transition-all duration-300"
                >
                  <ExternalLink size={11} />
                  View on Map
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-br from-[#0E6F66] to-[#12857A] rounded-[6px] p-8 md:p-10 text-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-25">
            <div className="absolute top-0 right-0 w-56 h-56 bg-[#FDF3E3] rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <h3 className="text-h3 font-bold text-white mb-2">
              Need Hiring Support?
            </h3>
            <p className="text-sm text-[#D8EFEB] mb-5 max-w-lg mx-auto">
              Talk to our recruitment experts and find the right talent for your organization.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 h-[48px] px-6 bg-white text-[#0E6F66] font-semibold text-sm rounded-[6px] hover:bg-[#FDF3E3] transition-colors"
            >
              Get in Touch
              <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}