'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Loader2, Rocket } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const formSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z.string().regex(/^[+]?[0-9]{10,15}$/, 'Введите корректный номер телефона'),
  email: z.string().email('Введите корректный email').optional().or(z.literal('')),
  company: z.string().optional(),
  cardsCount: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

const FinalCTA = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      company: '',
      cardsCount: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success('Заявка отправлена!', {
          description: 'Мы свяжемся с вами в течение 30 минут',
        })
        form.reset()

        // Track conversion
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'conversion', {
            'send_to': 'AW-XXXXX/XXXXX',
            'value': 1,
            'currency': 'RUB'
          })
        }
      } else {
        throw new Error('Failed to submit')
      }
    } catch (error) {
      toast.error('Ошибка отправки', {
        description: 'Пожалуйста, попробуйте еще раз',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-2">
                Ваши конкуренты уже оптимизируют маржинальность
              </CardTitle>
              <p className="text-xl text-muted-foreground">
                Каждый день без контроля маржи = потерянная прибыль
              </p>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Name Field */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ваше имя *</FormLabel>
                          <FormControl>
                            <Input placeholder="Иван Иванов" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Phone Field */}
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Телефон *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+7 (999) 123-45-67"
                              type="tel"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ivan@company.ru"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Company Field */}
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Компания</FormLabel>
                          <FormControl>
                            <Input placeholder="ООО Рога и Копыта" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Cards Count Field */}
                    <FormField
                      control={form.control}
                      name="cardsCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Количество карточек</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="100"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Special Offer */}
                  <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                    <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                      🎉 Специальное предложение для первых 100 клиентов:
                    </p>
                    <p className="text-sm text-amber-800 dark:text-amber-300 mt-1">
                      Скидка 20% на первые 3 месяца + бесплатная настройка
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Rocket className="mr-2 h-4 w-4" />
                        Подключить AI-агента сейчас
                      </>
                    )}
                  </Button>

                  {/* Privacy Notice */}
                  <p className="text-xs text-center text-muted-foreground">
                    Нажимая кнопку, вы соглашаетесь с{' '}
                    <a href="/privacy" className="underline">
                      политикой конфиденциальности
                    </a>
                  </p>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Trust Elements */}
          <div className="mt-8 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              В среднем наши клиенты находят 25-40% убыточных фраз в первую неделю
            </p>
            <p className="font-medium">
              Сколько денег теряете вы?
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA