import React from 'react'
import './DisplayContainer.css'
// import { useState } from 'react'

import TableComponent from '../TableComponent/TableComponent'
import OpenTabs from '../OpenTabs/OpenTabs'
const DisplayContainer = ({tables,setTables,activeTab,setActiveTab}) => {
  return (
    <>
     <div className='display-container'>
        <OpenTabs tables={tables} setTables={setTables} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className='tables'>
          {
            tables.map((tableName) => {
              return <TableComponent tableName={tableName} />
            })
          }
        </div>
      </div>
    </>
  )
}

export default DisplayContainer
