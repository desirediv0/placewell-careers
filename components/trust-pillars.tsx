'use client'

import { motion } from 'framer-motion'
import { Globe, Brain, Target } from 'lucide-react'

const pillars = [
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Connecting talent across 8 strategic office locations worldwide'
  },
  {
    icon: Brain,
    title: 'Industry Expertise',
    description: 'Deep knowledge across multiple sectors and disciplines'
  },
  {
    icon: Target,
    title: 'Premium Matching',
    description: 'Precision alignment between candidates and organizations'
  }
]

export function TrustPillars() {
  return (
    <section className="w-full bg-secondary/20 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">Why Choose Placewell</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Our commitment to excellence spans every aspect of recruitment</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-card border border-border hover:border-primary transition-colors"
              >
                <div className="mb-6 inline-block p-4 bg-primary/10">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
