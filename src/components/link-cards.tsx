/**
 * @file src/components/link-cards.tsx
 * @description A component that renders a list of social and contact link cards.
 * @note This is a client component because it uses the `useInView` hook to trigger animations.
 */
"use client"

import LinkCard from './link-card';
import { useInView } from '@/hooks/use-in-view';
import { useRef } from 'react';
import { TwitterIcon } from '@/components/icons/twitter';
import { FacebookIcon } from '@/components/icons/facebook';
import { GithubIcon } from '@/components/icons/github';
import { MailIcon } from '@/components/icons/mail';
import { LinkedinIcon } from './icons/linkedin';

// An array of link objects, defining the properties for each card.
const links = [
  { href: 'https://twitter.com/dezzhu1', title: 'Twitter', Icon: TwitterIcon },
  { href: 'https://github.com/zhugez', title: 'GitHub', Icon: GithubIcon },
  { href: 'https://www.linkedin.com/in/dezzhu/', title: 'LinkedIn', Icon: LinkedinIcon },
  { href: 'https://facebook.com/dezzhu.info', title: 'Facebook', Icon: FacebookIcon },
  { href: 'mailto:dezzhuge@gmail.com', title: 'Mail', Icon: MailIcon },
];

/**
 * LinkCards component lays out a series of `LinkCard` components.
 * It uses the `useInView` hook to trigger a staggered animation for the cards
 * when they scroll into the viewport.
 * @returns {JSX.Element} A div containing a list of LinkCard components.
 */
export default function LinkCards() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref);

  return (
    <div ref={ref} className="space-y-4">
      {/* Map over the links array to render a LinkCard for each item. */}
      {links.map((link, index) => (
        <LinkCard 
          key={link.href} 
          {...link} 
          // Stagger the animation delay for each card.
          delay={300 + index * 100}
          isVisible={isVisible}
        />
      ))}
    </div>
  );
}
