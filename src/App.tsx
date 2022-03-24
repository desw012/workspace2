import React, {useRef, useState} from 'react';
import './App.css';
import {Window, WindowProps} from "./features/windows/Window";
import {WorkSpaceContext, WorkSpaceContextComponent} from "./context/WorkSpaceContext";
import {DockContextComponent} from "./context/DockContext";


let g_idx = 0;
function App() {
    return (
        <div className="App">
            <WorkSpaceContextComponent>
                <DockContextComponent>
                    <WorkSpaceContext.Consumer>
                        { value => (
                            <button style={{ position: 'absolute', bottom: '20px', left: '20px'}} onClick={ value.createWindow }>ADD</button>
                        )}
                    </WorkSpaceContext.Consumer>
                </DockContextComponent>
            </WorkSpaceContextComponent>
        </div>
    );
}

export default App;
