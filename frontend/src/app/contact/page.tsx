'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Bell, CheckCircle2, AlertCircle, Sparkles, ShieldAlert, Bot } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    company: '',
    message: '',
    webhookUrl: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseState, setResponseState] = useState<{
    success: boolean;
    message: string;
    details?: { emailNotificationSent: boolean; webhookPushSent: boolean };
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseState(null);

    try {
      const res = await fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setResponseState({
          success: true,
          message: data.message || 'Message delivered successfully!',
          details: data.details,
        });
        setFormData({ name: '', email: '', subject: '', company: '', message: '', webhookUrl: '' });
      } else {
        const errorMsg = Array.isArray(data.message) ? data.message.join(', ') : data.message || 'Failed to submit form.';
        setResponseState({
          success: false,
          message: errorMsg,
        });
      }
    } catch {
      setResponseState({
        success: false,
        message: 'Could not connect to NestJS backend API. Please make sure backend is running on http://localhost:5001.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 text-center max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300">
          <Send className="w-3.5 h-3.5" />
          <span>Contact & Instant Notification API</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Get In <span className="text-gradient-purple">Touch</span>
        </h1>
        <p className="text-slate-300 text-sm">
          Send a direct message below. Submissions trigger instant email alerts to <strong className="text-indigo-400">vedrocks2000@gmail.com</strong> and optional Webhook push alerts via NestJS.
        </p>
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info & Notification Explainer */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 rounded-3xl space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-indigo-400" />
              Direct Communication
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px] font-mono">Email Address</span>
                  <a href="mailto:vedrocks2000@gmail.com" className="font-semibold text-white hover:text-indigo-400 transition-colors">
                    vedrocks2000@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px] font-mono">Phone Number</span>
                  <a href="tel:8349443633" className="font-semibold text-white hover:text-indigo-400 transition-colors">
                    +91 8349443633
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px] font-mono">Location</span>
                  <span className="font-semibold text-white">Jabalpur, M.P. • Bangalore, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notification System Explanation Card */}
          <div className="glass-panel p-6 rounded-3xl space-y-4 border border-indigo-500/30">
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider font-mono">
              <Bell className="w-4 h-4 text-indigo-400" />
              How You Get Notified
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  1. Nodemailer SMTP / Resend Email
                </span>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  NestJS formats an HTML email with visitor details and sends it straight to your inbox.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  2. Discord / Telegram Webhook Push
                </span>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Dispatches a formatted rich embed message to your phone or desktop chat immediately.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form connected to NestJS */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 rounded-3xl space-y-5 border border-white/10">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">Send a Message</h2>
              <p className="text-xs text-slate-400">Fill in your details below to test the NestJS contact API.</p>
            </div>

            {responseState && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl text-xs space-y-1 ${
                  responseState.success
                    ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
                    : 'bg-rose-950/60 border border-rose-800 text-rose-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  {responseState.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                  )}
                  {responseState.message}
                </div>
                {responseState.details && (
                  <div className="text-[11px] font-mono text-emerald-400/80 pt-1">
                    ✔ Email status: {responseState.details.emailNotificationSent ? 'Dispatched' : 'Logged'} | Webhook status: {responseState.details.webhookPushSent ? 'Dispatched' : 'Ready'}
                  </div>
                )}
              </motion.div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 font-mono">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 font-mono">Your Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. sarah@techcorp.com"
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 font-mono">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Software Engineer Opportunity"
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 font-mono">Company / Org (Optional)</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. ElevenXN / Microsoft"
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 font-mono">Message *</label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here (at least 10 characters)..."
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Optional Discord Webhook Test URL */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <label className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                <span>Custom Webhook Push URL (Optional for testing instant push alert)</span>
              </label>
              <input
                type="url"
                name="webhookUrl"
                value={formData.webhookUrl}
                onChange={handleChange}
                placeholder="https://discord.com/api/webhooks/..."
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-2 text-[11px] text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending via NestJS API...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit & Trigger Notification
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
