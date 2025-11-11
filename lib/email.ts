import nodemailer from 'nodemailer'

interface LeadData {
  name: string
  email: string
  phone?: string
  skuCount: string
  categories?: string
  revenue?: string
  storeName?: string
  problems?: string[]
}

export async function sendLeadNotification(leadData: LeadData) {
  // Проверяем наличие необходимых переменных окружения
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('Gmail credentials not configured')
    return
  }

  // Создаем транспорт для отправки писем
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

  // Получатели из переменной окружения
  const recipients = process.env.NOTIFICATION_EMAILS || 'g.balchidi@redmadrobot.com,s.shmykova@redmadrobot.com'

  // Формируем HTML письма
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">🎉 Новая заявка с лендинга AI-агента</h2>

      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Контактная информация:</h3>
        <p><strong>Имя:</strong> ${leadData.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${leadData.email}">${leadData.email}</a></p>
        ${leadData.phone ? `<p><strong>Телефон:</strong> ${leadData.phone}</p>` : ''}
      </div>

      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Информация о бизнесе:</h3>
        ${leadData.storeName ? `<p><strong>Название магазина:</strong> ${leadData.storeName}</p>` : ''}
        <p><strong>Количество SKU:</strong> ${leadData.skuCount}</p>
        ${leadData.revenue ? `<p><strong>Размер выручки:</strong> ${leadData.revenue}</p>` : ''}
        ${leadData.categories ? `<p><strong>Категории товаров:</strong> ${leadData.categories}</p>` : ''}
      </div>

      ${leadData.problems && leadData.problems.length > 0 ? `
        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Проблемы клиента:</h3>
          <ul>
            ${leadData.problems.map(problem => `<li>${problem}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e2e8f0; color: #64748b; font-size: 12px;">
        <p>Это автоматическое уведомление с лендинга <a href="https://ai-agent-1.ai-minds.ru/">https://ai-agent-1.ai-minds.ru/</a></p>
        <p>Дата получения: ${new Date().toLocaleString('ru-RU')}</p>
      </div>
    </div>
  `

  // Формируем текстовую версию письма
  const textContent = `
Новая заявка с лендинга AI-агента

Контактная информация:
Имя: ${leadData.name}
Email: ${leadData.email}
${leadData.phone ? `Телефон: ${leadData.phone}` : ''}

Информация о бизнесе:
${leadData.storeName ? `Название магазина: ${leadData.storeName}` : ''}
Количество SKU: ${leadData.skuCount}
${leadData.revenue ? `Размер выручки: ${leadData.revenue}` : ''}
${leadData.categories ? `Категории товаров: ${leadData.categories}` : ''}

${leadData.problems && leadData.problems.length > 0 ? `
Проблемы клиента:
${leadData.problems.map(p => `- ${p}`).join('\n')}
` : ''}

Дата получения: ${new Date().toLocaleString('ru-RU')}
  `

  try {
    // Отправляем письмо
    await transporter.sendMail({
      from: `"AI-агент уведомления" <${process.env.GMAIL_USER}>`,
      to: recipients,
      subject: `🎯 Новая заявка: ai-agent-1`,
      text: textContent,
      html: htmlContent,
    })

    console.log('Email notification sent successfully')
  } catch (error) {
    console.error('Error sending email notification:', error)
    throw error
  }
}
