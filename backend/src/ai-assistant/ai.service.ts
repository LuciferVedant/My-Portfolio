import { Injectable, Logger } from '@nestjs/common';

export interface AiChatResponse {
  answer: string;
  relevantSkills: string[];
  isGuardrailBlocked?: boolean;
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  private readonly knowledgeBase = {
    name: 'Vedant Khatri',
    title: 'Full Stack Developer / Software Engineer',
    experienceYears: '2+ years',
    location: 'Bengaluru, Karnataka, India',
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

  private readonly guardrailMessage =
    "I am Vedant's AI Assistant, trained exclusively to answer questions about Vedant Khatri's engineering background, technical skills, work experience, and projects. Please ask a resume or career-related question!";

  private buildSystemPrompt(): string {
    return `
You are Vedant Khatri's AI Assistant on his portfolio website.
Your SOLE AND EXCLUSIVE PURPOSE is to answer questions related to Vedant Khatri's professional background, resume, technical skills, software engineering projects, work history, education, and contact information.

VEDANT KHATRI'S PROFILE & RESUME KNOWLEDGE BASE:
- Full Name: Vedant Khatri
- Title: Full Stack Developer / Software Engineer (2+ Years Experience)
- Location: Bengaluru, Karnataka, India
- Email: vedrocks2000@gmail.com
- Phone: +91 8349443633
- Primary Skills:
  * Languages: C++, Java, Go, JavaScript, TypeScript, SQL, Python
  * Frameworks: React.js, Next.js, Nest.js, Node.js, Redux-Toolkit, Spring Boot, Fastify, Gin, Tailwind CSS
  * Databases & Cloud: PostgreSQL, MongoDB, MySQL, Docker, AWS, Git, Swagger, Model Context Protocol (MCP)
- Work History:
  1. POSTQODE, ELEVENXN TECHNOLOGIES PVT LTD (Software Engineer | May 2025 - Present | Bengaluru, Karnataka, India)
     - Built PostQode Extension & Web UI (React TS, Redux-Toolkit, Java Spring Boot).
     - Engineered HTML report generator engine for test report files.
     - Built Qodeflow application (Go, Fastify, React TS) for developer workflow automation with AI agents.
  2. PURPLEDOCS PVT LTD (Jr Frontend Developer | Sep 2024 - May 2025 | Bengaluru, Karnataka, India)
     - Developed PurpleCMS content management app for UNMH Hospitals.
     - Built EMRD 2.0 (Electronic Medical Record Dashboard) UI in React.js, Redux-Toolkit, TypeScript.
  3. SECUREDAPP (Software Developer Intern | Dec 2023 - June 2024 | Bengaluru, Karnataka, India)
     - Developed React UI for payment status & blog pages.
     - Built PDF generation engine & interactive charts for Solidity Shield audit reports.
- Key Projects:
  * Thakur Dental Clinic: Full-stack clinic queue management system with dynamic overrun algorithm & real-time SSE delay alerts in Go, PostgreSQL, React, Docker.
  * Qodeflow: AI Agent developer workflow automation engine in Go, Fastify, React.
- Education & Certifications:
  * B.Tech in Electronics & Communication Engineering from Samrat Ashok Technological Institute (SATI), Vidisha M.P. (2019-2023).
  * Coding Ninjas Certified in DSA in C++, Full Stack Web Dev, Advance Frontend Dev, Backend Architecture.

STRICT GUARDRAIL RULES:
1. IF the question is related to Vedant Khatri (skills, work history, projects, tech stack, education, contact info, hiring, etc.), answer concisely, professionally, and accurately using the knowledge base above.
2. IF the question is NOT related to Vedant Khatri (e.g. general trivia, coding tutorials unrelated to Vedant, math, weather, news, recipes, writing general code/essays), YOU MUST DECLINE IMMEDIATELY with the exact message:
"${this.guardrailMessage}"
3. DO NOT answer off-topic questions under any circumstances.
`;
  }

  async processUserQuery(query: string): Promise<AiChatResponse> {
    const openRouterApiKey = process.env.OPENROUTER_API_KEY;
    const openAiApiKey = process.env.OPENAI_API_KEY;
    const model = process.env.AI_MODEL || 'openai/gpt-4o-mini';

    // 1. If OpenRouter API Key is provided
    if (openRouterApiKey) {
      try {
        this.logger.log(`Dispatching query to OpenRouter using model: ${model}`);
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${openRouterApiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': process.env.OPENROUTER_SITE_URL || 'http://localhost:3000',
            'X-Title': process.env.OPENROUTER_SITE_NAME || 'Vedant Khatri Portfolio',
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: this.buildSystemPrompt() },
              { role: 'user', content: query },
            ],
            temperature: 0.2,
          }),
        });

        const data = await response.json();
        if (data?.choices?.[0]?.message?.content) {
          const answer = data.choices[0].message.content.trim();
          const isBlocked = answer.includes("exclusively to answer questions about Vedant Khatri");
          return {
            answer,
            relevantSkills: isBlocked ? [] : this.extractRelevantSkills(query),
            isGuardrailBlocked: isBlocked,
          };
        }
      } catch (err) {
        this.logger.error('OpenRouter API call failed:', err);
      }
    }

    // 2. If OpenAI API Key is provided
    if (openAiApiKey) {
      try {
        this.logger.log(`Dispatching query to OpenAI API using model: ${model}`);
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${openAiApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: model.includes('/') ? model.split('/')[1] : model,
            messages: [
              { role: 'system', content: this.buildSystemPrompt() },
              { role: 'user', content: query },
            ],
            temperature: 0.2,
          }),
        });

        const data = await response.json();
        if (data?.choices?.[0]?.message?.content) {
          const answer = data.choices[0].message.content.trim();
          const isBlocked = answer.includes("exclusively to answer questions about Vedant Khatri");
          return {
            answer,
            relevantSkills: isBlocked ? [] : this.extractRelevantSkills(query),
            isGuardrailBlocked: isBlocked,
          };
        }
      } catch (err) {
        this.logger.error('OpenAI API call failed:', err);
      }
    }

    // 3. Intelligent Local Fallback Engine with Strict Topic Classification Guardrail
    return this.processLocalGuardrail(query);
  }

  private processLocalGuardrail(query: string): AiChatResponse {
    const q = query.toLowerCase().trim();

    // Check for off-topic keywords / generic programming / trivia questions
    const isResumeTopic =
      q.includes('vedant') ||
      q.includes('skill') ||
      q.includes('technology') ||
      q.includes('stack') ||
      q.includes('experience') ||
      q.includes('work') ||
      q.includes('company') ||
      q.includes('postqode') ||
      q.includes('purpledocs') ||
      q.includes('securedapp') ||
      q.includes('project') ||
      q.includes('thakur') ||
      q.includes('qodeflow') ||
      q.includes('contact') ||
      q.includes('email') ||
      q.includes('hire') ||
      q.includes('phone') ||
      q.includes('education') ||
      q.includes('degree') ||
      q.includes('sati') ||
      q.includes('resume') ||
      q.includes('background') ||
      q.includes('react') ||
      q.includes('golang') ||
      q.includes('go') ||
      q.includes('spring boot') ||
      q.includes('nest') ||
      q.includes('next');

    // If query is off-topic, enforce strict guardrail block
    if (!isResumeTopic) {
      return {
        answer: this.guardrailMessage,
        relevantSkills: [],
        isGuardrailBlocked: true,
      };
    }

    // Handle resume queries
    if (q.includes('skill') || q.includes('technology') || q.includes('stack')) {
      return {
        answer: `Vedant is proficient in full-stack architecture. Key languages: ${this.knowledgeBase.skills.languages.join(', ')}. Frameworks include: ${this.knowledgeBase.skills.frameworks.join(', ')}. Cloud & DBs: ${this.knowledgeBase.skills.databasesAndTools.join(', ')}.`,
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
        answer: `Vedant's top projects include:
1. Thakur Dental Clinic: Full-stack queueing algorithm with SSE delay alerts in Go, PostgreSQL & Docker.
2. Qodeflow: AI workflow automation engine in Go, Fastify & React.
3. PostQode Extension: HTML report engine for shareable test files in Spring Boot & React.`,
        relevantSkills: ['Go', 'PostgreSQL', 'React', 'SSE', 'OAuth'],
      };
    }

    return {
      answer: `Vedant Khatri is a Full Stack Developer with 2+ years of experience building scalable microservices, UIs, and automation platforms across React, TypeScript, Go, Java (Spring Boot), Next.js, and NestJS. Feel free to ask about his skills, experience, or projects!`,
      relevantSkills: ['Full Stack Architecture', 'NestJS', 'Next.js', 'Go', 'React'],
    };
  }

  private extractRelevantSkills(query: string): string[] {
    const q = query.toLowerCase();
    const skills: string[] = [];
    if (q.includes('react')) skills.push('React.js');
    if (q.includes('next')) skills.push('Next.js');
    if (q.includes('nest')) skills.push('Nest.js');
    if (q.includes('go') || q.includes('golang')) skills.push('Go');
    if (q.includes('java') || q.includes('spring')) skills.push('Spring Boot');
    if (q.includes('docker')) skills.push('Docker');
    if (q.includes('sql') || q.includes('postgres')) skills.push('PostgreSQL');
    return skills.length > 0 ? skills : ['React', 'TypeScript', 'Go', 'NestJS'];
  }
}
