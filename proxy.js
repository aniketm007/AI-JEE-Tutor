const http = require('http');
const https = require('https');

const PORT = 3001;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';

const server = http.createServer((req, res) => {
  // CORS headers — allow the HTML file to call this proxy
  // Allow all origins including file:// protocol
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
  if (req.method !== 'POST' || req.url !== '/ask') {
    res.writeHead(404); res.end('Not found'); return;
  }

  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    let parsed;
    try { parsed = JSON.parse(body); } catch(e) {
      res.writeHead(400); res.end('Bad JSON'); return;
    }

    const apiKey = ANTHROPIC_API_KEY;
    if (!apiKey) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'ANTHROPIC_API_KEY not set. Run: ANTHROPIC_API_KEY=your-key node proxy.js' }));
      return;
    }

    const payload = JSON.stringify({
      model: parsed.model || 'claude-sonnet-4-5',
      max_tokens: parsed.max_tokens || 600,
      system: parsed.system || '',
      messages: parsed.messages || []
    });

    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const apiReq = https.request(options, apiRes => {
      let data = '';
      apiRes.on('data', chunk => data += chunk);
      apiRes.on('end', () => {
        res.writeHead(apiRes.statusCode, { 'Content-Type': 'application/json' });
        res.end(data);
      });
    });

    apiReq.on('error', err => {
      res.writeHead(502);
      res.end(JSON.stringify({ error: err.message }));
    });

    apiReq.write(payload);
    apiReq.end();
  });
});

server.listen(PORT, () => {
  console.log(`\n✓ JEE Tutor AI Proxy running on http://localhost:${PORT}`);
  console.log(`  Open sets-tutor-v3.html in your browser\n`);
});
