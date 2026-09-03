'use client';

import React, { useState } from 'react';
import { Terminal, Copy, Check, Code2, Server, Cpu } from 'lucide-react';

const codeSnippets = [
  {
    id: 'queue_alg.go',
    title: 'queue_alg.go',
    language: 'Go',
    icon: Server,
    code: `// Thakur Dental Clinic: Real-time SSE Queue Overrun Algorithm
package queue

type QueueManager struct {
    SSEBroadcaster *events.Streamer
    DB             *gorm.DB
}

func (q *QueueManager) RecalculateOverrun(doctorID string) error {
    var activeQueue []Appointment
    q.DB.Where("doctor_id = ? AND status = 'in_progress'", doctorID).Find(&activeQueue)

    for idx, app := range activeQueue {
        delay := calculateDelayMinutes(app.StartTime, app.EstimatedDuration)
        if delay > 5 {
            q.SSEBroadcaster.StreamAlert(app.PatientID, AlertPayload{
                DelayMinutes: delay,
                Position:     idx + 1,
            })
        }
    }
    return nil
}`,
  },
  {
    id: 'report_gen.ts',
    title: 'report_gen.ts',
    language: 'TypeScript',
    icon: Code2,
    code: `// PostQode Extension: Standardized HTML Report Generator Engine
export class TestReportEngine {
  public generateReport(suite: TestSuiteResult): string {
    const passed = suite.tests.filter(t => t.status === 'PASSED').length;
    const failed = suite.tests.filter(t => t.status === 'FAILED').length;
    
    return HTMLTemplateBuilder.render({
      suiteName: suite.name,
      metrics: { passed, failed, durationMs: suite.durationMs },
      shareableHash: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    });
  }
}`,
  },
  {
    id: 'contact_api.ts',
    title: 'contact_api.ts',
    language: 'NestJS',
    icon: Cpu,
    code: `// NestJS Portfolio: Contact & Multi-Channel Notification Engine
@Injectable()
export class ContactService {
  async handleSubmission(dto: CreateContactDto): Promise<Result> {
    // 1. Dispatch Email to vedrocks2000@gmail.com
    await this.mailer.sendMail({ to: 'vedrocks2000@gmail.com', ...dto });
    // 2. Dispatch Discord/Telegram Push Webhook
    await this.webhook.pushEmbed(dto);
    // 3. Persist into Local Database Logs
    await this.db.saveLog(dto);
    return { success: true, loggedAt: new Date() };
  }
}`,
  },
];

export function TerminalCodeInspector() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const current = codeSnippets[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="terminal-window rounded-md overflow-hidden shadow-2xl border border-emerald-500/30 bg-black/90">
      {/* Top Window Bar */}
      <div className="terminal-topbar flex items-center justify-between px-3 py-2 bg-black/80 border-b border-emerald-500/20">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[10px] font-mono tracking-widest text-emerald-300 uppercase">
            system_inspector.sh
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 text-[10px] font-mono text-emerald-400/70 hover:text-emerald-300 transition-colors bg-emerald-500/10 px-2 py-0.5 rounded-sm border border-emerald-500/20"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'COPIED' : 'COPY'}</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center bg-black/60 border-b border-emerald-500/15 overflow-x-auto text-[11px] font-mono">
        {codeSnippets.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = activeTab === idx;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-1.5 px-3 py-2 border-r border-emerald-500/10 transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-emerald-500/15 text-emerald-300 font-semibold border-b-2 border-b-emerald-400'
                  : 'text-emerald-500/50 hover:text-emerald-300 hover:bg-emerald-500/5'
              }`}
            >
              <Icon className="w-3 h-3 text-emerald-400" />
              <span>{tab.title}</span>
            </button>
          );
        })}
      </div>

      {/* Code Viewer Body */}
      <div className="p-4 font-mono text-[11px] leading-relaxed text-emerald-100/90 overflow-x-auto h-[310px]">
        <pre className="whitespace-pre">
          <code>{current.code}</code>
        </pre>
      </div>

      {/* Status Bar */}
      <div className="px-3 py-1.5 bg-black border-t border-emerald-500/15 flex items-center justify-between text-[10px] font-mono text-emerald-500/60">
        <span>LANG: {current.language.toUpperCase()}</span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          VERIFIED PRODUCTION CODE
        </span>
      </div>
    </div>
  );
}
