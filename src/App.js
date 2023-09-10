import React, { useState } from 'react';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';

import QueryInputBox from './Components/QueryInputBox/QueryInputBox';
import DisplayContainer from './Components/DisplayContainer/DisplayContainer'
import SideBar from './Components/SideBar/SideBar';

import './App.css';

function App() {

  const [sizes, setSizes] = useState([100, '5%', 'auto']);
  const [tables, setTables] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [selectedQuery,setSelectedQuery]=useState("");
  const [recentQuery,setRecentQuery]=useState("");
  
  return (
    <div className='App'>
      <SideBar tables={tables} setTables={setTables} activeTab={activeTab} setActiveTab={setActiveTab} selectedQuery={selectedQuery} setSelectedQuery={setSelectedQuery} recentQuery={recentQuery} setRecentQuery={setRecentQuery}></SideBar>
      <div style={{ height:'100vh', width:'100%'}}>
        <SplitPane split='horizontal' sizes={sizes} onChange={setSizes} allowResize={false}>
          <Pane minSize={50} maxSize='100%'>
              <DisplayContainer tables={tables} setTables={setTables} activeTab={activeTab} setActiveTab={setActiveTab} />
          </Pane >
          <QueryInputBox  tables={tables} setTables={setTables} activeTab={activeTab} setActiveTab={setActiveTab} selectedQuery={selectedQuery} setSelectedQuery={setSelectedQuery} recentQuery={recentQuery} setRecentQuery={setRecentQuery}/>
        </SplitPane>
      </div>
    </div>
  );
};
export default App;
