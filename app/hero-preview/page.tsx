import type { Metadata } from 'next'
import HeroCentered from '@/components/hero-centered'

// Preview-only route for reviewing the centred hero variant alongside the live
// one. Not linked from anywhere and kept out of search results — delete this
// folder once a direction is chosen.
export const metadata: Metadata = {
  title: 'Hero Preview',
  robots: { index: false, follow: false },
}

export default function HeroPreviewPage() {
  return <HeroCentered />
}
