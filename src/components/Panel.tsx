import OverviewInfo from "./OverviewInfo";
import SunInfo from "./SunInfo";
import PlanetInfo from "./PlanetInfo";
import { planetsData } from "../data/data";

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
            <span>Telemetry 04.28.26</span>
        </div>
        </aside>
    );
}