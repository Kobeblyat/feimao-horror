/**
 * Twilight Feimao Sanctuary - 6-Channel Live CCTV Surveillance Simulator
 * Fully Seamless Analog Horror Feeds (Zero rectangular box artifacts)
 *
 * Anomaly investigation loop (reasoning-driven):
 *   1. Collect intel (clue) for a channel from dossiers / terminal / chat / memorial.
 *   2. Switch to the imaging band (normal / NV / IR) named by that intel.
 *   3. Sweep the feed — a live signal-strength readout homes you in on the source.
 *   4. Lock on with a click. Blind clicking costs false-alarm strikes.
 */

class CCTVSystem {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.currentChannel = 1; // 1 to 6
    this.visionMode = 'normal'; // normal, nv (night vision), thermal (infrared)
    this.animationId = null;

    // Collected investigation intel (clue ids)
    this.clues = new Set();
    this.falseAlarms = 0;
    this.maxFalseAlarms = 3;
    this.currentSignal = null; // 0-100 or null when not scannable

    // Anomaly tracking status. Each anomaly now requires:
    //   mode   - the only imaging band in which it can manifest
    //   clueId - intel that must be gathered before it can be detected
    this.anomalies = {
      1: { found: false, x: 0.65, y: 0.45, radius: 0.13, name: "主犬舍深处发光倒影", mode: 'nv', clueId: 'kennel', clueHint: "缺少【主犬舍】目击情报——查阅相关犬只的病历档案。" },
      2: { found: false, x: 0.78, y: 0.25, radius: 0.16, name: "104室悬浮实体·肥猫", mode: 'thermal', clueId: 'ward104', clueHint: "缺少【104室】目击情报——调查院长便签、纪念壁或向客服询问104病房。" },
      3: { found: false, x: 0.50, y: 0.40, radius: 0.15, name: "院长办公桌后窥探阴影", mode: 'nv', clueId: 'office', clueHint: "缺少【院长办公室】情报——登入员工终端调阅院长备忘录。" },
      4: { found: false, x: 0.72, y: 0.28, radius: 0.17, name: "黄昏天际线超巨型肥猫本体", mode: 'normal', clueId: 'courtyard', clueHint: "缺少【放养庭院】情报——登入员工终端调阅全院紧急通告。" },
      5: { found: false, x: 0.50, y: 0.55, radius: 0.15, name: "焚化炉门内未燃尽骨架与暗号", mode: 'thermal', clueId: 'incinerator', clueHint: "缺少【焚化炉】情报——登入员工终端调阅B2事故记录。" },
      6: { found: false, x: 0.45, y: 0.45, radius: 0.15, name: "肉库冰钩上的非猫科肢体", mode: 'nv', clueId: 'meat', clueHint: "缺少【肉库】情报——向客服询问地下配餐与肉库。" }
    };

    // Full intel text revealed when a clue is collected
    this.clueIntel = {
      kennel: "【情报 CH-01】主犬舍标准画面一切正常，但关闭红外补光后，右中区域的金属食盆会倒映出不属于任何犬只的发光瞳孔。切至【微光夜视 NV】并扫描画面右中。",
      ward104: "【情报 CH-02】104室肥猫本体无实体、无质量，普通光学探头只能拍到空房间；唯有【红外热成像 IR】能让它显形为悬浮的负温空洞，位于画面右上方天花区域。坐标代码 [19991031]。",
      office: "【情报 CH-03】院长办公桌后的阴影在普通光下只是窗帘褶皱。切至【微光夜视 NV】，分辨画面中央那道始终不随灯光移动的人形剪影。",
      courtyard: "【情报 CH-04】黄昏 17:30-18:45，放养庭院【标准 RGB】画面右上方的天际线云层会短暂浮现巨猫轮廓。红外会把它误判为云层，务必使用标准通道。",
      incinerator: "【情报 CH-05】焚化炉余温永不散尽，停炉后【红外热成像 IR】仍会显示炉门中央偏下处一具保持跪姿的高温人形，以及灼在门侧的暗号。",
      meat: "【情报 CH-06】B1冷库常年断电，唯【微光夜视 NV】能穿透黑暗，看见画面中央冰钩末端那截戴着婚戒、不属于猫科的前臂。"
    };

