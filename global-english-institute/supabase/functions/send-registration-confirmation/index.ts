import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

interface RegistrationConfirmationPayload {
  email: string;
  full_name: string;
  level: string;
  preferred_schedule: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    const payload: RegistrationConfirmationPayload = await req.json();

    const scheduleLabels: Record<string, string> = {
      weekday_morning: 'Weekday mornings (9am–12pm)',
      weekday_afternoon: 'Weekday afternoons (1pm–5pm)',
      weekday_evening: 'Weekday evenings (6pm–9pm)',
      weekend: 'Weekends',
      flexible: 'Flexible / Self-paced',
    };

    const scheduleLabel = scheduleLabels[payload.preferred_schedule] || payload.preferred_schedule || 'Not specified';

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Inter', system-ui, sans-serif; background: #f9fafb; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; }
    .header { background: #2563eb; padding: 32px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 20px; font-weight: 600; }
    .header p { color: #bfdbfe; margin: 8px 0 0; font-size: 14px; }
    .body { padding: 32px; }
    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; }
    .detail-label { color: #6b7280; }
    .detail-value { font-weight: 500; color: #111827; }
    .info-box { background: #eff6ff; border-radius: 8px; padding: 16px; margin: 20px 0; }
    .footer { padding: 20px 32px; border-top: 1px solid #f3f4f6; text-align: center; }
    .footer p { font-size: 12px; color: #9ca3af; margin: 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Global English Institute</h1>
      <p>Registration Confirmation</p>
    </div>
    <div class="body">
      <p style="font-size: 14px; color: #374151;">Dear ${payload.full_name},</p>
      <p style="font-size: 14px; color: #6b7280;">Thank you for registering with Global English Institute. We have received your registration request and will be in touch shortly.</p>

      <h3 style="font-size: 13px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 24px;">Registration Summary</h3>
      <div class="detail-row"><span class="detail-label">Name</span><span class="detail-value">${payload.full_name}</span></div>
      <div class="detail-row"><span class="detail-label">Email</span><span class="detail-value">${payload.email}</span></div>
      <div class="detail-row"><span class="detail-label">English Level</span><span class="detail-value">${payload.level || 'To be assessed'}</span></div>
      <div class="detail-row" style="border-bottom: none;"><span class="detail-label">Preferred Schedule</span><span class="detail-value">${scheduleLabel}</span></div>

      <div class="info-box">
        <p style="font-size: 13px; font-weight: 600; color: #1d4ed8; margin: 0 0 8px;">What happens next?</p>
        <p style="font-size: 13px; color: #3b82f6; margin: 0;">A member of our team will contact you within 1–2 business days to discuss your program options, confirm your schedule, and guide you through the enrollment process.</p>
      </div>

      <p style="font-size: 13px; color: #9ca3af;">If you have not already taken our placement test, we recommend doing so to ensure we place you in the right program.</p>
    </div>
    <div class="footer">
      <p>Global English Institute &bull; Professional Online English Language Training</p>
      <p style="margin-top: 4px;">Questions? Contact us at info@globalenglishinstitute.com</p>
    </div>
  </div>
</body>
</html>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Global English Institute <noreply@globalenglishinstitute.com>',
        to: [payload.email],
        subject: 'Registration Received — Global English Institute',
        html: htmlContent,
      }),
    });

    if (!response.ok) {
      throw new Error(`Resend API error: ${response.status}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
