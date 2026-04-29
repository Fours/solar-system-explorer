import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { planetsData, sunData } from "../data/data";

interface DiagramProps {
    selectedId: string
    onSelect: (id: string | null) => void
    paused: boolean
    speed: number
}

export default function Diagram({ selectedId, onSelect, paused, speed }: DiagramProps) {
    const stageRef: RefObject<HTMLDivElement | null> = useRef(null);
    const [size, setSize] = useState({ w: 1200, h: 800 });
    const [t, setT] = useState(0);
    const accumRef = useRef(0);
    const lastRef = useRef(performance.now());

    useEffect(() => {
        function measure() {
        if (!stageRef.current) return;
        const r = stageRef.current.getBoundingClientRect();
        setSize({ w: r.width, h: r.height });
        }
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    useEffect(() => {
        let raf: number;
        function tick(now: number) {
        const dt = (now - lastRef.current) / 1000;
        lastRef.current = now;
        if (!paused) accumRef.current += dt * speed;
        setT(accumRef.current);
        raf = requestAnimationFrame(tick);
        }
        lastRef.current = performance.now();
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [paused, speed]);

    const cx = size.w / 2;
    const cy = size.h / 2;

    const maxOrbit = planetsData[planetsData.length - 1].orbitRadius;
    const margin = 80;
    const scale = Math.min((size.w - margin * 2) / 2, (size.h - margin * 2) / 2) / maxOrbit;

    return (
        <div className="diagram" ref={stageRef}>
        <svg viewBox={`0 0 ${size.w} ${size.h}`} preserveAspectRatio="none">
            <defs>
            <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff3d6" />
                <stop offset="40%" stopColor={sunData.color} />
                <stop offset="100%" stopColor="#7a4a1f" />
            </radialGradient>
            <radialGradient id="ringGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(212,181,116,0)" />
                <stop offset="40%" stopColor="rgba(212,181,116,0.55)" />
                <stop offset="80%" stopColor="rgba(212,181,116,0.25)" />
                <stop offset="100%" stopColor="rgba(212,181,116,0)" />
            </radialGradient>
            </defs>

            {/* Orbits */}
            {planetsData.map((p) => (
            <circle
                key={`orbit-${p.id}`}
                cx={cx} cy={cy}
                r={p.orbitRadius * scale}
                className={`orbit-ring ${selectedId === p.id ? "active" : ""}`}
            />
            ))}

            {/* Sun glow */}
            <circle cx={cx} cy={cy} r={sunData.displayRadius * 3.2} className="sun-glow" />
            <circle cx={cx} cy={cy} r={sunData.displayRadius * 2} className="sun-glow" style={{opacity: 0.35}} />

            {/* Sun */}
            <circle
            cx={cx} cy={cy}
            r={sunData.displayRadius}
            fill="url(#sunGrad)"
            className="sun-core"
            onClick={() => onSelect("sun")}
            />
            {selectedId === "sun" && (
            <circle cx={cx} cy={cy} r={sunData.displayRadius + 6}
                    fill="none" stroke="var(--accent)" strokeOpacity="0.7" strokeWidth="1" strokeDasharray="3 3" />
            )}

            {/* Planets */}
            {planetsData.map((p) => {
            const orbR = p.orbitRadius * scale;
            const angle = (p.startAngle * Math.PI) / 180 + (t / p.period) * Math.PI * 2;
            const px = cx + Math.cos(angle) * orbR;
            const py = cy + Math.sin(angle) * orbR;
            const isSel = selectedId === p.id;
            // Label offset perpendicular-outward from sun
            const labelDist = p.displayRadius + 18;
            const lx = px + Math.cos(angle) * labelDist;
            const ly = py + Math.sin(angle) * labelDist;
            // Place text anchor based on label position relative to planet
            const dx = Math.cos(angle);
            const anchor = dx > 0.3 ? "start" : dx < -0.3 ? "end" : "middle";
            const labelPadX = anchor === "start" ? 6 : anchor === "end" ? -6 : 0;
            const labelPadY = Math.sin(angle) > 0.3 ? 12 : Math.sin(angle) < -0.3 ? -6 : 4;

            return (
                <g key={p.id}>
                {/* Saturn ring */}
                {p.hasRings && (
                    <ellipse
                    cx={px} cy={py}
                    rx={p.displayRadius * 2.2}
                    ry={p.displayRadius * 0.6}
                    fill="url(#ringGrad)"
                    stroke="rgba(212,181,116,0.35)"
                    strokeWidth="0.5"
                    transform={`rotate(-18 ${px} ${py})`}
                    />
                )}
                {/* Selection halo */}
                {isSel && (
                    <circle
                    cx={px} cy={py}
                    r={p.displayRadius + 8}
                    fill="none"
                    stroke="var(--accent)"
                    strokeOpacity="0.7"
                    strokeWidth="1"
                    />
                )}
                {/* Planet hit area + disc */}
                <g
                    className="planet-hit"
                    onClick={() => onSelect(p.id)}
                    style={{ color: p.color }}
                >
                    <circle cx={px} cy={py} r={Math.max(p.displayRadius + 6, 12)} fill="transparent" />
                    <circle cx={px} cy={py} r={p.displayRadius} fill={p.color} className="planet-disc" />
                </g>
                {/* Label tick */}
                <line
                    x1={px} y1={py}
                    x2={lx} y2={ly}
                    className={`label-tick ${isSel ? "active" : ""}`}
                />
                {/* Label */}
                <text
                    x={lx + labelPadX}
                    y={ly + labelPadY}
                    textAnchor={anchor}
                    className={`planet-label ${isSel ? "active" : ""}`}
                    onClick={() => onSelect(p.id)}
                >
                    {p.name}
                </text>
                </g>
            );
            })}
        </svg>
        </div>
    );
}