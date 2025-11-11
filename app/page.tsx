import Hero from '@/components/sections/Hero'
import ProblemSection from '@/components/sections/ProblemSection'
import HiddenProblemSection from '@/components/sections/HiddenProblemSection'
import SolutionSection from '@/components/sections/SolutionSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import SocialProofSection from '@/components/sections/SocialProofSection'
import PricingSection from '@/components/sections/PricingSection'
import FinalCTA from '@/components/sections/FinalCTA'
import { Toaster } from '@/components/ui/sonner'

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <Hero />
        <ProblemSection />
        <HiddenProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <SocialProofSection />
        <PricingSection />
        <FinalCTA />
      </main>
      <Toaster />
    </>
  )
}
