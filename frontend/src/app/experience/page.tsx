'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Building2, CheckCircle2 } from 'lucide-react';

const experiences = [
  {
    company: 'POSTQODE, ELEVENXN TECHNOLOGIES PVT LTD',
    role: 'Software Engineer',
    period: 'May 2025 – Present',
    location: 'Bangalore, India',
    isCurrent: true,
    highlights: [
      'Contributed to the development of the PostQode Extension and its accompanying Web UI using React TypeScript (Redux-Toolkit) and Java (Spring Boot).',
      'Engineered the core logic for the HTML report generator, serving as the standard format for shareable test report files.',
      'Designed and built the Qodeflow Application using Go lang, Fastify, and React TypeScript (Redux-Toolkit), enabling workflow automation and empowering developers to create custom apps with AI agents.',
    ],
    tech: ['React', 'TypeScript', 'Redux-Toolkit', 'Java (Spring Boot)', 'Go', 'Fastify', 'AI Agents'],
  },
  {
    company: 'PURPLEDOCS PVT LTD',
    role: 'Jr Frontend Developer',
    period: 'Sep 2024 – May 2025',
    location: 'Jabalpur, India',
    isCurrent: false,
    highlights: [
      'Led the development of content management application (PurpleCMS) for UNMH Hospitals, successfully deployed on their enterprise servers.',
      'Designed and developed the user interface using React.js, Redux-Toolkit, and TypeScript for EMRD 2.0 (Electronic Medical Record Dashboard), enhancing usability and UX.',
      'Led UI development for the modernized EMR system, enabling efficient retrieval and management of hospital patient files.',
    ],
    tech: ['React.js', 'Redux-Toolkit', 'TypeScript', 'JavaScript', 'CSS3', 'Healthcare EMR'],
  },
  {
    company: 'SECUREDAPP',
    role: 'Software Developer Intern',
    period: 'Dec 2023 – June 2024',
    location: 'Jabalpur, India',
    isCurrent: false,
    highlights: [
      'Designed and implemented UI components like payment status pages and blog pages using React.js.',
      'Developed PDF generation engine and interactive charts for Solidity Shield scan reports, enhancing security audit data visualization.',
    ],
    tech: ['React.js', 'JavaScript', 'Charts.js', 'PDF Generation', 'Web3 UI'],
  },
];

export default function ExperiencePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 text-center max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-black/60 border border-emerald-500/30 text-xs font-mono text-emerald-300">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Professional Career Timeline</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-50 tracking-tight">
          Work <span className="text-gradient-teal">Experience</span>
        </h1>
        <p className="text-emerald-100/70 text-sm">
          A track record of engineering software extensions, healthcare CMS platforms, and AI automation engines.
        </p>
      </motion.div>

      {/* Experience Timeline */}
      <div className="relative border-l border-emerald-500/30 pl-6 sm:pl-8 ml-2 sm:ml-4 space-y-12">
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative"
          >
            {/* Timeline Dot */}
            <div
              className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${exp.isCurrent
                  ? 'bg-emerald-500 border-emerald-200 shadow-[0_0_16px_rgba(0,255,102,0.6)]'
                  : 'bg-black/70 border-emerald-500'
                }`}
            >
              {exp.isCurrent && <div className="w-2 h-2 rounded-full bg-black animate-ping" />}
            </div>

            {/* Experience Card */}
            <div className="glass-card p-6 sm:p-8 rounded-md space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-500/15 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                    <Building2 className="w-3.5 h-3.5" />
                    {exp.company}
                  </div>
                  <h3 className="text-xl font-bold text-emerald-50 mt-1">{exp.role}</h3>
                </div>

                <div className="flex flex-col sm:items-end text-xs text-emerald-500/60 font-mono gap-1">
                  <span className="flex items-center gap-1 text-emerald-100/70 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600/60" />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Highlights List */}
              <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-100/70">
                {exp.highlights.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Badges */}
              <div className="pt-3 flex flex-wrap gap-1.5 border-t border-emerald-500/10">
                {exp.tech.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-md bg-black/70 border border-emerald-500/15 text-[11px] font-mono text-emerald-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
