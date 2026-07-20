'use client'

import { siteData } from '@/lib/data'
import * as Icons from 'lucide-react'

export default function Services() {
  const getIcon = (iconName: string) => {
    const iconMap: any = Icons
    const Icon = iconMap[iconName]
    return Icon ? <Icon size={22} /> : null
  }

  return (
    <section id="our-services" className="py-12 md:py-16 px-5 md:px-8 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#2D6CDF] text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
            Our Services
          </div>
          <h2 className="text-h2 font-bold text-[#1F2937] mb-3">
            Comprehensive Recruitment & Talent Solutions
          </h2>
          <p className="text-body-lg text-[#4B5563] max-w-3xl mx-auto">
            Tailored strategies and innovative solutions to help you attract, engage and retain the best talent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {siteData.services.map((service, idx) => (
            <div
              key={idx}
              className={`border border-gray-200 rounded-[6px] p-7 hover:shadow-lg transition-all duration-300 flex flex-col justify-between ${
                idx % 3 === 0 ? 'bg-[#f0f7ff]' : idx % 3 === 1 ? 'bg-[#f8fafc]' : 'bg-[#f5f3ff]'
              }`}
            >
              <div>
                <div className="flex items-start gap-3.5 mb-5">
                  <div className="w-11 h-11 bg-blue-50 text-[#223A8F] rounded-[6px] flex items-center justify-center flex-shrink-0">
                    {getIcon(service.icon)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1F2937] leading-snug">{service.title}</h3>
                    <p className="text-xs text-[#2D6CDF] font-semibold mt-0.5">{service.subtitle}</p>
                  </div>
                </div>

                <p className="text-sm text-[#4B5563] mb-5 italic">&ldquo;{service.description}&rdquo;</p>

                <ul className="space-y-2.5 mb-6">
                  {service.offerings.map((offering, offeringIdx) => (
                    <li key={offeringIdx} className="flex items-start gap-2.5 text-sm text-[#4B5563]">
                      <span className="w-1.5 h-1.5 bg-[#223A8F] rounded-full mt-2 flex-shrink-0" />
                      <span>{offering}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <a href="#contact-us" className="text-sm font-semibold text-[#2D6CDF] hover:text-[#223A8F] transition-colors inline-flex items-center gap-1.5">
                  Learn More <Icons.ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}