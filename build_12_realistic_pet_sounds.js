const fs = require('fs');
const path = require('path');

const SR = 44100;

function saveWav(filename, samples) {
  const numSamples = samples.length;
  const buffer = Buffer.alloc(44 + numSamples * 2);

  // WAV Header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + numSamples * 2, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(1, 22); // Mono
  buffer.writeUInt32LE(SR, 24);
  buffer.writeUInt32LE(SR * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(numSamples * 2, 40);

  // Normalize and write
  let maxAmp = 0;
  for (let i = 0; i < numSamples; i++) {
    if (Math.abs(samples[i]) > maxAmp) maxAmp = Math.abs(samples[i]);
  }
  const normFactor = maxAmp > 0 ? 0.95 / maxAmp : 1.0;

  for (let i = 0; i < numSamples; i++) {
    const s = Math.max(-1, Math.min(1, samples[i] * normFactor));
    const intSample = Math.round(s < 0 ? s * 32768 : s * 32767);
    buffer.writeInt16LE(intSample, 44 + i * 2);
  }

  const outPath = path.join(__dirname, 'assets', 'sounds', filename);
  fs.writeFileSync(outPath, buffer);
  console.log(`Generated realistic sound: ${filename}`);
}

// 1. SPEC-001 小琥 (Calico Cat) - Gentle, sweet multi-tonal meow
function makeCalicoMeow() {
  const dur = 0.9;
  const len = Math.floor(dur * SR);
  const buf = new Float32Array(len);
  let p = 0;

  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const progress = t / dur;
    // Pitch curve: 550 -> 820 -> 520
    const pitch = 550 + 270 * Math.sin(progress * Math.PI) + Math.sin(t * 40) * 10;
    p += (pitch / SR) * 2 * Math.PI;

    // Harmonic richness (feline vocal cord)
    let wave = Math.sin(p) * 0.6 + Math.sin(p * 2) * 0.25 + Math.sin(p * 3) * 0.12 + Math.sin(p * 4) * 0.05;
    // Formant mouth filter simulation
    const formant = Math.sin(progress * Math.PI);
    wave = wave * (0.8 + 0.4 * formant) + (Math.random() * 2 - 1) * 0.04;

    const env = Math.sin(progress * Math.PI) * (1 - 0.2 * progress);
    buf[i] = wave * env;
  }
  saveWav('pet_01_calico.wav', buf);
}

// 2. SPEC-002 阿金 (Golden Retriever) - Deep, resonant, authentic canine bark
function makeRetrieverBark() {
  const dur = 0.65;
  const len = Math.floor(dur * SR);
  const buf = new Float32Array(len);

  // Two natural woofs
  const bursts = [
    { start: 0.0, dur: 0.26, f0: 165 },
    { start: 0.28, dur: 0.32, f0: 145 }
  ];

  bursts.forEach(b => {
    const sIdx = Math.floor(b.start * SR);
    const eIdx = Math.min(len, sIdx + Math.floor(b.dur * SR));
    let phase = 0;

    for (let i = sIdx; i < eIdx; i++) {
      const lt = (i - sIdx) / SR;
      const prog = lt / b.dur;
      // Slight pitch glide during bark
      const pitch = b.f0 * (1.1 - 0.25 * prog) + Math.sin(lt * 60) * 8;
      phase += (pitch / SR) * 2 * Math.PI;

      // Rich harmonic spectrum + throat air friction
      const glottal = Math.sin(phase) + 0.7 * Math.sin(phase * 2) + 0.45 * Math.sin(phase * 3) + 0.25 * Math.sin(phase * 4);
      const airNoise = (Math.random() * 2 - 1) * Math.exp(-prog * 8.0) * 0.9;
      const combined = glottal * 0.7 + airNoise;

      // Natural acoustic bark envelope: fast attack, exponential body decay
      let env;
      if (prog < 0.12) env = prog / 0.12;
      else env = Math.exp(-(prog - 0.12) * 5.0);

      buf[i] += combined * env * 1.3;
    }
  });

  saveWav('pet_02_retriever.wav', buf);
}

