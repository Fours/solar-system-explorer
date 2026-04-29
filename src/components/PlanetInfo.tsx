
import StatGrid from "./StatGrid";
import CompareBar from "./CompareBar";
import { planetsData } from "../data/data";
import type { PlanetData, Stat } from "../types/types";

interface PlanetInfoProps {
    planet: PlanetData
}

export default function PlanetInfo({ planet }: PlanetInfoProps) {
    const idx = planetsData.findIndex((p) => p.id === planet.id) + 1;
    const stats: Stat[] = [
        { key: "Distance", value: planet.auDistance.toString(), unit: "AU" },
        { key: "Diameter", value: planet.diameterKm.toLocaleString(), unit: "km" },
        { key: "Mass", value: planet.massEarth.toString(), unit: "M⊕" },
        { key: "Gravity", value: planet.gravityEarth.toString(), unit: "g⊕" },
        { 
            key: "Year", 
            value: (planet.yearDays < 1000 ? planet.yearDays : (planet.yearDays / 365.25).toFixed(1)).toString(), 
            unit: planet.yearDays < 1000 ? "days" : "years" 
        },
        { key: "Day", value: Math.abs(planet.dayHours).toFixed(planet.dayHours < 100 ? 2 : 1), unit: planet.dayHours < 0 ? "h ↺" : "h" },
    ];

    return (
        <>
        <div className="panel-head">
            <div className="panel-eyebrow">
            <span>Planetary Body</span>
            <span className="id">SOL-{String(idx).padStart(2, "0")}</span>
            </div>
            <h1 className="panel-title">
            {planet.name} <span className="accent" style={{fontSize: "0.55em", verticalAlign: "0.2em", marginLeft: 8}}>{planet.symbol}</span>
            </h1>
            <div className="panel-subtitle">{planet.designation}</div>
        </div>
        <div className="panel-body">
            <div className="panel-section">
            <p className="lede">{planet.lede}</p>
            </div>

            <div className="panel-section">
            <div className="section-label"><span>Vitals</span><span className="num">01</span></div>
            <StatGrid stats={stats} />
            </div>

            <div className="panel-section">
            <div className="section-label"><span>Comparison · vs Earth</span><span className="num">02</span></div>
            <div className="compare">
                <CompareBar label="Diameter" planetVal={planet.diameterEarth} unit="×" max={Math.max(12, planet.diameterEarth * 1.1)} />
                <CompareBar label="Gravity" planetVal={planet.gravityEarth} unit="g" max={Math.max(3, planet.gravityEarth * 1.1)} />
            </div>
            </div>

            <div className="panel-section">
            <div className="section-label"><span>Description</span><span className="num">03</span></div>
            {planet.body.map((p, i) => <p key={i} className="body-text">{p}</p>)}
            </div>

            <div className="panel-section">
            <div className="section-label"><span>Composition</span><span className="num">04</span></div>
            <p className="body-text">{planet.composition}</p>
            </div>

            <div className="panel-section">
            <div className="section-label">
                <span>Natural Satellites</span>
                <span className="num">05</span>
            </div>
            {planet.moons.length === 0 ? (
                <p className="body-text" style={{opacity: 0.7}}>None catalogued.</p>
            ) : (
                <>
                <div className="chips">
                    {planet.moons.map((m) => <span key={m} className="chip">{m}</span>)}
                    {planet.moonCount && planet.moonCount > planet.moons.length && (
                    <span className="chip more">+{planet.moonCount - planet.moons.length} more</span>
                    )}
                </div>
                {planet.moonCount && (
                    <p className="body-text" style={{marginTop: 12, fontSize: 11, color: "var(--ink-faint)", fontFamily: "var(--mono)", letterSpacing: "0.14em", textTransform: "uppercase"}}>
                    {planet.moonCount} confirmed
                    </p>
                )}
                </>
            )}
            </div>
        </div>
        </>
    );
}