'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Upload, CheckCircle, AlertCircle, ArrowRight, Briefcase, Users, Target, TrendingUp, MapPin, Mail, Phone,
} from 'lucide-react'

interface CVFormData {
  name: string
  email: string
  phone: string
  position: string
  experience: string
  cv?: FileList
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}

const benefits = [
  { icon: Briefcase, title: 'Diverse Opportunities', desc: 'Access roles across BFSI, Fintech, Healthcare, Hospitality & more' },
  { icon: Users, title: 'Expert Guidance', desc: 'Our recruitment consultants support you at every step of your journey' },
  { icon: Target, title: 'Tailored Matches', desc: 'We match your skills & aspirations with the right organizational culture' },
  { icon: TrendingUp, title: 'Career Growth', desc: 'Connect with organizations that invest in your professional development' },
]

export default function CareersPage() {
  const [cvSubmitted, setCvSubmitted] = useState(false)
  const [cvLoading, setCvLoading] = useState(false)
  const [cvError, setCvError] = useState<string | null>(null)

  const cvForm = useForm<CVFormData>()

  const onCVSubmit = async (data: CVFormData) => {
    setCvLoading(true)
    setCvError(null)

    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('phone', data.phone)
      formData.append('position', data.position)
      formData.append('experience', data.experience)
      if (data.cv?.[0]) {
        formData.append('cv', data.cv[0])
      }

      const response = await fetch('/api/careers', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit CV')
      }

      setCvSubmitted(true)
      cvForm.reset()
      setTimeout(() => setCvSubmitted(false), 5000)
    } catch (err) {
      setCvError(err instanceof Error ? err.message : 'Failed to submit CV. Please try again.')
    } finally {
      setCvLoading(false)
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-[#FAF8F4]">
        <div className="absolute inset-0">
          <img src="/hero-bg.png" alt="Placewell Careers Office" className="w-full h-full object-cover photo-light" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F4] via-[#FAF8F4]/88 to-[#FAF8F4]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F4] via-transparent to-[#FAF8F4]/45" />
        </div>

        <div className="relative z-10 w-full pb-16 px-5 md:px-8">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-2 text-sm text-[#6B7480] mb-8">
              <Link href="/" className="hover:text-[#0E6F66] transition-colors">Home</Link>
              <span>{'>'}</span>
              <span className="text-[#2B3138] font-medium">Careers</span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-h1 font-bold text-[#2B3138] leading-[1.1] mb-4"
            >
              Your Next Career<br />Move Starts Here.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-body-lg text-[#565E69] max-w-lg"
            >
              Join a network of top talent. Submit your CV and let our recruitment experts connect you with opportunities that match your ambition.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Why Placewell */}
      <section className="py-12 md:py-16 px-5 md:px-8 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="w-8 h-[2px] bg-[#0E6F66]" />
              <span className="text-[#0E6F66] text-sm font-semibold tracking-wider uppercase">Why Placewell?</span>
              <div className="w-8 h-[2px] bg-[#0E6F66]" />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-[#2B3138] mb-4">
              Why Trust Us With Your Career?
            </h2>
            <p className="text-body-lg text-[#6B7480] max-w-2xl mx-auto">
              We're not just recruiters — we're career partners. With 17+ years of industry expertise, we understand what makes a great professional match.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-30px' }}
                variants={fadeUp}
                className="bg-white border border-gray-200 rounded-[6px] p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#E8F4F1] rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon size={24} className="text-[#0E6F66]" />
                </div>
                <h3 className="text-body-lg font-bold text-[#2B3138] mb-2">{benefit.title}</h3>
                <p className="text-[#6B7480]">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Drop Your CV Form */}
      <section className="py-12 md:py-16 px-5 md:px-8 bg-[#FAF8F4]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left - Info */}
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-[2px] bg-[#0E6F66]" />
                <span className="text-[#0E6F66] text-sm font-semibold tracking-wider uppercase">Drop Your CV</span>
              </div>

              <h2 className="text-2xl md:text-4xl font-bold text-[#2B3138] leading-[1.15] mb-6">
                Let Opportunities<br />Find You.
              </h2>

              <p className="text-body-lg text-[#565E69] leading-relaxed mb-6">
                Skip the job boards. Submit your profile once, and our specialist recruiters will match you with roles that align with your experience, aspirations, and values.
              </p>

              <p className="text-[#6B7480] leading-relaxed mb-10">
                We work with leading organizations across BFSI, Fintech, Healthcare, and Hospitality — giving you access to opportunities that aren't always advertised publicly.
              </p>

              {/* Industries */}
              <div className="bg-white rounded-[6px] p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <Target size={20} className="text-[#0E6F66]" />
                  <h3 className="text-body font-bold text-[#2B3138]">Sectors We Recruit For</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['BFSI', 'Fintech', 'Healthcare', 'Hospitality', 'IT/EdTech', 'Manufacturing'].map((sector) => (
                    <span key={sector} className="px-3 py-1.5 bg-[#FAF8F4] border border-gray-200 text-sm text-[#565E69] rounded-full">
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div>
              {cvSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white border border-gray-200 rounded-[6px] p-12 text-center"
                >
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#2B3138] mb-2">CV Received!</h3>
                  <p className="text-[#6B7480]">Thank you for your interest. We&apos;ll review your profile and get back to you shortly.</p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  onSubmit={cvForm.handleSubmit(onCVSubmit)}
                  className="bg-white border border-gray-200 rounded-[6px] p-8 md:p-10 space-y-6"
                >
                  {cvError && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      <AlertCircle size={18} className="flex-shrink-0" />
                      <span>{cvError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#2B3138] mb-2">Full Name *</label>
                      <input
                        {...cvForm.register('name', { required: 'Name is required' })}
                        type="text"
                        suppressHydrationWarning
                        className="w-full px-4 py-3.5 bg-[#FAF8F4] border border-gray-200 text-[#2B3138] placeholder:text-[#98A0AB] focus:outline-none focus:border-[#2F68AB] focus:bg-white rounded-lg transition-all"
                        placeholder="Your full name"
                      />
                      {cvForm.formState.errors.name && (
                        <p className="text-sm text-red-500 mt-1.5">{cvForm.formState.errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#2B3138] mb-2">Email *</label>
                      <input
                        {...cvForm.register('email', {
                          required: 'Email is required',
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email' }
                        })}
                        type="email"
                        suppressHydrationWarning
                        className="w-full px-4 py-3.5 bg-[#FAF8F4] border border-gray-200 text-[#2B3138] placeholder:text-[#98A0AB] focus:outline-none focus:border-[#2F68AB] focus:bg-white rounded-lg transition-all"
                        placeholder="your@email.com"
                      />
                      {cvForm.formState.errors.email && (
                        <p className="text-sm text-red-500 mt-1.5">{cvForm.formState.errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#2B3138] mb-2">Phone *</label>
                      <input
                        {...cvForm.register('phone', { required: 'Phone is required' })}
                        type="tel"
                        suppressHydrationWarning
                        className="w-full px-4 py-3.5 bg-[#FAF8F4] border border-gray-200 text-[#2B3138] placeholder:text-[#98A0AB] focus:outline-none focus:border-[#2F68AB] focus:bg-white rounded-lg transition-all"
                        placeholder="+91 XXXXX XXXXX"
                      />
                      {cvForm.formState.errors.phone && (
                        <p className="text-sm text-red-500 mt-1.5">{cvForm.formState.errors.phone.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#2B3138] mb-2">Preferred Position *</label>
                      <input
                        {...cvForm.register('position', { required: 'Position is required' })}
                        type="text"
                        suppressHydrationWarning
                        className="w-full px-4 py-3.5 bg-[#FAF8F4] border border-gray-200 text-[#2B3138] placeholder:text-[#98A0AB] focus:outline-none focus:border-[#2F68AB] focus:bg-white rounded-lg transition-all"
                        placeholder="e.g., Marketing Manager"
                      />
                      {cvForm.formState.errors.position && (
                        <p className="text-sm text-red-500 mt-1.5">{cvForm.formState.errors.position.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#2B3138] mb-2">Years of Experience *</label>
                    <input
                      {...cvForm.register('experience', { required: 'Experience is required' })}
                      type="text"
                      suppressHydrationWarning
                      className="w-full px-4 py-3.5 bg-[#FAF8F4] border border-gray-200 text-[#2B3138] placeholder:text-[#98A0AB] focus:outline-none focus:border-[#2F68AB] focus:bg-white rounded-lg transition-all"
                      placeholder="e.g., 5+ years"
                    />
                    {cvForm.formState.errors.experience && (
                      <p className="text-sm text-red-500 mt-1.5">{cvForm.formState.errors.experience.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#2B3138] mb-2">Upload CV *</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => e.target.files && cvForm.setValue('cv', e.target.files)}
                        className="hidden"
                        id="cv-upload-careers"
                      />
                      <label
                        htmlFor="cv-upload-careers"
                        className="flex items-center justify-center gap-3 p-8 border-2 border-dashed border-gray-200 hover:border-[#2F68AB] cursor-pointer transition-colors bg-[#FAF8F4] rounded-[6px]"
                      >
                        <Upload size={24} className="text-[#0E6F66]" />
                        <div className="text-center">
                          <span className="text-sm font-medium text-[#2B3138] block">Drop your CV here or click to browse</span>
                          <span className="text-xs text-[#98A0AB] mt-1 block">PDF, DOC, DOCX (Max 10MB)</span>
                        </div>
                      </label>
                    </div>
                    {cvForm.formState.errors.cv && (
                      <p className="text-sm text-red-500 mt-1.5">{cvForm.formState.errors.cv.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={cvLoading}
                    className="w-full h-[52px] px-7 bg-[#2F68AB] text-white font-semibold text-body rounded-lg hover:bg-[#27578F] disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                  >
                    {cvLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit CV
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Office Network / Contact */}
      <section className="py-12 md:py-16 px-5 md:px-8 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="w-8 h-[2px] bg-[#0E6F66]" />
              <span className="text-[#0E6F66] text-sm font-semibold tracking-wider uppercase">Visit Us</span>
              <div className="w-8 h-[2px] bg-[#0E6F66]" />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-[#2B3138] mb-4">
              Our Office Network
            </h2>
            <p className="text-body-lg text-[#6B7480] max-w-2xl mx-auto">
              Strategically located across North India — walk in or reach out
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { city: 'Chandigarh (HQ)', contact: 'Mr. Sandeep Grover', phone: '+91 98150 87070', email: 'sandeep.grover@placewellcareers.com', address: '39, Anand Shopping Complex, Sector 17 A', isHQ: true },
              { city: 'Gurgaon / Delhi', contact: 'Ms. Seema Bhatia', phone: '+91 97119 00305', email: 'seema.bhatia@placewellcareers.com', address: '', isHQ: false },
              { city: 'Jammu', contact: 'Mr. Jatinder Singh', phone: '+91 97973 64187', email: 'jatinder.singh@placewellcareers.com', address: '', isHQ: false },
              { city: 'Punjab / Chandigarh', contact: 'Ms. Minakshi Deshwal & Mr. Arvin Gupta', phone: '+91 85289 39811', email: 'arvin@placewellcareers.com', address: '', isHQ: false },
            ].map((office, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-30px' }}
                variants={fadeUp}
                className={`group rounded-[6px] border p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${office.isHQ
                  ? 'border-[#0E6F66] bg-[#FAF8F4]'
                  : 'border-gray-200 bg-white'
                  }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-[#E8F4F1] rounded-lg flex items-center justify-center group-hover:bg-[#0E6F66] transition-colors">
                    <MapPin size={20} className="text-[#0E6F66] group-hover:text-white transition-colors" />
                  </div>
                  {office.isHQ && (
                    <span className="text-[10px] font-bold text-[#0E6F66] bg-[#E8F4F1] px-2 py-1 rounded-md uppercase tracking-wider">
                      HQ
                    </span>
                  )}
                </div>

                <h3 className="text-body-lg font-bold text-[#2B3138] mb-1">{office.city}</h3>
                <p className="text-sm text-[#6B7480] mb-3">{office.contact}</p>

                {office.address && (
                  <p className="text-xs text-[#98A0AB] mb-4 line-clamp-2">{office.address}</p>
                )}

                <div className="space-y-2 mb-5">
                  <a href={`tel:${office.phone}`} className="flex items-center gap-2 text-sm text-[#565E69] hover:text-[#0E6F66] transition-colors">
                    <Phone size={13} className="flex-shrink-0" />
                    <span className="truncate">{office.phone}</span>
                  </a>
                  <a href={`mailto:${office.email}`} className="flex items-center gap-2 text-sm text-[#565E69] hover:text-[#0E6F66] transition-colors">
                    <Mail size={13} className="flex-shrink-0" />
                    <span className="truncate">{office.email}</span>
                  </a>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`tel:${office.phone}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#FAF8F4] hover:bg-[#0E6F66] hover:text-white text-[#565E69] text-xs font-semibold rounded-lg transition-all border border-gray-100"
                  >
                    <Phone size={12} />
                    Call
                  </a>
                  <a
                    href={`mailto:${office.email}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#FAF8F4] hover:bg-[#0E6F66] hover:text-white text-[#565E69] text-xs font-semibold rounded-lg transition-all border border-gray-100"
                  >
                    <Mail size={12} />
                    Email
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-12 md:py-16 px-5 md:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/hero-bg.png" alt="Placewell Careers Office" className="w-full h-full object-cover photo-light" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#E8F4F1]/95 via-[#FAF8F4]/94 to-[#FDF3E3]/95" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-[#2B3138] mb-5 leading-tight">
              Ready to Take the Next Step?
            </h2>
            <p className="text-body-lg text-[#565E69] mb-8 max-w-xl mx-auto">
              Submit your CV today and let our recruitment experts connect you with your ideal role.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919815087070">
                <button className="w-full sm:w-auto h-[52px] px-7 bg-[#2F68AB] text-white font-semibold rounded-lg hover:bg-[#27578F] transition-colors flex items-center justify-center gap-3">
                  <Phone size={18} />
                  Call Now
                </button>
              </a>
              <a href="mailto:support@placewellcareers.com">
                <button className="w-full sm:w-auto h-[52px] px-7 border-2 border-[#0E6F66]/35 text-[#0E6F66] font-semibold rounded-lg hover:bg-[#0E6F66] hover:text-white hover:border-[#0E6F66] transition-colors flex items-center justify-center gap-3">
                  <Mail size={18} />
                  Email Us
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}