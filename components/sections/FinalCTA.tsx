'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Check, ArrowRight } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { SignupForm } from '@/components/SignupForm'

const FinalCTA = () => {
  const { ref, inView } = useInView({ triggerOnce: true })
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <section ref={ref} className="pt-12 sm:pt-16 md:pt-20 pb-20 sm:pb-24 md:pb-32 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Перестаньте терять деньги на убыточных фразах
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Подключитесь за 10 минут и увидите реальную маржинальность
            <br />
            каждой рекламной фразы уже сегодня
          </p>

          {/* Value props */}
          <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-3xl mx-auto">
            <div>
              <div className="text-2xl mb-2">✅</div>
              <h3 className="font-semibold mb-1">Без риска</h3>
              <p className="text-sm text-slate-600">14 дней бесплатно<br />Без привязки карты</p>
            </div>
            <div>
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold mb-1">Быстрый старт</h3>
              <p className="text-sm text-slate-600">Подключение за 10 мин<br />Первые инсайты сразу</p>
            </div>
            <div>
              <div className="text-2xl mb-2">💰</div>
              <h3 className="font-semibold mb-1">Гарантия результата</h3>
              <p className="text-sm text-slate-600">Или вернем деньги<br />Экономия от 5,000₽/мес</p>
            </div>
          </div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all"
              onClick={() => {
                if (typeof window !== 'undefined' && window.analytics) {
                  window.analytics.track("Final CTA Clicked");
                }
                setIsFormOpen(true);
              }}
            >
              Начать экономить бесплатно →
            </Button>
            <p className="text-sm text-slate-600 text-center mt-3">14 дней бесплатного trial</p>
          </motion.div>

          {/* Social proof */}
          <div className="mt-8 space-y-1 text-sm text-slate-600">
            <p>✓ 500+ селлеров уже экономят с нами</p>
            <p>✓ Средняя экономия 23,000₽/месяц</p>
            <p>✓ Рейтинг 4.9/5.0 на отзовиках</p>
          </div>
        </motion.div>
      </div>

      <SignupForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  )
}

export default FinalCTA