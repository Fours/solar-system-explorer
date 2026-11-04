import { useEffect, useState } from 'react';
import Diagram from './components/Diagram'
import Panel from './components/Panel';
import Starfield from './components/Starfield'
import { planetsData, sunData } from './data/data'
import './App.css'

// Navigation order: Overview ("") → Sun → planets (in data order) → loops back
const navOrder = ["", sunData.id, ...planetsData.map((p) => p.id)];

function App() {

    const [selectedId, setSelectedId] = useState("");
    const [paused, setPaused] = useState(false);
    const [speed, setSpeed] = useState(1);

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") setSelectedId("");
            if (e.key === " ") { e.preventDefault(); setPaused(p => !p); }
            if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();
                const step = e.key === "ArrowRight" ? 1 : -1;
                setSelectedId((cur) => {
                    const i = navOrder.indexOf(cur);
                    const from = i === -1 ? 0 : i;
                    return navOrder[(from + step + navOrder.length) % navOrder.length];
                });
            }
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <div className="app">
            <Starfield />
            <Diagram
                selectedId={selectedId}
                onSelect={setSelectedId}
                paused={paused}
                speed={speed}
            />

            <div className="hud hud-tl">
                <div className="brand-mark">Heliograph</div>
                <div className="brand-sub">
                    <span className="dot"></span>
                    <span>Solar System Explorer · v1.0</span>
                </div>
            </div>

            <div className="hud hud-bl">
                <div>Schematic · Not to Scale</div>
                <div className="legend">
                    <span><b>Click</b> a body to inspect</span>
                    <span className="arrow-keys-wrap"><b className="arrow-keys">← →</b> cycle bodies</span>
                    <span><b>Space</b> pause</span>
                    <span><b>Esc</b> overview</span>
                </div>
            </div>

            <div className="controls">
                <button className={`ctrl ${paused ? "on" : ""}`} onClick={() => setPaused((p) => !p)}>
                    {paused ? "▶ Resume" : "❚❚ Pause"}
                </button>
                <button className={`ctrl ${speed === 0.25 ? "on" : ""}`} onClick={() => setSpeed(0.25)}>0.25×</button>
                <button className={`ctrl ${speed === 1 ? "on" : ""}`} onClick={() => setSpeed(1)}>1×</button>
                <button className={`ctrl ${speed === 4 ? "on" : ""}`} onClick={() => setSpeed(4)}>4×</button>
            </div>

            <Panel selectedId={selectedId} />
        </div>
    )
}

export default App
