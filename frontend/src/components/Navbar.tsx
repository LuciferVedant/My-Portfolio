'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, User, Briefcase, FolderGit2, Cpu, Send, Menu, X } from 'lucide-react';

const navItems = [
  { name: 'home', path: '/', icon: Code2 },
  { name: 'about', path: '/about', icon: User },
  { name: 'experience', path: '/experience', icon: Briefcase },
  { name: 'projects', path: '/projects', icon: FolderGit2 },
  { name: 'skills', path: '/skills', icon: Cpu },
  { name: 'contact', path: '/contact', icon: Send },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-8 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="glass-panel px-3 py-2 rounded-md flex items-center gap-2 sm:gap-3 shadow-2xl max-w-4xl w-full justify-between border border-emerald-500/25">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2 pl-1 group">
          <div className="w-8 h-8 rounded-sm bg-black border border-emerald-400/50 flex items-center justify-center text-emerald-400 font-bold text-sm shadow-[0_0_12px_rgba(0,255,102,0.35)] group-hover:shadow-[0_0_20px_rgba(0,255,102,0.6)] transition-shadow">
            VK
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-xs font-semibold tracking-wider text-emerald-300 group-hover:text-emerald-200 transition-colors">
              root@vedant<span className="text-emerald-500">:~$</span>
            </span>
            <span className="text-[10px] text-emerald-600/70">./full_stack_engineer.sh</span>
          </div>
        </Link>

        {/* Route Links - Desktop */}
        <div className="hidden md:flex items-center gap-1 bg-black/50 p-1 rounded-sm border border-emerald-500/10">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-3 py-1.5 rounded-sm text-[11px] font-medium transition-all flex items-center gap-1.5 uppercase tracking-wider ${isActive ? 'text-black font-semibold' : 'text-emerald-400/70 hover:text-emerald-300 hover:bg-emerald-500/5'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-emerald-400 rounded-sm shadow-[0_0_14px_rgba(0,255,102,0.6)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Live Status Pill */}
        <div className="hidden lg:flex items-center gap-2 pl-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] text-emerald-400/80 font-mono uppercase tracking-wider">
            online
          </span>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-sm text-emerald-400 border border-emerald-500/20"
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 w-[90vw] max-w-sm glass-panel rounded-md border border-emerald-500/25 p-2 md:hidden"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-sm text-xs uppercase tracking-wider transition-colors ${isActive ? 'bg-emerald-500/15 text-emerald-300' : 'text-emerald-400/70 hover:bg-emerald-500/5'
                    }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.name}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
