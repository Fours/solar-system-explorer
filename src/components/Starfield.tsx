import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import type { Star } from "../types/types";

export default function Starfield() {

    const canvasRef: RefObject<HTMLCanvasElement | null> = useRef(null);
    const TWINKLE_SPEED = 0.35;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let raf: number;
        let stars: Star[] = [];

        function resize() {
            const dpr = window.devicePixelRatio || 1;
            canvas!.width = canvas!.clientWidth * dpr;
            canvas!.height = canvas!.clientHeight * dpr;
            ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
            const count = Math.floor((canvas!.clientWidth * canvas!.clientHeight) / 1800);
            stars = Array.from({ length: count }, () => {
                const layer = Math.random();
                return {
                    x: Math.random() * canvas!.clientWidth,
                    y: Math.random() * canvas!.clientHeight,
                    r: layer < 0.85 ? Math.random() * 0.7 + 0.2 : Math.random() * 1.3 + 0.8,
                    a: Math.random() * 0.6 + 0.2,
                    tw: Math.random() * 0.02 + 0.005,
                    phase: Math.random() * Math.PI * 2,
                    bright: layer >= 0.97,
                };
            });
        }

        let lastNow = performance.now();
        let twinkleT = 0;

        function draw(now: number) {
            const dt = now - lastNow;
            lastNow = now;
            twinkleT += dt * TWINKLE_SPEED;

            ctx!.clearRect(0, 0, canvas!.clientWidth, canvas!.clientHeight);
            for (const s of stars) {
                const flicker = 0.5 + 0.5 * Math.sin(twinkleT * s.tw + s.phase);
                const alpha = s.a * (0.5 + 0.5 * flicker);
                ctx!.beginPath();
                ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                if (s.bright) {
                    ctx!.fillStyle = `rgba(220, 230, 255, ${alpha})`;
                    ctx!.shadowColor = "rgba(180, 200, 255, 0.8)";
                    ctx!.shadowBlur = 6;
                } else {
                    ctx!.fillStyle = `rgba(232, 230, 223, ${alpha * 0.85})`;
                    ctx!.shadowBlur = 0;
                }
                ctx!.fill();
            }
            raf = requestAnimationFrame(draw);
        }

        resize();
        raf = requestAnimationFrame(draw);
        window.addEventListener("resize", resize);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <div className="starfield">
            <div className="nebula"></div>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}