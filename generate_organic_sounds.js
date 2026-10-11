const fs = require('fs');
const path = require('path');

// Helper to write a 16-bit Mono WAV file
function saveWav(filename, samples, sampleRate = 44100) {
  const numSamples = samples.length;
  const buffer = Buffer.alloc(44 + numSamples * 2);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + numSamples * 2, 4);
  buffer.write('WAVE', 8);

  // fmt subchunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // subchunk1 size
  buffer.writeUInt16LE(1, 20);  // PCM format
  buffer.writeUInt16LE(1, 22);  // mono
  buffer.writeUInt32LE(sampleRate, 24); // sample rate
  buffer.writeUInt32LE(sampleRate * 2, 28); // byte rate (sampleRate * numChannels * bitsPerSample/8)
  buffer.writeUInt16LE(2, 32);  // block align
  buffer.writeUInt16LE(16, 34); // bits per sample

  // data subchunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(numSamples * 2, 40);

  // PCM samples with soft clipping
  for (let i = 0; i < numSamples; i++) {
    let s = Math.max(-1, Math.min(1, samples[i]));
    const intSample = Math.round(s < 0 ? s * 32768 : s * 32767);
    buffer.writeInt16LE(intSample, 44 + i * 2);
  }

  const outPath = path.join(__dirname, 'assets', 'sounds', filename);
  fs.writeFileSync(outPath, buffer);
  console.log(`Generated: ${filename} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

const SR = 44100;

// 1. Biological Cat Meow (Rosenberg Glottal Flow + Multi-Formant Sweeps)
function generateCatMeow() {
  const duration = 0.85; // seconds
  const totalSamples = Math.floor(duration * SR);
  const samples = new Float32Array(totalSamples);

  let phase = 0;
  // Formant filter state variables (2-pole resonators)
  let f1_y1 = 0, f1_y2 = 0;
  let f2_y1 = 0, f2_y2 = 0;
  let f3_y1 = 0, f3_y2 = 0;

  for (let i = 0; i < totalSamples; i++) {
    const t = i / SR;
    const progress = t / duration;

    // Pitch contour: starts at 520Hz, rises to 820Hz at 25%, gently descends to 410Hz
    let pitch;
    if (progress < 0.25) {
      pitch = 520 + (820 - 520) * Math.sin((progress / 0.25) * (Math.PI / 2));
    } else {
      const p2 = (progress - 0.25) / 0.75;
      pitch = 820 - (820 - 410) * Math.pow(p2, 1.2);
    }

    // Natural vibrato / trembling
    pitch += Math.sin(t * 35) * 12;

    // Advance glottal phase
    phase += (pitch / SR) * 2 * Math.PI;
    if (phase > 2 * Math.PI) phase -= 2 * Math.PI;

    // Rosenberg glottal pulse (natural vocal cord waveform)
    const normPhase = phase / (2 * Math.PI);
    let glottal = 0;
    const openPhase = 0.65;
    if (normPhase < openPhase) {
      const tp = normPhase / openPhase;
      glottal = 3 * Math.pow(tp, 2) - 2 * Math.pow(tp, 3);
    } else {
      glottal = 0;
    }
    // Add breath turbulence
    glottal += (Math.random() * 2 - 1) * 0.08;

    // Formant filter frequencies (Vowel glide /m/ -> /æ/ -> /o/ -> /u/)
    let f1, f2, f3;
    if (progress < 0.15) {
      // /m/ nasal phase
      f1 = 300; f2 = 1200; f3 = 2400;
    } else if (progress < 0.6) {
      // /æ/ open mouth meow peak
      const p = (progress - 0.15) / 0.45;
      f1 = 300 + (780 - 300) * p;
      f2 = 1200 + (1850 - 1200) * p;
      f3 = 2400 + (2800 - 2400) * p;
    } else {
      // /o/ -> /u/ closing mouth
      const p = (progress - 0.6) / 0.4;
      f1 = 780 - (780 - 450) * p;
      f2 = 1850 - (1850 - 950) * p;
      f3 = 2800 - (2800 - 2200) * p;
    }

    // Resonator helper
    function applyResonator(x, freq, bw, y1, y2) {
      const r = Math.exp(-Math.PI * (bw / SR));
      const c = 2 * r * Math.cos(2 * Math.PI * (freq / SR));
      const gain = (1 - r) * Math.sin(2 * Math.PI * (freq / SR));
      const y = gain * x + c * y1 - r * r * y2;
      return { y, y1: y, y2: y1 };
    }

    const r1 = applyResonator(glottal, f1, 100, f1_y1, f1_y2);
    f1_y1 = r1.y1; f1_y2 = r1.y2;

    const r2 = applyResonator(glottal, f2, 140, f2_y1, f2_y2);
    f2_y1 = r2.y1; f2_y2 = r2.y2;

    const r3 = applyResonator(glottal, f3, 180, f3_y1, f3_y2);
    f3_y1 = r3.y1; f3_y2 = r3.y2;

    let out = r1.y * 0.6 + r2.y * 0.35 + r3.y * 0.15;

    // Amplitude envelope (fade in & gradual fade out)
    let env;
    if (progress < 0.08) {
      env = progress / 0.08;
    } else if (progress < 0.7) {
      env = 1.0 - 0.15 * ((progress - 0.08) / 0.62);
    } else {
      env = 0.85 * Math.pow(1 - (progress - 0.7) / 0.3, 1.8);
    }

    samples[i] = out * env * 1.6;
  }

  saveWav('cat_meow.wav', samples);
}

// 2. Corrupted Demonic Cat Yowl (Chilling Analog Horror Scream)
function generateDemonicYowl() {
  const duration = 1.4;
  const totalSamples = Math.floor(duration * SR);
  const samples = new Float32Array(totalSamples);

  let phase = 0;
  let f1_y1 = 0, f1_y2 = 0, f2_y1 = 0, f2_y2 = 0;

  for (let i = 0; i < totalSamples; i++) {
    const t = i / SR;
    const progress = t / duration;

    // Dropping, twisting discordant pitch
    const basePitch = 340 + Math.sin(t * 18) * 45 - progress * 160;
    phase += (basePitch / SR) * 2 * Math.PI;

    // Harsh vocal fold wave with subharmonic distortion
    let wave = Math.sin(phase) + 0.6 * Math.sin(phase * 0.5) + 0.4 * Math.sin(phase * 3.0);
    wave += (Math.random() * 2 - 1) * 0.25;

    // Throat resonance
    const freq1 = 450 - progress * 150;
    const r = Math.exp(-Math.PI * (120 / SR));
    const c = 2 * r * Math.cos(2 * Math.PI * (freq1 / SR));
    const y1 = (1 - r) * wave + c * f1_y1 - r * r * f1_y2;
    f1_y2 = f1_y1; f1_y1 = y1;

    let env = Math.sin(progress * Math.PI);
    samples[i] = Math.tanh(y1 * 2.2) * env * 0.85;
  }

  saveWav('cat_demonic.wav', samples);
}

// 3. Realistic Canine Chest Bark (Double Burst Woof-Woof!)
function generateDogBark() {
  const duration = 0.6;
  const totalSamples = Math.floor(duration * SR);
  const samples = new Float32Array(totalSamples);

  for (let burst = 0; burst < 2; burst++) {
    const startT = burst * 0.26;
    const burstLen = 0.22;
    const startIdx = Math.floor(startT * SR);
    const endIdx = Math.min(totalSamples, startIdx + Math.floor(burstLen * SR));

    let phase = 0;
    let chest_y1 = 0, chest_y2 = 0;

    for (let i = startIdx; i < endIdx; i++) {
      const localT = (i - startIdx) / SR;
      const progress = localT / burstLen;

      // Pitch drops sharply: 260Hz -> 85Hz
      const pitch = 260 * Math.exp(-progress * 5.5) + 75;
      phase += (pitch / SR) * 2 * Math.PI;

      // Vocal fold pulse + chest burst noise
      let impulse = Math.sin(phase) * Math.exp(-progress * 4.0);
      let noise = (Math.random() * 2 - 1) * Math.exp(-progress * 7.0) * 1.5;
      let wave = impulse * 0.7 + noise * 0.8;

      // Chest cavity 280Hz resonator
      const r = Math.exp(-Math.PI * (160 / SR));
      const c = 2 * r * Math.cos(2 * Math.PI * (280 / SR));
      const y = (1 - r) * wave + c * chest_y1 - r * r * chest_y2;
      chest_y2 = chest_y1; chest_y1 = y;

      const env = Math.pow(1 - progress, 1.4);
      samples[i] += Math.tanh(y * 2.8) * env * 0.9;
    }
  }

  saveWav('dog_bark.wav', samples);
}

// 4. Eerie Hound Howl (Deep Atmospheric Howling in Dusk Wind)
function generateHoundHowl() {
  const duration = 2.2;
  const totalSamples = Math.floor(duration * SR);
  const samples = new Float32Array(totalSamples);

  let phase = 0;
  let res_y1 = 0, res_y2 = 0;

  for (let i = 0; i < totalSamples; i++) {
    const t = i / SR;
    const progress = t / duration;

    // Howl contour: rises to 380Hz, wavers with emotional pitch vibrato, decays to 120Hz
    let pitch;
    if (progress < 0.3) {
      pitch = 140 + (380 - 140) * Math.sin((progress / 0.3) * (Math.PI / 2));
    } else {
      const p = (progress - 0.3) / 0.7;
      pitch = 380 - (380 - 120) * Math.pow(p, 0.8);
    }
    pitch += Math.sin(t * 6.5) * 16; // Vibrato

    phase += (pitch / SR) * 2 * Math.PI;
    let wave = Math.sin(phase) + 0.35 * Math.sin(phase * 2.0) + (Math.random() * 2 - 1) * 0.08;

    // Resonator
    const r = Math.exp(-Math.PI * (110 / SR));
    const c = 2 * r * Math.cos(2 * Math.PI * (520 / SR));
    const y = (1 - r) * wave + c * res_y1 - r * r * res_y2;
    res_y2 = res_y1; res_y1 = y;

    const env = Math.sin(progress * Math.PI);
    samples[i] = y * env * 1.1;
  }

  saveWav('hound_howl.wav', samples);
}

// 5. Binaural Feimao Purr (Vocal Formant Motor Purr)
function generateFeimaoPurr() {
  const duration = 3.5;
  const totalSamples = Math.floor(duration * SR);
  const samples = new Float32Array(totalSamples);

  let phase = 0;
  let formant_y1 = 0, formant_y2 = 0;

  for (let i = 0; i < totalSamples; i++) {
    const t = i / SR;
    const progress = t / duration;

    // 24Hz Purring motor flutter
    const motorRate = 24;
    const motorAmp = 0.5 + 0.5 * Math.sin(2 * Math.PI * motorRate * t);

    // Deep 55Hz bass fundamental
    phase += (58 / SR) * 2 * Math.PI;
    let raw = (Math.sin(phase) + 0.5 * Math.sin(phase * 2)) * motorAmp;
    raw += (Math.random() * 2 - 1) * 0.12;

    // Throat resonance
    const formantFreq = 290 + Math.sin(t * 2) * 40;
    const r = Math.exp(-Math.PI * (60 / SR));
    const c = 2 * r * Math.cos(2 * Math.PI * (formantFreq / SR));
    const y = (1 - r) * raw + c * formant_y1 - r * r * formant_y2;
    formant_y2 = formant_y1; formant_y1 = y;

    const env = Math.sin(progress * Math.PI);
    samples[i] = Math.tanh(y * 2.5) * env * 0.95;
  }

  saveWav('feimao_purr.wav', samples);
}

// 6. Heavy Visceral Jumpscare Stinger
function generateJumpscare() {
  const duration = 1.5;
  const totalSamples = Math.floor(duration * SR);
  const samples = new Float32Array(totalSamples);

  for (let i = 0; i < totalSamples; i++) {
    const t = i / SR;
    const progress = t / duration;

    // Sub-bass transient impact
    const subPitch = 160 * Math.exp(-progress * 9) + 25;
    const sub = Math.sin(2 * Math.PI * subPitch * t) * Math.exp(-progress * 4);

    // Discordant metal screeches
    const scream1 = Math.sin(2 * Math.PI * (1650 - progress * 1100) * t);
    const scream2 = Math.sin(2 * Math.PI * (1720 - progress * 1150) * t);
    const scream = (scream1 + scream2) * Math.exp(-progress * 3.5);

    // Blast noise
    const noise = (Math.random() * 2 - 1) * Math.exp(-progress * 6);

    const out = sub * 0.6 + scream * 0.5 + noise * 0.4;
    samples[i] = Math.tanh(out * 2.2);
  }

  saveWav('jumpscare.wav', samples);
}

// Run all generators
console.log('Synthesizing biological organic audio assets...');
generateCatMeow();
generateDemonicYowl();
generateDogBark();
generateHoundHowl();
generateFeimaoPurr();
generateJumpscare();
console.log('All organic audio assets synthesized successfully!');
