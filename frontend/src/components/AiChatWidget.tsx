'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, User, ChevronRight, ShieldAlert } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  skills?: string[];
  isGuardrailBlocked?: boolean;
}

export function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: "👋 Hi! I'm Vedant's AI Assistant. Ask me anything about his engineering experience at PostQode, tech stack (React, Go, Spring Boot, NestJS), or projects!",
    },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userText = query.trim();
    setQuery('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5001/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userText }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: data.answer || "Vedant is a Full Stack Developer with 2+ years of experience across React, TypeScript, Go, Spring Boot, and cloud tools.",
          skills: data.relevantSkills || [],
          isGuardrailBlocked: data.isGuardrailBlocked || false,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Vedant is a Software Engineer with 2+ years of experience specializing in Full Stack architecture (React, TypeScript, Go, Java Spring Boot, NestJS). Feel free to ask about his resume or projects!',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestQuestion = (q: string) => {
    setQuery(q);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        style={{ position: 'fixed', bottom: '24px', right: '24px', left: 'auto', zIndex: 99999 }}
        className="pointer-events-auto p-3.5 rounded-sm bg-emerald-500 text-black shadow-[0_0_30px_rgba(0,255,102,0.5)] flex items-center gap-2 border border-emerald-300/60 hover:bg-emerald-400 transition-all cursor-pointer"
        aria-label="Open AI Assistant"
      >
        <div className="relative flex items-center gap-2 pointer-events-none">
          <div className="relative">
            <Bot className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-black/80 animate-ping" />
          </div>
          <span className="hidden sm:inline text-xs font-bold uppercase tracking-widest font-mono">
            {isOpen ? 'close_ai.exe' : 'ask_ai.exe'}
          </span>
        </div>
      </motion.button>

      {/* Chat Drawer Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'fixed', bottom: '96px', right: '24px', left: 'auto', zIndex: 99999 }}
            className="pointer-events-auto w-[calc(100vw-48px)] sm:w-[380px] h-[500px] max-w-[90vw] terminal-window rounded-md flex flex-col shadow-[0_10px_40px_rgba(0,0,0,0.9)] border border-emerald-500/40 overflow-hidden bg-black/95"
          >
            {/* Header */}
            <div className="p-4 pt-6 bg-black/90 border-b border-emerald-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-sm bg-black border border-emerald-400/50 flex items-center justify-center text-emerald-400 shadow-[0_0_10px_rgba(0,255,102,0.3)]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-200 flex items-center gap-1.5 font-mono">
                    ai_assistant
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      NESTJS API
                    </span>
                  </h3>
                  <p className="text-[11px] text-emerald-500/60 font-mono">resume &amp; career query mode</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-sm text-emerald-500/60 hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-6 h-6 rounded-sm bg-black border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] p-3 rounded-md leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-emerald-500 text-black font-semibold rounded-br-none shadow-[0_0_15px_rgba(0,255,102,0.2)]'
                        : msg.isGuardrailBlocked
                        ? 'bg-amber-950/80 text-amber-200 border border-amber-500/40 rounded-bl-none'
                        : 'bg-black/80 text-emerald-100/90 border border-emerald-500/20 rounded-bl-none'
                    }`}
                  >
                    {msg.isGuardrailBlocked && (
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-400 uppercase mb-1.5 tracking-wider">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        resume guardrail active
                      </div>
                    )}
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {msg.skills && msg.skills.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-emerald-500/20 flex flex-wrap gap-1">
                        {msg.skills.map((s, i) => (
                          <span
                            key={i}
                            className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-mono"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-6 h-6 rounded-sm bg-emerald-900 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5 text-emerald-300" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-emerald-500/60 text-xs pl-8 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  querying_model<span className="cursor-blink" />
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="px-3 py-2 bg-black/80 border-t border-emerald-500/10 flex gap-1.5 overflow-x-auto text-[10px] font-mono">
              <button
                type="button"
                onClick={() => suggestQuestion('What did Vedant build at PostQode?')}
                className="px-2 py-1 rounded-sm bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 whitespace-nowrap transition-colors flex items-center gap-1 border border-emerald-500/20"
              >
                PostQode Work <ChevronRight className="w-3 h-3 text-emerald-400" />
              </button>
              <button
                type="button"
                onClick={() => suggestQuestion('What are Vedant top skills?')}
                className="px-2 py-1 rounded-sm bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 whitespace-nowrap transition-colors flex items-center gap-1 border border-emerald-500/20"
              >
                Top Skills <ChevronRight className="w-3 h-3 text-emerald-400" />
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-black border-t border-emerald-500/20 flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about Vedant's experience or skills..."
                className="flex-1 bg-black/60 text-emerald-100 placeholder-emerald-700/60 px-3 py-2 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 border border-emerald-500/20 font-mono"
              />
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="p-2 rounded-sm bg-emerald-500 text-black hover:bg-emerald-400 disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
