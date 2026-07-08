import React, { useEffect, useRef } from 'react';
import './Confetti.css';

interface ConfettiProps {
  active: boolean;
  duration?: number;
  onComplete?: () => void;
}

const COLORS = [
  '#ff6b6b',
  '#4ecdc4',
  '#45b7d1',
  '#96ceb4',
  '#ffeaa7',
  '#dda0dd',
  '#98d8c8',
  '#f7dc6f',
  '#ff9ff3',
  '#54a0ff',
];

const Confetti: React.FC<ConfettiProps> = ({ active, duration = 3000, onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = '';

    for (let i = 0; i < 60; i++) {
      const particle = document.createElement('div');
      particle.className = 'confetti-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.backgroundColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      particle.style.animationDelay = `${Math.random() * 0.8}s`;
      particle.style.animationDuration = `${1.5 + Math.random() * 2}s`;

      if (Math.random() > 0.5) {
        particle.style.borderRadius = '50%';
      } else {
        particle.style.width = `${6 + Math.random() * 6}px`;
        particle.style.height = `${10 + Math.random() * 8}px`;
      }

      container.appendChild(particle);
    }

    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, duration);

    return () => clearTimeout(timer);
  }, [active, duration, onComplete]);

  if (!active) return null;

  return <div ref={containerRef} className="confetti-container" />;
};

export default Confetti;
