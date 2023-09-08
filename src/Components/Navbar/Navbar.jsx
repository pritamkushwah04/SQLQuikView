import React from 'react'
import "./Navbar.css"
// import { click } from '@testing-library/user-event/dist/click';
const Navbar = ({ curActivityBarItem, setCurActivityBarItem, tables, setTables, activeTab, setActiveTab }) => {
  const allTableList = ["order_details", "orders"];
  const navItems = ["Open Table", "Recent Query", "Popular Query", "Import From CSV", "Export To CSV"];

  function addToActivityBar(ele) {
    const newItem = ele.target.innerText;
    if (!curActivityBarItem.includes(newItem) && (newItem!=="Import From CSV" && newItem!=="Export To CSV")) {
      setCurActivityBarItem((prevItems) => [...prevItems, newItem]);
    }
  }

  function toggleTableList() {
    const ele = document.getElementById('all-table-list');
    ele.style.display === '' ? ele.style.display = 'block' : ele.style.display = '';

  }

  // document.addEventListener("click", function (e) {
  //   const menu = document.getElementById('all-table-list');
  //   const item=document.getElementById('open-table-btn');
  //   console.log(e.target.innerHTML);
  //   if (!menu.contains(e.target) && e.target !== item) {
  //     const ele = document.getElementById('all-table-list');
  //     ele.style.display = '';
  //   }
  // })

  return (
    <nav >
      {
        navItems.map((item) => {
          return <div className='nav-item' onClick={addToActivityBar}>
                     <div>{item}</div>
                 </div>
        })
      }
    </nav>
  )
}

{/* <div id='all-table-list' className="all-table-list">
          {
            allTableList.map((tableName) => {
              return <div className='open-table-items' onClick={addToTables}>{tableName}</div>
            })
          }
        </div> */}


export default Navbar
