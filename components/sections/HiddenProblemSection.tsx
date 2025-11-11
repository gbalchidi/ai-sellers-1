'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { TrendingDown } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { SignupForm } from '@/components/SignupForm'

const HiddenProblemSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true })
  const [isFormOpen, setIsFormOpen] = useState(false)

  const [price, setPrice] = useState(1500)
  const [cost, setCost] = useState(600)
  const [commission, setCommission] = useState(25)
  const [orders, setOrders] = useState(20)
  const [adSpend, setAdSpend] = useState(1200)
  const [buyoutRate, setBuyoutRate] = useState(50)

  // Расчет маржинальности
  const realOrders = Math.round(orders * (buyoutRate / 100))
  const revenue = realOrders * price
  const totalCost = orders * cost
  const commissionAmount = revenue * (commission / 100)
  const logistics = orders * 80 // Simplified
  const marginRub = revenue - totalCost - commissionAmount - logistics - adSpend
  const marginPercent = revenue > 0 ? (marginRub / revenue) * 100 : 0
  const drr = revenue > 0 ? (adSpend / revenue) * 100 : 0

  return (
    <section ref={ref} className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Главная проблема, которую игнорируют
            <br />
            ВСЕ инструменты аналитики
          </h2>
          <p className="text-xl text-center text-slate-600 mb-12">
            Процент выкупа — критический фактор, который "ломает" всю экономику рекламы.
            <br />
            И ни один сервис (MPStats, Moneyplace, MarketGuru) его не учитывает.
          </p>

          {/* Interactive Calculator */}
          <Card className="p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">
              Посчитайте свои РЕАЛЬНЫЕ потери:
            </h3>

            <div className="space-y-6">
              {/* Inputs */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Цена товара (₽)</Label>
                  <Input
                    type="number"
                    value={price || ''}
                    onChange={(e) => setPrice(e.target.value === '' ? 0 : Number(e.target.value))}
                    onFocus={(e) => e.target.select()}
                  />
                </div>
                <div>
                  <Label>Себестоимость (₽)</Label>
                  <Input
                    type="number"
                    value={cost || ''}
                    onChange={(e) => setCost(e.target.value === '' ? 0 : Number(e.target.value))}
                    onFocus={(e) => e.target.select()}
                  />
                </div>
                <div>
                  <Label>Комиссия WB (%)</Label>
                  <Input
                    type="number"
                    value={commission || ''}
                    onChange={(e) => setCommission(e.target.value === '' ? 0 : Number(e.target.value))}
                    onFocus={(e) => e.target.select()}
                  />
                </div>
                <div>
                  <Label>Заказов через фразу</Label>
                  <Input
                    type="number"
                    value={orders || ''}
                    onChange={(e) => setOrders(e.target.value === '' ? 0 : Number(e.target.value))}
                    onFocus={(e) => e.target.select()}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Расход на рекламу (₽)</Label>
                  <Input
                    type="number"
                    value={adSpend || ''}
                    onChange={(e) => setAdSpend(e.target.value === '' ? 0 : Number(e.target.value))}
                    onFocus={(e) => e.target.select()}
                  />
                </div>
              </div>

              {/* Buyout Rate Slider */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-lg font-semibold">
                    % выкупа: <span className="text-red-600">{buyoutRate}%</span>
                  </Label>
                  <span className="text-sm text-slate-500">
                    {realOrders} из {orders} выкупается
                  </span>
                </div>
                <Slider
                  value={[buyoutRate]}
                  onValueChange={([value]) => setBuyoutRate(value)}
                  min={20}
                  max={90}
                  step={5}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>20%</span>
                  <span>90%</span>
                </div>
              </div>

              {/* Results */}
              <div className="bg-slate-50 p-6 rounded-lg space-y-3 border-2 border-slate-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Кажется (ДРР):</span>
                  <span className={`text-lg font-bold ${drr < 20 ? "text-green-600" : "text-yellow-600"}`}>
                    {drr.toFixed(1)}% {drr < 20 ? "✓" : "⚠️"}
                  </span>
                </div>

                <div className="h-px bg-slate-300"></div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Реально (Маржа):</span>
                  <span className={`text-xl font-bold ${marginPercent > 0 ? "text-green-600" : "text-red-600"}`}>
                    {marginPercent.toFixed(1)}% {marginPercent > 0 ? "✓" : "🔴"}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.analytics) {
                    window.analytics.track("Calculator CTA Clicked", {
                      buyout_rate: buyoutRate,
                      margin: marginPercent
                    });
                  }
                  setIsFormOpen(true);
                }}
              >
                Найти все убыточные фразы →
              </Button>
            </div>
          </Card>

          {/* Example Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
            <Card className="p-6 border-2 border-red-200">
              <h4 className="font-semibold text-lg mb-4">Фраза: "платье летнее"</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">ДРР:</span>
                  <span className="font-bold text-green-600">15% ✓</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">% выкупа:</span>
                  <span className="font-bold text-red-600">40% 🔴</span>
                </div>
                <div className="h-px bg-slate-300 my-2"></div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Реальная маржа:</span>
                  <span className="font-bold text-red-600">-8% (УБЫТОК!)</span>
                </div>
                <div className="mt-4 p-3 bg-red-50 rounded text-center">
                  <span className="text-red-700 font-semibold">❌ ОТКЛЮЧИТЬ</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-green-200">
              <h4 className="font-semibold text-lg mb-4">Фраза: "платье хлопковое"</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">ДРР:</span>
                  <span className="font-bold text-yellow-600">25% ✗</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">% выкупа:</span>
                  <span className="font-bold text-green-600">85% ✓</span>
                </div>
                <div className="h-px bg-slate-300 my-2"></div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Реальная маржа:</span>
                  <span className="font-bold text-green-600">+22% (ПРИБЫЛЬ!)</span>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded text-center">
                  <span className="text-green-700 font-semibold">✅ ОСТАВИТЬ</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg text-slate-600">
              💡 Без учета % выкупа вы бы оставили убыточную фразу
              <br />
              и отключили бы прибыльную!
            </p>
          </div>
        </motion.div>
      </div>

      <SignupForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  )
}

export default HiddenProblemSection