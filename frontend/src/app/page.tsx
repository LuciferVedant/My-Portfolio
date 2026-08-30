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
  Sparkles,
  Github,
  Linkedin,
  FileText,
  Terminal,
  ShieldCheck,
  Cpu,
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>2+ Years Experience • Full Stack Engineer</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            Architecting <span className="text-gradient-purple">Scalable Systems</span> & Clean Interfaces.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
            Hi, I&apos;m <strong className="text-white">Vedant Khatri</strong>. I design high-performance web applications, automated microservice workflows, and enterprise platforms across <span className="text-indigo-400 font-semibold">React, TypeScript, Go, Java (Spring Boot)</span>, and <span className="text-purple-400 font-semibold">NestJS</span>.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/projects"
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2 group transition-all"
            >
              Explore Featured Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-full glass-panel hover:bg-white/10 text-slate-200 font-medium text-sm flex items-center gap-2 transition-all"
            >
              Get In Touch
            </Link>

            <a
              href="https://github.com/vedrocks2000"
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-full glass-panel hover:bg-white/10 text-slate-300 hover:text-white transition-all"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

          {/* Key Stat Cards */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
            <div>
              <div className="text-2xl font-bold text-white font-mono">2+ Yrs</div>
              <div className="text-xs text-slate-400">Engineering Exp</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-400 font-mono">5+</div>
              <div className="text-xs text-slate-400">Major Projects</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400 font-mono">100%</div>
              <div className="text-xs text-slate-400">Production Code</div>
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
          <div className="w-full relative glass-card p-4 rounded-3xl overflow-hidden shadow-2xl">
            <HeroCanvas />
          </div>
        </motion.div>
      </section>

      {/* CORE CAPABILITIES GRID */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400">
            Core Engineering Stack
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            End-to-End Full Stack Mastery
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Code className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Frontend Precision</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Crafting responsive, accessible UIs using React, Next.js, Redux-Toolkit, TypeScript, and Framer Motion with Apple-style smooth micro-interactions.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2 text-[11px] font-mono text-indigo-300">
              <span className="px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-800/40">React</span>
              <span className="px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-800/40">Next.js</span>
              <span className="px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-800/40">TypeScript</span>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Backend Systems</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Designing REST APIs, microservices, and asynchronous event streams in Go (Golang), Java (Spring Boot), NestJS, Node.js, and PostgreSQL.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2 text-[11px] font-mono text-purple-300">
              <span className="px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/40">Go</span>
              <span className="px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/40">Spring Boot</span>
              <span className="px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/40">NestJS</span>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Workflow & Automation</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Building AI-assisted extensions, automated report generators (PostQode), and queue management systems with SSE streaming and Docker.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2 text-[11px] font-mono text-cyan-300">
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">Docker</span>
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">Fastify</span>
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">AI Agents</span>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK FEATURED HIGHLIGHT */}
      <section className="glass-card p-8 rounded-3xl relative overflow-hidden border border-indigo-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/50">
              <ShieldCheck className="w-3.5 h-3.5" />
              Latest Enterprise Project
            </div>
            <h3 className="text-2xl font-bold text-white">Thakur Dental Clinic Management System</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Full-stack system featuring a dynamic queue-shifting algorithm that automatically recalculates overruns and streams real-time delay alerts to patient dashboards via SSE (Server-Sent Events).
            </p>
          </div>
          <Link
            href="/projects"
            className="px-5 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs border border-white/10 flex items-center gap-2 shrink-0 transition-colors"
          >
            View Project Details <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
          </Link>
        </div>
      </section>
    </div>
  );
}
