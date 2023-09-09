import React, { useEffect, useState } from 'react'

import populareQuery from '../../SampleQuery.jsx'
import './QueryInputBox.css'
const QueryInputBox = ({ setTables, setActiveTab, selectedQuery, setSelectedQuery, recentQuery, setRecentQuery }) => {
  const [resultNum, setResultNum] = useState(0);
  
  useEffect(() => {
    const sound = document.getElementById("replacementSound");
    const textarea = document.getElementById("inpute-box");
    textarea.addEventListener("input", function () {
      const currentValue = textarea.value;
      for (const item of populareQuery) {
        if (currentValue === `/${item.name}`) {
          textarea.value = item.code;
          sound.play();
        }
      }
    });
  }, [])

  useEffect(() => {
    const textarea = document.getElementById("inpute-box");
    let currentIndex = recentQuery.length - 1;
    textarea.addEventListener("keydown", function (event) {
      console.log("eventListner called");
      if (event.key === "ArrowUp") {
        // Prevent the default behavior of the arrow key (e.g., moving the cursor up)
        event.preventDefault();
        // Move to the previous item circularly
        currentIndex = (currentIndex - 1 + recentQuery.length) % recentQuery.length;
        // Update the textarea value with the current item
        if (currentIndex > -1)
          textarea.value = recentQuery[currentIndex];
      } else if (event.key === "ArrowDown") {
        // Prevent the default behavior of the arrow key (e.g., moving the cursor up)
        event.preventDefault();
        // Move to the previous item circularly
        currentIndex = (currentIndex + 1 + recentQuery.length) % recentQuery.length;
        // Update the textarea value with the current item
        if (currentIndex > -1)
          textarea.value = recentQuery[currentIndex];
      }
    });
  }, [recentQuery])

  useEffect(() => {
    const ele = document.getElementById("inpute-box");
    console.log(selectedQuery);
    ele.value = selectedQuery;
  }, [selectedQuery])

  function resetTables() {
    setResultNum(0);
    setTables([]);
    const ele = document.getElementById("inpute-box");
    ele.value = "";
  }

  function addResultTable() {
    const ele = document.getElementById("inpute-box");
    if (ele.value) {
      setRecentQuery((prevQueries) => [...prevQueries, ele.value]);
      setResultNum((cur) => cur + 1);
      const newResultTable = `result${resultNum}`;
      setTables((prevList) => [...prevList, newResultTable]);
      setActiveTab(newResultTable);
    }
  }



  return (
    <div className='container'>
      <textarea className='inpute-box' name="" id="inpute-box" placeholder="Write your query..."></textarea>
      <button onClick={resetTables} id='reset-btn' className='btn'>RESET</button>
      <button onClick={addResultTable} id='run-btn' className='btn'>RUN</button>
      <audio id="replacementSound" src="/Audio/Replaced.mp3"></audio>
    </div>
  )
}

export default QueryInputBox
