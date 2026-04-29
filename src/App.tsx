import Diagram from './components/Diagram'
import Starfield from './components/Starfield'
import './App.css'

function App() {

    return (
        <div className="app">
            <Starfield />
            <Diagram
                selectedId=""
                onSelect={() => {}}
                paused={false}
                speed={1}
            />
        </div>
    )
}

export default App
