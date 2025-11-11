import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendLeadNotification } from '@/lib/email'

const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  skuCount: z.string().min(1),
  categories: z.string().optional(),
  revenue: z.string().optional(),
  storeName: z.string().optional(),
  problems: z.array(z.string()).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = leadSchema.parse(body)

    // Get UTM parameters from headers
    const referer = request.headers.get('referer') || ''
    const utmParams = new URLSearchParams(referer.split('?')[1] || '')

    const leadData = {
      ...validatedData,
      source: 'landing',
      utm_source: utmParams.get('utm_source') || 'direct',
      utm_medium: utmParams.get('utm_medium') || 'none',
      utm_campaign: utmParams.get('utm_campaign') || 'none',
      created_at: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 'unknown',
    }

    // Логируем
    console.log('New lead received:', leadData)

    // Отправляем email уведомление
    try {
      await sendLeadNotification({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        skuCount: validatedData.skuCount,
        categories: validatedData.categories,
        revenue: validatedData.revenue,
        storeName: validatedData.storeName,
        problems: validatedData.problems,
      })
    } catch (emailError) {
      // Логируем ошибку, но не падаем - заявка все равно сохранена
      console.error('Failed to send email notification:', emailError)
    }

    return NextResponse.json({
      success: true,
      message: 'Lead created successfully'
    })
  } catch (error) {
    console.error('Lead generation error:', error)
    return NextResponse.json(
      { error: 'Failed to process lead' },
      { status: 500 }
    )
  }
}