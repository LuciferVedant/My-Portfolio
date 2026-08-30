import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  private readonly knowledgeBase = {
    name: 'Vedant Khatri',
    title: 'Full Stack Developer / Software Engineer',
    experienceYears: '2+ years',
    location: 'Bangalore / Jabalpur, India',
    email: 'vedrocks2000@gmail.com',
    phone: '8349443633',
    skills: {
      languages: ['C++', 'Java', 'Go', 'JavaScript', 'TypeScript', 'SQL', 'Python'],
      frameworks: ['React.js', 'Next.js', 'Nest.js', 'Node.js', 'Redux-Toolkit', 'Spring Boot', 'Fastify', 'Gin', 'Tailwind CSS'],
      databasesAndTools: ['PostgreSQL', 'MongoDB', 'MySQL', 'Docker', 'AWS', 'Git', 'Swagger', 'MCP'],
    },
    companies: ['POSTQODE (ElevenXN Technologies)', 'PURPLEDOCS PVT LTD', 'SECUREDAPP'],
    education: 'B.Tech in Electronics & Communication Engineering from Samrat Ashok Technological Institute (SATI), Vidisha M.P.',
  };

  async processUserQuery(query: string): Promise<{ answer: string; relevantSkills: string[] }> {
    const q = query.toLowerCase();

    if (q.includes('skill') || q.includes('technology') || q.includes('stack')) {
      return {
        answer: `Vedant is proficient in full-stack architecture. Key languages: ${this.knowledgeBase.skills.languages.join(', ')}. Frameworks include: ${this.knowledgeBase.skills.frameworks.join(', ')}.`,
        relevantSkills: [...this.knowledgeBase.skills.languages, ...this.knowledgeBase.skills.frameworks],
      };
    }

    if (q.includes('experience') || q.includes('work') || q.includes('company') || q.includes('postqode')) {
      return {
        answer: `Vedant has 2+ years of experience across three engineering roles: 
1. Software Engineer at PostQode (ElevenXN) — React TS, Java Spring Boot, Go, Fastify, AI Workflow automation.
2. Jr Frontend Developer at Purpledocs — EMRD 2.0 hospital dashboard & PurpleCMS for UNMH Hospitals.
3. Software Developer Intern at SecuredApp — React payment workflow & Solidity Shield security scan reports.`,
        relevantSkills: ['React', 'TypeScript', 'Go', 'Java', 'Fastify'],
      };
    }

    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('phone')) {
      return {
        answer: `You can reach Vedant directly via email at vedrocks2000@gmail.com or phone at +91 8349443633. You can also fill out the interactive Contact form on this portfolio!`,
        relevantSkills: ['Email', 'Phone', 'LinkedIn', 'Github'],
      };
    }

    if (q.includes('project') || q.includes('thakur') || q.includes('qodeflow')) {
      return {
        answer: `Vedant's top project is Thakur Dental Clinic (Full-stack queueing algorithm with SSE delay alerts in Go & PostgreSQL) and Qodeflow (AI workflow automation engine in Go, Fastify, React).`,
        relevantSkills: ['Go', 'PostgreSQL', 'React', 'SSE', 'OAuth'],
      };
    }

    return {
      answer: `Vedant Khatri is a Full Stack Developer with 2+ years of experience building scalable systems, high-performance UIs, and automation platforms using React, TypeScript, Go, Java (Spring Boot), Node.js, Next.js, and NestJS. Feel free to ask about his skills, experience, or projects!`,
      relevantSkills: ['Full Stack Architecture', 'NestJS', 'Next.js', 'Go', 'React'],
    };
  }
}
