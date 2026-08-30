'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HeroCanvas } from '@/components/3d/HeroCanvas';
import {
  ArrowRight,
  Code,
  Layers,
  Zap,
  Github,
  Terminal,
  ShieldCheck,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 space-y-24 pb-12">
      {/* HERO SECTION WITH 3D CANVAS */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-black/60 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>2+ yrs exp · full stack engineer · agent-ready</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-emerald-50 leading-[1.1]">
            Architecting{' '}
            <span className="glitch text-gradient-purple text-glow" data-text="Scalable Systems">
              Scalable Systems
            </span>{' '}
            &amp; Clean Interfaces.
          </h1>

          <p className="text-base sm:text-lg text-emerald-100/70 leading-relaxed max-w-2xl font-normal">
            <span className="text-emerald-500">$</span> whoami<br />
            Hi, I&apos;m <strong className="text-emerald-200">Vedant Khatri</strong>. I design high-performance web applications, automated microservice workflows, and enterprise platforms across{' '}
            <span className="text-emerald-400 font-semibold">React, TypeScript, Go, Java (Spring Boot)</span>, and{' '}
            <span className="text-teal-400 font-semibold">NestJS</span>.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/projects"
              className="px-6 py-3.5 rounded-sm bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm shadow-[0_0_25px_rgba(0,255,102,0.35)] flex items-center gap-2 group transition-all uppercase tracking-wide"
            >
              Explore Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-sm glass-panel hover:border-emerald-400/60 text-emerald-300 font-medium text-sm flex items-center gap-2 transition-all uppercase tracking-wide"
            >
              Get In Touch
            </Link>

            <a
              href="https://github.com/vedrocks2000"
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-sm glass-panel hover:border-emerald-400/60 text-emerald-400 hover:text-emerald-300 transition-all"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

          {/* Key Stat Cards */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-emerald-500/15">
            <div>
              <div className="text-2xl font-bold text-emerald-300 font-mono">2+ Yrs</div>
              <div className="text-xs text-emerald-500/60 uppercase tracking-wide">Engineering Exp</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400 font-mono">5+</div>
              <div className="text-xs text-emerald-500/60 uppercase tracking-wide">Major Projects</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-teal-400 font-mono">100%</div>
              <div className="text-xs text-emerald-500/60 uppercase tracking-wide">Production Code</div>
            </div>
          </div>
        </motion.div>

        {/* 3D CANVAS SHOWCASE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center items-center"
        >
          <div className="w-full relative terminal-window rounded-md overflow-hidden shadow-2xl">
            <div className="terminal-topbar pl-16">hero_render.canvas — three.js</div>
            <HeroCanvas />
          </div>
        </motion.div>
      </section>

      {/* CORE CAPABILITIES GRID */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400/80">
            // core_engineering_stack
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-emerald-50">
            End-to-End Full Stack Mastery
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-md space-y-4"
          >
            <div className="w-12 h-12 rounded-sm bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Code className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-emerald-100">Frontend Precision</h4>
            <p className="text-sm text-emerald-100/60 leading-relaxed">
              Crafting responsive, accessible UIs using React, Next.js, Redux-Toolkit, TypeScript, and Framer Motion with fluid micro-interactions.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2 text-[11px] font-mono text-emerald-300">
              <span className="px-2 py-0.5 rounded bg-black/60 border border-emerald-800/40">React</span>
              <span className="px-2 py-0.5 rounded bg-black/60 border border-emerald-800/40">Next.js</span>
              <span className="px-2 py-0.5 rounded bg-black/60 border border-emerald-800/40">TypeScript</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 rounded-md space-y-4"
          >
            <div className="w-12 h-12 rounded-sm bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-emerald-100">Backend Systems</h4>
            <p className="text-sm text-emerald-100/60 leading-relaxed">
              Designing REST APIs, microservices, and asynchronous event streams in Go (Golang), Java (Spring Boot), NestJS, Node.js, and PostgreSQL.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2 text-[11px] font-mono text-teal-300">
              <span className="px-2 py-0.5 rounded bg-black/60 border border-teal-800/40">Go</span>
              <span className="px-2 py-0.5 rounded bg-black/60 border border-teal-800/40">Spring Boot</span>
              <span className="px-2 py-0.5 rounded bg-black/60 border border-teal-800/40">NestJS</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 rounded-md space-y-4"
          >
            <div className="w-12 h-12 rounded-sm bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-emerald-100">Workflow &amp; Automation</h4>
            <p className="text-sm text-emerald-100/60 leading-relaxed">
              Building AI-assisted extensions, automated report generators (PostQode), and queue management systems with SSE streaming and Docker.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2 text-[11px] font-mono text-lime-300">
              <span className="px-2 py-0.5 rounded bg-black/60 border border-lime-800/40">Docker</span>
              <span className="px-2 py-0.5 rounded bg-black/60 border border-lime-800/40">Fastify</span>
              <span className="px-2 py-0.5 rounded bg-black/60 border border-lime-800/40">AI Agents</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* QUICK FEATURED HIGHLIGHT */}
      <section className="glass-card p-8 rounded-md relative overflow-hidden border border-emerald-500/25">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-black/60 px-2.5 py-1 rounded-sm border border-emerald-800/50 uppercase tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5" />
              latest_enterprise_project
            </div>
            <h3 className="text-2xl font-bold text-emerald-50">Thakur Dental Clinic Management System</h3>
            <p className="text-sm text-emerald-100/70 leading-relaxed">
              Full-stack system featuring a dynamic queue-shifting algorithm that automatically recalculates overruns and streams real-time delay alerts to patient dashboards via SSE (Server-Sent Events).
            </p>
          </div>
          <Link
            href="/projects"
            className="px-5 py-3 rounded-sm bg-black hover:bg-emerald-950 text-emerald-300 font-medium text-xs border border-emerald-500/30 flex items-center gap-2 shrink-0 transition-colors uppercase tracking-wide"
          >
            View Project Details <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
          </Link>
        </div>
      </section>
    </div>
  );
}
