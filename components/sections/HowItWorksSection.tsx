'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Key, FileUp, Bot, MousePointer } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { SignupForm } from '@/components/SignupForm'

const HowItWorksSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true })
  const [isFormOpen, setIsFormOpen] = useState(false)

  const steps = [
    {
      number: '1',
      icon: <Key className="h-8 w-8 text-blue-600" />,
      title: 'Подключение',
      description: 'Вводите API-ключ WB (2 минуты)',
      details: [
        'Копируете API-ключ из личного кабинета WB',
        'Вставляете в форму',
        'Готово! Мы получаем данные по вашим кампаниям'
      ]
    },
    {
      number: '2',
      icon: <FileUp className="h-8 w-8 text-blue-600" />,
      title: 'Загрузка',
      description: 'Загружаете себестоимость (5 минут)',
      details: [
        'Скачиваете Excel с вашими артикулами',
        'Заполняете себестоимость',
        'Загружаете обратно (или вводите вручную)'
      ]
    },
    {
      number: '3',
      icon: <Bot className="h-8 w-8 text-blue-600" />,
      title: 'Анализ',
      description: 'Система рассчитывает маржинальность для 200+ фраз (автоматически)',
      details: [
        'Система берет данные по рекламе, заказам, выкупу',
        'Рассчитывает реальную маржу по каждой фразе',
        'Показывает убыточные фразы красным'
      ]
    },
    {
      number: '4',
      icon: <MousePointer className="h-8 w-8 text-blue-600" />,
      title: 'Действие',
      description: 'Отключаете убыточные фразы в 1 клик',
      details: [
        'Видите топ убыточных фраз',
        'Отключаете их в 1 клик',
        'Или снижаете ставки',
        'Начинаете экономить!'
      ]
    }
  ]

  return (
    <section ref={ref} className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            От подключения до экономии — 10 минут
          </h2>

          {/* Timeline */}
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-green-400"></div>

            {/* Steps */}
            <div className="grid md:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Step Number Circle */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white border-4 border-blue-600 rounded-full flex items-center justify-center font-bold text-blue-600 z-10">
                    {step.number}
                  </div>

                  <Card className="p-4 sm:p-5 md:p-6 pt-8 sm:pt-10 h-full hover:shadow-lg transition-shadow">
                    <div className="text-center mb-3 sm:mb-4">
                      <div className="inline-block scale-75 sm:scale-100">
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold mb-2 text-center">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4 text-center">{step.description}</p>

                    <div className="space-y-1">
                      {step.details.map((detail, i) => (
                        <p key={i} className="text-[10px] sm:text-xs text-slate-500 leading-snug">
                          • {detail}
                        </p>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Final Result */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-8 max-w-2xl mx-auto">
              <p className="text-2xl font-bold text-green-600 mb-2">
                💰 Экономите бюджет!
              </p>
              <p className="text-lg text-slate-600">
                В среднем селлеры отключают 30-40 убыточных фраз
                <br />
                и экономят 23,000₽ в первый же месяц
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <div className="text-center mt-8">
            <Button
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => {
                if (typeof window !== 'undefined' && window.analytics) {
                  window.analytics.track("How It Works CTA Clicked");
                }
                setIsFormOpen(true);
              }}
            >
              Начать бесплатно → 14 дней trial
            </Button>
          </div>
        </motion.div>
      </div>

      <SignupForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  )
}

export default HowItWorksSection