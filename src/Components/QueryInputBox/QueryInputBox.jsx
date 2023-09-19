import React, { useEffect, useState } from 'react'
import populareQuery from '../../SampleQuery.jsx'
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-sql';
import './QueryInputBox.css'
import './prism.css'

const QueryInputBox = ({ setTables, setActiveTab, selectedQuery, setSelectedQuery, recentQuery, setRecentQuery }) => {
  const [resultNum, setResultNum] = useState(0);
  const [code, setCode] = useState("");
  const sound = document.getElementById("replacementSound");
   
  useEffect(() => {
    const textarea = document.getElementById("inpute-box");
    textarea.addEventListener("input", function () {
      const currentValue = {code};
      for (const item of populareQuery) {
        if (currentValue === `/${item.name}`) {
          setCode(item.code);
          sound.play();
        }
      }
    });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const textarea = document.getElementById("inpute-box");
    let currentIndex = recentQuery.length - 1;
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        currentIndex = (currentIndex - 1 + recentQuery.length) % recentQuery.length;
        if (currentIndex > -1)
          setCode(recentQuery[currentIndex]);
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        currentIndex = (currentIndex + 1 + recentQuery.length) % recentQuery.length;
        if (currentIndex > -1)
        setCode(recentQuery[currentIndex]);
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
    setCode(selectedQuery);
  }, [selectedQuery])

  function resetTables() {
    setResultNum(0);
    setTables([]);
    const ele = document.getElementById("inpute-box");
    ele.value = "";
  }

  function addResultTable() {
    if (code!=="") {
      setRecentQuery((prevQueries) => [...prevQueries, code]);
      setResultNum((cur) => cur + 1);
      const newResultTable = `result${resultNum}`;
      setTables((prevList) => [...prevList, newResultTable]);
      setActiveTab(newResultTable);
      sound.play();
    }
  }

  return (
    <div>
      <Editor
            id="inpute-box"
            placeholder="Write your query..."
            className='inpute-box'
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) => highlight(code, languages.sql)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 20,
              height: '40vh',
              overflow: 'auto',
            }}
     />
    {/* <textarea className='inpute-box' name="" id="inpute-box" placeholder="Write your query..."></textarea> */}
      <button onClick={resetTables} id='reset-btn' className='btn'>RESET</button>
      <button onClick={addResultTable} id='run-btn' className='btn'>RUN</button>
      <audio id="replacementSound" src="/Audio/Replaced.mp3"></audio>
    </div>
  )
}

export default QueryInputBox
