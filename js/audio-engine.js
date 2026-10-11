/**
 * Twilight Feimao Sanctuary - 12-Track Dedicated Biological Audio Engine & Ambient BGM System
 * Default Audio Enabled + Haunting Japanese Tape/Music Box Background Ambience
 */

class DistinctPetAudioEngine {
  constructor() {
    this.isMuted = false;
    this.hasStartedBGM = false;
    this.isNightmareMode = false;
    
    // Dedicated sound track mapping for all 12 individual pets & SFX
    this.soundPaths = {
      'SPEC-001': 'assets/sounds/pet_01_calico.wav',
      'SPEC-002': 'assets/sounds/pet_02_retriever.wav',
      'SPEC-003': 'assets/sounds/pet_03_feimao.wav',
      'SPEC-004': 'assets/sounds/pet_04_blackcat.wav',
      'SPEC-005': 'assets/sounds/pet_05_rabbit.wav',
      'SPEC-006': 'assets/sounds/pet_06_pug.wav',
      'SPEC-007': 'assets/sounds/pet_07_shiba.wav',
      'SPEC-008': 'assets/sounds/pet_08_tabby.wav',
      'SPEC-009': 'assets/sounds/pet_09_fold.wav',
      'SPEC-010': 'assets/sounds/pet_10_shepherd.wav',
      'SPEC-011': 'assets/sounds/pet_11_siamese.wav',
      'SPEC-012': 'assets/sounds/pet_12_shadow.wav',
      
      // General SFX & BGM Tracks
      'bgm_ambient': 'assets/sounds/bgm_twilight_ambient.wav',
      'bgm_nightmare': 'assets/sounds/bgm_nightmare_drone.wav',
      'feimao_purr': 'assets/sounds/feimao_purr.wav',
      'cat_demonic': 'assets/sounds/cat_demonic.wav',
      'hound_howl': 'assets/sounds/hound_howl.wav',
      'jumpscare': 'assets/sounds/jumpscare.wav'
    };

    // Initialize BGM instances
    this.bgmAudio = new Audio(this.soundPaths['bgm_ambient']);
    this.bgmAudio.loop = true;
    this.bgmAudio.volume = 0.5;

    this.nightmareBgm = new Audio(this.soundPaths['bgm_nightmare']);
    this.nightmareBgm.loop = true;
    this.nightmareBgm.volume = 0.65;

    this.preloadSounds();
    this.setupAutoplayUnblocker();
  }

  preloadSounds() {
    for (const [key, path] of Object.entries(this.soundPaths)) {
      const audio = new Audio(path);
      audio.preload = 'auto';
    }
  }

  setupAutoplayUnblocker() {
    // Attempt immediate playback on load
    const tryAutoplay = () => {
      if (this.isMuted || this.hasStartedBGM) return;
      this.bgmAudio.play().then(() => {
        this.hasStartedBGM = true;
        this.updateAudioButtonUI(true);
      }).catch(() => {
        // Autoplay policy prevented immediate play without user gesture;
        // Bind to the very first user interaction event
        this.bindFirstInteraction();
      });
    };

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      tryAutoplay();
    } else {
      window.addEventListener('DOMContentLoaded', tryAutoplay);
    }
  }

  bindFirstInteraction() {
    const unblockHandler = () => {
      if (!this.hasStartedBGM && !this.isMuted) {
        this.startBGM();
      }
      // Clean up event listeners after first trigger
      ['pointerdown', 'click', 'touchstart', 'scroll', 'keydown', 'mousemove'].forEach(evt => {
        window.removeEventListener(evt, unblockHandler);
        document.removeEventListener(evt, unblockHandler);
      });
    };

    ['pointerdown', 'click', 'touchstart', 'scroll', 'keydown', 'mousemove'].forEach(evt => {
      window.addEventListener(evt, unblockHandler, { passive: true, once: false });
      document.addEventListener(evt, unblockHandler, { passive: true, once: false });
    });
  }

  startBGM() {
    if (this.isMuted) return;
    this.hasStartedBGM = true;
    
    if (this.isNightmareMode) {
      this.nightmareBgm.play().catch(e => console.warn("Nightmare BGM blocked:", e));
    } else {
      this.bgmAudio.play().catch(e => console.warn("Ambient BGM blocked:", e));
    }
    this.updateAudioButtonUI(true);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.bgmAudio.pause();
      this.nightmareBgm.pause();
      this.updateAudioButtonUI(false);
      return false;
    } else {
      this.hasStartedBGM = true;
      if (this.isNightmareMode) {
        this.nightmareBgm.play().catch(e => console.warn(e));
      } else {
        this.bgmAudio.play().catch(e => console.warn(e));
      }
      this.updateAudioButtonUI(true);
      return true;
    }
  }

  updateAudioButtonUI(isPlaying) {
    const audioBtn = document.getElementById('btnAudioToggle');
    if (audioBtn) {
      audioBtn.classList.toggle('playing', isPlaying);
      audioBtn.textContent = isPlaying ? '🔊' : '🔇';
      audioBtn.title = isPlaying ? '诊所背景音频 (正在播放)' : '诊所背景音频 (已静音)';
    }
  }

  playDirect(soundKey, volume = 1.0) {
    if (this.isMuted) return;
    const path = this.soundPaths[soundKey] || this.soundPaths['SPEC-001'];
    if (path) {
      try {
        const audio = new Audio(path);
        audio.volume = Math.max(0, Math.min(1, volume));
        audio.play().catch(e => console.warn("Audio playback blocked:", e));
      } catch (e) {
        console.warn("Audio instance error:", e);
      }
    }
  }

  // 1. Play Specific Pet's Own Dedicated Vocalization
  playPetSound(petId, corrupted = false) {
    if (corrupted) {
      // Blend demonic horror sound with pet voice
      this.playDirect(petId, 0.85);
      setTimeout(() => {
        this.playDirect('cat_demonic', 0.9);
      }, 150);
    } else {
      this.playDirect(petId, 1.0);
    }
  }

  // 2. Feimao Purr
  playFeimaoPurr() {
    this.playDirect('feimao_purr', 0.95);
  }

  // 3. Jumpscare
  playJumpscare() {
    this.playDirect('jumpscare', 1.0);
  }

  // 4. Heartbeat
  playHeartbeat() {
    this.playDirect('feimao_purr', 0.35);
  }

  // 5. Interface Click
  playClick() {
    // Optional click tick
  }

  setCorruption(percent) {
    if (percent > 65 && !this.isNightmareMode) {
      this.isNightmareMode = true;
      if (!this.isMuted) {
        // Crossfade to nightmare sub-bass drone
        this.bgmAudio.pause();
        this.nightmareBgm.currentTime = 0;
        this.nightmareBgm.play().catch(e => console.warn(e));
      }
    } else if (percent <= 65 && this.isNightmareMode) {
      this.isNightmareMode = false;
      if (!this.isMuted) {
        this.nightmareBgm.pause();
        this.bgmAudio.play().catch(e => console.warn(e));
      }
    }
  }
}

window.HorrorAudio = new DistinctPetAudioEngine();
