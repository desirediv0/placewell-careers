'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { siteData } from '@/lib/data'
import {
  MapPin, Phone, Mail, Clock, Upload, CheckCircle, ChevronDown, ChevronRight, ArrowRight, AlertCircle,
} from 'lucide-react'

interface ContactFormData {
  name: string
  company: string
  email: string
  phone: string
  requirement: string
  service: string
  message: string
}

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

export default function ContactPage() {
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [cvSubmitted, setCvSubmitted] = useState(false)
  const [contactLoading, setContactLoading] = useState(false)
  const [cvLoading, setCvLoading] = useState(false)
  const [contactError, setContactError] = useState<string | null>(null)
  const [cvError, setCvError] = useState<string | null>(null)
  const [activeForm, setActiveForm] = useState<'enquiry' | 'cv'>('enquiry')

  const contactForm = useForm<ContactFormData>()
  const cvForm = useForm<CVFormData>()

  const onContactSubmit = async (data: ContactFormData) => {
    setContactLoading(true)
    setContactError(null)
    
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('company', data.company)
      formData.append('email', data.email)
      formData.append('phone', data.phone)
      formData.append('requirement', data.requirement)
      formData.append('service', data.service)
      formData.append('message', data.message)

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send enquiry')
      }

      setContactSubmitted(true)
      contactForm.reset()
      setTimeout(() => setContactSubmitted(false), 5000)
    } catch (err) {
      setContactError(err instanceof Error ? err.message : 'Failed to send enquiry. Please try again.')
    } finally {
      setContactLoading(false)
    }
  }

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
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-[#0B0F14]">
        <div className="absolute inset-0">
          <img src="/contact-hero-bg.png" alt="Placewell Careers Office" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0B0F14]/48" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14]/90 via-[#0B0F14]/20 to-[#0B0F14]/75" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0E6F66]/35 via-transparent to-[#C9821F]/28 mix-blend-soft-light" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(11,15,20,0.30) 0%, rgba(11,15,20,0.62) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 w-full pb-16 px-5 md:px-8">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-2 text-sm text-white/70 mb-8">
              <Link href="/" className="hover:text-[#5EC4B6] transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-white font-medium">Contact Us</span>
            </div>

            <h1 className="text-h1 font-bold text-white leading-[1.1] mb-4">
              Let&apos;s Build<br />Your Winning Team.
            </h1>
            <p className="text-body-lg text-white/80 max-w-lg">
              Whether you&apos;re looking to hire top talent or explore career opportunities — our team is ready to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form — Enquiry + Drop CV */}
      <section className="py-12 md:py-16 px-5 md:px-8 bg-[#FAF8F4]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left - Info */}
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-[2px] bg-[#0E6F66]" />
                <span className="text-[#0E6F66] text-sm font-semibold tracking-wider uppercase">Get In Touch</span>
              </div>

              <h2 className="text-2xl md:text-4xl font-bold text-[#14181D] leading-[1.15] mb-6">
                Why Contact<br />Placewell?
              </h2>

              <p className="text-body-lg text-[#22282F] leading-relaxed mb-6">
                Our recruitment process is built on understanding your unique hiring challenges. From requirement analysis to onboarding, we ensure every placement is a strategic fit for your organization.
              </p>

              <p className="text-[#3B434C] leading-relaxed mb-10">
                With 18+ years of experience and a network of 50+ recruitment professionals, we bring market intelligence, domain expertise, and a proven track record to every engagement.
              </p>

              {/* Business Hours */}
              <div className="bg-white rounded-[6px] p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <Clock size={20} className="text-[#0E6F66]" />
                  <h3 className="text-body font-bold text-[#14181D]">Business Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-[#22282F]">{siteData.businessHours.weekdays}</p>
                  <p className="text-[#22282F]">{siteData.businessHours.saturday}</p>
                  <p className="text-[#22282F]">{siteData.businessHours.sunday}</p>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div>
              {/* Form Tabs */}
              <div className="flex bg-white border border-gray-200 rounded-[6px] p-1.5 mb-8">
                <button
                  onClick={() => setActiveForm('enquiry')}
                  className={`flex-1 py-3.5 font-semibold text-sm rounded-lg transition-all ${activeForm === 'enquiry'
                    ? 'bg-[#2F68AB] text-white shadow-md'
                    : 'text-[#3B434C] hover:text-[#14181D]'
                    }`}
                >
                  Corporate Enquiry
                </button>
                <button
                  onClick={() => setActiveForm('cv')}
                  className={`flex-1 py-3.5 font-semibold text-sm rounded-lg transition-all ${activeForm === 'cv'
                    ? 'bg-[#2F68AB] text-white shadow-md'
                    : 'text-[#3B434C] hover:text-[#14181D]'
                    }`}
                >
                  Drop Your CV
                </button>
              </div>

              {/* Enquiry Form */}
              {activeForm === 'enquiry' && (
                <>
                  {contactSubmitted ? (
                    <div className="bg-white border border-gray-200 rounded-[6px] p-12 text-center">
                      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                        <CheckCircle size={32} className="text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#14181D] mb-2">Thank You!</h3>
                      <p className="text-[#3B434C]">Your enquiry has been received. Our team will reach out within 24 hours.</p>
                    </div>
                  ) : (
                    <motion.form
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      onSubmit={contactForm.handleSubmit(onContactSubmit)}
                      className="bg-white border border-gray-200 rounded-[6px] p-8 md:p-10 space-y-6"
                    >
                      {contactError && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                          <AlertCircle size={18} className="flex-shrink-0" />
                          <span>{contactError}</span>
                        </div>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-[#14181D] mb-2">Full Name *</label>
                          <input
                            {...contactForm.register('name', { required: 'Name is required' })}
                            type="text"
                            suppressHydrationWarning
                            className="w-full px-4 py-3.5 bg-[#FAF8F4] border border-gray-200 text-[#14181D] placeholder:text-[#98A0AB] focus:outline-none focus:border-[#2F68AB] focus:bg-white rounded-lg transition-all"
                            placeholder="Your full name"
                          />
                          {contactForm.formState.errors.name && (
                            <p className="text-sm text-red-500 mt-1.5">{contactForm.formState.errors.name.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[#14181D] mb-2">Company</label>
                          <input
                            {...contactForm.register('company')}
                            type="text"
                            suppressHydrationWarning
                            className="w-full px-4 py-3.5 bg-[#FAF8F4] border border-gray-200 text-[#14181D] placeholder:text-[#98A0AB] focus:outline-none focus:border-[#2F68AB] focus:bg-white rounded-lg transition-all"
                            placeholder="Your company name"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-[#14181D] mb-2">Email *</label>
                          <input
                            {...contactForm.register('email', {
                              required: 'Email is required',
                              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email' }
                            })}
                            type="email"
                            suppressHydrationWarning
                            className="w-full px-4 py-3.5 bg-[#FAF8F4] border border-gray-200 text-[#14181D] placeholder:text-[#98A0AB] focus:outline-none focus:border-[#2F68AB] focus:bg-white rounded-lg transition-all"
                            placeholder="your@email.com"
                          />
                          {contactForm.formState.errors.email && (
                            <p className="text-sm text-red-500 mt-1.5">{contactForm.formState.errors.email.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[#14181D] mb-2">Phone *</label>
                          <input
                            {...contactForm.register('phone', { required: 'Phone is required' })}
                            type="tel"
                            suppressHydrationWarning
                            className="w-full px-4 py-3.5 bg-[#FAF8F4] border border-gray-200 text-[#14181D] placeholder:text-[#98A0AB] focus:outline-none focus:border-[#2F68AB] focus:bg-white rounded-lg transition-all"
                            placeholder="+91 XXXXX XXXXX"
                          />
                          {contactForm.formState.errors.phone && (
                            <p className="text-sm text-red-500 mt-1.5">{contactForm.formState.errors.phone.message}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#14181D] mb-2">Hiring Requirement *</label>
                        <input
                          {...contactForm.register('requirement', { required: 'Requirement is required' })}
                          type="text"
                          suppressHydrationWarning
                          className="w-full px-4 py-3.5 bg-[#FAF8F4] border border-gray-200 text-[#14181D] placeholder:text-[#98A0AB] focus:outline-none focus:border-[#2F68AB] focus:bg-white rounded-lg transition-all"
                          placeholder="e.g., 5 Software Engineers, 2 Sales Managers"
                        />
                        {contactForm.formState.errors.requirement && (
                          <p className="text-sm text-red-500 mt-1.5">{contactForm.formState.errors.requirement.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#14181D] mb-2">Service Required</label>
                        <div className="relative">
                          <select
                            {...contactForm.register('service')}
                            suppressHydrationWarning
                            className="w-full px-4 py-3.5 bg-[#FAF8F4] border border-gray-200 text-[#14181D] focus:outline-none focus:border-[#2F68AB] focus:bg-white rounded-lg transition-all appearance-none"
                          >
                            <option value="">Select a service</option>
                            <option value="rpo">Recruitment Process Outsourcing</option>
                            <option value="market-research">Market Research</option>
                            <option value="talent-mapping">Talent Mapping</option>
                            <option value="leadership">Leadership & Strategic Hiring</option>
                            <option value="insights">Industry Insights</option>
                          </select>
                          <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5E6670] pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#14181D] mb-2">Message *</label>
                        <textarea
                          {...contactForm.register('message', { required: 'Message is required' })}
                          rows={4}
                          suppressHydrationWarning
                          className="w-full px-4 py-3.5 bg-[#FAF8F4] border border-gray-200 text-[#14181D] placeholder:text-[#98A0AB] focus:outline-none focus:border-[#2F68AB] focus:bg-white rounded-lg transition-all resize-none"
                          placeholder="Tell us about your hiring needs..."
                        />
                        {contactForm.formState.errors.message && (
                          <p className="text-sm text-red-500 mt-1.5">{contactForm.formState.errors.message.message}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={contactLoading}
                        className="w-full h-[52px] px-7 bg-[#2F68AB] text-white font-semibold text-body rounded-lg hover:bg-[#27578F] disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                      >
                        {contactLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Submit Enquiry
                            <ArrowRight size={18} />
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </>
              )}

              {/* CV Form */}
              {activeForm === 'cv' && (
                <>
                  {cvSubmitted ? (
                    <div className="bg-white border border-gray-200 rounded-[6px] p-12 text-center">
                      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                        <CheckCircle size={32} className="text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#14181D] mb-2">CV Received!</h3>
                      <p className="text-[#3B434C]">Thank you for your interest. We&apos;ll review your profile and get back to you shortly.</p>
                    </div>
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
                          <label className="block text-sm font-semibold text-[#14181D] mb-2">Full Name *</label>
                          <input
                            {...cvForm.register('name', { required: 'Name is required' })}
                            type="text"
                            suppressHydrationWarning
                            className="w-full px-4 py-3.5 bg-[#FAF8F4] border border-gray-200 text-[#14181D] placeholder:text-[#98A0AB] focus:outline-none focus:border-[#2F68AB] focus:bg-white rounded-lg transition-all"
                            placeholder="Your full name"
                          />
                          {cvForm.formState.errors.name && (
                            <p className="text-sm text-red-500 mt-1.5">{cvForm.formState.errors.name.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[#14181D] mb-2">Email *</label>
                          <input
                            {...cvForm.register('email', {
                              required: 'Email is required',
                              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email' }
                            })}
                            type="email"
                            suppressHydrationWarning
                            className="w-full px-4 py-3.5 bg-[#FAF8F4] border border-gray-200 text-[#14181D] placeholder:text-[#98A0AB] focus:outline-none focus:border-[#2F68AB] focus:bg-white rounded-lg transition-all"
                            placeholder="your@email.com"
                          />
                          {cvForm.formState.errors.email && (
                            <p className="text-sm text-red-500 mt-1.5">{cvForm.formState.errors.email.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-[#14181D] mb-2">Phone *</label>
                          <input
                            {...cvForm.register('phone', { required: 'Phone is required' })}
                            type="tel"
                            suppressHydrationWarning
                            className="w-full px-4 py-3.5 bg-[#FAF8F4] border border-gray-200 text-[#14181D] placeholder:text-[#98A0AB] focus:outline-none focus:border-[#2F68AB] focus:bg-white rounded-lg transition-all"
                            placeholder="+91 XXXXX XXXXX"
                          />
                          {cvForm.formState.errors.phone && (
                            <p className="text-sm text-red-500 mt-1.5">{cvForm.formState.errors.phone.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[#14181D] mb-2">Preferred Position *</label>
                          <input
                            {...cvForm.register('position', { required: 'Position is required' })}
                            type="text"
                            suppressHydrationWarning
                            className="w-full px-4 py-3.5 bg-[#FAF8F4] border border-gray-200 text-[#14181D] placeholder:text-[#98A0AB] focus:outline-none focus:border-[#2F68AB] focus:bg-white rounded-lg transition-all"
                            placeholder="e.g., Marketing Manager"
                          />
                          {cvForm.formState.errors.position && (
                            <p className="text-sm text-red-500 mt-1.5">{cvForm.formState.errors.position.message}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#14181D] mb-2">Years of Experience *</label>
                        <input
                          {...cvForm.register('experience', { required: 'Experience is required' })}
                          type="text"
                          suppressHydrationWarning
                          className="w-full px-4 py-3.5 bg-[#FAF8F4] border border-gray-200 text-[#14181D] placeholder:text-[#98A0AB] focus:outline-none focus:border-[#2F68AB] focus:bg-white rounded-lg transition-all"
                          placeholder="e.g., 5+ years"
                        />
                        {cvForm.formState.errors.experience && (
                          <p className="text-sm text-red-500 mt-1.5">{cvForm.formState.errors.experience.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#14181D] mb-2">Upload CV *</label>
                        <div className="relative">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => e.target.files && cvForm.setValue('cv', e.target.files)}
                            className="hidden"
                            id="cv-upload-contact"
                          />
                          <label
                            htmlFor="cv-upload-contact"
                            className="flex items-center justify-center gap-3 p-8 border-2 border-dashed border-gray-200 hover:border-[#2F68AB] cursor-pointer transition-colors bg-[#FAF8F4] rounded-[6px]"
                          >
                            <Upload size={24} className="text-[#0E6F66]" />
                            <div className="text-center">
                              <span className="text-sm font-medium text-[#14181D] block">Drop your CV here or click to browse</span>
                              <span className="text-xs text-[#5E6670] mt-1 block">PDF, DOC, DOCX (Max 10MB)</span>
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
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Office Network */}
      <section className="py-12 md:py-16 px-5 md:px-8 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="w-8 h-[2px] bg-[#0E6F66]" />
              <span className="text-[#0E6F66] text-sm font-semibold tracking-wider uppercase">Our Network</span>
              <div className="w-8 h-[2px] bg-[#0E6F66]" />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-[#14181D] mb-4">
              Our Office Network
            </h2>
            <p className="text-body-lg text-[#3B434C] max-w-2xl mx-auto">
              Strategically located across North India to serve clients nationwide
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {siteData.offices.map((office, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-30px' }}
                variants={fadeUp}
                className={`group rounded-[6px] border p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${office.isHeadquarters
                  ? 'border-[#0E6F66] bg-[#FAF8F4]'
                  : 'border-gray-200 bg-white'
                  }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-[#E8F4F1] rounded-lg flex items-center justify-center group-hover:bg-[#0E6F66] transition-colors">
                    <MapPin size={20} className="text-[#0E6F66] group-hover:text-white transition-colors" />
                  </div>
                  {office.isHeadquarters && (
                    <span className="text-[11px] font-bold text-[#0E6F66] bg-[#E8F4F1] px-2 py-1 rounded-md uppercase tracking-wider">
                      HQ
                    </span>
                  )}
                </div>

                <h3 className="text-body-lg font-bold text-[#14181D] mb-1">{office.city}</h3>
                <p className="text-sm text-[#3B434C] mb-3">{office.contact}</p>

                {office.address && (
                  <p className="text-xs text-[#5E6670] mb-4 line-clamp-2">{office.address}</p>
                )}

                <div className="space-y-2 mb-5">
                  <a href={`tel:${office.phone}`} className="flex items-center gap-2 text-sm text-[#22282F] hover:text-[#0E6F66] transition-colors">
                    <Phone size={13} className="flex-shrink-0" />
                    <span className="truncate">{office.phone}</span>
                  </a>
                  <a href={`mailto:${office.email}`} className="flex items-center gap-2 text-sm text-[#22282F] hover:text-[#0E6F66] transition-colors">
                    <Mail size={13} className="flex-shrink-0" />
                    <span className="truncate">{office.email}</span>
                  </a>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`tel:${office.phone}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#FAF8F4] hover:bg-[#0E6F66] hover:text-white text-[#22282F] text-xs font-semibold rounded-lg transition-all border border-gray-100"
                  >
                    <Phone size={12} />
                    Call
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
          <img src="/contact-hero-bg.png" alt="Placewell Careers Office" className="w-full h-full object-cover photo-light" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#E8F4F1]/95 via-[#FAF8F4]/94 to-[#FDF3E3]/95" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-[#14181D] mb-5 leading-tight">
              Need Recruitment Support?
            </h2>
            <p className="text-body-lg text-[#22282F] mb-8 max-w-xl mx-auto">
              Let&apos;s start the conversation. Our team is ready to help you build your winning team.
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