// 3. SPEC-003 暮光肥猫 (Feimao / Specimen-00) - Uncanny deep cosmic purr & whisper
function makeFeimaoEntity() {
  const dur = 2.8;
  const len = Math.floor(dur * SR);
  const buf = new Float32Array(len);
  let phase = 0;

  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const prog = t / dur;

    // 22Hz purring motor
    const purr = 0.5 + 0.5 * Math.sin(2 * Math.PI * 22 * t);
    phase += (55 / SR) * 2 * Math.PI;

    // Sub-bass + harmonic vocal overtone
    const bass = (Math.sin(phase) + 0.6 * Math.sin(phase * 2) + 0.3 * Math.sin(phase * 4)) * purr;
    const vocalWhisper = Math.sin(t * 330) * Math.sin(t * 440) * 0.25 * (Math.random() * 0.5 + 0.5);

    const env = Math.sin(prog * Math.PI);
    buf[i] = (bass * 0.75 + vocalWhisper * 0.3) * env;
  }
  saveWav('pet_03_feimao.wav', buf);
}

// 4. SPEC-004 黑豆 (Black Cat) - Short, high-pitched chirpy kitten meow
function makeBlackCatMeow() {
  const dur = 0.5;
  const len = Math.floor(dur * SR);
  const buf = new Float32Array(len);
  let p = 0;

  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const prog = t / dur;
    // Rapid chirp 750 -> 1100 -> 680
    const pitch = 750 + 350 * Math.sin(prog * Math.PI * 0.9);
    p += (pitch / SR) * 2 * Math.PI;

    const wave = Math.sin(p) * 0.7 + Math.sin(p * 2) * 0.3;
    const env = Math.pow(Math.sin(prog * Math.PI), 1.2);
    buf[i] = wave * env;
  }
  saveWav('pet_04_blackcat.wav', buf);
}

// 5. SPEC-005 雪丸 (White Rabbit) - High pitch soft squeak & uncanny teeth chattering
function makeRabbitSound() {
  const dur = 0.7;
  const len = Math.floor(dur * SR);
  const buf = new Float32Array(len);

  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const prog = t / dur;
    // High squeak
    const squeakPitch = 1600 - prog * 400;
    const squeak = Math.sin(2 * Math.PI * squeakPitch * t) * Math.exp(-prog * 8.0) * 0.6;
    // Chattering clicks
    const click = (Math.sin(t * 90) > 0.85 ? (Math.random() * 2 - 1) * 0.35 : 0);
    buf[i] = squeak + click;
  }
  saveWav('pet_05_rabbit.wav', buf);
}

// 6. SPEC-006 巴吉 (Pug) - Wheezy snorting pug breath & short huff bark
function makePugSound() {
  const dur = 0.8;
  const len = Math.floor(dur * SR);
  const buf = new Float32Array(len);

  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const prog = t / dur;
    // Wheezy breath snort
    const breath = (Math.random() * 2 - 1) * Math.sin(prog * Math.PI * 2) * 0.4;
    // Nasal short pug huff (240Hz)
    const pitch = 240 * Math.exp(-prog * 4.0) + 120;
    const huff = Math.sin(2 * Math.PI * pitch * t) * Math.exp(-prog * 5.0) * 0.8;
    buf[i] = (breath + huff) * Math.sin(prog * Math.PI);
  }
  saveWav('pet_06_pug.wav', buf);
}

// 7. SPEC-007 千代 (Shiba Inu) - Sharp, crisp Japanese Shiba bark (Yip-Bark!)
function makeShibaBark() {
  const dur = 0.45;
  const len = Math.floor(dur * SR);
  const buf = new Float32Array(len);
  let p = 0;

  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const prog = t / dur;
    const pitch = 320 * (1 - prog * 0.4);
    p += (pitch / SR) * 2 * Math.PI;

    const wave = Math.sin(p) + 0.6 * Math.sin(p * 2) + (Math.random() * 2 - 1) * Math.exp(-prog * 6.0) * 0.7;
    const env = Math.exp(-prog * 4.5);
    buf[i] = wave * env;
  }
  saveWav('pet_07_shiba.wav', buf);
}

// 8. SPEC-008 花子 (Tabby Cat) - Demanding, long, classic feline meow
function makeTabbyMeow() {
  const dur = 1.1;
  const len = Math.floor(dur * SR);
  const buf = new Float32Array(len);
  let p = 0;

  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const prog = t / dur;
    const pitch = 600 + 220 * Math.sin(prog * Math.PI) + Math.sin(t * 30) * 15;
    p += (pitch / SR) * 2 * Math.PI;

    const wave = Math.sin(p) * 0.65 + Math.sin(p * 2) * 0.25 + Math.sin(p * 3) * 0.1;
    const env = Math.sin(prog * Math.PI);
    buf[i] = wave * env;
  }
  saveWav('pet_08_tabby.wav', buf);
}

