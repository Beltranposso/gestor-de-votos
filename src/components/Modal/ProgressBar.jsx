import React, { useEffect, useRef } from 'react';


export function ProgressBar({ duration, isRunning }) {
  const progressRef = useRef(null);
  const animationRef = useRef();
  const startTimeRef = useRef();

  useEffect(() => {
    if (!isRunning) {
      if (progressRef.current) {
        progressRef.current.style.width = '100%';
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    startTimeRef.current = performance.now();

    const animate = (currentTime) => {
      if (!startTimeRef.current) return;

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.max(0, 100 - (elapsed / duration) * 100);

      if (progressRef.current) {
        progressRef.current.style.width = `${progress}%`;
      }

      if (progress > 0) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [duration, isRunning]);

  return (
    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
      <div
        ref={progressRef}
        className="h-full bg-green-500 transition-all duration-[16ms] ease-linear"
        style={{ width: '100%' }}
      />
    </div>
  );
}