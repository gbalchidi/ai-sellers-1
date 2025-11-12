'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Star } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const SocialProofSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true })

  const testimonials = [
    {
      name: 'Мария Петрова',
      role: 'Селлер женской одежды, 150 SKU',
      avatar: 'MP',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces',
      quote: 'Я отключила 43 убыточные фразы и сэкономила 27,340₽ за месяц',
      story: 'Я всегда думала что ДРР 18% — это хорошо. Оказалось, что если посчитать все до конца, то половина моих ключевиков приносит убыток. Теперь я вижу реальную картину и могу работать запускать рекламу не вслепую.',
      before: {
        budget: '50,000₽/мес',
        drr: '18%',
        profit: '???'
      },
      after: {
        foundPhrases: '43 убыточные фразы',
        saved: '27,340₽/мес',
        drr: '12%',
        marginGrowth: '+34%'
      }
    },
    {
      name: 'Алексей Смирнов',
      role: 'Товары для дома и ремонта, 350 SKU',
      avatar: 'AS',
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=faces',
      quote: 'Обнаружил что 30% бюджета уходит на 2 фразы, которые не окупаются',
      story: 'Фразы "инструменты" и "дрель" давали много заказов (ДРР 14%), но процент выкупа был 35%. Оказывается, я терял 15,000₽ каждый месяц на этих двух фразах.',
      solution: 'Отключил эти 2 широкие фразы, переключился на узкие: "дрель аккумуляторная". Процент выкупа вырос до 78%.',
      results: {
        saved: '32,000₽ за 2 месяца',
        roi: '+127%',
        satisfaction: 'Понимаю, что клиенты довольны, потому что меньше возвратов)'
      }
    },
    {
      name: 'Елена Волкова',
      role: 'Рекламное агентство, 8 клиентов-селлеров',
      avatar: 'EV',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces',
      quote: 'Теперь могу доказать клиентам куда уходит их бюджет',
      challenge: 'Клиенты постоянно спрашивали: "Почему бюджет растет, а прибыль нет?" Я не могла объяснить без детальной аналитики по фразам.',
      howHelped: 'Подключила всех клиентов (на агнентский тариф). Теперь показываю маржинальность по каждой фразе. Клиенты видят прозрачную аналитику.',
      results: {
        clientSavings: '180,000₽ суммарно за квартал',
        newClients: '2 новых клиента по рекомендациям',
        rateIncrease: 'Моя ставка выросла на 40%'
      },
      recommendation: 'Это must-have для любого кто работает с рекламой на WB. Без учета полной воронки до выкупа вы работаете вслепую.'
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
            Селлеры экономят 20,000-50,000₽/месяц
          </h2>
          <p className="text-xl text-center text-slate-600 mb-12">
            Реальные результаты за первый месяц использования
          </p>

          {/* Testimonial Cards */}
          <div className="space-y-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    {testimonial.avatarUrl ? (
                      <div className="h-12 w-12 rounded-full overflow-hidden">
                        <img
                          src={testimonial.avatarUrl}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <Avatar className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-500">
                        <span className="text-white font-bold">{testimonial.avatar}</span>
                      </Avatar>
                    )}
                    <div>
                      <h4 className="font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-slate-600">{testimonial.role}</p>
                    </div>
                    <div className="ml-auto flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>

                  <blockquote className="text-xl font-semibold mb-4 text-slate-800">
                    "{testimonial.quote}"
                  </blockquote>

                  {index === 0 && (
                    <>
                      <p className="text-slate-600 mb-4">{testimonial.story}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-red-50 p-4 rounded">
                          <p className="font-semibold mb-2">До:</p>
                          <ul className="text-sm space-y-1">
                            <li>• Бюджет: {testimonial.before?.budget}</li>
                            <li>• ДРР: {testimonial.before?.drr}</li>
                            <li>• Прибыльность: {testimonial.before?.profit}</li>
                          </ul>
                        </div>
                        <div className="bg-green-50 p-4 rounded">
                          <p className="font-semibold mb-2">После (1 месяц):</p>
                          <ul className="text-sm space-y-1">
                            <li>• Нашла: {testimonial.after?.foundPhrases}</li>
                            <li>• Сэкономила: {testimonial.after?.saved}</li>
                            <li>• ДРР: {testimonial.after?.drr}</li>
                            <li>• Маржа: {testimonial.after?.marginGrowth}</li>
                          </ul>
                        </div>
                      </div>
                    </>
                  )}

                  {index === 1 && (
                    <>
                      <p className="text-slate-600 mb-4">{testimonial.story}</p>
                      <p className="text-slate-600 mb-4"><strong>Решение:</strong> {testimonial.solution}</p>
                      <div className="bg-green-50 p-4 rounded">
                        <p className="font-semibold mb-2">Результат за 2 месяца:</p>
                        <ul className="text-sm space-y-1">
                          <li>✓ Экономия: {testimonial.results?.saved}</li>
                          <li>✓ ROI рекламы: {testimonial.results?.roi}</li>
                          <li>✓ {testimonial.results?.satisfaction}</li>
                        </ul>
                      </div>
                    </>
                  )}

                  {index === 2 && (
                    <>
                      <p className="text-slate-600 mb-2"><strong>Вызов:</strong> {testimonial.challenge}</p>
                      <p className="text-slate-600 mb-4"><strong>Как помог сервис:</strong> {testimonial.howHelped}</p>
                      <div className="bg-green-50 p-4 rounded mb-4">
                        <p className="font-semibold mb-2">Результат:</p>
                        <ul className="text-sm space-y-1">
                          <li>✓ Сэкономила клиентам: {testimonial.results?.clientSavings}</li>
                          <li>✓ {testimonial.results?.newClients}</li>
                          <li>✓ {testimonial.results?.rateIncrease}</li>
                        </ul>
                      </div>
                      <p className="text-slate-700 italic">"{testimonial.recommendation}"</p>
                    </>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional Quick Reviews */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <Card className="p-4">
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm font-semibold">"Окупилось за 3 дня"</p>
              <p className="text-xs text-slate-600">— Дмитрий К., электроника</p>
            </Card>
            <Card className="p-4">
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm font-semibold">"Наконец-то понимаю куда уходят деньги"</p>
              <p className="text-xs text-slate-600">— Ирина М., косметика</p>
            </Card>
            <Card className="p-4">
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm font-semibold">"Простой как Excel, но в 100 раз быстрее"</p>
              <p className="text-xs text-slate-600">— Сергей Л., спорттовары</p>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SocialProofSection