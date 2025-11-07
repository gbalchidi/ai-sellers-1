'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator as CalcIcon, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'

interface CalculatorData {
  cardsCount: number
  adBudget: number
  currentMargin: number
}

const Calculator = () => {
  const [data, setData] = useState<CalculatorData>({
    cardsCount: 100,
    adBudget: 200000,
    currentMargin: 15
  })

  const [results, setResults] = useState({
    potentialSavings: 0,
    roiPercentage: 0,
    paybackMonths: 0,
    monthlyProfit: 0
  })

  const calculateROI = () => {
    const inefficientSpend = data.adBudget * 0.3 // 30% неэффективных трат
    const marginImprovement = 7 // средний рост маржи в п.п.
    const monthlyRevenue = data.adBudget * 4 // примерная выручка
    const additionalProfit = (monthlyRevenue * marginImprovement) / 100

    const cost = data.cardsCount * 500 // средняя цена за карточку
    const totalBenefit = inefficientSpend + additionalProfit
    const roi = ((totalBenefit - cost) / cost) * 100
    const payback = cost / totalBenefit

    setResults({
      potentialSavings: inefficientSpend,
      roiPercentage: roi,
      paybackMonths: payback,
      monthlyProfit: totalBenefit
    })
  }

  return (
    <section id="calculator" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Посчитайте свою выгоду за 30 секунд
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Узнайте, сколько дополнительной прибыли принесет AI-агент вашему бизнесу
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalcIcon className="w-5 h-5" />
                  Ваши параметры
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Cards Count */}
                <div className="space-y-2">
                  <Label>Количество карточек</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[data.cardsCount]}
                      onValueChange={(value) => setData({ ...data, cardsCount: value[0] })}
                      min={10}
                      max={500}
                      step={10}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={data.cardsCount}
                      onChange={(e) => setData({ ...data, cardsCount: parseInt(e.target.value) || 0 })}
                      className="w-20"
                    />
                  </div>
                </div>

                {/* Ad Budget */}
                <div className="space-y-2">
                  <Label>Рекламный бюджет (₽/мес)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[data.adBudget]}
                      onValueChange={(value) => setData({ ...data, adBudget: value[0] })}
                      min={30000}
                      max={1000000}
                      step={10000}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={data.adBudget}
                      onChange={(e) => setData({ ...data, adBudget: parseInt(e.target.value) || 0 })}
                      className="w-32"
                    />
                  </div>
                </div>

                {/* Current Margin */}
                <div className="space-y-2">
                  <Label>Текущая маржа (%)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[data.currentMargin]}
                      onValueChange={(value) => setData({ ...data, currentMargin: value[0] })}
                      min={5}
                      max={40}
                      step={1}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={data.currentMargin}
                      onChange={(e) => setData({ ...data, currentMargin: parseInt(e.target.value) || 0 })}
                      className="w-20"
                    />
                  </div>
                </div>

                <Button
                  onClick={calculateROI}
                  className="w-full"
                  size="lg"
                >
                  Рассчитать выгоду
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Ваша потенциальная выгода
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results.monthlyProfit > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {/* Monthly Savings */}
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">
                        Экономия на рекламе
                      </p>
                      <p className="text-3xl font-bold text-primary">
                        <CountUp
                          end={results.potentialSavings}
                          duration={1}
                          separator=" "
                          suffix=" ₽"
                        />
                      </p>
                      <p className="text-sm text-muted-foreground">в месяц</p>
                    </div>

                    {/* Additional Profit */}
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">
                        Дополнительная прибыль
                      </p>
                      <p className="text-3xl font-bold text-secondary">
                        <CountUp
                          end={results.monthlyProfit}
                          duration={1}
                          separator=" "
                          suffix=" ₽"
                        />
                      </p>
                      <p className="text-sm text-muted-foreground">в месяц</p>
                    </div>

                    {/* ROI */}
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">
                        ROI инвестиции
                      </p>
                      <p className="text-3xl font-bold text-green-600">
                        <CountUp
                          end={results.roiPercentage}
                          duration={1}
                          suffix="%"
                        />
                      </p>
                      <p className="text-sm text-muted-foreground">
                        окупаемость за {Math.ceil(results.paybackMonths)} мес
                      </p>
                    </div>

                    {/* Investment Cost */}
                    <div className="p-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Инвестиция:</span>
                        <span className="font-bold">
                          {(data.cardsCount * 500).toLocaleString('ru-RU')} ₽/мес
                        </span>
                      </div>
                    </div>

                    <Button className="w-full" size="lg" variant="default">
                      Получить персональное предложение
                    </Button>
                  </motion.div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <CalcIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Введите параметры и нажмите "Рассчитать выгоду"</p>
                    <p className="text-sm mt-2">чтобы увидеть потенциальную экономию</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Calculator