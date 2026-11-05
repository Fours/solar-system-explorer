import OverviewInfo from "./OverviewInfo";
import SunInfo from "./SunInfo";
import PlanetInfo from "./PlanetInfo";
import { planetsData } from "../data/data";

function formatTelemetryDate(d: Date): string {
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const yy = String(d.getFullYear() % 100).padStart(2, "0");
    return `${mm}.${dd}.${yy}`;
}

interface PanelProps {
    selectedId: string
}

export default function Panel({ selectedId }: PanelProps) {
    let content;
    if (selectedId === "") content = <OverviewInfo />;
    else if (selectedId === "sun") content = <SunInfo />;
    else {
        const planet = planetsData.find((p) => p.id === selectedId)!;
        content = <PlanetInfo planet={planet} />;
    }
    return (
        <aside className="panel" data-screen-label={selectedId || "overview"}>
        {content}
        <div className="panel-foot">
            <span>OBS · LIVE</span>
            <span>Telemetry {formatTelemetryDate(new Date())}</span>
        </div>
        </aside>
    );
}