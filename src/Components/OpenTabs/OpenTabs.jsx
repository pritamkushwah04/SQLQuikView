import React, { useEffect } from 'react'
import "./OpenTabs.css"
const OpenTabs = (props) => {

    useEffect(() => {
        props.tables.forEach(function (tableName) {
            if (tableName === props.activeTab) {
                const table = document.getElementById(tableName);
                table.style.display = 'block';
            } else {
                const table = document.getElementById(tableName);
                table.style.display = 'none';
            }
        });
    }, [props.activeTab,props.tables]);


    function activateTab(ele) {
        const nevActiveTab=ele.target.innerHTML;
        console.log(nevActiveTab);
        props.setActiveTab(nevActiveTab);
    }
    
    function closeTab(ele){
           const divText = ele.target.parentNode.innerText.trim();
           const parts = divText.split('\n');
           const tabToClose= parts[0];
           props.setTables((curTables)=>curTables.filter(table=>table !== tabToClose));
           if(tabToClose===props.activeTab && props.tables.length){
            props.tables[0]===props.activeTab?props.setActiveTab(props.tables[1]):props.setActiveTab(props.tables[0])
           }
        }
    
    return (
        <div className='open-tabs' >
            {
                props.tables.map((tableName) => {
                    if (props.activeTab === tableName) {
                        return <div className='single-active-tab-container'>
                            <div onClick={activateTab} className='active-tab'>{tableName}</div>
                            <div onClick={closeTab} className='active-cancel-btn'>X</div>
                        </div>

                    } else {
                        return <div className='single-tab-container'>
                            <div onClick={activateTab} className='tab'>{tableName}</div>
                            <div onClick={closeTab} className='cancel-btn'>X</div>
                        </div>
                    }
                })
            }
        </div>
    )
}

export default OpenTabs
