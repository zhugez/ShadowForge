/**
 * @file src/components/skills.tsx
 * @description A component that displays a dynamic, two-row infinite scroller
 *              of technical skill logos on the homepage. This provides a quick,
 *              visually engaging overview of the user's capabilities.
 * @note This is a client component because it uses the `useInView` hook for animations.
 */
"use client"

import { useInView } from '@/hooks/use-in-view';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { skillsData } from '@/lib/skills-data';
import { Card, CardHeader } from './ui/card';
import { InfiniteScroller } from './infinite-scroller';

/**
 * A visually engaging component that showcases a wide range of technical skills
 * using a two-row, infinitely scrolling logo animation. It also includes a
 * call-to-action to view the full skillset.
 * @returns {JSX.Element} A section containing the animated skills showcase.
 */
export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true });

  // Flatten all skills from all categories into a single array.
  const allSkills = skillsData.flatMap(category => category.skills);
  // Split the skills into two halves for the two scrolling rows.
  const midPoint = Math.ceil(allSkills.length / 2);
  const firstRowSkills = allSkills.slice(0, midPoint);
  const secondRowSkills = allSkills.slice(midPoint);

  return (
    <section 
      ref={ref}
      className={cn(
        "space-y-6 text-center transition-opacity duration-1000 ease-out",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      id="skills-section"
      style={{
        transitionDelay: isVisible ? '150ms' : '0ms'
      }}
    >
      <h2 className={cn(
          "text-2xl font-bold text-primary tracking-tight transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          Skills & Technologies
      </h2>

      {/* Container for the two-row infinite scroller. */}
      <div className="space-y-4">
        <InfiniteScroller speed="slow">
          {firstRowSkills.map((skill) => (
            <Card 
              key={skill.name}
              className="bg-card/40 border-border/40 shadow-md text-center flex flex-col items-center justify-center w-[120px] h-[80px] shrink-0 p-2 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-card/60"
            >
              <CardHeader className="p-0 flex-grow flex flex-col items-center justify-center gap-2">
                 <div className={cn("h-10 w-10 flex items-center justify-center text-foreground", skill.iconClassName)}>
                   <div className="h-8 w-8 flex items-center justify-center">
                     {skill.icon}
                   </div>
                </div>
                <p className="text-xs font-medium text-foreground/80">{skill.name}</p>
              </CardHeader>
            </Card>
          ))}
        </InfiniteScroller>
        
        <InfiniteScroller speed="slow" direction="right">
          {secondRowSkills.map((skill) => (
             <Card 
              key={skill.name}
              className="bg-card/40 border-border/40 shadow-md text-center flex flex-col items-center justify-center w-[120px] h-[80px] shrink-0 p-2 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-card/60"
            >
              <CardHeader className="p-0 flex-grow flex flex-col items-center justify-center gap-2">
                 <div className={cn("h-10 w-10 flex items-center justify-center text-foreground", skill.iconClassName)}>
                   <div className="h-8 w-8 flex items-center justify-center">
                     {skill.icon}
                   </div>
                </div>
                <p className="text-xs font-medium text-foreground/80">{skill.name}</p>
              </CardHeader>
            </Card>
          ))}
        </InfiniteScroller>
      </div>

      {/* Button to navigate to the full skills page. */}
      <div 
        className={cn(
          "text-center transition-all duration-700 pt-2",
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        )}
        style={{ transitionDelay: '500ms'}}
      >
        <Link href="/skills" id="see-all-skills-button">
          <Button variant="outline" className="bg-card/30 border-border/40">
            See Full Technical Skillset
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
