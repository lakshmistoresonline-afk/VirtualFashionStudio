import { ReelProject, FashionShot, ScriptSegment } from '../types';

export interface RenderProgressCallback {
  (progressPercent: number, statusMessage: string): void;
}

export class VideoCompositor {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width = 720;
  private height = 1280;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d')!;
  }

  private async loadImages(urls: string[]): Promise<HTMLImageElement[]> {
    return Promise.all(
      urls.map(
        (url) =>
          new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = () => {
              const fallback = document.createElement('canvas');
              fallback.width = 720;
              fallback.height = 1280;
              const fctx = fallback.getContext('2d')!;
              fctx.fillStyle = '#1c1917';
              fctx.fillRect(0, 0, 720, 1280);
              const fbImg = new Image();
              fbImg.src = fallback.toDataURL();
              fbImg.onload = () => resolve(fbImg);
            };
            img.src = url;
          })
      )
    );
  }

  /**
   * High-Fidelity Talking Model Simulation (Free Path)
   * Animates the model's mouth based on speech synthesis activity
   */
  private drawTalkingMouth(
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    intensity: number,
    scale: number
  ) {
    ctx.save();
    // Locate mouth relative to face center
    const mouthY = centerY + (40 * scale);
    const mouthW = (30 * scale) + (intensity * 10);
    const mouthH = (5 * scale) + (intensity * 20);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.beginPath();
    ctx.ellipse(centerX, mouthY, mouthW / 2, mouthH / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Subtle lip highlight
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }

  public async exportReelVideo(
    reel: ReelProject,
    onProgress?: RenderProgressCallback
  ): Promise<Blob> {
    const shotImages = await this.loadImages(reel.shots.map((s) => s.imageUrl));
    const [originalProductImg] = reel.originalImage ? await this.loadImages([reel.originalImage]).catch(() => []) : [];
    const [modelAvatarImg] = reel.modelProfile?.avatarUrl ? await this.loadImages([reel.modelProfile.avatarUrl]).catch(() => []) : [];

    const totalDuration = reel.durationSec || 15;
    const fps = 30;
    const totalFrames = totalDuration * fps;
    const shotDuration = totalDuration / Math.max(1, reel.shots.length);

    const stream = this.canvas.captureStream(fps);
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9') ? 'video/webm;codecs=vp9' : 'video/webm'
    });

    const recordedChunks: Blob[] = [];
    mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) recordedChunks.push(e.data); };

    return new Promise((resolve) => {
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/mp4' });
        resolve(blob);
      };

      mediaRecorder.start();

      let currentFrame = 0;
      const renderLoop = () => {
        if (currentFrame >= totalFrames) {
          mediaRecorder.stop();
          return;
        }

        const currentTime = currentFrame / fps;
        if (onProgress && currentFrame % 30 === 0) {
          onProgress(Math.round((currentFrame / totalFrames) * 100), `Rendering Scene ${Math.floor(currentTime / shotDuration) + 1}...`);
        }

        const currentShotIndex = Math.min(shotImages.length - 1, Math.floor(currentTime / shotDuration));
        const shotProgress = (currentTime % shotDuration) / shotDuration;
        const img = shotImages[currentShotIndex];
        const shot = reel.shots[currentShotIndex];

        // 1. Clear Canvas
        this.ctx.fillStyle = '#09090b';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // 2. Draw Main Fashion Visual with Movement
        if (img) {
          this.ctx.save();
          let scale = 1.0;
          if (shot?.cameraMovement === 'slow_push') scale = 1.0 + shotProgress * 0.1;
          else if (shot?.cameraMovement === 'slow_pull') scale = 1.1 - shotProgress * 0.1;

          const dW = this.width * scale;
          const dH = this.height * scale;
          this.ctx.drawImage(img, (this.width - dW) / 2, (this.height - dH) / 2, dW, dH);
          this.ctx.restore();
        }

        // 3. Talking Model Logic (Free Simulation)
        const currentSegment = reel.script.scriptSegments?.find(s => currentTime >= s.startTime && currentTime <= s.endTime);
        if (currentSegment?.type === 'TALKING_MODEL' || currentSegment?.type === 'CTA') {
          // Detect mouth position (usually center-ish in our generated SVGs)
          const faceCenterX = this.width / 2;
          const faceCenterY = 260; // Standard Y for our compositor faces
          const intensity = Math.abs(Math.sin(currentTime * 12)); // Simulated speech intensity
          this.drawTalkingMouth(this.ctx, faceCenterX, faceCenterY, intensity, 1.0);
        }

        // 4. Overlays & Branding (Static)
        // [Simplified for performance during export]
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 24px sans-serif';
        this.ctx.textAlign = 'center';

        const sub = reel.script.subtitles?.find(s => currentTime >= s.startTime && currentTime <= s.endTime);
        if (sub) {
          this.ctx.fillStyle = 'rgba(0,0,0,0.7)';
          this.ctx.fillRect(40, this.height - 240, this.width - 80, 100);
          this.ctx.fillStyle = 'white';
          this.ctx.fillText(sub.textMl, this.width / 2, this.height - 180);
          this.ctx.fillStyle = '#fbbf24';
          this.ctx.font = '18px sans-serif';
          this.ctx.fillText(sub.textEn, this.width / 2, this.height - 150);
        }

        currentFrame++;
        requestAnimationFrame(renderLoop);
      };

      renderLoop();
    });
  }
}

export const videoCompositor = new VideoCompositor();
