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
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        currentIndex = (currentIndex - 1 + recentQuery.length) % recentQuery.length;
        if (currentIndex > -1)
          textarea.value = recentQuery[currentIndex];
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        currentIndex = (currentIndex + 1 + recentQuery.length) % recentQuery.length;
        if (currentIndex > -1)
          textarea.value = recentQuery[currentIndex];
      } else if (event.key === 'Enter' && event.shiftKey) {
        addResultTable();
      }
    };

    textarea.addEventListener("keydown", handleKeyDown);

    return () => {
      // Remove the same event listener when the component unmounts
      textarea.removeEventListener("keydown", handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
