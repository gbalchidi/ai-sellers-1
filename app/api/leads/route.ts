import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const leadSchema = z.object({
  name: z.string().min(2),
  phone: z.string(),
  email: z.string().email().optional(),
  company: z.string().optional(),
  cardsCount: z.string().optional(),
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

    // В продакшене здесь будет отправка в CRM и Telegram
    // Сейчас просто логируем
    console.log('New lead received:', leadData)

    // Здесь можно добавить отправку в CRM (AmoCRM, Bitrix24)
    // const amoResponse = await fetch('https://your-domain.amocrm.ru/api/v4/leads', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.AMOCRM_TOKEN}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({...})
    // })

    // Здесь можно добавить отправку в Telegram
    // const telegramMessage = `Новая заявка с лендинга!...`
    // await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     chat_id: process.env.TELEGRAM_CHAT_ID,
    //     text: telegramMessage,
    //     parse_mode: 'HTML',
    //   }),
    // })

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