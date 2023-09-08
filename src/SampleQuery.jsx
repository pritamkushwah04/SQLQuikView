 const populareQuery=[
    { name:"SELECT",
      code:"SELECT column1, column2 FROM table_name WHERE condition;"
    },
    { name:"INSERT INTO",
      code:"INSERT INTO table_name (column1, column2) VALUES (value1, value2);"
    },
    { name:"UPDATE",
      code:"UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition;"
    },
    { name:"DELETE ",
      code:"DELETE FROM table_name WHERE condition;"
    },
    { name:"JOINs",
      code:"SELECT column1, column2 FROM table1 INNER JOIN table2 ON table1.column_name = table2.column_name;"
    },
]
export default populareQuery;
