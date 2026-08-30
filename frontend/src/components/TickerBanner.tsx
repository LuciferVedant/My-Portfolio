'use client';

import React from 'react';

const items = [
    'FULL STACK ENGINEER',
    'REACT · NEXT.JS · TYPESCRIPT',
    'GO (GOLANG) · FASTIFY',
    'JAVA · SPRING BOOT',
    'NESTJS · NODE.JS',
    'AI AGENT WORKFLOWS',
    'OPEN TO OPPORTUNITIES',
    'DOCKER · POSTGRESQL',
    'SYSTEM STATUS: ONLINE',
];

export function TickerBanner() {
    const doubled = [...items, ...items];

    return (
        <div className="w-full overflow-hidden border-b border-emerald-500/20 bg-black/70 backdrop-blur-sm relative z-50">
            <div className="ticker-track py-2">
                {doubled.map((item, idx) => (
                    <div key={idx} className="flex items-center shrink-0 px-4">
                        <span className="text-[11px] font-mono font-semibold tracking-widest text-emerald-400 uppercase">
                            {item}
                        </span>
                        <span className="mx-4 text-emerald-500/40">◆</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
