/**
 * Twilight Feimao Sanctuary - Audio Spectrogram & Tape Decoder
 */

class SpectrumAnalyzer {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.isPlaying = false;
    this.filterFreq = 1000;
    this.animationId = null;
    this.hasUnlockedKey = false;
    
    this.init();
  }

  init() {
    this.canvas = document.getElementById('spectrumCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    const playBtn = document.getElementById('btnPlayTape');
    const slider = document.getElementById('freqSlider');
    const freqDisplay = document.getElementById('freqDisplay');

    if (playBtn) {
      playBtn.addEventListener('click', () => this.togglePlay());
    }

    if (slider) {
      slider.addEventListener('input', (e) => {
        this.filterFreq = parseInt(e.target.value);
        if (freqDisplay) freqDisplay.textContent = `${this.filterFreq} Hz`;
        this.checkFrequencyMatch();
      });
    }

    this.startRendering();
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    const playBtn = document.getElementById('btnPlayTape');
    if (playBtn) {
      playBtn.textContent = this.isPlaying ? '⏹ 停止磁带' : '▶ 播放磁带 #99';
    }

    if (this.isPlaying) {
      if (window.HorrorAudio) {
        window.HorrorAudio.playFeimaoPurr();
      }
    }
  }

  checkFrequencyMatch() {
    // Secret frequency target ~3330 - 3360 Hz (3333 Hz = 3:33 AM occult mark)
    if (Math.abs(this.filterFreq - 3333) < 40) {
      if (!this.hasUnlockedKey) {
        this.hasUnlockedKey = true;
        if (window.Corruption) {
          window.Corruption.addKey('KEY-04 [声学暗号]', '在3333Hz频段解密出磁带深处的低语密码 [代码: FREQ-3333-PURR]');
          window.Corruption.showToast("【声谱隐藏信号解密成功】获得 KEY-04！");
        }
        if (window.MainController) {
          window.MainController.unlockMemorial();
        }
      }
    }
  }

  startRendering() {
    const render = () => {
      this.draw();
      this.animationId = requestAnimationFrame(render);
    };
    render();
  }

  draw() {
    if (!this.ctx || !this.canvas) return;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const ctx = this.ctx;

    // Fade trail
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(0, 0, w, h);

    if (this.isPlaying) {
      // Draw spectrogram frequency bars
      ctx.lineWidth = 2;
      const bars = 48;
      const barW = w / bars;

      for (let i = 0; i < bars; i++) {
        const freqRatio = i / bars;
        const resonance = Math.max(0, 1 - Math.abs((freqRatio * 6000) - this.filterFreq) / 1000);
        const noise = Math.random() * 0.4 + 0.1;
        const barH = (resonance * 0.8 + noise * 0.2) * (h * 0.85);

        const r = Math.floor(180 + resonance * 75);
        const g = Math.floor(resonance * 200);
        const b = Math.floor(50 + (1 - resonance) * 100);

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(i * barW, h - barH, barW - 2, barH);
      }

      // Draw hidden glyph if frequency near 3333Hz
      if (Math.abs(this.filterFreq - 3333) < 80) {
        ctx.fillStyle = 'rgba(255, 50, 50, 0.8)';
        ctx.font = '16px "Share Tech Mono", monospace';
        ctx.fillText(">> DECRYPTED: SPECIMEN-00 VOCODER KEY [FREQ-3333] <<", w * 0.12, h * 0.35);
      }
    } else {
      ctx.fillStyle = '#443d3b';
      ctx.font = '14px "Share Tech Mono", monospace';
      ctx.fillText("[磁带就绪 - 点击播放以分析声谱]", w * 0.3, h * 0.5);
    }
  }
}

window.Spectrum = new SpectrumAnalyzer();
