import Hero from '@/components/hero'
import Pillars from '@/components/pillars'
import About from '@/components/about'
import Team from '@/components/team'
import Services from '@/components/services'
import Industries from '@/components/industries'
import Offices from '@/components/offices'
import Contact from '@/components/contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Pillars />
      <About />
      <Team />
      <Services />
      <Industries />
      <Offices />
      <Contact />
    </>
  )
}