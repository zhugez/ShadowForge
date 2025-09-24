/**
 * @file src/app/layout.tsx
 * @description The root layout for the entire application.
 *              This component wraps all pages, providing a consistent HTML structure,
 *              loading global stylesheets and fonts, and setting up metadata for SEO.
 */
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import AnimatedBackground from "@/components/animated-background"
import MainNav from '@/components/main-nav';
import GlobalPetRenderer from '@/components/global-pet-renderer';
import { Analytics } from '@vercel/analytics/react';
import { PostHogProvider } from './providers';
import GuidedTour from '@/components/guided-tour';

// Define metadata for the website, used for SEO and browser tab information.
export const metadata: Metadata = {
  metadataBase: new URL('https://wanderlens.vercel.app'),
  title: 'Yasna | Cybersecurity Researcher',
  description: 'Personal portfolio of Yasna, a cybersecurity researcher specializing in red team operations, Windows internals, and AI security research.',
  keywords: [
    'Yasna',
    'Cybersecurity',
    'Red Team',
    'Windows Internals',
    'AI Security',
    'Vulnerability Research',
    'Penetration Testing',
    'Malware Analysis',
    'Portfolio',
    'Security Research'
  ],
  openGraph: {
    title: 'Yasna | Cybersecurity Researcher',
    description: 'Cybersecurity Researcher · AI Enthusiast ',
    url: 'https://wanderlens.vercel.app',
    siteName: 'Yasna Portfolio',
    images: [
      {
        url: 'https://wanderlens.vercel.app/og-image.png', // Must be an absolute URL
        width: 1200,
        height: 630,
        alt: 'Yasna Cybersecurity Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yasna | Cybersecurity Researcher',
    description: 'Cybersecurity Researcher · AI Enthusiast ',
    images: ['https://wanderlens.vercel.app/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Sets the canonical URL for the root of the site.
  alternates: {
    canonical: 'https://wanderlens.vercel.app',
  },
};

// JSON-LD structured data for rich search results (Google).
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Yasna',
  alternateName: ['Yasna Researcher'],
  url: 'https://wanderlens.vercel.app',
  jobTitle: 'Cybersecurity Researcher & AI Enthusiast',
  alumniOf: {
    '@type': 'Organization',
    name: 'Security Research Institute',
  },
  sameAs: [
    'https://www.linkedin.com/in/dezzhu/',
    'https://github.com/zhugez',
    'https://twitter.com/dezzhu1',
    'https://facebook.com/dezzhu.info',
  ],
};

/**
 * RootLayout component that serves as the main template for all pages.
 * @param {Readonly<{ children: React.ReactNode }>} props - The props object.
 * @param {React.ReactNode} props.children - The child components to be rendered within this layout (i.e., the page content).
 * @returns {JSX.Element} The root HTML structure of the application.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The `suppressHydrationWarning` is used because the animated background can cause
    // minor mismatches on initial load, which is acceptable for this decorative element.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for performance optimization. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Import the "Space Grotesk" font stylesheet. */}
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
        <meta name="google-site-verification" content="-ggF-eMSfmD9YH-4yLzcQDEjUmv9WBmZuwxjsFAHifA" />
         {/* Add JSON-LD to the head to provide structured data to search engines. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        <PostHogProvider>
          {/* The AnimatedBackground component is rendered here to appear on all pages. */}
          <AnimatedBackground />
          {/* This component renders the roaming pet if one is active in the global state. */}
          <GlobalPetRenderer />
          {/* This div is the portal target for the roaming pet. */}
          <div id="pet-container"></div>
          <MainNav />
          {/* Renders the active page content. */}
          <main>{children}</main>
          {/* The Toaster component handles pop-up notifications. */}
          <Toaster />
          <Analytics />
          <GuidedTour />
        </PostHogProvider>
      </body>
    </html>
  );
}
