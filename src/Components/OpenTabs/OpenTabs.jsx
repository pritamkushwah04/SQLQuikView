import React, { useEffect } from 'react'
import "./OpenTabs.css"
const OpenTabs = ({tables, setTables, activeTab, setActiveTab}) => {

    // useEffect(() => {
    //     tables.forEach(function (tableName) {
    //         if (tableName === activeTab) {
    //             const table = document.getElementById(tableName);
    //             table.style.display = 'block';
    //         } else {
    //             const table = document.getElementById(tableName);
    //             table.style.display = 'none';
    //         }
    //     });
    // }, [activeTab, tables]);

    function activateTab(ele) {
        const nevActiveTab = ele.target.innerText;
        setActiveTab(nevActiveTab);
    }

    function closeTab(ele) {
        const divText = ele.target.parentNode.innerText.trim();
        const parts = divText.split('\n');
        const tabToClose = parts[0];
        setTables((curTables) => curTables.filter(table => table !== tabToClose));
        if (tables[tables.length - 1] === tabToClose) {
            setActiveTab(tables[tables.length - 2]);
        } else {
            setActiveTab(tables[tables.length - 1]);
        }
    }

    return (
        <div className='open-tabs' >
            {
                tables.map((tableName) => {
                    if (activeTab === tableName) {
                        return <div className='single-active-tab-container'>
                            <div onClick={activateTab} >{tableName}</div>
                            <div onClick={closeTab} className='active-cancel-btn'>X</div>
                        </div>

                    } else {
                        return <div onClick={activateTab} className='single-tab-container'>
                            <div  >{tableName}</div>
                            <div onClick={closeTab} className='cancel-btn'>X</div>
                        </div>
                    }
                })
            }
        </div>
    )
}

export default OpenTabs
