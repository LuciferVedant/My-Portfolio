'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Code2, User, Briefcase, FolderGit2, Cpu, Send, Sparkles } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/', icon: Code2 },
  { name: 'About', path: '/about', icon: User },
  { name: 'Experience', path: '/experience', icon: Briefcase },
  { name: 'Projects', path: '/projects', icon: FolderGit2 },
  { name: 'Skills', path: '/skills', icon: Cpu },
  { name: 'Contact', path: '/contact', icon: Send },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <nav className="glass-panel px-4 py-2.5 rounded-full flex items-center gap-1 sm:gap-2 shadow-2xl max-w-4xl w-full justify-between border border-white/10">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2 pl-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-105 transition-transform">
            VK
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-semibold tracking-wide text-white group-hover:text-indigo-400 transition-colors">
              Vedant Khatri
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Full Stack Engineer</span>
          </div>
        </Link>

        {/* Route Links */}
        <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-full border border-white/5">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isActive ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600/80 to-purple-600/80 rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <span className="relative z-10 hidden md:inline">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Live Status Pill */}
        <div className="hidden lg:flex items-center gap-2 pl-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] text-slate-300 font-mono flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            2+ Yrs Exp
          </span>
        </div>
      </nav>
    </header>
  );
}
