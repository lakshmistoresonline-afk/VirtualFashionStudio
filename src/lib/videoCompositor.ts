import { ReelProject } from '../types';

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

  // Preload image elements
  private async loadImages(urls: string[]): Promise<HTMLImageElement[]> {
    return Promise.all(
      urls.map(
        (url) =>
          new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = () => {
              // Create fallback color canvas if image fails to load
              const fallback = document.createElement('canvas');
              fallback.width = 720;
              fallback.height = 1280;
              const fctx = fallback.getContext('2d')!;
              fctx.fillStyle = '#831843';
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

  // Preload video elements
  private async loadVideos(urls: string[]): Promise<Map<string, HTMLVideoElement>> {
    const videoMap = new Map<string, HTMLVideoElement>();
    const validUrls = urls.filter(url => url && url.startsWith('http'));

    await Promise.all(
      validUrls.map(
        (url) =>
          new Promise<void>((resolve) => {
            const video = document.createElement('video');
            video.src = url;
            video.crossOrigin = 'anonymous';
            video.muted = true;
            video.preload = 'auto';
            video.oncanplaythrough = () => {
              videoMap.set(url, video);
              resolve();
            };
            video.onerror = () => {
              console.warn(`Failed to load video: ${url}`);
              resolve();
            };
          })
      )
    );
    return videoMap;
  }

  // Export video using MediaRecorder and canvas stream
  public async exportReelVideo(
    reel: ReelProject,
    onProgress?: RenderProgressCallback
  ): Promise<Blob> {
    const shotImages = await this.loadImages(reel.shots.map((s) => s.imageUrl));
    const videoUrls = reel.shots.map(s => s.videoClipUrl).filter(Boolean) as string[];
    const videoMap = await this.loadVideos(videoUrls);
    const [originalProductImg] = reel.originalImage ? await this.loadImages([reel.originalImage]).catch(() => []) : [];
    const [modelAvatarImg] = reel.modelProfile?.avatarUrl ? await this.loadImages([reel.modelProfile.avatarUrl]).catch(() => []) : [];
    
    const totalDuration = reel.durationSec || 15;
    const fps = 30;
    const totalFrames = totalDuration * fps;
    const shotDuration = totalDuration / Math.max(1, reel.shots.length);

    const stream = this.canvas.captureStream(fps);
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm'
    });

    const recordedChunks: Blob[] = [];
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }
    };

    return new Promise((resolve, reject) => {
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
        const progress = Math.round((currentFrame / totalFrames) * 100);
        if (onProgress && currentFrame % 10 === 0) {
          onProgress(progress, `Compositing Frame ${currentFrame}/${totalFrames} (9:16 HD)...`);
        }

        // Determine current shot index
        const currentShotIndex = Math.min(
          shotImages.length - 1,
          Math.floor(currentTime / shotDuration)
        );
        const shotProgress = (currentTime % shotDuration) / shotDuration;
        const img = shotImages[currentShotIndex];
        const shot = reel.shots[currentShotIndex];
        const video = shot?.videoClipUrl ? videoMap.get(shot.videoClipUrl) : null;

        // 1. Draw Background & Image/Video with Motion
        this.ctx.fillStyle = '#0f172a';
        this.ctx.fillRect(0, 0, this.width, this.height);

        if (video) {
          // Play video at correct time
          video.currentTime = currentTime % video.duration;
          this.ctx.drawImage(video, 0, 0, this.width, this.height);
        } else if (img) {
          this.ctx.save();
          // Camera motion calculation
          let scale = 1.0;
          let offsetY = 0;

          if (shot?.cameraMovement === 'slow_push') {
            scale = 1.0 + shotProgress * 0.08;
          } else if (shot?.cameraMovement === 'slow_pull') {
            scale = 1.08 - shotProgress * 0.08;
          } else if (shot?.cameraMovement === 'macro_pan') {
            scale = 1.15;
            offsetY = (shotProgress - 0.5) * 40;
          } else {
            scale = 1.02 + Math.sin(shotProgress * Math.PI) * 0.04;
          }

          const drawWidth = this.width * scale;
          const drawHeight = this.height * scale;
          const offsetX = (this.width - drawWidth) / 2;
          const drawOffsetY = (this.height - drawHeight) / 2 + offsetY;

          this.ctx.drawImage(img, offsetX, drawOffsetY, drawWidth, drawHeight);
          this.ctx.restore();
        }

        // 2. Subtle Cinematic Top & Bottom Vignette / Gradients
        const gradTop = this.ctx.createLinearGradient(0, 0, 0, 240);
        gradTop.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
        gradTop.addColorStop(1, 'rgba(0, 0, 0, 0)');
        this.ctx.fillStyle = gradTop;
        this.ctx.fillRect(0, 0, this.width, 240);

        const gradBottom = this.ctx.createLinearGradient(0, this.height - 360, 0, this.height);
        gradBottom.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradBottom.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
        this.ctx.fillStyle = gradBottom;
        this.ctx.fillRect(0, this.height - 360, this.width, 360);

        // 3. Header Branding Badge
        this.ctx.save();
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        this.ctx.font = 'bold 26px "Plus Jakarta Sans", sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.shadowColor = 'rgba(0,0,0,0.5)';
        this.ctx.shadowBlur = 8;
        this.ctx.fillText(reel.brand.name || 'AI Fashion Studio', this.width / 2, 60);

        this.ctx.fillStyle = '#f59e0b';
        this.ctx.font = '16px "Plus Jakarta Sans", sans-serif';
        this.ctx.fillText(reel.brand.tagline || 'Exclusive Fashion Collection', this.width / 2, 90);
        this.ctx.restore();

        // 3b. AI Model Presenter Overlay & Talking Equalizer (Top-Left)
        this.ctx.save();
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        this.ctx.roundRect?.(28, 120, 210, 52, 26);
        this.ctx.fill();

        if (modelAvatarImg) {
          this.ctx.save();
          this.ctx.beginPath();
          this.ctx.arc(54, 146, 20, 0, Math.PI * 2);
          this.ctx.closePath();
          this.ctx.clip();
          this.ctx.drawImage(modelAvatarImg, 34, 126, 40, 40);
          this.ctx.restore();

          // Border around avatar
          this.ctx.strokeStyle = '#f43f5e';
          this.ctx.lineWidth = 2;
          this.ctx.beginPath();
          this.ctx.arc(54, 146, 20, 0, Math.PI * 2);
          this.ctx.stroke();
        }

        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
        this.ctx.textAlign = 'left';
        this.ctx.fillText((reel.modelProfile.name || 'AI Presenter').split(' ')[0], 82, 140);

        this.ctx.fillStyle = '#fb7185';
        this.ctx.font = '11px "Plus Jakarta Sans", sans-serif';
        this.ctx.fillText('● Explaining', 82, 158);

        // Sound waves
        const waveH1 = 4 + Math.sin(currentTime * 8) * 4;
        const waveH2 = 6 + Math.cos(currentTime * 10) * 5;
        const waveH3 = 5 + Math.sin(currentTime * 12 + 1) * 5;
        this.ctx.fillStyle = '#10b981';
        this.ctx.fillRect(160, 146 - waveH1 / 2, 3, waveH1);
        this.ctx.fillRect(167, 146 - waveH2 / 2, 3, waveH2);
        this.ctx.fillRect(174, 146 - waveH3 / 2, 3, waveH3);
        this.ctx.restore();

        // 3c. Uploaded Garment PIP (Top-Right)
        if (originalProductImg) {
          this.ctx.save();
          this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
          this.ctx.roundRect?.(this.width - 105, 115, 75, 95, 12);
          this.ctx.fill();
          this.ctx.strokeStyle = '#f59e0b';
          this.ctx.lineWidth = 2;
          this.ctx.stroke();

          // Draw uploaded product thumbnail
          this.ctx.drawImage(originalProductImg, this.width - 100, 120, 65, 70);
          
          this.ctx.fillStyle = '#f59e0b';
          this.ctx.font = 'bold 9px "Plus Jakarta Sans", sans-serif';
          this.ctx.textAlign = 'center';
          this.ctx.fillText('UPLOADED', this.width - 67, 202);
          this.ctx.restore();
        }

        // 3d. Synchronized Feature Callout
        this.ctx.save();
        let calloutTitle = '✨ 100% Weave Matched';
        let calloutSub = reel.productName;
        if (currentTime >= 3 && currentTime < 6) {
          calloutTitle = '✨ Artisan Border & Zari';
          calloutSub = 'Handwoven Precision';
        } else if (currentTime >= 6 && currentTime < 9) {
          calloutTitle = `✨ ${reel.modelProfile.name}`;
          calloutSub = 'Authentic Drape Fit';
        } else if (currentTime >= 9 && currentTime < 12) {
          calloutTitle = '✨ Verified Quality Passed';
          calloutSub = `${reel.fidelity.overallScore}% Optical Score`;
        } else if (currentTime >= 12) {
          calloutTitle = '📲 WhatsApp To Order';
          calloutSub = reel.brand.whatsapp || 'Fast Dispatch';
        }

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.roundRect?.(28, 185, 230, 36, 10);
        this.ctx.fill();
        this.ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();

        this.ctx.fillStyle = '#fbbf24';
        this.ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(calloutTitle, 38, 202);

        this.ctx.fillStyle = '#e2e8f0';
        this.ctx.font = '10px "Plus Jakarta Sans", sans-serif';
        this.ctx.fillText(calloutSub.length > 26 ? calloutSub.substring(0, 24) + '...' : calloutSub, 38, 215);
        this.ctx.restore();

        // 3e. Commercial Price & Discount Tag (Exported Video)
        this.ctx.save();
        const price = reel.userInfo?.price || 1250;
        const mrp = reel.userInfo?.mrp || Math.round(price * 1.3);
        this.ctx.fillStyle = 'rgba(131, 24, 67, 0.9)'; // Rose 950
        this.ctx.roundRect?.(28, 230, 210, 32, 8);
        this.ctx.fill();
        this.ctx.strokeStyle = 'rgba(244, 63, 94, 0.6)';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();

        this.ctx.fillStyle = '#fde047'; // Amber text
        this.ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`₹${price.toLocaleString('en-IN')}`, 38, 251);

        this.ctx.fillStyle = '#94a3b8';
        this.ctx.font = '10px "Plus Jakarta Sans", sans-serif';
        this.ctx.fillText(`MRP ₹${mrp.toLocaleString('en-IN')}`, 105, 251);

        this.ctx.fillStyle = '#10b981';
        this.ctx.fillRect(175, 236, 52, 20);
        this.ctx.fillStyle = '#0f172a';
        this.ctx.font = 'bold 9px "Plus Jakarta Sans", sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('25% OFF', 201, 250);
        this.ctx.restore();

        // 4. Subtitles (Malayalam + English)
        const currentSub = reel.script.subtitles.find(
          (s) => currentTime >= s.startTime && currentTime <= s.endTime
        );

        if (currentSub) {
          const subY = this.height - 210;
          this.ctx.save();

          // Subtitle pill background
          this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
          this.ctx.roundRect?.(40, subY - 45, this.width - 80, 95, 16);
          this.ctx.fill();

          // Malayalam text
          if (reel.subtitleMode !== 'en_only') {
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
            this.ctx.shadowBlur = 6;
            this.ctx.fillText(currentSub.textMl, this.width / 2, subY - 12);
          }

          // English text
          if (reel.subtitleMode !== 'ml_only') {
            this.ctx.fillStyle = '#fbbf24';
            this.ctx.font = '18px "Plus Jakarta Sans", sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(currentSub.textEn, this.width / 2, subY + 22);
          }
          this.ctx.restore();
        }

        // 5. Call To Action Footer Bar
        this.ctx.save();
        this.ctx.fillStyle = '#831843'; // Royal Wine Red
        this.ctx.roundRect?.(60, this.height - 85, this.width - 120, 52, 26);
        this.ctx.fill();

        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(
          `📞 ${reel.brand.whatsapp || reel.brand.phone || 'Order Now on WhatsApp'}`,
          this.width / 2,
          this.height - 52
        );
        this.ctx.restore();

        // 6. AI Model Disclosure
        if (reel.brand.showDisclaimer) {
          this.ctx.save();
          this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
          this.ctx.font = '11px "Plus Jakarta Sans", sans-serif';
          this.ctx.textAlign = 'center';
          this.ctx.fillText('✨ AI-Generated Fashion Visualization', this.width / 2, this.height - 18);
          this.ctx.restore();
        }

        currentFrame++;
        requestAnimationFrame(renderLoop);
      };

      renderLoop();
    });
  }
}

export const videoCompositor = new VideoCompositor();
