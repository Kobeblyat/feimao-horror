/**
 * Twilight Feimao Sanctuary - Corruption & Sanity State Machine
 * Fully Dramatized SAN = 0% Complete Reality Collapse System
 */

class CorruptionSystem {
  constructor() {
    this.corruption = 0; // 0 to 100
    this.sanity = 100;    // 100 to 0
    this.collectedKeys = new Set();
    this.discoveredSecrets = new Set();
    this.jumpscareCooldown = false;
    this.isCollapsed = false;
    
    // Preload jumpscare images immediately
    this.preloadedJumpscares = [
      'assets/jumpscare_feimao.jpg',
      'assets/jumpscare_ward104.jpg',
      'assets/jumpscare_feeding.jpg'
    ].map(src => {
      const img = new Image();
      img.src = src;
      return img;
    });

    this.init();
  }

  init() {
    this.updateUI();
  }

  addCorruption(amount, reason = "") {
    if (this.isCollapsed) return;

    const prev = this.corruption;
    this.corruption = Math.min(100, Math.max(0, this.corruption + amount));
    this.sanity = Math.max(0, 100 - this.corruption);

    if (this.corruption !== prev) {
      this.onCorruptionChange(reason);
    }
  }

  drainSanity(amount) {
    this.addCorruption(amount * 1.25);
    if (window.HorrorAudio) {
      window.HorrorAudio.playHeartbeat();
    }
  }

  addKey(keyName, description) {
    if (!this.collectedKeys.has(keyName)) {
      this.collectedKeys.add(keyName);
      this.showToast(`[获得绝密密钥] ${keyName}: ${description}`);
      this.addCorruption(18, `Unlocked ${keyName}`);
      this.checkEndingPrerequisites();
    }
  }

  onCorruptionChange(reason) {
    this.updateUI();
    if (window.HorrorAudio) window.HorrorAudio.setCorruption(this.corruption);

    const body = document.body;
    body.classList.remove('corrupted-low', 'corrupted-mid', 'corrupted-high');

    // Check for TOTAL SANITY COLLAPSE (SAN = 0%)
    if (this.sanity <= 0 || this.corruption >= 100) {
      this.triggerSanityCollapse();
      return;
    }

    if (this.corruption >= 60) {
      body.classList.add('corrupted-high');
      this.showStalker(true);
    } else if (this.corruption >= 30) {
      body.classList.add('corrupted-mid');
      if (Math.random() < 0.5) this.showStalker(true);
    } else if (this.corruption >= 10) {
      body.classList.add('corrupted-low');
    }

    // Corrupt random text on page
    if (this.corruption > 35 && Math.random() < 0.5) {
      this.corruptRandomText();
    }

    // High milestone jumpscare
    if (this.corruption >= 66 && !this.discoveredSecrets.has('jumpscare_66') && !this.jumpscareCooldown) {
      this.discoveredSecrets.add('jumpscare_66');
      this.triggerJumpscare("它在看着你...不要领养它！");
    }
  }

  // =========================================================================
  // SAN = 0% COMPLETE SANITY COLLAPSE (灾难级现实崩塌与异化)
  // =========================================================================
  triggerSanityCollapse() {
    if (this.isCollapsed) return;
    this.isCollapsed = true;

    const body = document.body;
    const siteWrapper = document.getElementById('siteWrapper');
    body.classList.add('san-zero-nightmare');
    if (siteWrapper) siteWrapper.classList.add('screen-shake');

    // 1. Audio Terror
    if (window.HorrorAudio) {
      window.HorrorAudio.playDirect('cat_demonic', 1.0);
      window.HorrorAudio.playFeimaoPurr();
      // Rapid intense heartbeat loop
      const heartbeatLoop = setInterval(() => {
        if (!this.isCollapsed) { clearInterval(heartbeatLoop); return; }
        window.HorrorAudio.playHeartbeat();
      }, 400);
    }

    // 2. Traumatic Text Scramble Across the ENTIRE Website
    this.corruptEntirePageText();

    // 3. Force Open Live Chat with Red Emergency Overwrite
    if (window.Chat) {
      window.Chat.isOpen = true;
      const chatWin = document.getElementById('chatWindow');
      if (chatWin) chatWin.classList.add('active');
      window.Chat.addMessage("【系统核心崩溃】访客精神防线已彻底瓦解。", 'spooky');
      window.Chat.addMessage("‘你 找 到 我 了 ... 现 在 ， 轮 到 你 成 为 肥 猫 的 一 部 分 了 。’", 'spooky');
    }

    // 4. Show Massive Jumpscare Warning
    this.showToast("⚠️【SAN值彻底归零】精神同化程序已启动！无法终止！");
    this.triggerJumpscare("理 智 归 零 · 同 化 降 临");

    // 5. Automatic Transition to Ending B (Assimilation) after 7 seconds of madness
    setTimeout(() => {
      if (window.MainController) {
        window.MainController.triggerEnding('B');
      }
    }, 7000);
  }

