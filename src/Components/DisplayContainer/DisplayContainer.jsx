import React, { useEffect, lazy, Suspense, useState } from 'react'
import './DisplayContainer.css'
import OpenTabs from '../OpenTabs/OpenTabs'
import IntroComponent from '../IntroComponent/IntroComponent';
// const LazyTableComponent = lazy(() => import('../TableComponent/TableComponent'));
const LazyTableComponentPaged = lazy(() => import('../TableComponentPaged/TableComponentPaged'));
// import TableComponent from '../TableComponent/TableComponent'
const DisplayContainer = ({ tables, setTables, activeTab, setActiveTab }) => {
  const [dynamicComponent, setDynamicComponent] = useState();
  useEffect(() => {
    if (tables.length) {
      setDynamicComponent(
        <div className='tables'>
          <OpenTabs tables={tables} setTables={setTables} activeTab={activeTab} setActiveTab={setActiveTab} />
          <Suspense fallback={<div>Loading...</div>}>
            {/* <LazyTableComponent activeTab={activeTab} /> */}
            <LazyTableComponentPaged activeTab={activeTab} />
          </Suspense></div>
      )
    } else {
      setDynamicComponent(<div id='empty-table-container'  className='empty-table-container'><IntroComponent/></div>
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
