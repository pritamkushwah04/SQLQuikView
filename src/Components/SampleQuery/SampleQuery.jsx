import './SampleQuery.css';
import React, { useEffect, useState } from 'react'

import populareQuery from '../../SampleQuery.jsx'
import TableSchema from '../TableSchema/TableSchema';

const SampleQuery = ({ setSelectedQuery, recentQuery, ActivityBarItem, setTables, setActiveTab }) => {
  const [dynamicDiv, setDynamicDiv] = useState();

  useEffect(() => {
    if (ActivityBarItem === "Recent Query") {
      if (recentQuery.length !== 0) {
        setDynamicDiv(recentQuery.slice().reverse().map((query) => {
          return <div className="query">{query.substring(0, 30) + '...'}
            <div className='query-code' onClick={addToSelectedQuery}>{query}</div></div>
        }))
      } else {
        setDynamicDiv(<div className='recent-query-empty'>Empty</div>)
      }
    } else if (ActivityBarItem === "Popular Query") {
      setDynamicDiv(populareQuery.map((query) => {
        return <div className="query">{query.name}
          <div className='query-code' onClick={addToSelectedQuery}>{query.code}</div></div>
      }))
    } else {
      setDynamicDiv(<TableSchema setTables={setTables} setActiveTab={setActiveTab}></TableSchema>)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentQuery,ActivityBarItem])

  function addToSelectedQuery(ele) {
    setSelectedQuery(ele.target.innerHTML);
  }


  return (
    <>
      {dynamicDiv}
    </>
  )
}

export default SampleQuery
