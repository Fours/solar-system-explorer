import type { Stat } from "../types/types";

interface StatGridProps {
    stats: Stat[]
}

export default function StatGrid({ stats }: StatGridProps) {
    return (
        <div className="stats">
        {stats.map((s, i) => (
            <div key={i} className="stat">
            <div className="stat-key">{s.key}</div>
            <div className="stat-val">{s.value}{s.unit && <span className="stat-unit">{s.unit}</span>}</div>
            </div>
        ))}
        </div>
    );
}