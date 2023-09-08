import React, { useEffect, useState } from 'react'
import './SampleQuery.css';
import populareQuery from '../../SampleQuery.jsx'

const SampleQuery = ({setSelectedQuery,recentQuery,ActivityBarItem}) => {
    const [dynamicDiv,setDynamicDiv]=useState();
    
    function addToSelectedQuery(ele){
        setSelectedQuery(ele.target.innerText);
    }

    useEffect(()=>{
      if(ActivityBarItem==="Recent Query"){
        if(recentQuery.length!==0){
            setDynamicDiv(recentQuery.slice().reverse().map((query) => {
                return <div className="query">{query.substring(0, 10) + '...'}
                <div className='query-code' onClick={addToSelectedQuery}>{query}</div></div>
            }))
        }else{
            setDynamicDiv(<div>Empty</div>)
        }
      }else if(ActivityBarItem==="Popular Query"){
        setDynamicDiv(populareQuery.map((query) => {
            return <div className="query">{query.name}
            <div className='query-code' onClick={addToSelectedQuery}>{query.code}</div></div>
        }))
      }
    },[recentQuery])


    return (
        <>
            {dynamicDiv}
        </>
    )
}

export default SampleQuery
