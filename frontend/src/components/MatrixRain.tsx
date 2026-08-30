'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Canvas-based Matrix digital rain effect.
 * Renders behind all content as a subtle, low-opacity backdrop.
 */
export function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const chars =
            '01アイウエオカキクケコサシスセソタチツテトナニヌネノ<>{}[]/\\;:=+-*ABCDEFVKQODEXYZ';
        const fontSize = 15;
        let columns = Math.floor(width / fontSize);
        let drops: number[] = Array.from({ length: columns }, () => Math.random() * -100);

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            columns = Math.floor(width / fontSize);
            drops = Array.from({ length: columns }, () => Math.random() * -100);
        };
        window.addEventListener('resize', resize);

        let animationFrameId: number;
        let lastTime = 0;
        const interval = 55; // ms between frames -> controls fall speed

        const draw = (time: number) => {
            animationFrameId = requestAnimationFrame(draw);
            if (time - lastTime < interval) return;
            lastTime = time;

            ctx.fillStyle = 'rgba(1, 3, 2, 0.12)';
            ctx.fillRect(0, 0, width, height);

            ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Leading character brighter
                ctx.fillStyle = 'rgba(160, 255, 190, 0.85)';
                ctx.fillText(char, x, y);

                // Trailing glow
                ctx.fillStyle = 'rgba(0, 255, 102, 0.35)';
                ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y - fontSize);

                if (y > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        animationFrameId = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none opacity-[0.16] mix-blend-screen"
            aria-hidden="true"
        />
    );
}
