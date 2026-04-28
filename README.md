# ⬡ CODE RUNNER

A cyberpunk endless runner where you play as **NEXUS** — a rogue AI escaping through an infinite code editor while the Zed compiler hunts you down.

Built with **Zed** + **ElevenLabs** for the [ElevenHacks Zed Hackathon](https://elevenlabs.io/hackathon).

## 🎮 Play

**[Live Demo →](https://code-runner-game.vercel.app)**

Or run locally:

```bash
cp .env.example .env        # add your ElevenLabs API key
npm install
npm start                    # http://localhost:3001
```

## Controls

| Input | Action |
|-------|--------|
| ↑ / W | Move lane up |
| ↓ / S | Move lane down / Slide |
| Space | Jump / Double jump |
| Swipe ↑↓ | Move lane (mobile) |
| Tap | Jump (mobile) |

## ElevenLabs Integration

All audio is AI-generated in real-time via ElevenLabs APIs:

- **Voice Narration** — TTS narrator reacts to game events (pickups, deaths, level-ups) with a priority queue system
- **Sound Effects** — procedurally generated SFX (jump whoosh, crash glitch, pickup chime, level-up sting)
- **Dynamic Music** — two AI-composed tracks that crossfade based on game intensity (ambient for early levels, aggressive for later)

## Tech Stack

- Single-file HTML5 Canvas game (no framework, no build step)
- Node.js/Express backend as ElevenLabs API proxy (keeps API key server-side)
- Deployed on Vercel (serverless functions + static hosting)

## Project Structure

```
public/index.html       — the game (HTML + CSS + JS, all-in-one)
api/tts/[voiceId].js    — ElevenLabs TTS proxy
api/sfx.js              — ElevenLabs Sound Effects proxy
api/music.js            — ElevenLabs Music Generation proxy
server.js               — local dev server (Express)
```

## License

MIT
