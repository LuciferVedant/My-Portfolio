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
    <footer className="w-full border-t border-emerald-500/20 bg-black/85 backdrop-blur-md pt-12 pb-8 px-6 mt-20 relative z-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Column 1: Profile Summary */}
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-sm bg-black border border-emerald-400/50 flex items-center justify-center font-bold text-xs text-emerald-400 shadow-[0_0_10px_rgba(0,255,102,0.3)]">
              VK
            </div>
            <h3 className="text-lg font-bold text-emerald-300 tracking-wide">Vedant Khatri</h3>
          </div>
          <p className="text-sm text-emerald-100/60 max-w-md leading-relaxed">
            <span className="text-emerald-500">$</span> Full Stack Developer with 2+ years of experience building scalable microservices, high-performance web applications, and workflow automation platforms.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400/70 font-mono pt-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            Bengaluru, Karnataka, India
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400/80 mb-4 font-mono">
            // navigation
          </h4>
          <ul className="space-y-2 text-sm text-emerald-100/60">
            <li>
              <Link href="/about" className="hover:text-emerald-400 transition-colors">
                About & Bio
              </Link>
            </li>
            <li>
              <Link href="/experience" className="hover:text-emerald-400 transition-colors">
                Work Experience
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-emerald-400 transition-colors">
                Featured Projects
              </Link>
            </li>
            <li>
              <Link href="/skills" className="hover:text-emerald-400 transition-colors">
                Tech Stack & Skills
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                Get In Touch
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Direct Connect & Backend Status */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400/80 mb-4 font-mono">
            // connect &amp; status
          </h4>
          <div className="space-y-3">
            <a
              href="mailto:vedrocks2000@gmail.com"
              className="flex items-center gap-2 text-sm text-emerald-100/60 hover:text-emerald-400 transition-colors"
            >
              <Mail className="w-4 h-4 text-emerald-400" />
              vedrocks2000@gmail.com
            </a>
            <a
              href="tel:8349443633"
              className="flex items-center gap-2 text-sm text-emerald-100/60 hover:text-emerald-400 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              +91 8349443633
            </a>

            <div className="pt-3 flex items-center gap-3">
              <a
                href="https://github.com/vedrocks2000"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-sm bg-black border border-emerald-500/20 flex items-center justify-center text-emerald-400/70 hover:text-emerald-300 hover:border-emerald-400/60 hover:shadow-[0_0_12px_rgba(0,255,102,0.35)] transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-sm bg-black border border-emerald-500/20 flex items-center justify-center text-emerald-400/70 hover:text-emerald-300 hover:border-emerald-400/60 hover:shadow-[0_0_12px_rgba(0,255,102,0.35)] transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            {/* NestJS Backend Health Badge */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-black border border-emerald-500/20 text-[11px] font-mono text-emerald-400/80">
                <Server className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>API: {apiStatus ? 'connected [200]' : 'active [⚡]'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-6 border-t border-emerald-500/10 flex flex-col sm:flex-row justify-between items-center text-xs text-emerald-500/50 gap-4 font-mono">
        <span>© {new Date().getFullYear()} Vedant Khatri — built with Next.js 14 &amp; NestJS.</span>
        <span className="flex items-center gap-1">
          <Terminal className="w-3 h-3 text-emerald-400" />
          rendered in 3D canvas · matrix protocol
        </span>
      </div>
    </footer>
  );
}
