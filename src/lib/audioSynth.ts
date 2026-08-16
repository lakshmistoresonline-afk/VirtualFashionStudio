// Web Audio API Synthesizer for Background Music & Narration

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private voiceGain: GainNode | null = null;
  private isPlayingMusic = false;
  private musicInterval: any = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
      
      this.musicGain = this.ctx.createGain();
      this.voiceGain = this.ctx.createGain();

      this.musicGain.gain.value = 0.25;
      this.voiceGain.gain.value = 0.9;

      this.musicGain.connect(this.ctx.destination);
      this.voiceGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play realistic traditional / modern ambient music loop
  public startMusic(mood: string = 'traditional_kerala', volume = 0.25) {
    this.initContext();
    if (!this.ctx || !this.musicGain) return;
    this.stopMusic();

    this.isPlayingMusic = true;
    this.musicGain.gain.setValueAtTime(volume, this.ctx.currentTime);

    // Traditional Kerala Mohanam Scale (Sa Ri Ga Pa Dha Sa: 261, 293, 329, 392, 440)
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
    let noteIndex = 0;

    const playNote = () => {
      if (!this.isPlayingMusic || !this.ctx || !this.musicGain) return;

      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      
      const freq = scale[noteIndex % scale.length];
      noteIndex = (noteIndex + (Math.random() > 0.4 ? 1 : 2)) % scale.length;

      osc.type = mood.includes('traditional') ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      noteGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      noteGain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 0.08);
      noteGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.7);

      osc.connect(noteGain);
      noteGain.connect(this.musicGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.8);
    };

    // Trigger rhythm
    this.musicInterval = setInterval(playNote, 400);
  }

  public stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  public setMusicVolume(vol: number) {
    if (this.ctx && this.musicGain) {
      this.musicGain.gain.setValueAtTime(Math.max(0, Math.min(1, vol)), this.ctx.currentTime);
    }
  }

  // Speak script using browser speech synthesis
  public speak(text: string, language: string = 'ml-IN', onEnd?: () => void) {
    if (!('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang.startsWith(language.substring(0, 2)) || v.lang.includes('IN'));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  }

  public stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public stopAll() {
    this.stopMusic();
    this.stopSpeech();
  }
}

export const audioSynth = new AudioSynthesizer();
