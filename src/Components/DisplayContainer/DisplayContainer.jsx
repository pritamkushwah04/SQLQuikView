import React from 'react'
import './DisplayContainer.css'
import { useState } from 'react'

import TableComponent from '../TableComponent/TableComponent'
import OpenTabs from '../OpenTabs/OpenTabs'
const DisplayContainer = (props) => {
  return (
    <>
     <div className='display-container'>
        <OpenTabs tables={props.tables} setTables={props.setTables} activeTab={props.activeTab} setActiveTab={props.setActiveTab} />
        <div className='tables'>
          {
            props.tables.map((tableName) => {
              return <TableComponent tableName={tableName} />
            })
          }
        </div>
      </div>
    </>
  )
}

export default DisplayContainer