  corruptEntirePageText() {
    const headings = document.querySelectorAll('h1, h2, h3, .nav-link, .btn-primary, .btn-secondary, .ticker-item');
    const horrorPhrases = [
      "【你 的 意 识 已 被 剥 离】",
      "【它 就 在 你 的 身 后】",
      "【为 什 么 不 看 着 我】",
      "【救 命 救 命 救 命】",
      "【肉 体 溶 解 中 ...】",
      "【门 已 经 锁 死 了】",
      "【肥 猫 降 临 肥 猫 降 临】",
      "【升 华 升 华 升 华】"
    ];

    headings.forEach(el => {
      const phrase = horrorPhrases[Math.floor(Math.random() * horrorPhrases.length)];
      el.innerHTML = `<span class="glitch-text" data-text="${phrase}">${phrase}</span>`;
    });

    const paragraphs = document.querySelectorAll('.pet-desc, .hero-desc, .section-intro, .footer-col p');
    paragraphs.forEach(p => {
      p.innerHTML = `<span class="glitch-text" data-text="不要回头不要回头不要回头不要回头">不要回头...它的呼噜声已经在你的耳朵里响起了...所有的猫都是肥猫的分身...你也是...</span>`;
    });
  }

  showStalker(show) {
    const stalker = document.getElementById('feimaoStalker');
    if (stalker) {
      if (show) {
        stalker.classList.add('visible');
        setTimeout(() => {
          if (Math.random() < 0.6 && !this.isCollapsed) stalker.classList.remove('visible');
        }, 6000);
      } else {
        stalker.classList.remove('visible');
      }
    }
  }

  triggerJumpscare(caption = "肥 猫 降 临", customImg = 'assets/jumpscare_feimao.jpg', duration = 2200) {
    if (this.jumpscareCooldown) return;
    this.jumpscareCooldown = true;

    const modal = document.getElementById('jumpscareModal');
    const capEl = document.getElementById('jumpscareCaption');
    const imgEl = modal ? modal.querySelector('.jumpscare-img') : null;
    const siteWrapper = document.getElementById('siteWrapper');

    if (modal) {
      // Pin to exact current scroll offset so it's always in view
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      modal.style.top = `${scrollY}px`;
      modal.style.left = '0px';
      modal.style.width = '100vw';
      modal.style.height = `${window.innerHeight}px`;

      if (capEl) capEl.textContent = caption;
      if (imgEl) {
        imgEl.src = customImg;
        imgEl.style.display = 'block';
        imgEl.style.opacity = '1';
        imgEl.style.visibility = 'visible';
      }
      modal.classList.add('active');
      if (siteWrapper) siteWrapper.classList.add('screen-shake');

      if (window.HorrorAudio) {
        window.HorrorAudio.playJumpscare();
      }

      setTimeout(() => {
        modal.classList.remove('active');
        if (siteWrapper && !this.isCollapsed) siteWrapper.classList.remove('screen-shake');
        setTimeout(() => {
          this.jumpscareCooldown = false;
        }, 2000);
      }, duration);
    }
  }

  corruptRandomText() {
    const elements = document.querySelectorAll('.pet-desc, .hero-desc, .section-intro');
    if (elements.length === 0) return;
    const target = elements[Math.floor(Math.random() * elements.length)];
    const creepyPhrases = [
      "请不要在黄昏时对视...它的眼睛没有焦距...",
      "所有的猫最后都会变成肥猫的一部分...",
      "肉块正在地下二层滋生，不要听它的呼噜声...",
      "1999年10月31日，全院员工未曾离开...",
      "领养手续完成后，你将成为新的容器..."
    ];
    target.innerHTML = `<span class="glitch-text" data-text="${target.textContent}">${creepyPhrases[Math.floor(Math.random() * creepyPhrases.length)]}</span>`;
  }

  updateUI() {
    const sanityVal = document.getElementById('sanityValue');
    const sanityDot = document.getElementById('sanityDot');

    if (sanityVal) sanityVal.textContent = `SAN: ${Math.round(this.sanity)}%`;

    if (sanityDot) {
      if (this.sanity > 65) {
        sanityDot.style.background = '#22c55e';
        sanityDot.style.boxShadow = '0 0 8px #22c55e';
      } else if (this.sanity > 35) {
        sanityDot.style.background = '#eab308';
        sanityDot.style.boxShadow = '0 0 8px #eab308';
      } else {
        sanityDot.style.background = '#ef4444';
        sanityDot.style.boxShadow = '0 0 16px #ff0000';
      }
    }
  }

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'horror-toast';
    toast.style.cssText = `
      position: fixed;
      top: 85px;
      left: 50%;
      transform: translateX(-50%);
      background: #190a0f;
      color: #ff3333;
      border: 2px solid #ff0000;
      padding: 12px 28px;
      border-radius: 6px;
      font-family: var(--font-mono);
      font-size: 0.95rem;
      font-weight: bold;
      z-index: 100000;
      box-shadow: 0 0 30px rgba(255,0,0,0.7);
      animation: toastSlide 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.5s ease';
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  }

  checkEndingPrerequisites() {
    if (this.collectedKeys.size >= 4) {
      this.showToast("【核心协议已就绪】所有 4 枚密钥已集齐！前往员工终端输入 [ending_protocol] 触发终极破晓！");
    }
  }
}

window.Corruption = new CorruptionSystem();
