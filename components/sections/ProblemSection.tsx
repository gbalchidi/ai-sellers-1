'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { XCircle, AlertTriangle, Clock } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const ProblemSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true })

  const problems = [
    {
      icon: 'XCircle',
      title: 'Неполная картина',
      subtitle: 'Вы видите только ДРР, CPC, CTR',
      content: [
        'Но эти метрики НЕ учитывают:',
        '• Реальный % выкупа (40-90%)',
        '• Комиссии WB (до 50%)',
        '• Логистику возвратов (128₽+)',
        '• Полную себестоимость',
        '',
        'Фраза может иметь ДРР 15% и быть УБЫТОЧНОЙ.'
      ]
    },
    {
      icon: 'AlertTriangle',
      title: '⚠️ Скрытые потери',
      subtitle: 'Вы платите за все заказы',
      content: [
        'Но получаете деньги только за выкупленные',
        '',
        'Например:',
        '10 заказов × 1,000₽ = ожидали 10,000₽',
        'НО % выкупа 50% → реально 5,000₽',
        '',
        'А расходы вы понесли за все 10 заказов:',
        '• Себестоимость 10 шт',
        '• Логистика 10 шт + 5 возвратов',
        '• Реклама  CPO за 10 заказов',
        '',
        'Результат: -1,140₽ гросс маржи'
      ]
    },
    {
      icon: 'Clock',
      title: 'Нет времени считать',
      subtitle: 'Представим, что у вас 200+ активных фраз',
      content: [
        'Чтобы рассчитать маржинальность вручную:',
        '• 5-10 минут на одну фразу',
        '• 2,000 минут на все = 33 часа',
        '',
        'И это нужно делать каждую неделю,',
        'потому что % выкупа и комиссии меняются.',
        '',
        'Как можно успевать это все?'
      ]
    }
  ]

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'XCircle': return <XCircle className="h-8 w-8 text-red-500" />
      case 'AlertTriangle': return <AlertTriangle className="h-8 w-8 text-amber-500" />
      case 'Clock': return <Clock className="h-8 w-8 text-blue-500" />
      default: return null
    }
  }

  return (
    <section ref={ref} className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 px-4">
            Почему селлеры теряют деньги
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>на рекламе с "хорошим" ДРР?
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-4 sm:p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="mb-3 sm:mb-4">{getIcon(problem.icon)}</div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{problem.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-semibold mb-3 sm:mb-4">{problem.subtitle}</p>
                  <div className="text-xs sm:text-sm text-slate-600 space-y-1">
                    {problem.content.map((line, i) => (
                      <p key={i} className={line.startsWith('•') ? 'ml-2' : line === '' ? 'h-2' : ''}>
                        {line}
                      </p>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-8 sm:mt-12 md:mt-16 text-center px-4"
          >
            <div className="bg-gradient-to-r from-red-50 to-amber-50 border-2 border-red-200 rounded-lg p-4 sm:p-6 md:p-8">
              <p className="text-sm sm:text-base md:text-lg text-slate-600 mb-2">В среднем селлеры теряют</p>
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-600 mb-2">🔥 23,000₽/месяц 🔥</p>
              <p className="text-sm sm:text-base md:text-lg text-slate-600">на убыточных рекламных фразах</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProblemSection