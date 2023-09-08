import React, { useEffect, useState } from 'react'
import './ActivityBarItemContainer.css'

import SampleQuery from '../SampleQuery/SampleQuery.jsx'

const ActivityBarItemContainer = ({ ActivityBarItem, curActivityBarItem, setCurActivityBarItem, selectedQuery, setSelectedQuery, recentQuery, setRecentQuery }) => {
  function removeFromActivityBar(ele) {
    const ItemToRemove = ele.target.parentNode.parentNode.id;
    setCurActivityBarItem(curActivityBarItem.filter((item) => item !== ItemToRemove));
  }

  return (
    <div id={ActivityBarItem} className='ActivityBarItemContainer'>
      <div className="title">
        <div id={ActivityBarItem} className="item-title">{ActivityBarItem}</div>
        <div className="close-btn" onClick={removeFromActivityBar}>X</div>
      </div>
      <SampleQuery ActivityBarItem={ActivityBarItem} selectedQuery={selectedQuery} setSelectedQuery={setSelectedQuery} recentQuery={recentQuery}></SampleQuery>
    </div>
  )
}

export default ActivityBarItemContainer
