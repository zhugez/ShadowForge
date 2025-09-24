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
  githubUrl: string;
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
    title: 'Biometric Identification through Auditory EEG Signatures - YSC 2025',
    description:
      'Developed secure EEG-based biometric identification system using auditory stimulus-induced brain signals with Deep Metric Learning techniques. Implemented deep learning models with metric learning approaches on PhysioNet Auditory EEG dataset, incorporating signal preprocessing and feature enhancement methods. System achieves competitive performance in individual classification and includes novel subject detection capability for enhanced real-world security applications.',
    githubUrl: 'https://github.com/zhugez/eeg-biometric-identification',
    license: 'Apache 2.0',
    isFeatured: true,
  },
  {
    title: 'Malware Detection using ML/DL - ATC 2024',
    description:
      'First Author research presented at ATC 2024 Conference. Investigated machine learning and deep learning techniques for malware detection based on Windows PE files, comparing performance of classical ML and deep text models.',
    githubUrl: 'https://github.com/zhugez/malware-detection-mldl',
    license: 'Apache 2.0',
    isFeatured: true,
  },
  {
    title: 'Deep Learning-based Intrusion Detection System',
    description:
      'Developed advanced intrusion detection model using LSTM and Transformer architectures to detect web exploitation attacks. Achieved 94% accuracy with low false positive rates using ECML/PKDD 2007 and CSIC 2010 datasets.',
    githubUrl: 'https://github.com/zhugez/dl-intrusion-detection',
    license: 'Apache 2.0',
    isFeatured: true,
  },
  {
    title: 'Smart Contract Vulnerability Detection System',
    description:
      'Built ML & DL-based vulnerability detection system for smart contracts. Trained on self-created Solidity contract datasets using SVC, XGBoost, and biLSTM models. Features interactive Streamlit demo for real-time vulnerability assessment.',
    githubUrl: 'https://github.com/zhugez/smartcontract-vulnerability-detection',
    license: 'Apache 2.0',
    isFeatured: true,
  },
    {
    title: 'SilentWebWeaver',
    description:
      'Designed a C++ shellcode dropper/loader using HTTP protocol. Successfully bypassed Windows Defender and Kaspersky antivirus. Implemented advanced persistence techniques and encryption for secure payload delivery in Red Team operations.',
    githubUrl: 'https://github.com/zhugez/silentwebweaver',
    license: 'Apache 2.0',
    isFeatured: true,
  },
  {
    title: 'Elegant ICMP Tunneling',
    description:
      'Created a Python-based multi-client remote access tool over ICMP protocol. Managed secure communication channels and stored victim metadata in a custom database. Enables covert command and control operations through firewall-restricted networks.',
    githubUrl: 'https://github.com/zhugez/elegant-icmp-tunneling',
    license: 'Apache 2.0',
    isFeatured: true,
  },
  {
    title: 'CyberScavenge',
    description:
      'Developed a client-server data extractor with dynamic API responses and Gofile integration. Automated data exfiltration for Red Team scenarios with secure file upload capabilities and real-time progress monitoring.',
    githubUrl: 'https://github.com/zhugez/cyberscavenge',
    license: 'Apache 2.0',
    isFeatured: true,
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
