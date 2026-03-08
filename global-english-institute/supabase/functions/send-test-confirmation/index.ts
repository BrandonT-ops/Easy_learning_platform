import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

interface TestConfirmationPayload {
  email: string;
  full_name: string;
  reading_score: number;
  grammar_score: number;
  listening_score: number;
  total_score: number;
  cefr_level: string;
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
    const payload: TestConfirmationPayload = await req.json();

    const cefrDescriptions: Record<string, string> = {
      A1: 'Beginner — You can understand and use familiar everyday expressions.',
      A2: 'Elementary — You can communicate in simple and routine tasks.',
      B1: 'Intermediate — You can deal with most situations while travelling.',
      B2: 'Upper-Intermediate — You can interact with fluency with native speakers.',
      C1: 'Advanced — You can express ideas fluently and spontaneously.',
    };

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
    .cefr-badge { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px 24px; text-align: center; margin: 20px 0; }
    .cefr-level { font-size: 40px; font-weight: 800; color: #2563eb; }
    .cefr-desc { font-size: 13px; color: #6b7280; margin-top: 4px; }
    .score-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; }
    .score-label { color: #6b7280; }
    .score-value { font-weight: 600; color: #111827; }
    .next-steps { background: #f9fafb; border-radius: 8px; padding: 16px; margin-top: 24px; }
    .next-steps h3 { font-size: 14px; color: #111827; margin: 0 0 10px; }
    .next-steps li { font-size: 13px; color: #6b7280; margin-bottom: 6px; }
    .footer { padding: 20px 32px; border-top: 1px solid #f3f4f6; text-align: center; }
    .footer p { font-size: 12px; color: #9ca3af; margin: 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Talkr by Easy Learning</h1>
      <p>Placement Test Results</p>
    </div>
    <div class="body">
      <p style="font-size: 14px; color: #374151;">Dear ${payload.full_name},</p>
      <p style="font-size: 14px; color: #6b7280;">Thank you for completing the CEFR placement test. Here is a summary of your results.</p>

      <div class="cefr-badge">
        <div class="cefr-level">${payload.cefr_level}</div>
        <div class="cefr-desc">Estimated CEFR Level</div>
        <div style="font-size: 12px; color: #9ca3af; margin-top: 6px;">${cefrDescriptions[payload.cefr_level] || ''}</div>
      </div>

      <h3 style="font-size: 13px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Score Breakdown</h3>
      <div class="score-row"><span class="score-label">Reading</span><span class="score-value">${payload.reading_score} / 35</span></div>
      <div class="score-row"><span class="score-label">Grammar & Vocabulary</span><span class="score-value">${payload.grammar_score} / 40</span></div>
      <div class="score-row"><span class="score-label">Listening</span><span class="score-value">${payload.listening_score} / 25</span></div>
      <div class="score-row"><span class="score-label">Writing</span><span class="score-value">Pending review</span></div>
      <div class="score-row"><span class="score-label">Speaking</span><span class="score-value">Pending review</span></div>
      <div class="score-row" style="border-bottom: none; font-weight: 600;"><span>Total (Objective)</span><span style="color: #2563eb;">${payload.total_score} / 100</span></div>

      <div class="next-steps">
        <h3>Next Steps</h3>
        <ol>
          <li>Your writing and speaking responses will be reviewed by an instructor within 48 hours.</li>
          <li>You will receive a final, complete CEFR assessment via email.</li>
          <li>A member of our team will contact you to discuss the right program for your level and goals.</li>
        </ol>
      </div>
    </div>
    <div class="footer">
      <p>Talkr by Easy Learning &bull; Professional Online English Language Training</p>
      <p style="margin-top: 4px;">If you have questions, contact us at info@talkrbyeasylearning.com</p>
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
        from: 'Talkr by Easy Learning <noreply@talkrbyeasylearning.com>',
        to: [payload.email],
        subject: `Your Placement Test Results — Level ${payload.cefr_level}`,
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
