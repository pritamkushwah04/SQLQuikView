import React, { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';
import './TableComponentPaged.css'
import ReactPaginate from 'react-paginate';
// import ReactPaginate from "https://cdn.skypack.dev/react-paginate@7.1.3";

const itemsPerPage = 50;

function TableComponentPaged({ activeTab }) {
  const [csvData, setCsvData] = useState([]);
  const [totalRow, setTotalRow] = useState(0);
  const [totalCol, setTotalCol] = useState(0);
  const [filePaths] = useState(["order_details", "orders", "order_details_large", "result0", "result1", "result2"]);
  const parsedData = useMemo(() => {
    const data = [];
    for (let i = 0; i < filePaths.length; i++) {
      data[i] = null; // Initialize data array with null values
    }
    return data;
  }, [filePaths]);


  useEffect(() => {
    if (activeTab) {
      const selectedFileIndex = filePaths.indexOf(activeTab);
      if (parsedData[selectedFileIndex]) {
        setCsvData(parsedData[selectedFileIndex])
        setTotalRow(parsedData[selectedFileIndex].length);
        setTotalCol(Object.keys(parsedData[selectedFileIndex][0]).length);
        return;
      }
      async function getData() {
        const response = await fetch(`/CSV/${activeTab}.csv`)
        if (!response.ok) {
          throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
        }
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
    setCurrentItems(null)
    setPageCount(0)
    setItemOffset(0)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  // Pagination Logic

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(csvData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(csvData.length / itemsPerPage));
  }, [itemOffset, csvData,activeTab]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage % csvData.length;
    setItemOffset(newOffset);
  };

  return (
    <div id={activeTab} className="table-container">
      <table className='q-table' border="1">
        <thead className='q-table-head'>
          <tr className='q-table-r'>
            {currentItems && currentItems[0] && Object.entries(currentItems[0]).map(([key, value]) => {
              return <th className='q-table-h'>{key}</th>
            })}
          </tr>
        </thead>
        <tbody className='q-table-body'>
          {currentItems && currentItems.map((rowData, index) => {
            return <tr className='q-table-r' key={index}>
              {Object.values(rowData).map((value, cellIndex) => {
                return <td className='q-table-d' key={cellIndex}>{value}</td>;
              })}
            </tr>;
          })}
        </tbody>
      </table>
      <div className='pagination-container'>
        <ReactPaginate
          nextLabel=" > "
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=" < "
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>

      <div className="row-count">row : {totalRow}, col:{totalCol}</div>
    </div>
  );
}

export default TableComponentPaged;

