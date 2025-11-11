'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { SignupForm } from '@/components/SignupForm'

const Hero = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <>
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Вы теряете{" "}
              <span className="text-red-600">20-40% бюджета</span>{" "}
              на фразах, которые{" "}
              <span className="underline decoration-wavy decoration-red-400">
                КАЖУТСЯ
              </span>{" "}
              прибыльными
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-4">
              Хороший ДРР не значит прибыль. Фразы с низким процентом выкупа
              "съедают" ваш бюджет, даже если ДРР выглядит хорошо (10-15%).
            </p>

            <p className="text-sm sm:text-base md:text-lg text-slate-700 mb-8">
              Мы показываем <strong>РЕАЛЬНУЮ маржинальность</strong> каждой
              фразы с учетом % выкупа, комиссий и полной юнит-экономики.
            </p>

            {/* CTA */}
            <div className="mb-8">
              <Button
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                onClick={() => {
                  // Track CTA click
                  if (typeof window !== 'undefined' && window.analytics) {
                    window.analytics.track("CTA Clicked", {
                      location: "hero",
                      cta_text: "Найти убыточные фразы бесплатно"
                    });
                  }
                  setIsFormOpen(true);
                }}
              >
                Найти убыточные фразы бесплатно
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>500+ селлеров уже экономят 23,000₽/мес</span>
              </div>
              <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Средняя экономия 34% рекламного бюджета</span>
              </div>
              <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Подключение за 3 минуты</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="bg-white rounded-lg shadow-2xl p-4 sm:p-6">
              <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                <div className="text-center mb-4">
                  <p className="text-xs sm:text-sm font-semibold text-slate-600">Фраза: "платье летнее"</p>
                  <div className="mt-3 sm:mt-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-slate-600">ДРР:</span>
                      <span className="text-base sm:text-lg font-bold text-green-600">15% ✓</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-slate-600">% выкупа:</span>
                      <span className="text-base sm:text-lg font-bold text-red-600">40% 🔴</span>
                    </div>
                    <div className="h-px bg-slate-300 my-2"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm font-semibold text-slate-600">Реальная маржа:</span>
                      <span className="text-lg sm:text-xl font-bold text-red-600">-8% (УБЫТОК!)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating annotation */}
              <div className="absolute -top-4 sm:-top-6 -right-2 sm:-right-6 bg-white p-3 sm:p-4 rounded-lg shadow-lg border-2 border-red-500 max-w-[200px] sm:max-w-none">
                <p className="text-xs sm:text-sm font-semibold text-red-600">
                  🔴 43 убыточные фразы найдены!
                </p>
                <p className="text-[10px] sm:text-xs text-slate-600">
                  Потенциальная экономия: 23,340₽/мес
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    <SignupForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  )
}

export default Hero