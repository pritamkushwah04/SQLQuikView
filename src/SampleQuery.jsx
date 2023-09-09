 const populareQuery=[
    { name:"SELECT",
      code:"SELECT column1, column2\nFROM table_name\nWHERE condition;"
    },
    { name:"INSERT INTO",
      code:"INSERT INTO table_name\n(column1, column2)\nVALUES (value1, value2);"
    },
    { name:"UPDATE",
      code:"UPDATE table_name\nSET column1 = value1, column2 = value2\nWHERE condition;"
    },
    { name:"DELETE",
      code:"DELETE FROM table_name\nWHERE condition;"
    },
    { name:"JOINs",
      code:"SELECT column1, column2\nFROM table1\nINNER JOIN table2 ON table1.column_name = table2.column_name;"
    },
]
export default populareQuery;
