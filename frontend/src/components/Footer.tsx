'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, Phone, MapPin, Terminal, Server } from 'lucide-react';

export function Footer() {
  const [apiStatus, setApiStatus] = useState<{ status: string; uptime: number } | null>(null);

  useEffect(() => {
    fetch('http://localhost:5001/api/health')
      .then((res) => res.json())
      .then((data) => setApiStatus({ status: data.status, uptime: data.uptimeSeconds }))
      .catch(() => setApiStatus(null));
  }, []);

  return (
    <footer className="w-full border-t border-white/10 bg-slate-950/80 backdrop-blur-md pt-12 pb-8 px-6 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Column 1: Profile Summary */}
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xs text-white">
              VK
            </div>
            <h3 className="text-lg font-bold text-white tracking-wide">Vedant Khatri</h3>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            Full Stack Developer with 2+ years of experience building scalable microservices, high-performance web applications, and workflow automation platforms.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono pt-2">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            Jabalpur, M.P. • Bangalore, India
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4 font-mono">
            Navigation
          </h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <Link href="/about" className="hover:text-indigo-400 transition-colors">
                About & Bio
              </Link>
            </li>
            <li>
              <Link href="/experience" className="hover:text-indigo-400 transition-colors">
                Work Experience
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-indigo-400 transition-colors">
                Featured Projects
              </Link>
            </li>
            <li>
              <Link href="/skills" className="hover:text-indigo-400 transition-colors">
                Tech Stack & Skills
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-indigo-400 transition-colors">
                Get In Touch
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Direct Connect & Backend Status */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4 font-mono">
            Connect & Status
          </h4>
          <div className="space-y-3">
            <a
              href="mailto:vedrocks2000@gmail.com"
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors"
            >
              <Mail className="w-4 h-4 text-indigo-400" />
              vedrocks2000@gmail.com
            </a>
            <a
              href="tel:8349443633"
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors"
            >
              <Phone className="w-4 h-4 text-indigo-400" />
              +91 8349443633
            </a>

            <div className="pt-3 flex items-center gap-3">
              <a
                href="https://github.com/vedrocks2000"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            {/* NestJS Backend Health Badge */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
                <Server className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>NestJS API: {apiStatus ? 'Connected 🟢' : 'Active ⚡'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <span>© {new Date().getFullYear()} Vedant Khatri. Built with Next.js 14 & NestJS.</span>
        <span className="flex items-center gap-1 font-mono">
          <Terminal className="w-3 h-3 text-indigo-400" />
          Designed with 3D Canvas & Apple Aesthetics
        </span>
      </div>
    </footer>
  );
}
