'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Upload, CheckCircle, AlertCircle } from 'lucide-react'

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  cv?: FileList
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('phone', data.phone)
      formData.append('subject', data.subject)
      formData.append('message', data.message)
      if (data.cv?.[0]) {
        formData.append('cv', data.cv[0])
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send enquiry')
      }

      setSubmitted(true)
      reset()
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send enquiry. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setValue('cv', e.target.files)
    }
  }

  return (
    <section id="contact-us" className="py-12 md:py-16 px-5 md:px-8 bg-[#FAF8F4]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-[#2B3138] mb-3">
            Get In Touch
          </h2>
          <p className="text-body-lg text-[#565E69]">
            Connect with our team about opportunities or inquire about our services
          </p>
        </div>

        {submitted ? (
          <div className="p-10 bg-white border border-[#0E6F66] rounded-[6px] text-center">
            <CheckCircle size={44} className="text-[#0E6F66] mx-auto mb-3" />
            <h3 className="text-xl font-bold text-[#2B3138] mb-2">Thank You</h3>
            <p className="text-sm text-[#565E69]">We&apos;ll be in touch shortly with more information.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 p-7 bg-white border border-gray-200 rounded-[6px]"
          >
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle size={18} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-[#2B3138] mb-1.5">Full Name</label>
              <input
                {...register('name', { required: 'Name is required' })}
                type="text"
                suppressHydrationWarning
                className="w-full h-[44px] px-4 bg-white border border-gray-200 text-[#2B3138] placeholder:text-[#9AA1AC] focus:outline-none focus:border-[#2F68AB] rounded-[6px] transition-colors text-sm"
                placeholder="Your Name"
              />
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[#2B3138] mb-1.5">Email</label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email'
                  }
                })}
                type="email"
                suppressHydrationWarning
                className="w-full h-[44px] px-4 bg-white border border-gray-200 text-[#2B3138] placeholder:text-[#9AA1AC] focus:outline-none focus:border-[#2F68AB] rounded-[6px] transition-colors text-sm"
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-[#2B3138] mb-1.5">Phone</label>
              <input
                {...register('phone', { required: 'Phone is required' })}
                type="tel"
                suppressHydrationWarning
                className="w-full h-[44px] px-4 bg-white border border-gray-200 text-[#2B3138] placeholder:text-[#9AA1AC] focus:outline-none focus:border-[#2F68AB] rounded-[6px] transition-colors text-sm"
                placeholder="+91 XXXXX XXXXX"
              />
              {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>}
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-[#2B3138] mb-1.5">Subject</label>
              <input
                {...register('subject', { required: 'Subject is required' })}
                type="text"
                suppressHydrationWarning
                className="w-full h-[44px] px-4 bg-white border border-gray-200 text-[#2B3138] placeholder:text-[#9AA1AC] focus:outline-none focus:border-[#2F68AB] rounded-[6px] transition-colors text-sm"
                placeholder="Enquiry / Application / Partnership"
              />
              {errors.subject && <p className="text-xs text-red-600 mt-1">{errors.subject.message}</p>}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-[#2B3138] mb-1.5">Message</label>
              <textarea
                {...register('message', { required: 'Message is required' })}
                rows={4}
                suppressHydrationWarning
                className="w-full px-4 py-3 bg-white border border-gray-200 text-[#2B3138] placeholder:text-[#9AA1AC] focus:outline-none focus:border-[#2F68AB] rounded-[6px] transition-colors resize-none text-sm"
                placeholder="Tell us more about your inquiry..."
              ></textarea>
              {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message.message}</p>}
            </div>

            {/* CV Upload */}
            <div>
              <label className="block text-sm font-semibold text-[#2B3138] mb-1.5">Upload CV (Optional)</label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleCvChange}
                  className="hidden"
                  id="cv-upload"
                />
                <label
                  htmlFor="cv-upload"
                  className="flex items-center justify-center gap-3 p-5 border-2 border-dashed border-gray-200 hover:border-[#2F68AB] cursor-pointer transition-colors bg-[#FAF8F4] rounded-[6px]"
                >
                  <Upload size={18} className="text-[#2F68AB]" />
                  <span className="text-sm text-[#6B7480]">
                    Drop your CV or click to browse
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[48px] bg-[#2F68AB] text-white font-semibold text-sm rounded-[6px] hover:bg-[#27578F] disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Sending...' : 'Send Enquiry'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}