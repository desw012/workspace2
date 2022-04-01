import React, {useRef, useState} from 'react';
import './App.css';
import {WorkSpaceContext, WorkSpaceContextComponent} from "./context/WorkSpaceContext";
import {DockContextComponent} from "./context/DockContext";
import {WindowContextComponent} from "./context/WindowContext";

function App() {
    const [blob, setBlob] = useState<string|null>(null);
    const fn = () => {
        window.postMessage({type:'window.create', url:'http://localhost:8081/xclick_dev/org/admin/company/list'}, window.location.origin)
    }
    return (
        <div className="App">
            <WorkSpaceContextComponent>
                <WindowContextComponent>

                </WindowContextComponent>
                <DockContextComponent>
                    <WorkSpaceContext.Consumer>
                        { value => (
                            <>
                                <button style={{ position: 'absolute', bottom: '20px', left: '20px'}} onClick={ ()=>{  fn() } }>ADD</button>
                            </>
                        )
                        }
                    </WorkSpaceContext.Consumer>
                </DockContextComponent>
            </WorkSpaceContextComponent>
        </div>
    );
}

export default App;
