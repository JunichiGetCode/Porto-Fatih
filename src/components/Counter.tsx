"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function Counter({
  end,
  suffix = "",
  duration = 2000,
  className = "",
}: CounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let startTime: number | null = null;
    let frame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing: ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentVal = eased * end;
      const isFloat = end % 1 !== 0;
      setCount(isFloat ? Number(currentVal.toFixed(1)) : Math.floor(currentVal));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [started, end, duration]);

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
}
