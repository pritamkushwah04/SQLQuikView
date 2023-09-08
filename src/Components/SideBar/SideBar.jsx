import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import ActivityBarItemContainer from '../ActivityBarItemContainer/ActivityBarItemContainer'
import './SideBar.css'
const SideBar = ({ tables, setTables, activeTab, setActiveTab,selectedQuery,setSelectedQuery,recentQuery,setRecentQuery }) => {

    const [curActivityBarItem, setCurActivityBarItem] = useState([]);

    useEffect(() => {
        const ele = document.getElementById("activity-bar");
        if (curActivityBarItem.length > 0) {
            ele.style.display = 'block'
        } else {
            ele.style.display = 'none'
        }
    }, [curActivityBarItem]);



    return (
        <>
            <div className='side-bar'>
                <Navbar curActivityBarItem={curActivityBarItem} setCurActivityBarItem={setCurActivityBarItem} tables={tables} setTables={setTables} activeTab={activeTab} setActiveTab={setActiveTab} />
                <div id="activity-bar" className="activity-bar">
                    {
                        curActivityBarItem.map((item) => {
                            return <ActivityBarItemContainer
                                ActivityBarItem={item}
                                curActivityBarItem={curActivityBarItem}
                                setCurActivityBarItem={setCurActivityBarItem}
                                selectedQuery={selectedQuery} 
                                setSelectedQuery={setSelectedQuery}
                                recentQuery={recentQuery} 
                                setRecentQuery={setRecentQuery}
                                ></ActivityBarItemContainer>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default SideBar
