"use client";

import { useEffect, useRef } from "react";

interface Props {
    text: string;
    className?: string;
    textColor?: string;
    stroke?: boolean;
    strokeColor?: string;
    strokeWidth?: number;
    minFontSize?: number;
}

export default function TextPressure({
    text,
    className = "",
    textColor = "#FFFFFF",
    stroke = false,
    strokeColor = "#FF5C73",
    strokeWidth = 1,
    minFontSize = 40,
}: Props) {
    const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

    const chars = text.split("");

    useEffect(() => {
        const handleMove = (x: number, y: number) => {
            spansRef.current.forEach((span) => {
                if (!span) return;

                const rect = span.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;

                const dx = x - cx;
                const dy = y - cy;
                const dist = Math.sqrt(dx * dx + dy * dy);

                const scale = Math.max(1, 1.5 - dist / 200);
                const weight = Math.max(300, 900 - dist * 2);

                span.style.transform = `scale(${scale})`;
                span.style.fontWeight = String(weight);
            });
        };

        const mouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
        const touchMove = (e: TouchEvent) => {
            const t = e.touches[0];
            handleMove(t.clientX, t.clientY);
        };

        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("touchmove", touchMove, { passive: true });

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("touchmove", touchMove);
        };
    }, []);

    return (
        <div
            className={`flex justify-center md:justify-start ${className}`}
            style={{
                fontSize: `${minFontSize}px`,
                fontWeight: 300,
                letterSpacing: "0.15em",
            }}
        >
            {chars.map((char, i) => (
                <span
                    key={i}
                    ref={(el) => { spansRef.current[i] = el; }}
                    className="inline-block transition-all duration-150"
                    style={{
                        color: stroke ? "transparent" : textColor,
                        WebkitTextStroke: stroke
                            ? `${strokeWidth}px ${strokeColor}`
                            : "none",
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </div>
    );
}