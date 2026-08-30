'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, User, ChevronRight } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  skills?: string[];
}

export function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: "👋 Hi! I'm Vedant's AI Assistant. Ask me anything about his experience at PostQode, tech stack (React, Go, Spring Boot, NestJS), or projects!",
    },
  ]);

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
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Vedant is a Software Engineer with 2+ years of experience specializing in Full Stack architecture (React, TypeScript, Go, Java Spring Boot, NestJS). Feel free to check his resume or contact page!',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestQuestion = (q: string) => {
    setQuery(q);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl flex items-center gap-2 border border-white/20 hover:shadow-indigo-500/30 transition-all"
      >
        <div className="relative">
          <Bot className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        </div>
        <span className="hidden sm:inline text-xs font-semibold tracking-wide">Ask AI Assistant</span>
      </motion.button>

      {/* Chat Drawer Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-[380px] h-[500px] glass-panel rounded-2xl flex flex-col shadow-2xl border border-indigo-500/30 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-slate-900/80 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    Vedant's AI Assistant
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      NestJS Bot
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400">Ask about experience, skills & code</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {msg.skills && msg.skills.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-slate-700/50 flex flex-wrap gap-1">
                        {msg.skills.map((s, i) => (
                          <span
                            key={i}
                            className="px-1.5 py-0.5 bg-indigo-500/20 text-indigo-300 rounded text-[10px] font-mono"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5 text-slate-300" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-slate-400 text-xs pl-8">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                  Thinking...
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="px-3 py-1.5 bg-slate-900/40 border-t border-white/5 flex gap-1.5 overflow-x-auto text-[10px]">
              <button
                onClick={() => suggestQuestion('What did Vedant build at PostQode?')}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap transition-colors flex items-center gap-1"
              >
                PostQode Work <ChevronRight className="w-3 h-3 text-indigo-400" />
              </button>
              <button
                onClick={() => suggestQuestion('What are Vedant top skills?')}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap transition-colors flex items-center gap-1"
              >
                Top Skills <ChevronRight className="w-3 h-3 text-indigo-400" />
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about Vedant's experience..."
                className="flex-1 bg-slate-800/80 text-white placeholder-slate-400 px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 border border-slate-700"
              />
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50 transition-colors"
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
