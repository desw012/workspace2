import React, {useState} from 'react';
import './App.css';
import {Window, WindowProps} from "./features/windows/Window";
import {WorkSpaceContext, WorkSpaceContextComponent} from "./context/WorkSpaceContext";


let g_idx = 0;
function App() {
    const [windows, setWindows] = useState<Array<WindowProps>>([]);

    const addWindow = () => {
        setWindows([...windows, {
            idx : g_idx++
        }])
    }

    return (
        <div className="App">
            <WorkSpaceContextComponent>
                <WorkSpaceContext.Consumer>
                    { => (

                        <button style={{ position: 'absolute', bottom: '20px', left: '20px'}} onClick={addWindow}>ADD</button>
                    )}
                </WorkSpaceContext.Consumer>
            </WorkSpaceContextComponent>
        </div>
    );
}

export default App;
