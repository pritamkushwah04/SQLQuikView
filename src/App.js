import React, { useState } from 'react';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';

import Navbar from './Components/Navbar/Navbar';
import QueryInputBox from './Components/QueryInputBox/QueryInputBox';
import DisplayContainer from './Components/DisplayContainer/DisplayContainer'

function App() {
  const [sizes, setSizes] = useState([100, '5%', 'auto']);
  const [tables, setTables] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  
  const layoutCSS = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div className='App'>
      <Navbar tables={tables} setTables={setTables} activeTab={activeTab} setActiveTab={setActiveTab}/>
      <div style={{ height:'95vh'}}>
        <SplitPane
          split='horizontal'
          sizes={sizes}
          onChange={setSizes}
        >
          <Pane minSize={50} maxSize='100%'>
            <div style={{ ...layoutCSS, background: '#252526' }}>
              <DisplayContainer tables={tables} setTables={setTables} activeTab={activeTab} setActiveTab={setActiveTab}/>
            </div>
          </Pane >
          <div style={{ ...layoutCSS }}>
            <QueryInputBox  tables={tables} setTables={setTables} activeTab={activeTab} setActiveTab={setActiveTab}/>
          </div>
        </SplitPane>
      </div>

    </div>
  );
};
export default App;