    this.modeNames = {
      normal: '标准 RGB',
      nv: '微光夜视 NV',
      thermal: '红外热成像 IR'
    };

    // Preloaded image references
    this.imgQuarantine = new Image();
    this.imgQuarantine.src = 'assets/cctv_quarantine.jpg';

    this.imgHero = new Image();
    this.imgHero.src = 'assets/clinic_hero.jpg';

    this.imgFeimaoTransparent = new Image();
    this.imgFeimaoTransparent.src = 'assets/fatcat_transparent.png';

    this.imgDirector = new Image();
    this.imgDirector.src = 'assets/director.jpg';

    this.imgIncinerator = new Image();
    this.imgIncinerator.src = 'assets/cctv_incinerator.jpg';

    this.imgMeatStorage = new Image();
    this.imgMeatStorage.src = 'assets/cctv_meat_storage.jpg';

    this.init();
  }

  init() {
    this.canvas = document.getElementById('cctvCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    this.bindEvents();
    this.startRendering();
    this.updateHUD();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = this.canvas.parentElement.clientWidth || 800;
    this.canvas.height = this.canvas.parentElement.clientHeight || 480;
  }

  bindEvents() {
    // Channel buttons
    document.querySelectorAll('.cctv-ch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const ch = parseInt(btn.dataset.channel);
        this.switchChannel(ch);
      });
    });

    // Vision mode buttons
    document.querySelectorAll('.btn-vision-mode').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-vision-mode').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.visionMode = btn.dataset.mode;
        this.setSignal(null);
        this.updateHUD();
        if (window.HorrorAudio) window.HorrorAudio.playClick();
      });
    });

    // Signal sweep (covers mouse + touch via pointer events)
    this.canvas.addEventListener('pointermove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / this.canvas.width;
      const my = (e.clientY - rect.top) / this.canvas.height;
      this.updateSignal(mx, my);
    });

    this.canvas.addEventListener('pointerleave', () => {
      this.setSignal(null);
    });

    // Anomaly lock-on click
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clickX = (e.clientX - rect.left) / this.canvas.width;
      const clickY = (e.clientY - rect.top) / this.canvas.height;
      this.investigate(clickX, clickY);
    });
  }

  switchChannel(ch) {
    this.currentChannel = ch;
    document.querySelectorAll('.cctv-ch-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.channel) === ch);
    });
    const labelEl = document.getElementById('cctvCurrentLabel');
    const camLabelEl = document.getElementById('cctvCamLabel');
    const chNames = [
      "CH-01 [主收容舍·A区 / KENNEL A]",
      "CH-02 [隔离观察室·104 / WARD 104 ⚠️]",
      "CH-03 [院长办公室·2F / DIRECTOR'S OFFICE]",
      "CH-04 [黄昏放养庭院 / DUSK COURTYARD]",
      "CH-05 [地下焚化炉·B2 / INCINERATOR B2 🔥]",
      "CH-06 [配餐冷冻库·B1 / MEAT PREP B1]"
    ];
    if (labelEl) labelEl.textContent = chNames[ch - 1] || `CH-0${ch}`;
    if (camLabelEl) camLabelEl.textContent = `CAM 0${ch} [LIVE]`;

    this.setSignal(null);
    this.updateHUD();

    if (window.HorrorAudio) {
      window.HorrorAudio.playClick();
      if (ch === 2 || ch === 4) {
        window.HorrorAudio.playFeimaoPurr();
      }
    }
  }

  // =========================================================================
  // Investigation intel
  // =========================================================================
  grantClue(clueId) {
    if (!clueId || this.clues.has(clueId)) return;
    this.clues.add(clueId);

    const text = this.clueIntel[clueId];
    if (text && window.Corruption) {
      window.Corruption.showToast(`[监控情报解锁] ${text}`);
      window.Corruption.addCorruption(6, `Gained CCTV intel: ${clueId}`);
    }
    this.updateHUD();
  }

  hasClue(clueId) {
    return this.clues.has(clueId);
  }

  // =========================================================================
  // Signal triangulation
  // =========================================================================
  computeSignal(dist, radius) {
    if (dist <= radius) return 100;
    const falloff = 0.34;
    return Math.max(0, Math.round(100 * (1 - (dist - radius) / falloff)));
  }

  updateSignal(mx, my) {
    const anom = this.anomalies[this.currentChannel];
    if (!anom || anom.found) {
      this.setSignal(null);
      return;
    }

    if (!this.hasClue(anom.clueId)) {
      this.setSignal(null, 'no-clue');
      return;
    }

    if (this.visionMode !== anom.mode) {
      this.setSignal(null, 'wrong-mode');
      return;
    }

    const dist = Math.hypot(mx - anom.x, my - anom.y);
    this.setSignal(this.computeSignal(dist, anom.radius));
  }

  setSignal(sig, state = null) {
    this.currentSignal = sig;

    const valueEl = document.getElementById('cctvSignal');
    const fillEl = document.getElementById('cctvSigFill');
    const hintEl = document.getElementById('cctvScanHint');

    if (valueEl) {
      if (sig === null) {
        valueEl.textContent = '--%';
        valueEl.classList.remove('hot');
      } else {
        valueEl.textContent = `${sig}%`;
        valueEl.classList.toggle('hot', sig >= 80);
      }
    }
    if (fillEl) fillEl.style.width = `${sig === null ? 0 : sig}%`;

    if (hintEl) {
      if (state === 'no-clue') {
        hintEl.textContent = '⚠ 未解析到情报——先收集该通道的调查线索，信号无法解析。';
      } else if (state === 'wrong-mode') {
        hintEl.textContent = `⚠ ${this.modeNames[this.visionMode]} 波段无异常响应，切换成像模式重试。`;
      } else if (sig === null) {
        hintEl.textContent = '移动光标扫描画面，锁定异常源后点击标记。';
      } else if (sig >= 100) {
        hintEl.textContent = '🔒 信号已锁定！点击画面确认异常源。';
      } else if (sig >= 60) {
        hintEl.textContent = '信号增强中…继续向读数上升方向移动。';
      } else if (sig > 0) {
        hintEl.textContent = '捕捉到微弱信号…';
      } else {
        hintEl.textContent = '扫描中…该区域暂无异常响应。';
      }
    }
  }

  // =========================================================================
  // Lock-on investigation
  // =========================================================================
  investigate(x, y) {
    const anom = this.anomalies[this.currentChannel];
    if (!anom) return;

    if (anom.found) {
      if (window.Corruption) window.Corruption.showToast("[该异常已标记归档，无需重复确认。]");
      return;
    }

    // 1. Reasoning gate: intel required
    if (!this.hasClue(anom.clueId)) {
      if (window.Corruption) window.Corruption.showToast(`[信号无法解析] ${anom.clueHint}`);
      if (window.HorrorAudio) window.HorrorAudio.playClick();
      return;
    }

    // 2. Reasoning gate: imaging band required
    if (this.visionMode !== anom.mode) {
      const modeName = this.modeNames[this.visionMode];
      if (window.Corruption) window.Corruption.showToast(`[${modeName}] 波段无异常响应——该现象不在当前成像模式中显形。`);
      if (window.HorrorAudio) window.HorrorAudio.playClick();
      return;
    }

    // 3. Location lock
    const dist = Math.hypot(x - anom.x, y - anom.y);
    const signal = this.computeSignal(dist, anom.radius);

    if (signal >= 100) {
      this.confirmAnomaly(anom);
    } else if (signal >= 55) {
      if (window.Corruption) window.Corruption.showToast(`[信号 ${signal}%] 接近异常源但未锁定——继续向读数上升方向靠近。`);
    } else {
      this.registerFalseAlarm();
    }
  }

  confirmAnomaly(anom) {
    anom.found = true;

    if (window.Corruption) {
      window.Corruption.addCorruption(15, `Confirmed anomaly: ${anom.name}`);
      window.Corruption.showToast(`[监控侦测到异常] 已锁定现象: ${anom.name}`);
    }

    // CH-02 Ward 104 is the critical sighting that drives progression
    if (this.currentChannel === 2) {
      if (window.Corruption) {
        window.Corruption.triggerJumpscare("104 室 绝 密 目 击", "assets/jumpscare_ward104.jpg");
        window.Corruption.addKey('KEY-01 [暮光目击]', '在104室监控中发现了肥猫本体的悬浮坐标 [代码: 19991031]');
      }
      if (window.MainController) {
        window.MainController.unsealSpec12();
        window.MainController.unlockSpectrum();
      }
    }

    this.setSignal(null);
    this.updateHUD();
  }

  registerFalseAlarm() {
    this.falseAlarms++;
    if (window.Corruption) {
      window.Corruption.showToast(`[误报] 无异常源应答。误报 ${this.falseAlarms}/${this.maxFalseAlarms}——持续盲点将惊动保卫科。`);
      window.Corruption.addCorruption(4, 'CCTV false alarm');
    }

    if (this.falseAlarms >= this.maxFalseAlarms) {
      this.falseAlarms = 0;
      if (window.Corruption) {
        window.Corruption.drainSanity(15);
        window.Corruption.triggerJumpscare("监 控 误 报 // 保 卫 科 已 锁 定 你", "assets/jumpscare_ward104.jpg");
      }
    }
    this.updateHUD();
  }

  // =========================================================================
  // HUD
  // =========================================================================
  updateHUD() {
    const intelEl = document.getElementById('cctvIntelCount');
    const alarmEl = document.getElementById('cctvFalseAlarms');
    const modeEl = document.getElementById('cctvModeTag');

    if (intelEl) intelEl.textContent = `情报 ${this.clues.size}/6`;
    if (alarmEl) alarmEl.textContent = `误报 ${this.falseAlarms}/${this.maxFalseAlarms}`;
    if (modeEl) modeEl.textContent = `波段: ${this.modeNames[this.visionMode] || this.visionMode}`;
  }

  updateTimestamp() {
    const tsEl = document.getElementById('cctvTimestamp');
    if (!tsEl) return;
    const now = new Date();
    const timeStr = `1999-10-31 03:33:${String(now.getSeconds()).padStart(2, '0')}`;
    if (tsEl.textContent !== timeStr) tsEl.textContent = timeStr;
  }

  // =========================================================================
  // Render loop
  // =========================================================================
  startRendering() {
    const render = () => {
      this.drawFrame();
      this.updateTimestamp();
      this.animationId = requestAnimationFrame(render);
    };
    render();
  }

  drawFrame() {
    if (!this.ctx || !this.canvas) return;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const ctx = this.ctx;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, w, h);

    // Render corresponding channel scene
    switch (this.currentChannel) {
      case 1:
        this.drawKennelA(ctx, w, h);
        break;
      case 2:
        this.drawWard104(ctx, w, h);
        break;
      case 3:
        this.drawDirectorOffice(ctx, w, h);
        break;
      case 4:
        this.drawCourtyard(ctx, w, h);
        break;
      case 5:
        this.drawIncinerator(ctx, w, h);
        break;
      case 6:
        this.drawMeatStorage(ctx, w, h);
        break;
    }

    // Vision Mode Filter (Night Vision / Thermal IR)
    this.applyVisionModeEffects(ctx, w, h);

    // Subtle Analog VHS static
    this.drawAnalogNoise(ctx, w, h);
  }

  drawKennelA(ctx, w, h) {
    if (this.imgQuarantine.complete && this.imgQuarantine.naturalWidth > 0) {
      // Use quarantine background with dark ambient overlay
      ctx.drawImage(this.imgQuarantine, 0, 0, w, h);
      ctx.fillStyle = 'rgba(0, 10, 5, 0.45)';
      ctx.fillRect(0, 0, w, h);
    } else {
      ctx.fillStyle = '#101416';
      ctx.fillRect(0, 0, w, h);
    }
    // Glowing red eyes inside cages
    const time = Date.now() / 600;
    const eyeAlpha = 0.5 + Math.sin(time) * 0.5;
    ctx.fillStyle = `rgba(255, 40, 40, ${eyeAlpha})`;
    ctx.beginPath();
    ctx.arc(w * 0.65, h * 0.45, 3.5, 0, Math.PI * 2);
    ctx.arc(w * 0.65 + 15, h * 0.45, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // CH-02: WARD 104 (Pure CCTV photograph with zero box overlay)
  drawWard104(ctx, w, h) {
    if (this.imgQuarantine.complete && this.imgQuarantine.naturalWidth > 0) {
      ctx.drawImage(this.imgQuarantine, 0, 0, w, h);
    } else {
      ctx.fillStyle = '#0f1a14';
      ctx.fillRect(0, 0, w, h);
    }
  }

  // CH-03: DIRECTOR OFFICE
  drawDirectorOffice(ctx, w, h) {
    ctx.fillStyle = '#161214';
    ctx.fillRect(0, 0, w, h);

    // Draw director vintage photograph on the desk wall
    if (this.imgDirector.complete && this.imgDirector.naturalWidth > 0) {
      ctx.drawImage(this.imgDirector, w * 0.35, h * 0.15, w * 0.3, h * 0.6);
      // Dark vintage shadow vignette
      const rad = ctx.createRadialGradient(w * 0.5, h * 0.45, 30, w * 0.5, h * 0.45, w * 0.4);
      rad.addColorStop(0, 'rgba(0,0,0,0)');
      rad.addColorStop(1, 'rgba(10, 5, 8, 0.85)');
      ctx.fillStyle = rad;
      ctx.fillRect(0, 0, w, h);
    }
  }

  // CH-04: DUSK COURTYARD (Seamless Floating Feimao Silhouette in Twilight Sky)
  drawCourtyard(ctx, w, h) {
    if (this.imgHero.complete && this.imgHero.naturalWidth > 0) {
      ctx.drawImage(this.imgHero, 0, 0, w, h);
    } else {
      ctx.fillStyle = '#2b1a32';
      ctx.fillRect(0, 0, w, h);
    }

    // Seamless transparent floating Feimao cutout
    const time = Date.now() / 1200;
    const floatY = Math.sin(time) * 8;
    if (this.imgFeimaoTransparent.complete && this.imgFeimaoTransparent.naturalWidth > 0) {
      ctx.save();
      ctx.globalAlpha = 0.88;
      // Position naturally in the dusk purple clouds above the clinic roof
      ctx.drawImage(this.imgFeimaoTransparent, w * 0.62, h * 0.08 + floatY, 150, 150);
      ctx.restore();
    }
  }

  // CH-05: INCINERATOR B2
  drawIncinerator(ctx, w, h) {
    if (this.imgIncinerator.complete && this.imgIncinerator.naturalWidth > 0) {
      ctx.drawImage(this.imgIncinerator, 0, 0, w, h);
    } else {
      ctx.fillStyle = '#180a0a';
      ctx.fillRect(0, 0, w, h);
      const glow = 0.5 + Math.sin(Date.now() / 300) * 0.5;
      ctx.fillStyle = `rgba(255, 60, 0, ${glow * 0.8})`;
      ctx.fillRect(w * 0.35, h * 0.5, w * 0.3, 16);
    }
  }

  // CH-06: MEAT STORAGE B1
  drawMeatStorage(ctx, w, h) {
    if (this.imgMeatStorage.complete && this.imgMeatStorage.naturalWidth > 0) {
      ctx.drawImage(this.imgMeatStorage, 0, 0, w, h);
    } else {
      ctx.fillStyle = '#0a1015';
      ctx.fillRect(0, 0, w, h);
    }
  }

  applyVisionModeEffects(ctx, w, h) {
    if (this.visionMode === 'nv') {
      // Night Vision Green Phosphor
      ctx.fillStyle = 'rgba(15, 255, 60, 0.22)';
      ctx.fillRect(0, 0, w, h);
      const rad = ctx.createRadialGradient(w/2, h/2, 40, w/2, h/2, w * 0.7);
      rad.addColorStop(0, 'rgba(40, 255, 80, 0.12)');
      rad.addColorStop(1, 'rgba(0, 0, 0, 0.65)');
      ctx.fillStyle = rad;
      ctx.fillRect(0, 0, w, h);
    } else if (this.visionMode === 'thermal') {
      // Infrared Thermal filter
      ctx.fillStyle = 'rgba(190, 20, 190, 0.25)';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(255, 180, 0, 0.14)';
      ctx.fillRect(0, 0, w, h);
    }
  }

  drawAnalogNoise(ctx, w, h) {
    // Subtle, realistic VHS noise without harsh dark bars
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    for (let i = 0; i < 15; i++) {
      const y = Math.random() * h;
      ctx.fillRect(0, y, w, Math.random() * 1.5);
    }
  }
}

window.CCTV = new CCTVSystem();
