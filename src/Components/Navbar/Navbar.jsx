import React from 'react'
import "./Navbar.css"


const Navbar = ({ curActivityBarItem, setCurActivityBarItem, tables, setTables, activeTab, setActiveTab }) => {
  // const navItems = [, , , ];
  const navItems = [
    {
      name: "Open Table",
      iconSrc: "/Icons/dark/open-file.png"
    },
    {
      name: "Recent Query",
      iconSrc: "/Icons/dark/recent.png"
    },
    {
      name: "Popular Query",
      iconSrc: "/Icons/dark/star.png"
    },
    {
      name: "Export To CSV",
      iconSrc: "/Icons/dark/export.png"
    },
  ]

  function addToActivityBar(newItem) {
    if (newItem&& !curActivityBarItem.includes(newItem) && newItem !== "Export To CSV") {
      setCurActivityBarItem((prevItems) => [...prevItems, newItem]);
    } else if (newItem === "Export To CSV" && activeTab) {
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
          return <div className='nav-item' onClick={() => addToActivityBar(item.name)} key={item.name}>
            <img className='nav-item-icons' src={item.iconSrc} alt={item.name} />
            <div>{item.name}</div>
          </div>
        })
      }
    </nav>
  )
}

export default Navbar
