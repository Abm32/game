export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const API_KEY = process.env.ELEVENLABS_API_KEY;
  if (!API_KEY) return res.status(500).json({ error: "ELEVENLABS_API_KEY not set" });

  try {
    const upstream = await fetch("https://api.elevenlabs.io/v1/sound-generation", {
      method: "POST",
      headers: { "xi-api-key": API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    if (!upstream.ok) {
      const err = await upstream.json().catch(() => ({}));
      return res.status(upstream.status).json(err);
    }
    const buf = Buffer.from(await upstream.arrayBuffer());
    res.setHeader("Content-Type", "audio/mpeg");
    res.send(buf);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
