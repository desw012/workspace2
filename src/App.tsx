import React, {useRef, useState} from 'react';
import './App.css';
import {WorkSpaceContextComponent} from "./context/WorkSpaceContext";
import {DockContextComponent} from "./context/DockContext";
import {WindowContextComponent} from "./context/WindowContext";
import WorkSpaceContainer from "./containers/WorkSpaceContainer";

function App() {
    return (
<></>
        /*
        <div className="App">
            <WorkSpaceContextComponent>
                <WindowContextComponent>
                    <DockContextComponent>
                    </DockContextComponent>
                </WindowContextComponent>
            </WorkSpaceContextComponent>
        </div>
         */
    );
}

export default App;
