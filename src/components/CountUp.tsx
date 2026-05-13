import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

interface CountUpProps {
  to: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export default function CountUp({ to, duration = 2, decimals = 0, suffix = '', prefix = '' }: CountUpProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      const totalFrames = Math.round(duration * 60);
      let frame = 0;

      const animate = () => {
        frame++;
        const progress = frame / totalFrames;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        setValue(to * easeOutQuart);

        if (frame < totalFrames) {
          requestAnimationFrame(animate);
        } else {
          setValue(to);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}{value.toFixed(decimals)}{suffix}
    </span>
  );
}
