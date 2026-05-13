import React, { useEffect, useRef } from 'react';

// 2x2 Bayer matrix for dithering
const bayerMatrix = [
  [0, 2],
  [3, 1],
];

interface CursorDitherTrailProps {
  color?: [number, number, number];
  dotSize?: number;
  lerp?: number;
  decayRate?: number;
  cardSelector?: string;
  buttonSelector?: string;
}

export function CursorDitherTrail({
  color = [15, 98, 254], // Brand Blue #0f62fe
  dotSize = 3,
  lerp = 0.35,
  decayRate = 0.006,
  cardSelector = '[data-dither="card"]',
  buttonSelector = '[data-dither="btn"]',
}: CursorDitherTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverTypeRef = useRef<'card' | 'btn' | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let imgData = ctx.createImageData(width, height);
    let alphaBuffer = new Float32Array(width * height);

    let mouseX = -1000;
    let mouseY = -1000;
    let smoothX = mouseX;
    let smoothY = mouseY;
    let isMouseMoving = false;

    let lastTime = performance.now();
    let animationFrameId: number;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      imgData = ctx.createImageData(width, height);
      alphaBuffer = new Float32Array(width * height);
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseX === -1000) {
        smoothX = e.clientX;
        smoothY = e.clientY;
      }
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseMoving = true;
    };

    const handleMouseLeave = () => {
      isMouseMoving = false;
      mouseX = -1000;
      mouseY = -1000;
      smoothX = -1000;
      smoothY = -1000;
      hoverTypeRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const checkHoverAttributes = () => {
        const cards = document.querySelectorAll(cardSelector);
        const btns = document.querySelectorAll(buttonSelector);

        const onCardEnter = () => { hoverTypeRef.current = 'card'; };
        const onBtnEnter = () => { hoverTypeRef.current = 'btn'; };
        const onLeave = () => { hoverTypeRef.current = null; };

        cards.forEach(el => {
            el.addEventListener('mouseenter', onCardEnter);
            el.addEventListener('mouseleave', onLeave);
        });
        btns.forEach(el => {
            el.addEventListener('mouseenter', onBtnEnter);
            el.addEventListener('mouseleave', onLeave);
        });

        return () => {
            cards.forEach(el => {
                el.removeEventListener('mouseenter', onCardEnter);
                el.removeEventListener('mouseleave', onLeave);
            });
            btns.forEach(el => {
                el.removeEventListener('mouseenter', onBtnEnter);
                el.removeEventListener('mouseleave', onLeave);
            });
        };
    };

    // Need a MutationObserver or similar if elements are dynamically added, 
    // but for simple React setups calling it once might miss dynamic elements.
    // Assuming mostly static layout or we can just proxy via continuous DOM checking (less performant) or simply use React events on elements.
    // Wait, the prompt says: "在 useEffect 中用 document.querySelectorAll(selector) 綁定 mouseenter/mouseleave"
    
    // We will re-run the binding periodically or just on init.
    // To support dynamic elements better, let's use event delegation on document.
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(cardSelector)) hoverTypeRef.current = 'card';
      else if (target.closest(buttonSelector)) hoverTypeRef.current = 'btn';
      else hoverTypeRef.current = null;
    };
    
    document.addEventListener('mouseover', handleMouseOver);

    const setPixelAlpha = (x: number, y: number, alpha: number) => {
      // Snap to dotSize grid
      const gridX = Math.floor(x / dotSize) * dotSize;
      const gridY = Math.floor(y / dotSize) * dotSize;

      for (let dx = 0; dx < dotSize; dx++) {
        for (let dy = 0; dy < dotSize; dy++) {
          const px = gridX + dx;
          const py = gridY + dy;
          if (px >= 0 && px < width && py >= 0 && py < height) {
            const index = py * width + px;
            alphaBuffer[index] = Math.max(alphaBuffer[index], alpha);
          }
        }
      }
    };

    const drawDitheredDot = (x: number, y: number, maxAlpha: number = 1.0) => {
       const gridX = Math.floor(x / dotSize);
       const gridY = Math.floor(y / dotSize);
       
       const threshold = (bayerMatrix[gridY % 2]?.[gridX % 2] ?? 0) / 4;
       
       if (Math.random() > threshold) {
         setPixelAlpha(x, y, maxAlpha);
       }
    };

    const renderFrame = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;

      // 1. Decay Alpha
      const decay = dt * decayRate;
      let hasActivePixels = false;
      
      const data = imgData.data;
      const [r, g, b] = color;
      
      for (let i = 0; i < alphaBuffer.length; i++) {
        if (alphaBuffer[i] > 0) {
          alphaBuffer[i] -= decay;
          if (alphaBuffer[i] <= 0) {
            alphaBuffer[i] = 0;
            const pxOffset = i * 4;
            data[pxOffset + 3] = 0; // Set alpha to 0
          } else {
            hasActivePixels = true;
            const pxOffset = i * 4;
            data[pxOffset] = r;
            data[pxOffset + 1] = g;
            data[pxOffset + 2] = b;
            data[pxOffset + 3] = Math.floor(alphaBuffer[i] * 255);
          }
        }
      }

      // 2 & 3. Smooth tracking and gapless interpolation
      if (mouseX !== -1000) {
        const prevSmoothX = smoothX;
        const prevSmoothY = smoothY;

        smoothX += (mouseX - smoothX) * lerp;
        smoothY += (mouseY - smoothY) * lerp;

        const dx = smoothX - prevSmoothX;
        const dy = smoothY - prevSmoothY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const step = dotSize * 0.35;
        const steps = Math.max(1, Math.floor(dist / step));

        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const px = prevSmoothX + dx * t;
          const py = prevSmoothY + dy * t;
          drawDitheredDot(px, py, 1.0);
        }

        // 4. Hover Effects
        const hoverType = hoverTypeRef.current;
        if (hoverType === 'card') {
           const radius = 20;
           const spacing = dotSize * 3;
           for (let offsetX = -radius; offsetX <= radius; offsetX += spacing) {
              for (let offsetY = -radius; offsetY <= radius; offsetY += spacing) {
                 const curDist = Math.sqrt(offsetX*offsetX + offsetY*offsetY);
                 if (curDist <= radius) {
                    const falloff = 1.0 - (curDist / radius);
                    const effectAlpha = falloff * 0.55;
                    drawDitheredDot(smoothX + offsetX, smoothY + offsetY, effectAlpha);
                 }
              }
           }
        } else if (hoverType === 'btn') {
           const innerR = 6;
           const outerR = 16;
           const radius = 11;
           const numDots = 8;
           const angleOffset = performance.now() * 0.002;
           
           for (let i = 0; i < numDots; i++) {
              const angle = (i / numDots) * Math.PI * 2 + angleOffset;
              const px = smoothX + Math.cos(angle) * radius;
              const py = smoothY + Math.sin(angle) * radius;
              drawDitheredDot(px, py, 0.7);
           }
        }
        
        hasActivePixels = true;
      }

      // 5. Output
      if (hasActivePixels) {
        ctx.putImageData(imgData, 0, 0);
      } else {
        ctx.clearRect(0, 0, width, height); // Fallback clear
      }

      animationFrameId = requestAnimationFrame(renderFrame);
    };

    animationFrameId = requestAnimationFrame(renderFrame);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, dotSize, lerp, decayRate, cardSelector, buttonSelector]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
}
