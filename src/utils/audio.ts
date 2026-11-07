// Native Web Audio API Sound Synthesizer for Tactical Aerospace HUD
// Zero external sound asset dependencies - 100% procedurally synthesized in-browser

class AerospaceAudioEngine {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = true;
  private windGain: GainNode | null = null;
  private windFilter: BiquadFilterNode | null = null;
  private windSource: AudioBufferSourceNode | null = null;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopWindTunnelSound();
    }
    return this.isMuted;
  }

  // Tactical click / blip sound for HUD buttons
  public playHudBeep(freq: number = 880, duration: number = 0.05) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // Sonic Boom low-frequency shockwave rumble
  public playSonicBoom() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      // Two low-frequency pulses (N-wave double boom)
      [0, 0.12].forEach((delay) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(95, this.ctx!.currentTime + delay);
        osc.frequency.exponentialRampToValueAtTime(30, this.ctx!.currentTime + delay + 0.35);

        gain.gain.setValueAtTime(0.25, this.ctx!.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + delay + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(this.ctx!.currentTime + delay);
        osc.stop(this.ctx!.currentTime + delay + 0.45);
      });
    } catch (e) {}
  }

  // Stall Warning horn (dual tone alarm)
  public playStallWarning() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.setValueAtTime(350, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch (e) {}
  }

  // Continuous wind tunnel pink noise airflow
  public setWindTunnelAirflow(speedKmh: number, isRunning: boolean) {
    if (this.isMuted || !isRunning) {
      this.stopWindTunnelSound();
      return;
    }

    try {
      this.initContext();
      if (!this.ctx) return;

      if (!this.windSource) {
        // Generate 2 seconds of pink/white noise buffer
        const bufferSize = this.ctx.sampleRate * 2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          data[i] = (b0 + b1 + b2) * 0.1;
        }

        this.windSource = this.ctx.createBufferSource();
        this.windSource.buffer = buffer;
        this.windSource.loop = true;

        this.windFilter = this.ctx.createBiquadFilter();
        this.windFilter.type = 'lowpass';
        this.windFilter.frequency.setValueAtTime(300, this.ctx.currentTime);

        this.windGain = this.ctx.createGain();
        this.windGain.gain.setValueAtTime(0.01, this.ctx.currentTime);

        this.windSource.connect(this.windFilter);
        this.windFilter.connect(this.windGain);
        this.windGain.connect(this.ctx.destination);

        this.windSource.start();
      }

      // Modulate frequency and volume based on airspeed
      if (this.windFilter && this.windGain) {
        const normSpeed = Math.min(1.0, speedKmh / 2000);
        const cutoff = 250 + normSpeed * 1200;
        const volume = 0.01 + normSpeed * 0.04;
        this.windFilter.frequency.setTargetAtTime(cutoff, this.ctx.currentTime, 0.1);
        this.windGain.gain.setTargetAtTime(volume, this.ctx.currentTime, 0.1);
      }
    } catch (e) {}
  }

  public stopWindTunnelSound() {
    if (this.windSource) {
      try {
        this.windSource.stop();
        this.windSource.disconnect();
      } catch (e) {}
      this.windSource = null;
      this.windGain = null;
      this.windFilter = null;
    }
  }
}

export const soundFx = new AerospaceAudioEngine();

