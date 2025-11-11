'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Loader2, X } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const formSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Введите корректный email'),
  phone: z.string().optional(),
  skuCount: z.string().min(1, 'Выберите количество SKU'),
  categories: z.string().optional(),
  revenue: z.string().optional(),
  storeName: z.string().optional(),
  problems: z.array(z.string()).optional(),
})

type FormData = z.infer<typeof formSchema>

interface SignupFormProps {
  isOpen: boolean
  onClose: () => void
}

export function SignupForm({ isOpen, onClose }: SignupFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedProblems, setSelectedProblems] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      problems: [],
    }
  })

  const toggleProblem = (problem: string) => {
    const newProblems = selectedProblems.includes(problem)
      ? selectedProblems.filter(p => p !== problem)
      : [...selectedProblems, problem]
    setSelectedProblems(newProblems)
    setValue('problems', newProblems)
  }

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
        reset()
        onClose()

        // Track conversion in Yandex Metrika
        if (typeof window !== 'undefined' && (window as any).ym) {
          (window as any).ym(105251037, 'reachGoal', 'form_submit')
        }

        // Track conversion in Analytics
        if (typeof window !== 'undefined' && window.analytics) {
          window.analytics.track('Lead Submitted', {
            sku_count: data.skuCount,
            revenue: data.revenue,
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

  const categories = [
    'Одежда и обувь',
    'Электроника',
    'Товары для дома',
    'Красота и здоровье',
    'Детские товары',
    'Спорт и отдых',
    'Продукты питания',
    'Другое',
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl pr-8">Начните экономить на рекламе уже сегодня</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
          {/* Contact Info */}
          <div className="space-y-3 sm:space-y-5">
            <h3 className="font-semibold text-base sm:text-lg">Контактная информация</h3>

            <div className="space-y-2">
              <Label htmlFor="name">Ваше имя *</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Иван Иванов"
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="ivan@company.ru"
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  placeholder="+7 (999) 123-45-67"
                />
                {errors.phone && (
                  <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Business Info */}
          <div className="space-y-3 sm:space-y-5">
            <h3 className="font-semibold text-base sm:text-lg">О вашем бизнесе</h3>

            <div className="space-y-2">
              <Label htmlFor="storeName">Название магазина</Label>
              <Input
                id="storeName"
                {...register('storeName')}
                placeholder="Мой магазин на WB"
              />
              {errors.storeName && (
                <p className="text-sm text-red-600 mt-1">{errors.storeName.message}</p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label htmlFor="skuCount">Сколько у вас SKU? *</Label>
                <Select onValueChange={(value) => setValue('skuCount', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите диапазон" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-50">1-50 SKU</SelectItem>
                    <SelectItem value="51-150">51-150 SKU</SelectItem>
                    <SelectItem value="151-500">151-500 SKU</SelectItem>
                    <SelectItem value="500+">500+ SKU</SelectItem>
                  </SelectContent>
                </Select>
                {errors.skuCount && (
                  <p className="text-sm text-red-600 mt-1">{errors.skuCount.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="revenue">Размер выручки в год?</Label>
                <Select onValueChange={(value) => setValue('revenue', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите диапазон" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-5m">До 5 млн ₽</SelectItem>
                    <SelectItem value="5-20m">5-20 млн ₽</SelectItem>
                    <SelectItem value="20-50m">20-50 млн ₽</SelectItem>
                    <SelectItem value="50-100m">50-100 млн ₽</SelectItem>
                    <SelectItem value="100m+">Более 100 млн ₽</SelectItem>
                  </SelectContent>
                </Select>
                {errors.revenue && (
                  <p className="text-sm text-red-600 mt-1">{errors.revenue.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="categories">Категория товаров</Label>
              <Input
                id="categories"
                {...register('categories')}
                placeholder="Например: Одежда, Электроника"
              />
              <p className="text-xs text-slate-500 mt-1">
                Можно указать несколько через запятую
              </p>
              {errors.categories && (
                <p className="text-sm text-red-600 mt-1">{errors.categories.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label>Какие основные проблемы вы сейчас испытываете?</Label>
              <div className="space-y-3">
                {[
                  'Необходимо повышать маржинальность',
                  'Расходы на рекламу слишком высокие',
                  'Хочу масштабировать бизнес, но не готов(-а) масштабировать команду'
                ].map((problem) => (
                  <label
                    key={problem}
                    className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedProblems.includes(problem)}
                      onChange={() => toggleProblem(problem)}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">{problem}</span>
                  </label>
                ))}
              </div>
              {errors.problems && (
                <p className="text-sm text-red-600 mt-1">{errors.problems.message}</p>
              )}
            </div>
          </div>

          {/* Trial Info */}
          <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
            <p className="text-xs sm:text-sm font-medium text-green-900">
              ✓ 14 дней бесплатного тестирования
            </p>
            <p className="text-xs sm:text-sm text-green-800 mt-1">
              Без привязки карты • Отмена в любой момент
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full text-sm sm:text-base"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Отправка...
              </>
            ) : (
              <>Начать экономить бесплатно</>
            )}
          </Button>

          <p className="text-xs text-center text-slate-600">
            Нажимая кнопку, вы соглашаетесь с{' '}
            <a href="/privacy" className="underline">
              политикой конфиденциальности
            </a>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
