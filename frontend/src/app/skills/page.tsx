'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code, Layers, Wrench, Database, Terminal, Check } from 'lucide-react';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code,
    color: 'from-indigo-500 to-blue-500',
    skills: [
      { name: 'C++ (DSA)', level: 'Advanced', tags: ['Data Structures', 'Algorithms'] },
      { name: 'TypeScript', level: 'Expert', tags: ['Typed Architecture', 'Strict Null Checks'] },
      { name: 'JavaScript', level: 'Expert', tags: ['ES6+', 'Async/Await', 'DOM'] },
      { name: 'Go (Golang)', level: 'Advanced', tags: ['Goroutines', 'Mux', 'Fastify', 'GORM'] },
      { name: 'Java', level: 'Proficient', tags: ['OOP', 'Spring Boot', 'JVM'] },
      { name: 'SQL', level: 'Advanced', tags: ['Complex Queries', 'PostgreSQL', 'MySQL'] },
      { name: 'Python', level: 'Proficient', tags: ['Scripting', 'Automation'] },
    ],
  },
  {
    title: 'Libraries & Frameworks',
    icon: Layers,
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'React.js', level: 'Expert', tags: ['Hooks', 'Virtual DOM', 'Context API'] },
      { name: 'Next.js', level: 'Expert', tags: ['App Router', 'SSR', 'SSG', 'API Routes'] },
      { name: 'Nest.js', level: 'Expert', tags: ['Controllers', 'Services', 'DTOs', 'Guards'] },
      { name: 'Redux / Redux-Toolkit', level: 'Expert', tags: ['State Management', 'RTK Query'] },
      { name: 'Node.js & Express.js', level: 'Advanced', tags: ['Event Loop', 'REST API'] },
      { name: 'Spring Boot', level: 'Proficient', tags: ['Java Framework', 'REST'] },
      { name: 'Tailwind CSS', level: 'Expert', tags: ['Glassmorphism', 'Flex/Grid', 'Responsive'] },
      { name: 'Fastify & Gin', level: 'Advanced', tags: ['Go / JS Fast Web Servers'] },
    ],
  },
  {
    title: 'Tools, Cloud & Platforms',
    icon: Wrench,
    color: 'from-cyan-500 to-emerald-500',
    skills: [
      { name: 'Docker', level: 'Advanced', tags: ['Containerization', 'Docker Compose'] },
      { name: 'PostgreSQL & MySQL', level: 'Advanced', tags: ['Relational DBs', 'Indexing'] },
      { name: 'MongoDB & Mongoose', level: 'Advanced', tags: ['NoSQL', 'Document Store'] },
      { name: 'Git & GitHub', level: 'Expert', tags: ['Branching', 'PR Reviews', 'CI/CD'] },
      { name: 'AWS & Heroku', level: 'Proficient', tags: ['Deployment', 'Cloud Infra'] },
      { name: 'Swagger & OpenApi', level: 'Advanced', tags: ['API Documentation'] },
      { name: 'MCP (Model Context Protocol)', level: 'Advanced', tags: ['AI Integrations'] },
    ],
  },
];

export default function SkillsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 text-center max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300">
          <Cpu className="w-3.5 h-3.5" />
          <span>Skills & Technical Stack</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Technical <span className="text-gradient-purple">Competencies</span>
        </h1>
        <p className="text-slate-300 text-sm">
          A comprehensive breakdown of programming languages, frameworks, cloud tools, and databases.
        </p>
      </motion.div>

      {/* Skill Categories */}
      <div className="space-y-10">
        {skillCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                <div
                  className={`w-9 h-9 rounded-xl bg-gradient-to-r ${cat.color} flex items-center justify-center text-white shadow-lg`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <h2 className="text-xl font-bold text-white tracking-wide">{cat.title}</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="glass-card p-4 rounded-xl space-y-2 border border-slate-800 hover:border-indigo-500/40 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {skill.level}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {skill.tags.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-slate-400 border border-slate-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
