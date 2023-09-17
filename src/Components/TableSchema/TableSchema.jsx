import React, { useEffect, useMemo } from 'react'
import { useState } from 'react'
import Papa from 'papaparse';

import './TableSchema.css'

const TableSchema = ({ setTables, setActiveTab }) => {
    const [selectedTable, setSelectedTable] = useState("");
    const [tableDiv, setTableDiv] = useState(null);
    const [columnNames, setColumnNames] = useState(null);
    const [filePaths] = useState(["order_details", "orders", "order_details_large"]);
    const parsedData = useMemo(() => {
        const data = [];
        for (let i = 0; i < filePaths.length; i++) {
            data[i] = null; // Initialize data array with null values
        }
        return data;
    }, [filePaths]);

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
            const selectedFileIndex = filePaths.indexOf(selectedTable);
            if (parsedData[selectedFileIndex]) {
                setColumnNames(parsedData[selectedFileIndex])
                return;
            }
            async function getData() {
                const response = await fetch(`/CSV/${selectedTable}.csv`)
                const reader = response.body.getReader()
                const result = await reader.read() // raw array
                const decoder = new TextDecoder('utf-8')
                const csv = decoder.decode(result.value) // the csv text

                // Split the CSV text into lines
                const lines = csv.split('\n');
                const rowData = {};
                if (lines.length >= 2) {
                    const headerRow = Papa.parse(lines[0], {
                        dynamicTyping: true,
                        skipEmptyLines: true,
                        delimiter: ',',
                    }).data[0];
                
                    const dataRow = Papa.parse(lines[1], {
                        dynamicTyping: true,
                        skipEmptyLines: true,
                        delimiter: ',',
                    }).data[0];
                
                    if (headerRow.length === dataRow.length) {
                        for (let i = 0; i < headerRow.length; i++) {
                            rowData[headerRow[i]] = dataRow[i];
                        }
                    }
                }
                const firstRow = rowData 
                const updatedData = [...parsedData];
                updatedData[selectedFileIndex] = firstRow;
                parsedData[selectedFileIndex] = firstRow;
                setColumnNames(rowData);
            }
            getData(columnNames);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTable])
    // Object.entries(columnNames).map(([key, value]) => {
    //      console.log(key,"value", value);
    // })
    
    useEffect(() => {
        console.log("use effect called");
        console.log("columnNames", columnNames);
        if (columnNames) {
            console.log("inside if:-",columnNames);
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
                        {columnNames && Object.entries(columnNames).map(([key, value]) => {
                            return <tr className='s-table-r'>
                                <td className='s-table-d' key={key}>{key}</td>
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
    }, [columnNames])

    return (
        <div className='s-container'>
            <select className='drop-down-comp' value={selectedTable} onChange={handleTableChange}>
                <option value="">Select a Table</option>
                {
                    filePaths.map((tableName) => {
                        return <option value={tableName}>{tableName}</option>
                    })
                }
            </select>
            {tableDiv}
        </div>
    )
}

export default TableSchema
