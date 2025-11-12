'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Zap } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { SignupForm } from '@/components/SignupForm'

const PricingSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true })
  const [isFormOpen, setIsFormOpen] = useState(false)

  const plans = [
    {
      name: 'СТАРТ',
      price: '1,000₽',
      period: '/карточка',
      description: 'До 10 карточек',
      features: [
        'Полная аналитика по каждой карточке',
        'Учет % выкупа и маржинальности',
        'Автообновление каждые 6 часов',
        'Email поддержка',
        'Минимальный платеж: 10,000₽'
      ],
      popular: false,
      range: '1-10 карточек'
    },
    {
      name: 'РОСТ',
      price: '800₽',
      period: '/карточка',
      description: '11-50 карточек',
      features: [
        'Все из тарифа СТАРТ',
        'Приоритетная поддержка',
        'Экспорт данных в Excel',
        'Кластерный анализ фраз',
        'Экономия 20% vs СТАРТ'
      ],
      popular: true,
      badge: '🔥 ПОПУЛЯРНЫЙ',
      range: '11-50 карточек'
    },
    {
      name: 'МАСШТАБ',
      price: '500₽',
      period: '/карточка',
      description: '51-150 карточек',
      features: [
        'Все из тарифа РОСТ',
        'API доступ',
        'Персональный менеджер',
        'Настройка под ваши процессы',
        'Экономия 50% vs СТАРТ'
      ],
      popular: false,
      range: '51-150 карточек'
    },
    {
      name: 'ENTERPRISE',
      price: '400₽',
      period: '/карточка',
      description: '150+ карточек',
      features: [
        'Все возможности платформы',
        'White-label решение',
        'Dedicated support 24/7',
        'Индивидуальные интеграции',
        'Обучение команды',
        'Экономия 60% vs СТАРТ'
      ],
      popular: false,
      range: '150+ карточек'
    }
  ]

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 px-4">
            Pay as you go — платите только за активные карточки
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-center text-slate-600 mb-8 sm:mb-12 px-4">
            Контролируйте только те карточки, которые продвигаете рекламой • 14 дней бесплатного trial
          </p>

          {/* Pricing Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 }}
              >
                <Card className={`p-4 sm:p-5 md:p-6 h-full flex flex-col ${plan.popular ? 'border-2 border-blue-600 shadow-lg sm:scale-105' : ''}`}>
                  {plan.badge && (
                    <div className="text-center mb-2">
                      <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-4 sm:mb-5 md:mb-6">
                    <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">{plan.name}</h3>
                    <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
                      {plan.price}
                      <span className="text-xs sm:text-sm font-normal text-slate-600">{plan.period}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600">{plan.description}</p>
                  </div>

                  <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 md:mb-6 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm">
                        <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full text-sm sm:text-base ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-blue-700' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setIsFormOpen(true)}
                  >
                    {plan.name === 'ENTERPRISE' ? 'Связаться' : 'Попробовать'}
                  </Button>

                  {plan.popular && (
                    <p className="text-center text-[10px] sm:text-xs text-slate-600 mt-2">ВЫБОР 68% ПОЛЬЗОВАТЕЛЕЙ</p>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Guarantees */}
          <div className="mt-8 text-center space-y-2">
            <p className="text-sm text-slate-600">✓ 14 дней бесплатно — без привязки карты</p>
            <p className="text-sm text-slate-600">✓ Отмена в любой момент — никаких договоров</p>
            <p className="text-sm text-slate-600">✓ Возврат денег если не сэкономите — гарантия результата</p>
          </div>
        </motion.div>
      </div>

      <SignupForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  )
}

export default PricingSection