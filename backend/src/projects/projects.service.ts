import { Injectable } from '@nestjs/common';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  period: string;
  description: string;
  highlights: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

@Injectable()
export class ProjectsService {
  private readonly projects: Project[] = [
    {
      id: 'thakur-dental-clinic',
      title: 'Thakur Dental Clinic',
      subtitle: 'Full-Stack Patient & Queue Management System',
      category: 'Full-Stack Architecture',
      period: '2024',
      description:
        'Engineered a comprehensive clinic management system with a dynamic queue-shifting algorithm that automatically recalculates overruns and streams real-time delay alerts to patient dashboards via SSE.',
      highlights: [
        'Dynamic queue overrun calculation algorithm with automated real-time SSE streaming alerts',
        'Unified authentication system incorporating Google OAuth 2.0 & JWT-based Role-Based Access Control (RBAC)',
        'Clinic dashboards for manual queue overrides, doctor reassignments, and billing/prescriptions',
        'Comprehensive integration tests utilizing transactional database isolation',
        'Active development for ABDM compliance and Razorpay payment gateway integration',
      ],
      techStack: [
        'React.js',
        'Go (Golang)',
        'GORM',
        'PostgreSQL',
        'React-Redux',
        'Redux-Toolkit',
        'TypeScript',
        'Docker',
        'Tailwind CSS',
      ],
      githubUrl: 'https://github.com/LuciferVedant',
      featured: true,
    },
    {
      id: 'qodeflow-app',
      title: 'Qodeflow Workflow Automation Platform',
      subtitle: 'AI Agent Workflow Engine & Code Automation',
      category: 'Developer Tools & Automation',
      period: '2025',
      description:
        'Designed and built the core engine enabling automation of complex developer workflows. Integrated support for multi-application extensibility empowering developers to create custom apps with AI agents.',
      highlights: [
        'High-performance backend engine written in Go and Fastify',
        'Interactive React TypeScript dashboard with Redux-Toolkit state management',
        'Seamless integration with AI agents for workflow automation',
      ],
      techStack: ['Go', 'Fastify', 'React', 'TypeScript', 'Redux-Toolkit', 'AI Agents', 'REST API'],
      featured: true,
    },
    {
      id: 'postqode-extension',
      title: 'PostQode Extension & HTML Report Engine',
      subtitle: 'Standardized Shareable Test Report Engine',
      category: 'Enterprise Extension & Tooling',
      period: '2025',
      description:
        'Contributed to the development of the PostQode Extension & Web UI. Engineered the core logic for the HTML report generator, serving as the enterprise standard format for test report files.',
      highlights: [
        'Engineered HTML report generator powering shareable test reports',
        'Built enterprise React TS interface backed by Java Spring Boot services',
      ],
      techStack: ['React', 'TypeScript', 'Java (Spring Boot)', 'Redux-Toolkit', 'HTML5', 'Node.js'],
      featured: true,
    },
    {
      id: 'purplecms-emrd',
      title: 'PurpleCMS & EMRD 2.0 Modernization',
      subtitle: 'Electronic Medical Record Dashboard for UNMH Hospitals',
      category: 'Healthcare Enterprise Systems',
      period: '2024 - 2025',
      description:
        'Led the development of content management application (PurpleCMS) for UNMH Hospitals, successfully deployed on their servers. Upgraded legacy EMR system into EMRD 2.0 for efficient patient record management.',
      highlights: [
        'Led PurpleCMS development deployed directly on hospital enterprise servers',
        'Designed EMRD 2.0 modern user interface enhancing medical staff usability',
        'Streamlined fast patient record search and file management',
      ],
      techStack: ['React.js', 'Redux-Toolkit', 'TypeScript', 'JavaScript', 'CSS3', 'REST API'],
      featured: false,
    },
    {
      id: 'solidity-shield-reports',
      title: 'Solidity Shield Analytics & Payment UI',
      subtitle: 'Smart Contract Audit Data Visualization',
      category: 'Web3 & Interactive Data UI',
      period: '2023 - 2024',
      description:
        'Developed interactive chart visualizations and PDF report generators for Solidity Shield smart contract audit scans. Implemented checkout payment UI components.',
      highlights: [
        'Interactive chart visualization for security scan risk metrics',
        'Client-side PDF report generation engine for instant download',
        'Payment status workflow UI with React',
      ],
      techStack: ['React.js', 'JavaScript', 'Charts.js', 'PDF Generation', 'CSS Modules'],
      featured: false,
    },
  ];

  getAllProjects(tech?: string): Project[] {
    if (!tech) return this.projects;
    const filter = tech.toLowerCase();
    return this.projects.filter((p) => p.techStack.some((t) => t.toLowerCase().includes(filter)));
  }

  getProjectById(id: string): Project | undefined {
    return this.projects.find((p) => p.id === id);
  }
}
