'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';

const AnimatedLink = motion.create(Link);

export function RevealLink({ href, className, reveal = false, children }: {
  href: string;
  className: string;
  reveal?: boolean;
  children: React.ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  const animate = reveal && !reducedMotion;

  return <AnimatedLink href={href} className={`${className}${reveal ? ' scroll-reveal' : ''}`}
    initial={animate ? { opacity: 0, y: 32 } : false}
    whileInView={{ opacity: 1, y: 0 }}
    whileFocus={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: .08, margin: '0px 0px -12px 0px' }}
    transition={{ duration: animate ? 1.2 : 0, ease: [.16, 1, .3, 1] }}>
    {children}
  </AnimatedLink>;
}
