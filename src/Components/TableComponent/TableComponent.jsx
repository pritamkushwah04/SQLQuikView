import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './TableComponent.css'

function TableComponent( props) {
    const [csvData, setCsvData] = useState([]);
    const [totalRow,setTotalRow]=useState();
    const [totalCol,setTotalCol]=useState();
    useEffect(() => {
        async function getData() {
            const response = await fetch(`/CSV/${props.tableName}.csv`)
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
            setCsvData(rows)
            setTotalRow(rows.length);
            setTotalCol(Object.keys(rows[0]).length);
        }
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
            <div  id={props.tableName} className="table-container">
                <table  className='table'>
                    <thead className='table-head'>
                        <tr className='table-row' >
                            {csvData[0] && Object.keys(csvData[0]).map((header, index) => (
                                <th  className='table-h' key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='t-body'>
                        {csvData.map((row, rowIndex) => (
                            <tr className='table-row' key={rowIndex}>
                                {Object.values(row).map((value, columnIndex) => (
                                    <td className='table-data' key={columnIndex}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='row-count'>row : {totalRow}, col:{totalCol}</div>
            </div>
    );
}

export default TableComponent;

