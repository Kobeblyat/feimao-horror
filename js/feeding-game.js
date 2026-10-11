/**
 * Twilight Feimao Sanctuary - Night Feeding Protocol Simulation Game
 */

class FeedingGame {
  constructor() {
    this.isActive = false;
    this.timer = 40;
    this.timerInterval = null;
    this.gazeMeter = 0;
    this.gazeInterval = null;
    this.requiredSequence = ['meat', 'water', 'tribute'];
    this.currentStep = 0;
    this.isLookingAtFeimao = false;
    
    this.init();
  }

  init() {
    const startBtn = document.getElementById('btnStartFeeding');
    const closeBtn = document.getElementById('btnFeedingClose');
    const modal = document.getElementById('feedingModal');

    if (startBtn) {
      startBtn.addEventListener('click', () => this.start());
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.stop());
    }

    // Feeding dish action buttons
    document.querySelectorAll('.btn-feed-dish').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!this.isActive) return;
        const dishType = btn.dataset.dish;
        this.submitDish(dishType);
      });
    });

    // Eye contact detection via mouse enter/leave on Feimao viewport
    const feimaoTarget = document.getElementById('feedingFeimao');
    if (feimaoTarget) {
      feimaoTarget.addEventListener('mouseenter', () => {
        this.isLookingAtFeimao = true;
      });
      feimaoTarget.addEventListener('mouseleave', () => {
        this.isLookingAtFeimao = false;
      });
    }
  }

  start() {
    this.isActive = true;
    this.timer = 40;
    this.gazeMeter = 0;
    this.currentStep = 0;
    
    const modal = document.getElementById('feedingModal');
    if (modal) modal.classList.add('active');

    this.updateHUD();

    if (window.HorrorAudio) {
      window.HorrorAudio.playFeimaoPurr();
      window.HorrorAudio.playHeartbeat(80);
    }

    // Timer countdown
    this.timerInterval = setInterval(() => {
      this.timer--;
      this.updateHUD();
      if (this.timer <= 0) {
        this.fail("时间耗尽：未能按时完成供奉，夜班巡检被吞噬！");
      }
    }, 1000);

    // Gaze check interval
    this.gazeInterval = setInterval(() => {
      if (this.isLookingAtFeimao) {
        this.gazeMeter += 15;
        if (window.HorrorAudio) window.HorrorAudio.playHeartbeat(120);
      } else {
        this.gazeMeter = Math.max(0, this.gazeMeter - 8);
      }
      this.updateHUD();

      if (this.gazeMeter >= 100) {
        this.fail("直视禁忌：你与肥猫对视超过允许极限，意识被夺取！");
      }
    }, 300);
  }

  stop() {
    this.isActive = false;
    clearInterval(this.timerInterval);
    clearInterval(this.gazeInterval);
    const modal = document.getElementById('feedingModal');
    if (modal) modal.classList.remove('active');
  }

  submitDish(dish) {
    if (dish === this.requiredSequence[this.currentStep]) {
      this.currentStep++;
      if (window.HorrorAudio) window.HorrorAudio.playClick();
      
      const stepMsg = document.getElementById('feedingStatusText');
      if (stepMsg) stepMsg.textContent = `供奉进度: ${this.currentStep} / 3 完成...`;

      if (this.currentStep >= this.requiredSequence.length) {
        this.win();
      }
    } else {
      this.fail("贡品顺序错误：触怒了暮色神明！");
    }
  }

  win() {
    this.stop();
    if (window.Corruption) {
      window.Corruption.addKey('KEY-03 [供奉信物]', '成功完成午夜喂养仪式，肥猫留下了黑色秘钥 [代码: FEED-SAFE-1999]');
      window.Corruption.showToast("【夜班喂食仪式成功】获得 KEY-03！");
    }
    if (window.HorrorAudio) window.HorrorAudio.playFeimaoPurr();
  }

  fail(reason) {
    this.stop();
    if (window.Corruption) {
      window.Corruption.drainSanity(30);
      window.Corruption.triggerJumpscare("违 规 喂 食 // 吞 噬", "assets/jumpscare_feeding.jpg");
      window.Corruption.showToast(`[供奉失败] ${reason}`);
    }
  }

  updateHUD() {
    const timeEl = document.getElementById('feedingTimer');
    const gazeEl = document.getElementById('feedingGazeMeter');
    if (timeEl) timeEl.textContent = `剩余时间: ${this.timer}s`;
    if (gazeEl) {
      gazeEl.textContent = `对视危险度: ${this.gazeMeter}%`;
      gazeEl.style.color = this.gazeMeter > 60 ? '#ef4444' : '#4ade80';
    }
  }
}

window.Feeding = new FeedingGame();
