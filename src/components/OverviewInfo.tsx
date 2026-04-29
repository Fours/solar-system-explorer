import StatGrid from "./StatGrid";
import { overviewData } from "../data/data";

export default function OverviewInfo() {
  return (
    <>
      <div className="panel-head">
        <div className="panel-eyebrow">
          <span>Mission Brief</span>
          <span className="id">SOL-00</span>
        </div>
        <h1 className="panel-title">The <span className="accent">Solar</span> System</h1>
        <div className="panel-subtitle">{overviewData.designation}</div>
      </div>
      <div className="panel-body">
        <div className="panel-section">
          <p className="lede">{overviewData.lede}</p>
          <div className="hint">
            <span>Select a body to explore</span>
            <span className="arrow"></span>
          </div>
        </div>
        <div className="panel-section">
          <div className="section-label"><span>System Vitals</span><span className="num">01</span></div>
          <StatGrid stats={overviewData.stats} />
        </div>
        {overviewData.sections.map((s, i) => (
          <div className="panel-section" key={s.label}>
            <div className="section-label">
              <span>{s.label}</span>
              <span className="num">{String(i + 2).padStart(2, "0")}</span>
            </div>
            <p className="body-text">{s.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}