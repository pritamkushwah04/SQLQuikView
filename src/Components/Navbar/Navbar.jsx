import React from 'react'
import "./Navbar.css"
// import { click } from '@testing-library/user-event/dist/click';
const Navbar = (props) => {
  const allTableList = ["order_details", "orders"];

  function addToTables(ele) {

    console.log("addtotable called");
    console.log(ele);
    const newTable = ele.target.innerHTML;
    if (!props.tables.includes(newTable)) {
      props.setTables((prevList) => [...prevList, newTable]);
      props.setActiveTab(newTable);
    }
  }

  function toggleTableList() {
    const ele = document.getElementById('all-table-list');
    ele.style.display === '' ? ele.style.display = 'block' : ele.style.display = '';

  }

  document.addEventListener("click", function (e) {
    const menu = document.getElementById('all-table-list');
    const item=document.getElementById('open-table-btn');
    console.log(e.target.innerHTML);
    if (!menu.contains(e.target) && e.target !== item) {
      const ele = document.getElementById('all-table-list');
      ele.style.display = '';
    }
  })

  return (
    <nav >
      <div className='nav-item' onClick={toggleTableList}>
        <div id='open-table-btn'>Open Table</div>
        <div id='all-table-list' className="all-table-list">
          {
            allTableList.map((tableName) => {
              return <div className='open-table-items' onClick={addToTables}>{tableName}</div>
            })
          }
        </div>

      </div>
    </nav>
  )
}

export default Navbar
