import React, { useState } from 'react';
import { PDFViewer, Document, Page } from '@react-pdf/renderer';

const PDFView = () => {
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPdfFile(URL.createObjectURL(file));
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />

      {pdfFile && (
        <div style={{ width: '100%', height: '100vh' }}>
        <PDFViewer style={{ width: '100%', height: '100%' }}>
          <Document file={pdfFile}>
            <Page pageNumber={1} />
          </Document>
        </PDFViewer>
        </div>
      )}
    </div>
  );
};

export default PDFView;
