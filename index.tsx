// import React from 'react';
import XLSX from 'xlsx';

type TArrayToStringNumber = Array<string | number>;

const ExcelUploader = () => {
  const handleFile = (e) => {
    console.log('file in');
    const file = e.target.files;
    const reader = new FileReader();

    reader.onload = (event: any) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: 'array' });
      console.log('workbook:: ', workbook);
      const sheetTitle = workbook.SheetNames[0];
      const sheetArray = workbook.Sheets[sheetTitle];

      const sheetData: Array<TArrayToStringNumber> = XLSX.utils.sheet_to_json(
        sheetArray,
        { header: 1 }
      );

      console.log('sheet data in array:: ', sheetData);
    };

    if (file.length) reader.readAsArrayBuffer(file[0]);
  };

  return (
    <div>
      <input type='file' onChange={handleFile} accept='.csv,.xlsx,.xls' />
    </div>
  );
};

export default ExcelUploader;
