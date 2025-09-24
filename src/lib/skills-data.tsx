/**
 * @file /src/lib/skills-data.tsx
 * @description This file contains the data for all technical skills, organized into categories.
 *              To add a new skill or category, modify the `skillsData` array.
 *              This structure makes it easy to render the skills page dynamically.
 * @note This file must have a `.tsx` extension because it imports and uses React components (icons).
 */

import { BrainCircuit, Code, Wrench, Languages, Shield, Bug, Search, Terminal, Zap, Eye, Network, Lock, FileSearch, Microscope, Settings, Cpu, Binary, Scan, Target, AlertTriangle } from 'lucide-react';
import { PythonIcon } from '@/components/icons/python';
import { TypescriptIcon } from '@/components/icons/typescript';
import { ReactIcon } from '@/components/icons/react';
import { HtmlIcon } from '@/components/icons/html5';
import { CssIcon } from '@/components/icons/css3';
import { JavascriptIcon } from '@/components/icons/javascript';
import { VscodeIcon } from '@/components/icons/vscode';
import { ChatgptIcon } from '@/components/icons/chatgpt';
import { GithubIcon } from '@/components/icons/github';
import { GitIcon } from '@/components/icons/git';
import { BashIcon } from '@/components/icons/bash';
import { ZshIcon } from '@/components/icons/zsh';
import { VercelIcon } from '@/components/icons/vercel';
import { UbuntuIcon } from '@/components/icons/ubuntu';
import { CIcon } from '@/components/icons/c';
import { CppIcon } from '@/components/icons/cpp';
import { RustIcon } from '@/components/icons/rust';
import { NumpyIcon } from '@/components/icons/numpy';
import { PandasIcon } from '@/components/icons/pandas';
import { SciktLearnIcon } from '@/components/icons/scikt-learn';
import { SqliteIcon } from '@/components/icons/sqlite';
import { GeminiIcon } from '@/components/icons/gemini';
import { ArduinoIcon } from '@/components/icons/arduino';
import { EspressifIcon } from '@/components/icons/espressif';

/**
 * Defines the structure for an individual skill.
 * @property {string} name - The name of the skill (e.g., "Python").
 * @property {React.ReactNode} icon - The React component for the skill's logo.
 * @property {string} [iconClassName] - Optional CSS classes to apply to the icon container.
 */
export interface Skill {
  name: string;
  icon: React.ReactNode;
  iconClassName?: string;
  isPriority?: boolean;
}

/**
 * Defines the structure for a category of skills.
 * @property {string} title - The title of the category (e.g., "Frontend Development").
 * @property {React.ReactNode} icon - The icon representing the category.
 * @property {string} [subtitle] - An optional subtitle to display under the category title.
 * @property {Skill[]} skills - An array of `Skill` objects belonging to this category.
 */
export interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  subtitle?: string;
  skills: Skill[];
}

/**
 * Data for all technical skills, organized by category.
 */
export const skillsData: SkillCategory[] = [
  {
    title: 'Core Languages',
    icon: <Languages size={32} />,
    subtitle: "The foundational languages I use for problem-solving and building projects.",
    skills: [
      { name: 'C', icon: <CIcon />, isPriority: true },
      { name: 'C++', icon: <CppIcon />, isPriority: true },
      { name: 'Python', icon: <PythonIcon />, isPriority: true },
      { name: 'Rust', icon: <RustIcon />, isPriority: true },
      { name: 'JS / TS', icon: <TypescriptIcon />, iconClassName: 'p-1' },
    ],
  },
  {
    title: 'Data Science & Web Technologies',
    icon: <Code size={32} />,
    subtitle: 'Technologies for data analysis, machine learning research, and web development',
    skills: [
      { name: 'NumPy', icon: <NumpyIcon />, isPriority: true },
      { name: 'Pandas', icon: <PandasIcon />, isPriority: true },
      { name: 'Scikit-learn', icon: <SciktLearnIcon />, isPriority: true },
      { name: 'SQLite', icon: <SqliteIcon /> },
      { name: 'React', icon: <ReactIcon /> },
      { name: 'HTML/CSS', icon: <HtmlIcon /> },
    ],
  },
  {
    title: 'Cybersecurity & Research',
    icon: <Shield size={32} />,
    subtitle: 'Specialized tools and techniques for security research and red team operations.',
    skills: [
       { name: 'IDA Pro', icon: <Binary size={20} />, isPriority: true },
       { name: 'Ghidra', icon: <FileSearch size={20} />, isPriority: true },
       { name: 'Metasploit', icon: <Target size={20} />, isPriority: true },
       { name: 'Burp Suite', icon: <Bug size={20} />, isPriority: true },
       { name: 'Wireshark', icon: <Network size={20} /> },
       { name: 'Nmap', icon: <Scan size={20} /> },
       { name: 'x64dbg', icon: <Terminal size={20} /> },
       { name: 'Windows Internals', icon: <Cpu size={20} /> },
       { name: 'Reverse Engineering', icon: <Settings size={20} /> },
       { name: 'Malware Analysis', icon: <AlertTriangle size={20} /> },
    ],
  },
  {
    title: 'Development & Platforms',
    icon: <Wrench size={32} />,
    subtitle: 'Development tools and platforms that support research and development workflow.',
    skills: [
       { name: 'Git', icon: <GitIcon /> },
       { name: 'GitHub', icon: <GithubIcon /> },
       { name: 'VS Code', icon: <VscodeIcon /> },
       { name: 'ChatGPT', icon: <ChatgptIcon /> },
       { name: 'Gemini', icon: <GeminiIcon /> },
       { name: 'Bash', icon: <BashIcon /> },
       { name: 'Zsh', icon: <ZshIcon /> },
       { name: 'Ubuntu', icon: <UbuntuIcon /> },
       { name: 'Vercel', icon: <VercelIcon /> },
    ],
  },
];
