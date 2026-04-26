'use strict';
require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

// Serve the game HTML as a static file
app.use(express.static(path.join(__dirname)));

const API_KEY = process.env.ELEVENLABS_API_KEY;

function missingKey(res) {
  return res.status(500).json({ error: 'ELEVENLABS_API_KEY not set in .env' });
}

// ── Proxy: Text-to-Speech ─────────────────────────────────────────
app.post('/api/tts/:voiceId', async (req, res) => {
  if (!API_KEY) return missingKey(res);
  try {
    const upstream = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${req.params.voiceId}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      }
    );
    if (!upstream.ok) {
      const err = await upstream.json().catch(() => ({}));
      return res.status(upstream.status).json(err);
    }
    const arrayBuf = await upstream.arrayBuffer();
    res.set('Content-Type', 'audio/mpeg');
    res.send(Buffer.from(arrayBuf));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Proxy: Sound Effects Generation ──────────────────────────────
app.post('/api/sfx', async (req, res) => {
  if (!API_KEY) return missingKey(res);
  try {
    const upstream = await fetch(
      'https://api.elevenlabs.io/v1/sound-generation',
      {
        method: 'POST',
        headers: {
          'xi-api-key': API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      }
    );
    if (!upstream.ok) {
      const err = await upstream.json().catch(() => ({}));
      return res.status(upstream.status).json(err);
    }
    const arrayBuf = await upstream.arrayBuffer();
    res.set('Content-Type', 'audio/mpeg');
    res.send(Buffer.from(arrayBuf));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n🎮 CODE RUNNER running at http://localhost:${PORT}`);
  console.log(`   ElevenLabs key: ${API_KEY ? '✅ loaded from .env' : '❌ MISSING — add ELEVENLABS_API_KEY to .env'}\n`);
});
