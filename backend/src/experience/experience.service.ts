import { Injectable } from '@nestjs/common';

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  skillsUsed: string[];
  isCurrent?: boolean;
}

@Injectable()
export class ExperienceService {
  private readonly experiences: WorkExperience[] = [
    {
      id: 'postqode',
      company: 'POSTQODE, ELEVENXN TECHNOLOGIES PVT LTD',
      role: 'Software Engineer',
      period: 'May 2025 – Present',
      location: 'Bangalore, India',
      isCurrent: true,
      bullets: [
        'Contributed to the development of the PostQode Extension and its accompanying Web User Interface using React TypeScript (Redux-Toolkit) and Java (Spring Boot).',
        'Engineered the core logic for the HTML report generator, which serves as the standard format for shareable test report files.',
        'Designed and built the Qodeflow Application using Go lang, Fastify, React TypeScript (Redux-Toolkit), enabling the automation of workflows and empowering developers to create custom apps with AI agents.',
      ],
      skillsUsed: ['React', 'TypeScript', 'Redux-Toolkit', 'Java (Spring Boot)', 'Go', 'Fastify', 'AI Agents'],
    },
    {
      id: 'purpledocs',
      company: 'PURPLEDOCS PVT LTD',
      role: 'Jr Frontend Developer',
      period: 'Sep 2024 – May 2025',
      location: 'Jabalpur, India',
      bullets: [
        'Led the development of content management application (PurpleCMS) for UNMH Hospitals, successfully deployed on their servers.',
        'Designed and developed the user interface using React.js, Redux-Toolkit, and TypeScript for EMRD 2.0, enhancing usability and patient file management.',
        'Led the UI development for the modernized Electronic Medical Record system, enabling efficient retrieval of hospital records.',
      ],
      skillsUsed: ['React.js', 'TypeScript', 'Redux-Toolkit', 'CMS', 'Healthcare IT'],
    },
    {
      id: 'securedapp',
      company: 'SECUREDAPP',
      role: 'Software Developer Intern',
      period: 'Dec 2023 – June 2024',
      location: 'Jabalpur, India',
      bullets: [
        'Designed and implemented UI components like payment status pages and blog pages using React.js.',
        'Developed PDF generation engine and interactive charts for Solidity Shield scan reports, enhancing security report visualization.',
      ],
      skillsUsed: ['React.js', 'JavaScript', 'Data Visualization', 'PDF Generation', 'Web3 UI'],
    },
  ];

  getExperience(): WorkExperience[] {
    return this.experiences;
  }
}
