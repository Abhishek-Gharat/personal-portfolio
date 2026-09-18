import React, { useEffect, useRef, useState } from 'react';

// Scroll reveal wrapper — fades/slides children in once when visible.
// Honors prefers-reduced-motion (renders visible immediately).

const Reveal = ({ children, delay = 0, className = '', as: Tag = 'div' }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ '--zk-d': `${delay}ms` }}
      className={`zk-reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
