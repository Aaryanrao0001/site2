import { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

export default function HoverCard({
  as: Component = 'div',
  options,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || 'ontouchstart' in window || window.innerWidth < 900) return;

    VanillaTilt.init(node, {
      max: 8,
      speed: 500,
      glare: true,
      'max-glare': 0.08,
      scale: 1.01,
      ...options
    });

    return () => {
      if (node.vanillaTilt) node.vanillaTilt.destroy();
    };
  }, [options]);

  return (
    <Component ref={ref} className={className} {...rest}>
      {children}
    </Component>
  );
}
