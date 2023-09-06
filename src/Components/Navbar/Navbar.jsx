import React from 'react'
import "./Navbar.css"
const Navbar = (props) => {
  const allTableList=["order_details","orders"];
  
  function addToTables(ele){
    
    console.log("addtotable called");
    console.log(ele);
    const newTable=ele.target.innerHTML;
    if(!props.tables.includes(newTable)){
      props.setTables((prevList)=>[...prevList,newTable]);
      props.setActiveTab(newTable);
    }
  }

  function toggleTableList(){
    const ele= document.getElementById('all-table-list');
    console.log(ele.style.display);
    ele.style.display===''?ele.style.display='block':ele.style.display='';

  }
  return (
    <nav>
        <div onClick={toggleTableList}>Open Table
        <div id='all-table-list' className="all-table-list">
        {
          allTableList.map((tableName)=>{
            return <div onClick={addToTables}>{tableName}</div>
          })
        }
        </div>
    
        </div>
    </nav>
  )
}

export default Navbar
