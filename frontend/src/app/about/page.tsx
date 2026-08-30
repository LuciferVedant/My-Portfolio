'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, GraduationCap, Award, MapPin, Mail, Phone, Code2, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300">
          <User className="w-3.5 h-3.5" />
          <span>About Vedant Khatri</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Software Engineer with <span className="text-gradient-purple">2+ Years</span> of Hands-on Impact
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Dynamic Full Stack Developer proven in building scalable architectures, clean UIs, and automation-first platforms. Experienced in leading modernizations for healthcare systems and developer workflow extensions.
        </p>
      </motion.div>

      {/* Profile Overview Card */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 glass-card p-8 rounded-3xl space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-400" />
            Engineering Philosophy
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            I specialize in bridging high-performance backend systems (Go, Java Spring Boot, NestJS) with sleek, modern web interfaces (React, Next.js, Redux-Toolkit). My approach prioritizes modular clean code, robust test isolation, fast load times, and intuitive developer experiences.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div className="space-y-1">
              <span className="text-xs text-slate-400 block font-mono">Location</span>
              <span className="text-sm font-semibold text-white flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                Bangalore / Jabalpur, India
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-400 block font-mono">Email</span>
              <span className="text-sm font-semibold text-white flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                vedrocks2000@gmail.com
              </span>
            </div>
          </div>
        </div>

        <div className="md:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-2xl space-y-3 border border-indigo-500/20">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              Key Focus Areas
            </div>
            <ul className="space-y-2 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2">🔹 Scalable Microservices Architecture</li>
              <li className="flex items-center gap-2">🔹 Automated AI Workflow Engines</li>
              <li className="flex items-center gap-2">🔹 Real-time SSE & Queue Algorithms</li>
              <li className="flex items-center gap-2">🔹 Full-Stack Next.js & NestJS Apps</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Education */}
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Education</h3>
              <p className="text-xs text-slate-400">Academic Background</p>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="text-sm font-bold text-indigo-300">
              SAMRAT ASHOK TECHNOLOGICAL INSTITUTE (SATI), VIDISHA M.P.
            </div>
            <div className="text-xs text-slate-200 font-medium">
              B-Tech in Electronics and Communication Engineering
            </div>
            <div className="text-[11px] font-mono text-slate-400 flex justify-between pt-1">
              <span>2019 – 2023</span>
              <span>Vidisha, India</span>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Certifications</h3>
              <p className="text-xs text-slate-400">Coding Ninjas Certified</p>
            </div>
          </div>

          <ul className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
            <li className="flex items-center justify-between">
              <span>• Data Structures & Algorithms in C++</span>
              <span className="font-mono text-[10px] text-purple-400">Coding Ninjas</span>
            </li>
            <li className="flex items-center justify-between">
              <span>• Full Stack Web Development</span>
              <span className="font-mono text-[10px] text-purple-400">Coding Ninjas</span>
            </li>
            <li className="flex items-center justify-between">
              <span>• Advance Frontend Development</span>
              <span className="font-mono text-[10px] text-purple-400">Coding Ninjas</span>
            </li>
            <li className="flex items-center justify-between">
              <span>• Backend Development Architecture</span>
              <span className="font-mono text-[10px] text-purple-400">Coding Ninjas</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
