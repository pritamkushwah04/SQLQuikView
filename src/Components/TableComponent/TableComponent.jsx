import React, { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';
import './TableComponent.css'
import { AutoSizer, Grid } from 'react-virtualized';


function TableComponent({ activeTab }) {
  const [csvData, setCsvData] = useState([]);
  const [totalRow, setTotalRow] = useState(0);
  const [totalCol, setTotalCol] = useState(0);
  const [filePaths, setFilePaths] = useState(["order_details", "orders", "result0", "result1", "result2"]);
  const parsedData = useMemo(() => {
    const data = [];
    for (let i = 0; i < filePaths.length; i++) {
      data[i] = null; // Initialize data array with null values
    }
    return data;
  }, [filePaths]);

  useEffect(() => {
    if (activeTab) {
      setFilePaths((prev)=>prev);
      const selectedFileIndex = filePaths.indexOf(activeTab);
      if (parsedData[selectedFileIndex]) {
        setCsvData(parsedData[selectedFileIndex])
        setTotalRow(parsedData[selectedFileIndex].length);
        setTotalCol(Object.keys(parsedData[selectedFileIndex][0]).length);
        return;
      }
      async function getData() {
        const response = await fetch(`/CSV/${activeTab}.csv`)
        const reader = response.body.getReader()
        const result = await reader.read() // raw array
        const decoder = new TextDecoder('utf-8')
        const csv = decoder.decode(result.value) // the csv text
        const results = Papa.parse(csv, {
          header: true, // Assumes the first row contains column headers
          dynamicTyping: true, // Automatically convert numeric values
          skipEmptyLines: true,
          delimiter: ',', // Specify the delimiter as a comma (or the correct delimiter used in your CSV)
        }) // object with { data, errors, meta }
        const rows = results.data // array of objects
        const updatedData = [...parsedData];
        updatedData[selectedFileIndex] = rows;
        parsedData[selectedFileIndex] = rows;
        setCsvData(rows)
        setTotalRow(rows.length);
        setTotalCol(Object.keys(rows[0]).length);
      }
      getData()
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  // Define a custom cell renderer
  const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    if (!csvData || !csvData[rowIndex]) {
      return null;
    }
    var cellValue
    if (rowIndex === 0) {
      cellValue = Object.keys(csvData[0])[columnIndex];
      return (
        <div key={key} style={style} className="grid-column-cell">
          {cellValue}
        </div>
      );
    } else {
      const nRowIndex=rowIndex-1;
      cellValue = csvData[nRowIndex][Object.keys(csvData[nRowIndex])[columnIndex]];
      const cName = nRowIndex % 2 === 0 ? "grid-even-row" : "grid-odd-row";
      return (
        <div key={key} style={style} className={`${cName}`}>
          {cellValue}
        </div>
      );
    }
  };

  return (
    <div id={activeTab} className="table-container">
      <AutoSizer className="">
        {({ height, width }) => (
          <Grid
            className='grid-c'
            width={width}
            height={height}
            columnWidth={100}
            rowHeight={50}
            rowCount={totalRow}
            columnCount={totalCol}
            cellRenderer={cellRenderer}
          />
        )}
      </AutoSizer>
      <div className="row-count">row : {totalRow}, col:{totalCol}</div>
    </div>
  );
}

export default TableComponent;

