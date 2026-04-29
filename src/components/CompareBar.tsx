interface CompareBarProps {
    label: string
    planetVal: number
    unit: string
    max: number
}

export default function CompareBar({ label, planetVal, unit, max }: CompareBarProps) {
  const planetPct = Math.min(100, (planetVal / max) * 100);
  const earthPct = Math.min(100, (1 / max) * 100);
  return (
    <>
      <div className="compare-row">
        <div className="label">{label}</div>
        <div className="compare-bar"><i style={{ width: `${planetPct}%` }} /></div>
        <div className="val">{planetVal}{unit}</div>
      </div>
      <div className="compare-row">
        <div className="label" style={{opacity: 0.6}}>↳ Earth</div>
        <div className="compare-bar earth"><i style={{ width: `${earthPct}%` }} /></div>
        <div className="val" style={{opacity: 0.6}}>1.00{unit}</div>
      </div>
    </>
  );
}