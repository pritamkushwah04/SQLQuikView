import React, { useEffect, useState } from 'react'

import './QueryInputBox.css'
const QueryInputBox = ({setTables,setActiveTab,selectedQuery,setSelectedQuery,recentQuery,setRecentQuery}) => {
  const [resultNum,setResultNum]=useState(0);
  useEffect(()=>{
     const ele=document.getElementById("inpute-box");
     ele.value=selectedQuery;
  },[selectedQuery])

  
  function addResultTable(){
    const ele=document.getElementById("inpute-box");
    setRecentQuery((prevQueries) => [...prevQueries, ele.value]);
  
    setResultNum((cur)=>cur+1);
    const newResultTable=`result${resultNum}`;
    setTables((prevList)=>[...prevList,newResultTable]);
    setActiveTab(newResultTable);
 }

  return (
    <div className='container'>
      <textarea className='inpute-box' name="" id="inpute-box" ></textarea>
      <button id='reset-btn' className='btn'>RESET</button>
      <button onClick={addResultTable} id='run-btn' className='btn'>RUN</button>
    </div>
  )
}

export default QueryInputBox
