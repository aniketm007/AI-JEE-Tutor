// api/ask.js — Vercel Serverless Function
// Replaces proxy.js for production deployment
// Anthropic API key is set as environment variable in Vercel dashboard
// Never exposed to the browser

export default async function handler(req, res) {
  // CORS — allow requests from same origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error: 'ANTHROPIC_API_KEY not set. Add it in Vercel → Project Settings → Environment Variables.'
    });
    return;
  }

  try {
    const body = req.body;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':   'application/json',
        'x-api-key':      apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model:      body.model      || 'claude-sonnet-4-5',
        max_tokens: body.max_tokens || 600,
        system:     body.system     || '',
        messages:   body.messages   || [],
      }),
    });

    const data = await response.json();
    res.status(response.status).json(data);

  } catch (err) {
    res.status(502).json({ error: err.message });
  }
}
