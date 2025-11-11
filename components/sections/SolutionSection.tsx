'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Target, Link, Zap } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { SignupForm } from '@/components/SignupForm'

const SolutionSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true })
  const [isFormOpen, setIsFormOpen] = useState(false)

  const features = [
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: '🎯 Учет % выкупа',
      description: 'Единственный инструмент, который показывает влияние % выкупа на маржинальность. Видите реальную прибыль, а не иллюзию из ДРР.'
    },
    {
      icon: <Link className="h-8 w-8 text-blue-600" />,
      title: '🔗 Кластеры фраз',
      description: 'Показываем связку ключевых слов в кластере. Если отключаете одну фразу — видите последствия для всех связанных.'
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: '⚡ Авто-расчет',
      description: 'Автоматически обновляем данные каждые 6 часов. Вам не нужно ничего делать. Просто смотрите результат и принимайте решения.'
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Мы показываем РЕАЛЬНУЮ маржинальность
            <br />
            каждой рекламной фразы
          </h2>
          <p className="text-xl text-center text-slate-600 mb-12">
            Не поверхностные метрики, а прибыль в рублях
            <br />
            с учетом полной юнит-экономики
          </p>

          {/* 3 Key Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Product Screenshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-lg shadow-2xl p-6 max-w-5xl mx-auto"
          >
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Фраза</th>
                      <th className="text-center p-2">Заказы</th>
                      <th className="text-center p-2">% выкупа</th>
                      <th className="text-center p-2">ДРР</th>
                      <th className="text-center p-2">Маржа, ₽</th>
                      <th className="text-center p-2">Маржа, %</th>
                      <th className="text-center p-2">Действие</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-red-50">
                      <td className="p-2">платье летнее</td>
                      <td className="text-center p-2">156</td>
                      <td className="text-center p-2 text-red-600 font-bold">42%</td>
                      <td className="text-center p-2 text-green-600">15%</td>
                      <td className="text-center p-2 text-red-600 font-bold">-2,340₽</td>
                      <td className="text-center p-2 text-red-600 font-bold">-8%</td>
                      <td className="text-center p-2">
                        <button className="bg-red-600 text-white px-3 py-1 rounded text-xs">
                          Отключить
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b bg-red-50">
                      <td className="p-2">сарафан женский</td>
                      <td className="text-center p-2">89</td>
                      <td className="text-center p-2 text-red-600 font-bold">38%</td>
                      <td className="text-center p-2 text-green-600">18%</td>
                      <td className="text-center p-2 text-red-600 font-bold">-1,567₽</td>
                      <td className="text-center p-2 text-red-600 font-bold">-5%</td>
                      <td className="text-center p-2">
                        <button className="bg-red-600 text-white px-3 py-1 rounded text-xs">
                          Отключить
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b bg-green-50">
                      <td className="p-2">платье хлопковое</td>
                      <td className="text-center p-2">234</td>
                      <td className="text-center p-2 text-green-600 font-bold">85%</td>
                      <td className="text-center p-2 text-yellow-600">25%</td>
                      <td className="text-center p-2 text-green-600 font-bold">+8,760₽</td>
                      <td className="text-center p-2 text-green-600 font-bold">+22%</td>
                      <td className="text-center p-2">
                        <button className="bg-green-600 text-white px-3 py-1 rounded text-xs">
                          Оставить
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b bg-green-50">
                      <td className="p-2">блузка офисная</td>
                      <td className="text-center p-2">178</td>
                      <td className="text-center p-2 text-green-600 font-bold">78%</td>
                      <td className="text-center p-2 text-yellow-600">22%</td>
                      <td className="text-center p-2 text-green-600 font-bold">+5,340₽</td>
                      <td className="text-center p-2 text-green-600 font-bold">+18%</td>
                      <td className="text-center p-2">
                        <button className="bg-green-600 text-white px-3 py-1 rounded text-xs">
                          Оставить
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Annotations */}
              <div className="mt-6 grid md:grid-cols-3 gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  <span>Убыточные фразы выделены красным</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span>Прибыльные фразы выделены зеленым</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span>Кнопка действия для быстрого решения</span>
                </div>
              </div>
            </div>
          </motion.div>

          <p className="text-center mt-8 text-lg text-slate-600">
            Все данные на одном экране.
            <br />
            Сортируйте по маржинальности, чтобы видеть самые убыточные фразы первыми.
          </p>

          {/* CTA Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <Card className="p-8 max-w-2xl mx-auto bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">💰 Экономите бюджет!</h3>
                <p className="text-lg text-slate-700 mb-6">
                  В среднем селлеры отключают 30-40 убыточных фраз
                  <br />
                  и экономят 23,000₽ в первый же месяц
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.analytics) {
                      window.analytics.track("Solution CTA Clicked");
                    }
                    setIsFormOpen(true);
                  }}
                >
                  Начать бесплатно → 14 дней trial
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      <SignupForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  )
}

export default SolutionSection