// 9. SPEC-009 茶茶 (Scottish Fold) - Muffled, quiet, ghostly purr-mew
function makeFoldMeow() {
  const dur = 0.85;
  const len = Math.floor(dur * SR);
  const buf = new Float32Array(len);
  let p = 0;

  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const prog = t / dur;
    const pitch = 480 + 120 * Math.sin(prog * Math.PI);
    p += (pitch / SR) * 2 * Math.PI;

    // Filtered lowpass tone
    const wave = Math.sin(p) * 0.8 + Math.sin(p * 2) * 0.2;
    const env = Math.sin(prog * Math.PI);
    buf[i] = wave * env * 0.85;
  }
  saveWav('pet_09_fold.wav', buf);
}

// 10. SPEC-010 莱卡 (Mixed Shepherd) - Guard growl leading into explosive defensive bark
function makeShepherdBark() {
  const dur = 0.75;
  const len = Math.floor(dur * SR);
  const buf = new Float32Array(len);

  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const prog = t / dur;

    // Initial growl rumble (0 - 0.2s)
    let growl = 0;
    if (prog < 0.3) {
      growl = Math.sin(2 * Math.PI * 95 * t) * Math.sin(2 * Math.PI * 35 * t) * (prog / 0.3);
    }

    // Heavy deep bark (0.2 - 0.75s)
    let bark = 0;
    if (prog >= 0.2) {
      const bp = (prog - 0.2) / 0.8;
      const pitch = 135 * (1 - bp * 0.3);
      bark = (Math.sin(2 * Math.PI * pitch * t) + 0.6 * Math.sin(2 * Math.PI * pitch * 2 * t) + (Math.random() * 2 - 1) * 0.4) * Math.exp(-bp * 4.0);
    }

    buf[i] = (growl * 0.5 + bark * 1.1);
  }
  saveWav('pet_10_shepherd.wav', buf);
}

// 11. SPEC-011 露露 (Siamese Cat) - Iconic raspy human baby-like Siamese wail
function makeSiameseWail() {
  const dur = 1.3;
  const len = Math.floor(dur * SR);
  const buf = new Float32Array(len);
  let p = 0;

  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const prog = t / dur;
    // Nasal crying contour: 480 -> 720 -> 540
    const pitch = 480 + 240 * Math.sin(prog * Math.PI) + Math.sin(t * 22) * 20;
    p += (pitch / SR) * 2 * Math.PI;

    // Raspy nasal harmonics
    const wave = Math.sin(p) * 0.5 + Math.sin(p * 2) * 0.3 + Math.sin(p * 3) * 0.2 + (Math.random() * 2 - 1) * 0.08;
    const env = Math.sin(prog * Math.PI);
    buf[i] = wave * env;
  }
  saveWav('pet_11_siamese.wav', buf);
}

// 12. SPEC-012 零号影子 (Shadow Zero) - Reversed backward whispers & supernatural frequency
function makeShadowZero() {
  const dur = 1.6;
  const len = Math.floor(dur * SR);
  const buf = new Float32Array(len);

  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const prog = t / dur;
    // Reverse envelope: starts quiet, grows into eerie reverse whisper
    const env = Math.pow(prog, 1.5) * Math.sin(prog * Math.PI);
    const wave = Math.sin(2 * Math.PI * (220 + prog * 440) * t) * Math.sin(t * 18) + (Math.random() * 2 - 1) * 0.2;
    buf[i] = wave * env * 0.9;
  }
  saveWav('pet_12_shadow.wav', buf);
}

console.log('Generating 12 distinct realistic animal audio tracks...');
makeCalicoMeow();
makeRetrieverBark();
makeFeimaoEntity();
makeBlackCatMeow();
makeRabbitSound();
makePugSound();
makeShibaBark();
makeTabbyMeow();
makeFoldMeow();
makeShepherdBark();
makeSiameseWail();
makeShadowZero();
console.log('All 12 unique realistic pet audio tracks created successfully!');
