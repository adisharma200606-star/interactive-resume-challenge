// Chiptune engine — WebAudio square/triangle synth, no audio files.
import { useEffect, useState } from "react";

const NOTE_BASE = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

function freq(note) {
  const m = /^([A-G])(#|b)?(\d)$/.exec(note);
  if (!m) return 0;
  let v = NOTE_BASE[m[1]];
  if (m[2] === "#") v += 1;
  if (m[2] === "b") v -= 1;
  v += (parseInt(m[3], 10) + 1) * 12;
  return 440 * Math.pow(2, (v - 69) / 12);
}

// --- tracks: 16-step loops. lead: square, bass: triangle, drum: noise ---
const TRACKS = {
  title: {
    bpm: 118,
    lead: ["A4", null, "C5", null, "E5", null, "C5", null, "A4", null, "C5", null, "G4", null, "E4", null],
    bass: ["A2", null, null, null, "F2", null, null, null, "C3", null, null, null, "G2", null, null, null],
    drum: [1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 2],
  },
  map: {
    bpm: 96,
    lead: ["E4", null, "G4", null, "A4", null, "G4", null, "E4", null, "C4", null, "D4", null, "E4", null],
    bass: ["C3", null, null, null, "G2", null, null, null, "F2", null, null, null, "G2", null, null, null],
    drum: [1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0],
  },
  // "Duality"-energy: drop-D palm-muted chug, distorted power chords, double kick. Original riff.
  battle: {
    bpm: 168,
    heavy: true,
    steps: 32,
    gtr: ["D2", "D2", null, "D2", "D2", null, "F2", "D2", "D2", "D2", null, "D2", "G2", null, "F2", "C2",
          "D2", "D2", null, "D2", "D2", null, "F2", "D2", "A#1", null, "A#1", null, "C2", null, "C2", "C#2"],
    mute: [1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    lead: [null, null, null, null, null, null, null, null, null, null, null, null, "A4", null, "G4", "F4",
           null, null, null, null, null, null, null, null, "D5", null, "C5", null, "A4", null, "G4", "A4"],
    bass: ["D1", "D1", null, "D1", "D1", null, "F1", "D1", "D1", "D1", null, "D1", "G1", null, "F1", "C1",
           "D1", "D1", null, "D1", "D1", null, "F1", "D1", "A#0", null, "A#0", null, "C1", null, "C1", "C#1"],
    drum: [1, 1, 2, 1, 1, 1, 2, 3, 1, 1, 2, 1, 1, 3, 2, 2, 1, 1, 2, 1, 1, 1, 2, 3, 1, 3, 2, 3, 1, 2, 2, 2],
  },
  room: {
    bpm: 84,
    lead: ["E4", "G4", "B4", "G4", "C4", "E4", "G4", "E4", "G3", "B3", "D4", "B3", "D4", "F#4", "A4", "F#4"],
    bass: ["E2", null, null, null, "C2", null, null, null, "G2", null, null, null, "D2", null, null, null],
    drum: [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
    soft: true,
  },
  elite: {
    bpm: 140,
    lead: ["D4", "D4", null, "A4", null, "F4", null, "E4", null, "D4", null, "C#4", null, "D4", null, null],
    bass: ["D2", null, null, "D2", "A#1", null, null, null, "G1", null, null, "G1", "A1", null, null, null],
    drum: [1, 0, 2, 1, 0, 2, 1, 0, 1, 0, 2, 1, 0, 2, 1, 2],
  },
  champion: {
    bpm: 158,
    heavy: true,
    gtr: ["A1", "A1", null, "A1", "A1", null, "C2", "A1", "F1", "F1", null, "F1", "E1", null, "E1", "G1"],
    mute: [1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0],
    lead: ["A4", null, "A4", "C5", null, "A4", "E5", null, "F5", null, "E5", null, "D5", null, "E5", null],
    bass: ["A2", "A2", "A2", "A2", "A2", "A2", "A2", "A2", "F2", "F2", "F2", "F2", "E2", "E2", "E2", "E2"],
    drum: [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2],
  },
  victory: {
    bpm: 128,
    lead: ["C5", null, "C5", null, "C5", null, "E5", "G5", null, "G5", null, "E5", null, "C5", null, null],
    bass: ["C3", null, null, null, "G2", null, null, null, "C3", null, null, null, "F2", null, "G2", null],
    drum: [1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0],
  },
  hall: {
    bpm: 90,
    lead: ["A4", null, "C5", null, "F5", null, "C5", null, "A4", null, "F4", null, "G4", null, "A4", null],
    bass: ["F2", null, null, null, "C3", null, null, null, "D3", null, null, null, "F2", null, null, null],
    drum: [1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0],
  },
};

class Chip {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.muted = false;
    this.track = null;
    this.timer = null;
    this.step = 0;
    this.nextTime = 0;
  }

  unlock() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.55;
      this.master.connect(this.ctx.destination);
      this.dist = this.ctx.createWaveShaper();
      const curve = new Float32Array(1024);
      for (let i = 0; i < 1024; i++) {
        const x = (i / 1023) * 2 - 1;
        curve[i] = Math.tanh(x * 6);
      }
      this.dist.curve = curve;
      this.distOut = this.ctx.createBiquadFilter();
      this.distOut.type = "lowpass";
      this.distOut.frequency.value = 2600;
      this.dist.connect(this.distOut);
      this.distOut.connect(this.master);
    }
    if (this.ctx.state === "suspended") this.ctx.resume();
  }

  setMuted(m) {
    this.muted = m;
    if (this.master) this.master.gain.value = m ? 0 : 0.55;
  }

  music(name) {
    this.unlock();
    if (!this.ctx) return;
    this.stopMusic();
    this.track = { ...TRACKS[name], name };
    this.step = 0;
    this.nextTime = this.ctx.currentTime + 0.05;
    this.timer = setInterval(() => this.schedule(), 40);
  }

  stopMusic() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.track = null;
  }

  schedule() {
    if (!this.ctx || !this.track) return;
    const stepDur = 60 / this.track.bpm / 4;
    while (this.nextTime < this.ctx.currentTime + 0.12) {
      const tr = this.track;
      const s = this.step % (tr.steps || 16);
      const lead = tr.lead[s % tr.lead.length];
      const bass = tr.bass[s % tr.bass.length];
      const t = this.nextTime;
      if (lead) this.tone(freq(lead), t, stepDur * (tr.soft ? 1.6 : 0.9), tr.soft ? "triangle" : "square", tr.soft ? 0.05 : 0.045);
      if (bass) this.tone(freq(bass), t, stepDur * 0.95, "triangle", tr.heavy ? 0.11 : 0.09);
      if (tr.gtr) {
        const g = tr.gtr[s % tr.gtr.length];
        if (g) this.powerChord(freq(g), t, stepDur * (tr.mute[s % tr.mute.length] ? 0.55 : 1.9));
      }
      const d = tr.drum[s % tr.drum.length];
      if (d && tr.heavy) {
        if (d === 1) this.kick(t);
        if (d === 2) this.noise(t, 0.07, 0.12);
        if (d === 3) this.noise(t, 0.02, 0.03);
      } else if (d) {
        this.noise(t, d === 2 ? 0.03 : 0.05);
      }
      this.nextTime += stepDur;
      this.step += 1;
    }
  }

  tone(f, t, dur, type, vol, slideTo) {
    if (!f || !this.ctx) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(Math.max(slideTo, 1), t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g);
    g.connect(this.master);
    o.start(t);
    o.stop(t + dur + 0.02);
  }

  chord(name, dur = 0.42) {
    this.unlock();
    if (!this.ctx) return;
    this.powerChord(freq(name), this.ctx.currentTime, dur);
  }

  powerChord(f, t, dur) {
    if (!f || !this.ctx) return;
    [1, 1.5, 2].forEach((m, i) => {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = "sawtooth";
      o.frequency.setValueAtTime(f * m, t);
      o.detune.setValueAtTime(i === 0 ? -6 : 6, t);
      g.gain.setValueAtTime(0.05, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g);
      g.connect(this.dist);
      o.start(t);
      o.stop(t + dur + 0.02);
    });
  }

  kick(t) {
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(140, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.09);
    g.gain.setValueAtTime(0.22, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
    o.connect(g);
    g.connect(this.master);
    o.start(t);
    o.stop(t + 0.16);
  }

  noise(t, vol, dur = 0.08) {
    if (!this.ctx) return;
    const len = Math.floor(this.ctx.sampleRate * dur);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(g);
    g.connect(this.master);
    src.start(t);
  }

  sfx(name) {
    this.unlock();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    switch (name) {
      case "select":
        this.tone(660, t, 0.07, "square", 0.06);
        this.tone(880, t + 0.07, 0.09, "square", 0.06);
        break;
      case "text":
        this.tone(1400, t, 0.03, "square", 0.012);
        break;
      case "goal":
        this.noise(t, 0.06, 0.5);
        [523, 659, 784, 1047, 1319].forEach((f, i) => this.tone(f, t + i * 0.07, 0.16, "square", 0.06));
        break;
      case "rep":
        this.tone(330, t, 0.08, "square", 0.06, 660);
        this.kick(t);
        break;
      case "plock":
        this.tone(1250, t, 0.05, "square", 0.07, 900);
        break;
      case "whiff":
        this.tone(160, t, 0.15, "triangle", 0.06, 90);
        break;
      case "locked":
        this.tone(220, t, 0.12, "square", 0.05, 110);
        break;
      case "hit":
        this.noise(t, 0.09, 0.14);
        this.tone(180, t, 0.12, "square", 0.05, 60);
        break;
      case "super":
        this.tone(900, t, 0.32, "sawtooth", 0.08, 90);
        this.noise(t + 0.02, 0.1, 0.3);
        break;
      case "heal":
        this.tone(520, t, 0.12, "triangle", 0.07);
        this.tone(660, t + 0.1, 0.12, "triangle", 0.07);
        this.tone(880, t + 0.2, 0.16, "triangle", 0.07);
        break;
      case "badge":
        [523, 659, 784, 1047].forEach((f, i) => this.tone(f, t + i * 0.11, 0.14, "square", 0.06));
        break;
      case "faint":
        this.tone(400, t, 0.5, "square", 0.06, 50);
        break;
      case "evo":
        [523, 659, 784, 1047, 1319, 1568, 1047, 1319, 1568, 2093].forEach((f, i) =>
          this.tone(f, t + i * 0.09, 0.18, "square", 0.055)
        );
        break;
      case "start":
        [392, 523, 659, 784, 1047].forEach((f, i) => this.tone(f, t + i * 0.09, 0.16, "square", 0.06));
        break;
      default:
        break;
    }
  }
}

export const chip = new Chip();

export function useMuted() {
  const [muted, setMuted] = useState(false);
  useEffect(() => {
    chip.setMuted(muted);
  }, [muted]);
  return [muted, setMuted];
}
