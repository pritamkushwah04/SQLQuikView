import React from 'react'
import "./Navbar.css"

const Navbar = ({ curActivityBarItem, setCurActivityBarItem, tables, setTables, activeTab, setActiveTab }) => {
  const navItems = ["Open Table", "Recent Query", "Popular Query", "Import From CSV", "Export To CSV"];

  function addToActivityBar(ele) {
    const newItem = ele.target.innerText;
    if (!curActivityBarItem.includes(newItem) && (newItem !== "Import From CSV" && newItem !== "Export To CSV")) {
      setCurActivityBarItem((prevItems) => [...prevItems, newItem]);
    } else if (newItem === "Export To CSV" &&activeTab ) {
      const csvFile = process.env.PUBLIC_URL + `/CSV/${activeTab}.csv`;
      const a = document.createElement('a');
      a.href = csvFile;
      a.download = `${activeTab}`;
      a.click();
    }
  }

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

export default Navbar
