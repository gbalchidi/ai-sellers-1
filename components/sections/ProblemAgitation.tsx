'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { XCircle, AlertTriangle } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const ProblemAgitation = () => {
  const { ref, inView } = useInView({ triggerOnce: true })

  const problems = [
    {
      title: 'Тратите 100-300 тысяч на рекламу',
      description: 'но не знаете реальную прибыль по каждой фразе?'
    },
    {
      title: 'ДРР показывает 25%',
      description: 'но с учетом себестоимости работаете в минус?'
    },
    {
      title: 'Не знаете, какие фразы приносят прибыль',
      description: 'а какие — только клики?'
    },
    {
      title: 'Аналитик тратит 20+ часов в неделю',
      description: 'на Excel, но решения все равно принимаете вслепую?'
    },
    {
      title: 'MPStats и другие сервисы',
      description: 'показывают кучу метрик, но не считают маржинальность?'
    }
  ]

  return (
    <section ref={ref} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            Управляете 50+ карточками? Знакомые проблемы:
          </h2>

          <div className="space-y-4 mb-8">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 border-destructive/20 hover:border-destructive/40 transition-colors">
                  <div className="flex items-start gap-4">
                    <XCircle className="w-6 h-6 text-destructive mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-lg">{problem.title}</strong>
                      <span className="text-muted-foreground ml-2">
                        {problem.description}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Price of Problem */}
          <Alert className="border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <AlertDescription className="text-lg">
              <strong>Цена проблемы:</strong> При выручке 1 млн руб/мес и 50 карточках
              потеря даже 5% маржи = <span className="text-destructive font-bold">
                минус 600,000₽ в год</span>. А если карточек 200+?
            </AlertDescription>
          </Alert>
        </motion.div>
      </div>
    </section>
  )
}

export default ProblemAgitation