'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, ExternalLink, Github, Layers, Zap, Shield, Stethoscope, Code } from 'lucide-react';

const projectList = [
  {
    id: 'thakur-dental-clinic',
    title: 'Thakur Dental Clinic Management System',
    category: 'Full-Stack & Real-Time SSE',
    period: '2024',
    description:
      'Developed a full-stack clinic management system with a dynamic queue-shifting algorithm that automatically recalculates overruns and streams real-time delay alerts to patient dashboards via SSE.',
    highlights: [
      'Dynamic queue overrun calculation algorithm with automated SSE delay alert streaming',
      'Unified auth incorporating Google OAuth 2.0 and JWT-based Role-Based Access Control (RBAC)',
      'Clinic dashboards for manual queue overrides, doctor reassignments, and billing/prescriptions',
      'Verified by integration tests utilizing transactional database isolation',
      'Ongoing active development for ABDM compliance & Razorpay payment gateway',
    ],
    tech: ['React.js', 'Go (Golang)', 'GORM', 'PostgreSQL', 'Redux-Toolkit', 'TypeScript', 'Docker', 'Tailwind CSS'],
    icon: Stethoscope,
    badge: 'Featured',
  },
  {
    id: 'qodeflow',
    title: 'Qodeflow Workflow Automation Platform',
    category: 'Developer Automation & AI Agents',
    period: '2025',
    description:
      'Designed and built the Qodeflow Application using Go lang, Fastify, and React TypeScript (Redux-toolkit), enabling the automation of developer workflows and AI agent app integration.',
    highlights: [
      'High performance backend workflow engine written in Go and Fastify',
      'Interactive React TypeScript dashboard supporting AI agent app creation',
      'Empowers developers to automate complex dev workflows',
    ],
    tech: ['Go', 'Fastify', 'React', 'TypeScript', 'Redux-Toolkit', 'AI Agents'],
    icon: Zap,
    badge: 'Enterprise',
  },
  {
    id: 'postqode',
    title: 'PostQode Extension & HTML Report Engine',
    category: 'Extension & Report Automation',
    period: '2025',
    description:
      'Engineered the core logic for the HTML report generator, serving as the standard format for shareable test report files across the PostQode Extension ecosystem.',
    highlights: [
      'HTML report generator for standardized test execution reports',
      'Built with React TypeScript, Redux-toolkit, and Java (Spring Boot) backend',
    ],
    tech: ['React', 'TypeScript', 'Java (Spring Boot)', 'Redux-Toolkit', 'HTML5'],
    icon: Code,
    badge: 'Core Engine',
  },
  {
    id: 'tealcms',
    title: 'PurpleCMS & EMRD 2.0 (UNMH Hospitals)',
    category: 'Healthcare IT Enterprise',
    period: '2024 - 2025',
    description:
      'Led the development of PurpleCMS for UNMH Hospitals, successfully deployed on hospital servers. Modernized the legacy EMR system into EMRD 2.0.',
    highlights: [
      'Successfully deployed PurpleCMS content management app on UNMH Hospital servers',
      'Designed upgraded EMRD 2.0 interface enhancing usability and patient file retrieval',
    ],
    tech: ['React.js', 'Redux-Toolkit', 'TypeScript', 'Healthcare UI'],
    icon: Layers,
    badge: 'Production',
  },
  {
    id: 'solidity-shield',
    title: 'Solidity Shield PDF & Interactive Audit Charts',
    category: 'Web3 & Security UI',
    period: '2023 - 2024',
    description:
      'Developed PDF generation engine and interactive data charts for Solidity shield scan audit reports. Implemented payment status workflow UI.',
    highlights: [
      'Interactive risk score data visualization charts',
      'Client-side instant PDF report compilation engine',
    ],
    tech: ['React.js', 'JavaScript', 'Charts.js', 'PDF Engine'],
    icon: Shield,
    badge: 'Security',
  },
];

export default function ProjectsPage() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const filteredProjects = selectedTech
    ? projectList.filter((p) => p.tech.some((t) => t.toLowerCase().includes(selectedTech.toLowerCase())))
    : projectList;

  const allTechs = Array.from(new Set(projectList.flatMap((p) => p.tech)));

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 text-center max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-black/60 border border-emerald-500/30 text-xs font-mono text-emerald-300">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Featured Software Projects</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-50 tracking-tight">
          Engineering <span className="text-gradient-teal">Portfolio</span>
        </h1>
        <p className="text-emerald-100/70 text-sm">
          Architectural solutions built with React, Go, Java Spring Boot, TypeScript, and Docker.
        </p>
      </motion.div>

      {/* Tech Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
        <button
          onClick={() => setSelectedTech(null)}
          className={`px-3 py-1.5 rounded-full transition-all ${selectedTech === null
              ? 'bg-emerald-600 text-emerald-50 font-semibold shadow-md'
              : 'bg-black/70 text-emerald-500/60 hover:text-emerald-50 border border-emerald-500/15'
            }`}
        >
          All Projects ({projectList.length})
        </button>
        {['React', 'Go', 'TypeScript', 'Java', 'Docker'].map((tech) => (
          <button
            key={tech}
            onClick={() => setSelectedTech(tech)}
            className={`px-3 py-1.5 rounded-full font-mono transition-all ${selectedTech === tech
                ? 'bg-emerald-600 text-emerald-50 font-semibold shadow-md'
                : 'bg-black/70 text-emerald-500/60 hover:text-emerald-50 border border-emerald-500/15'
              }`}
          >
            {tech}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((proj, idx) => {
          const Icon = proj.icon;
          return (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-card p-6 rounded-md space-y-5 flex flex-col justify-between border border-emerald-500/15 hover:border-emerald-500/40"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-sm bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold tracking-wide border border-emerald-500/30">
                    {proj.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-emerald-50 group-hover:text-emerald-400 transition-colors">
                    {proj.title}
                  </h3>
                  <div className="text-xs text-emerald-500/60 font-mono mt-1">
                    {proj.category} • {proj.period}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed">
                  {proj.description}
                </p>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-mono text-emerald-500/60 uppercase tracking-wider block">
                    Key Achievements:
                  </span>
                  <ul className="space-y-1 text-xs text-emerald-100/70">
                    {proj.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-500/15 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-black/70 border border-emerald-500/15 text-[10px] font-mono text-emerald-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-emerald-500/60 font-mono pt-1">
                  <a
                    href="https://github.com/vedrocks2000"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-emerald-50 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    Source Code
                  </a>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Verified Stack
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
