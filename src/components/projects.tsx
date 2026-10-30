
/**
 * @file src/components/projects.tsx
 * @description This component displays a list of projects. It can either show all projects
 *              or only the "featured" ones, depending on the `featuredOnly` prop.
 *              It's used on both the home page (featured) and the dedicated projects page (all).
 * @note This is a client component because it uses the `useInView` hook for animations.
 */
'use client';

import { projects } from '@/lib/projects-data';
import { useInView } from '@/hooks/use-in-view';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';

/**
 * Props for the Projects component.
 */
interface ProjectsProps {
  /** If true, only shows projects marked as `isFeatured: true` in the data file. */
  featuredOnly?: boolean;
}

/**
 * Projects component renders a list of project cards with fade-in-up animations.
 * @param {ProjectsProps} props - The component props.
 * @returns {JSX.Element} A section containing project cards.
 */
export default function Projects({ featuredOnly = false }: ProjectsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref);

  // Filter projects based on the `featuredOnly` prop.
  const projectsToShow = featuredOnly
    ? projects.filter((p) => p.isFeatured)
    : projects;

  return (
    <section
      ref={ref}
      className={cn(
        'space-y-6 transition-opacity duration-1000 ease-out w-full',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
      style={{
        transitionDelay: isVisible ? '150ms' : '0ms',
      }}
    >
      {/* Only show the "Featured Projects" title on the homepage. */}
      {featuredOnly && (
        <h2
          className={cn(
            'text-2xl font-bold text-primary tracking-tight text-center transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          Featured Projects
        </h2>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Map over the projects and render a Card for each one. */}
        {projectsToShow.map((project, index) => (
          <Card
            key={project.title}
            className={cn(
              'group relative overflow-hidden bg-card/30 border-border/40 shadow-lg transition-all duration-700 ease-out text-left',
              // Animate each card with a staggered delay.
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            )}
            style={{
              transitionDelay: isVisible ? `${200 + index * 100}ms` : '0ms',
            }}
          >
            {/* Animated border glow effect container. */}
            <div className="animate-border-glow"></div>
            <div className="relative z-10 p-2">
              <CardHeader>
                <CardTitle className="text-xl text-primary">{project.title}</CardTitle>
                <CardDescription className="text-foreground/80 pt-1">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-col items-start gap-3">
                {project.stack && project.stack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="bg-background/40 text-[11px] font-normal text-foreground/70"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="flex w-full items-center justify-between gap-2">
                  <Badge variant="secondary" className="bg-background/50">{project.license}</Badge>
                  <div className="flex items-center">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="sm">
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </Button>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>

      {/* Only show the "See More" button on the homepage. */}
      {featuredOnly && (
        <div 
          className={cn(
            "text-center transition-all duration-700",
             isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          )}
          style={{ transitionDelay: '500ms'}}
        >
          <Link href="/projects">
            <Button variant="outline" className="bg-card/30 border-border/40">
              See More Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}

    