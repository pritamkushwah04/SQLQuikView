import React, { useEffect, lazy, Suspense, useState } from 'react'
import './DisplayContainer.css'
import OpenTabs from '../OpenTabs/OpenTabs'

const LazyTableComponent = lazy(() => import('../TableComponent/TableComponent'));
// import TableComponent from '../TableComponent/TableComponent'
const DisplayContainer = ({ tables, setTables, activeTab, setActiveTab }) => {
  const [dynamicComponent, setDynamicComponent] = useState();
  useEffect(() => {
    if (tables.length) {
      setDynamicComponent(
        <div className='tables'>
          <OpenTabs tables={tables} setTables={setTables} activeTab={activeTab} setActiveTab={setActiveTab} />
          <Suspense fallback={<div>Loading...</div>}>
            <LazyTableComponent activeTab={activeTab} />
          </Suspense></div>
      )
    } else {
      setDynamicComponent(<div id='empty-table-container' className='empty-table-container'>Open Table Or Simply Start Writting Query...</div>
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tables,activeTab])

  return (
    <>
      <div className='display-container'>
        {dynamicComponent}
      </div>
    </>
  )
}

export default DisplayContainer
