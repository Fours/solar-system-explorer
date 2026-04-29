import StatGrid from "./StatGrid";
import { sunData } from "../data/data";

export default function SunInfo() {
    return (
        <>
            <div className="panel-head">
                <div className="panel-eyebrow">
                <span>Stellar Body</span>
                <span className="id">SOL-★</span>
                </div>
                <h1 className="panel-title">{sunData.name}</h1>
                <div className="panel-subtitle">{sunData.designation}</div>
            </div>
            <div className="panel-body">
                <div className="panel-section">
                <p className="lede">{sunData.lede}</p>
                </div>
                <div className="panel-section">
                <div className="section-label"><span>Stellar Parameters</span><span className="num">01</span></div>
                <StatGrid stats={sunData.stats} />
                </div>
                <div className="panel-section">
                <div className="section-label"><span>Description</span><span className="num">02</span></div>
                {sunData.body.map((p, i) => <p key={i} className="body-text">{p}</p>)}
                </div>
                <div className="panel-section">
                <div className="section-label"><span>Classification</span><span className="num">03</span></div>
                <p className="body-text"><b>{sunData.classification}</b> — the central star of the system, by which all other bodies are gravitationally bound.</p>
                </div>
            </div>
        </>
    );
}