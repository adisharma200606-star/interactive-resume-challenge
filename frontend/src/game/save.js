import axios from "axios";

// Optional backend. When REACT_APP_BACKEND_URL is unset (e.g. a static Vercel deploy),
// progress lives only in localStorage and no network calls are made.
const BACKEND = process.env.REACT_APP_BACKEND_URL;
const API = BACKEND ? `${BACKEND.replace(/\/$/, "")}/api` : null;

export function uuid() {
  if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
  return "p-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export async function loadProgress(playerId) {
  if (!API) return null;
  try {
    const r = await axios.get(`${API}/progress/${playerId}`, { timeout: 4000 });
    return r.data || null;
  } catch (e) {
    return null;
  }
}

export async function saveProgressRemote(playerId, p) {
  if (!API) return;
  try {
    await axios.post(
      `${API}/progress`,
      {
        player_id: playerId,
        stage: p.stage || "map",
        starter: p.starter || null,
        completed: p.completed || [],
        badges: p.badges || [],
        dex: p.dex || [],
        lessons: p.lessons || [],
        interests: p.interests || [],
        champion: !!p.champion,
      },
      { timeout: 4000 }
    );
  } catch (e) {
    // game keeps working offline; localStorage is the fallback
  }
}
