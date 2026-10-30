/**
 * @file /src/lib/projects-data.ts
 * @description This file contains the data for all projects.
 *              To add a new project, simply add a new object to the `projects` array.
 *              The data is structured to be easily mapped over in the UI components.
 */

/**
 * Defines the structure for a single project object.
 */
export interface Project {
  title: string;
  description: string;
  /** Live site, when the project has one. */
  liveUrl?: string;
  /** Public source repository, when there is one. */
  githubUrl?: string;
  /** Shown as chips on the card. */
  stack?: string[];
  license: string;
  /** Optional. If true, the project will be displayed on the home page. */
  isFeatured?: boolean;
  /** Optional. If true, you can use this to style or filter contributions differently. */
  isContribution?: boolean;
}

/**
 * An array of project objects.
 */
export const projects: Project[] = [
  // To feature a project on the home page, set `isFeatured: true`.

  {
    title: 'TrustSee',
    description:
      'Security platform for small teams and agentic builders. It builds a CVE baseline from NVD, OSV, and GHSA, ranks it with CISA KEV and EPSS, and adds website, email, domain, and uptime posture checks. Authorized red-team probes and a dark-web feed run in the same org context. Exposes scan_repo over MCP, so Claude and Cursor can queue scans without leaving the agent.',
    liveUrl: 'https://trustsee.com',
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'TinyFish', 'Playwright', 'MCP'],
    license: 'Proprietary',
    isFeatured: true,
  },
  {
    title: 'Cordyceps',
    description:
      'WordPress plugin scanner. It finds the guard a security patch adds, then uses a static AST reachability harness to drop every finding an attacker cannot actually reach. Runs as an OpenClaw skill over Mycelium and Patchstack data.',
    githubUrl: 'https://github.com/zhugez/cordyceps',
    stack: ['Python', 'AST', 'OpenClaw', 'Patchstack'],
    license: 'MIT',
    isFeatured: true,
  },
  {
    title: 'ExoMind',
    description:
      'Memory and knowledge runtime. One store serves Pi, Hermes Agent, OpenClaw, and Codex: markdown-first memory with associative retrieval, indexing, recall, and benchmarking for local-first knowledge workflows.',
    liveUrl: 'https://3x0mind.vercel.app/',
    githubUrl: 'https://github.com/zhugez/ExoMind',
    stack: ['Rust'],
    license: 'MIT',
    isFeatured: true,
  },
  {
    title: 'pi-pulse',
    description:
      'Five extensions for the Pi coding agent: a loop guard that blocks byte-identical tool calls, a mutation gate, a CRAP-score gate, a comment checker, and in-flight diagnostics for the file being edited.',
    githubUrl: 'https://github.com/zhugez/pi-pulse',
    stack: ['TypeScript', 'Pi'],
    license: 'MIT',
    isFeatured: true,
  },
  {
    title: 'stella',
    description:
      'Illustrated IELTS vocabulary site. 7,298 words with native UK and US audio, review scheduled with FSRS, and hand-written Vietnamese notes. Runs on Cloudflare Workers.',
    liveUrl: 'https://stella.zhugez.workers.dev',
    githubUrl: 'https://github.com/zhugez/stella',
    stack: ['TypeScript', 'Cloudflare Workers', 'FSRS'],
    license: 'See repository',
    isFeatured: true,
  },
  {
    title: 'pingloom',
    description:
      'Native desktop ping and emote wheels. Windows-first, with experimental macOS support. Built with Rust, Tauri 2, and Svelte 5.',
    githubUrl: 'https://github.com/zhugez/pingloom',
    stack: ['Rust', 'Tauri 2', 'Svelte 5'],
    license: 'See repository',
  },
  {
    title: 'Abyss',
    description:
      'AI-powered AppSec analysis platform for local-first security workflows, with local LLM support and isolated scanning. Project-based scanning, vulnerability triage, and remediation workflows for developers and security teams.',
    liveUrl: 'https://abyss-landing.vercel.app/',
    license: 'Proprietary',
  },
  {
    title: 'ArcStrike',
    description:
      'Offensive security project for practical red-team workflows and operator-first execution. Built for fast iteration, field utility, and realistic adversarial simulation in controlled environments.',
    liveUrl: 'https://arcstrike.vercel.app/',
    license: 'Proprietary',
  },
  {
    title: 'Biometric Identification through Auditory EEG Signatures - YSC 2025',
    description:
      'EEG-based biometric identification from auditory stimulus-induced brain signals, using deep metric learning on the PhysioNet Auditory EEG dataset. The system classifies individuals and flags subjects it has never seen.',
    githubUrl: 'https://github.com/zhugez/EEGResearch',
    license: 'Apache 2.0',
  },
  {
    title: 'CryptoWallet',
    description:
      'Cryptocurrency wallet with multi-signature support, hardware wallet integration, encrypted key storage, secure transaction signing, cold storage, and audit logging for blockchain security research.',
    githubUrl: 'https://github.com/zhugez/CryptoWallet',
    license: 'Apache 2.0',
  },
  // To add another project, copy the object structure below:
  // {
  //   title: 'Your New Project Title',
  //   description: 'A brief and engaging description of your project.',
  //   githubUrl: 'https://github.com/your-username/your-repo',
  //   license: 'Apache 2.0',
  //   isFeatured: false, // Set to true to show on home page
  //   isContribution: false, // Set to true if it's a contribution to another project
  // },
];
