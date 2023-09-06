import React, { useState } from 'react'

import './QueryInputBox.css'
const QueryInputBox = (props) => {
  const [resultNum,setResultNum]=useState(0);

  function addResultTable(){
    setResultNum((cur)=>cur+1);
    const newResultTable=`result${resultNum}`;
    props.setTables((prevList)=>[...prevList,newResultTable]);
    props.setActiveTab(newResultTable);
 }

  return (
    <div className='container'>
      <textarea className='inpute-box' name="" id="" ></textarea>
      <button id='reset-btn' className='btn'>RESET</button>
      <button onClick={addResultTable} id='run-btn' className='btn'>RUN</button>
    </div>
  )
}

export default QueryInputBox
