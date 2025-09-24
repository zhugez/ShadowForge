
/**
 * @file src/app/about/page.tsx
 * @description The dedicated "About Me" page, providing a detailed look at my journey.
 *              This page uses styled cards and icons for a dynamic presentation.
 */
import AnimatedBackground from "@/components/animated-background";
import PageFooter from "@/components/page-footer";
import { BookOpen, Telescope, Users } from "lucide-react";
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Page-specific metadata for SEO.
export const metadata: Metadata = {
  title: 'About Yasna | Cybersecurity Researcher',
  description: 'Learn more about Yasna, a cybersecurity researcher and AI enthusiast specializing in red team operations and Windows internals.',
  // Provides the canonical URL for this page.
  alternates: {
    canonical: '/about',
  },
};

// Data for the different sections of the "About Me" page.
const aboutSections = [
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: "My Research",
    content: "I specialize in cybersecurity research with a focus on Windows internals, vulnerability research, and red team operations. My work covers topics like privilege escalation, malware analysis, and advanced persistent threats.",
  },
  {
    icon: <Telescope className="h-8 w-8" />,
    title: "Technical Interests",
    content: "Beyond security research, I'm passionate about artificial intelligence, machine learning applications in cybersecurity, and developing novel attack vectors. I enjoy reverse engineering, binary analysis, and exploring the intersection of AI and security.",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Community",
    content: "I believe in knowledge sharing and contribute to the cybersecurity community through research publications, blog posts, and open-source tools. I'm always looking to collaborate with fellow researchers and security professionals.",
  }
];

/**
 * AboutPage component renders a detailed, sectioned biography.
 * @returns {JSX.Element} The rendered "About Me" page with animated sections.
 */
export default function AboutPage() {
  return (
    <>
      <AnimatedBackground />
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl">
          <header className="mb-12 text-center pt-20">
            <h1 className="text-4xl font-bold text-primary tracking-tight animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              About Yasna
            </h1>
            <p className="text-foreground/70 mt-2 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '350ms' }}>
              Cybersecurity researcher passionate about red team operations and AI security.
            </p>
          </header>
          <main>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {aboutSections.map((section, index) => (
                <Card 
                  key={section.title}
                  className={cn(
                    "group relative overflow-hidden bg-card/30 border-border/40 rounded-2xl p-4 text-center shadow-lg animate-fade-in-up",
                    "transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-primary/20"
                  )}
                  style={{ animationDelay: `${500 + index * 150}ms`}}
                >
                  <div className="animate-border-glow"></div>
                  <div className="relative z-10">
                    <CardHeader className="flex flex-col items-center gap-4">
                      <div className="text-primary bg-primary/10 p-3 rounded-full transition-transform duration-300 group-hover:scale-110">
                        {section.icon}
                      </div>
                      <CardTitle className="text-xl text-primary">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/80 leading-relaxed text-sm">
                        {section.content}
                      </p>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </main>
        </div>
        <div className="w-full max-w-4xl flex-grow" />
        <PageFooter />
      </div>
    </>
  );
}

    