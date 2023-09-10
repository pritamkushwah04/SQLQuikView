import React from 'react';

function ExportToCSV() {
  const csvContent = "Name,Email\nJohn Doe,johndoe@example.com\nJane Smith,janesmith@example.com";

  const handleDownload = () => {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button onClick={handleDownload}>Download CSV</button>
    </div>
  );
}

export default ExportToCSV;