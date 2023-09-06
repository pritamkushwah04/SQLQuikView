import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './TableComponent.css'

function TableComponent( props) {
    const [csvData, setCsvData] = useState([]);

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
        }
        getData()
    }, [])

    return (
            <div  className="table-container">
                <table id={props.tableName} className='table'>
                    <thead className='table-row'>
                        <tr >
                            {csvData[0] && Object.keys(csvData[0]).map((header, index) => (
                                <th  key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {csvData.map((row, rowIndex) => (
                            <tr className='table-col' key={rowIndex}>
                                {Object.values(row).map((value, columnIndex) => (
                                    <td className='table-col' key={columnIndex}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    );
}

export default TableComponent;

