import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function MagneticButton({ className = '', children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || 'ontouchstart' in window || window.innerWidth < 900) return;

    const onMove = (e) => {
      const rect = node.getBoundingClientRect();
      gsap.to(node, {
        x: (e.clientX - rect.left - rect.width / 2) * 0.35,
        y: (e.clientY - rect.top - rect.height / 2) * 0.35,
        duration: 0.4,
        ease: 'power2.out'
      });
    };

    const onLeave = () => {
      gsap.to(node, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    };

    node.addEventListener('mousemove', onMove);
    node.addEventListener('mouseleave', onLeave);

    return () => {
      node.removeEventListener('mousemove', onMove);
      node.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <button ref={ref} className={`magnetic ${className}`.trim()} type="button" {...rest}>
      {children}
    </button>
  );
}
