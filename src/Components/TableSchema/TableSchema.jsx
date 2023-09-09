import React, { useEffect } from 'react'
import { useState } from 'react'
import Papa from 'papaparse';

import './TableSchema.css'

const TableSchema = ({ setTables, setActiveTab }) => {
    const [selectedTable, setSelectedTable] = useState("");
    const [tableDiv, setTableDiv] = useState(null);
    const [csvData, setCsvData] = useState([]);

    const tableList = ["order_details", "orders"];

    const handleTableChange = (event) => {
        setSelectedTable(event.target.value);
    };

    function addToTables() {
        setTables((prevList) => {
            if (!prevList.includes(selectedTable)) {
                return [...prevList, selectedTable];
            }
            return prevList;
        });
        setActiveTab(selectedTable);
    }

    useEffect(() => {
        if (selectedTable) {
            async function getData() {
                const response = await fetch(`/CSV/${selectedTable}.csv`)
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
            getData(csvData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTable])

    useEffect(() => {
        if (csvData[0]) {
            const newDiv = <div>
                <div className='Schema-title'>
                    <div >SCHEMA :- </div>
                    <div className='show-table-btn' onClick={addToTables}>Show table</div>
                </div>
                <table className='s-table' border="1">
                    <thead className='s-table-head'>
                        <tr className='s-table-r'>
                            <th className='s-table-h'>column</th>
                            <th className='s-table-h'>type</th>
                        </tr>
                    </thead>
                    <tbody className='s-table-body'>
                        {csvData[0] && Object.entries(csvData[0]).map(([key, value]) => {
                            return <tr className='s-table-r'>
                                <td className='s-table-d' key={value}>{key}</td>
                                <td className='s-table-d'>{typeof value}</td>
                            </tr>

                        })}
                    </tbody>
                </table></div>
            setTableDiv(
                newDiv
            )
        } else {
            setTableDiv(
                <div></div>
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [csvData])

    return (
        <div className='s-container'>
            <select className='drop-down-comp' value={selectedTable} onChange={handleTableChange}>
                <option value="">Select a Table</option>
                {
                    tableList.map((tableName) => {
                        return <option value={tableName}>{tableName}</option>
                    })
                }
            </select>
            {tableDiv}
        </div>
    )
}

export default TableSchema
