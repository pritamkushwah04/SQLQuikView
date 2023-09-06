import React, { useEffect } from 'react'
import "./OpenTabs.css"
const OpenTabs = (props) => {

    useEffect(() => {
        props.tables.forEach(function (tableName) {
            console.log(tableName);
            if (tableName === props.activeTab) {
                const table = document.getElementById(tableName);
                table.style.display = 'block';
            } else {
                console.log("opentabs useeffect called");
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
           console.log("this tab will be closed");
           console.log(tabToClose);
           if(tabToClose===props.activeTab){
              props.setActiveTab(props.tables[0]);
           }
           props.setTables((curTables)=>curTables.filter(table=>table !== tabToClose));
    }
    console.log(props.tables);



    return (
        <div className='open-tabs' >
            {
                props.tables.map((tableName) => {
                    if (props.activeTab === tableName) {
                        return <div className='single-active-tab-container'>
                            <div onClick={activateTab} className='active-tab'>{tableName}</div>
                            <div onClick={closeTab} className='cancel-btn'>X</div>
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
