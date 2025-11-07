'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const Hero = () => {
  const badges = [
    'Контроль маржи по каждой фразе',
    'Настройка за 15 минут',
    'Оплата только за активные карточки',
    'От 400₽ за карточку/мес'
  ]

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="particles-container" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Контролируйте маржинальность каждой рекламной фразы
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            AI-агент, который покажет реальную прибыль с каждой карточки
            и увеличит маржу на 30%
          </p>

          {/* Target Audience */}
          <p className="text-lg text-muted-foreground mb-8">
            Для селлеров с 50+ карточками на Wildberries.
            Видите не просто ДРР, а реальную прибыль с учетом себестоимости.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {badges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  {badge}
                </Badge>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              size="lg"
              className="text-lg px-8 py-6 group"
              onClick={() => {
                const element = document.getElementById('calculator')
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Рассчитать стоимость для моих карточек
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              14 дней бесплатного тестирования
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero