import React, { useEffect, useState } from 'react'
import './DisplayContainer.css'

import TableComponent from '../TableComponent/TableComponent'
import OpenTabs from '../OpenTabs/OpenTabs'
const DisplayContainer = ({ tables, setTables, activeTab, setActiveTab }) => {
  
  useEffect(()=>{
    const ele= document.getElementById("empty-table-container");
    if(tables.length){
      ele.style.display="none";
    }else{
      ele.style.display="block";
    }
  },[tables])

  return (
    <>
      <div className='display-container'>
        <OpenTabs tables={tables} setTables={setTables} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className='tables'>
          {tables.map((tableName) => {
            return <TableComponent tableName={tableName} />
          })}
        </div>
        <div id='empty-table-container' className='empty-table-container'>Open Table Or Simply Start Writting Query...</div>
      </div>
    </>
  )
}

export default DisplayContainer
