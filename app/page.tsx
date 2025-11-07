import Hero from '@/components/sections/Hero'
import ProblemAgitation from '@/components/sections/ProblemAgitation'
import Calculator from '@/components/sections/Calculator'
import FinalCTA from '@/components/sections/FinalCTA'
import { Toaster } from '@/components/ui/sonner'

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <Hero />
        <ProblemAgitation />
        <Calculator />
        <FinalCTA />
      </main>
      <Toaster />
    </>
  )
}
