/*
const cds = require('@sap/cds');
const xlsx = require('xlsx');

module.exports = cds.service.impl(async function () {
  const { Hospital } = this.entities;

  this.before('READ', Hospital, async () => {
    await importExcelData();
  });

  async function importExcelData() {
    const db = await cds.connect.to('db');
    const { Hospital } = db.entities('com.satinfotech.hospital');

    // Read the Excel file
    const workbook = xlsx.readFile('C:/Users/srinivas rupa/hospital.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    let jsonData = xlsx.utils.sheet_to_json(worksheet, { defval: null });

    // Function to parse Excel date value
    function parseDate(excelDate) {
      if (typeof excelDate === 'number') {
        const excelEpoch = new Date(Date.UTC(1899, 11, 30));
        const jsDate = new Date(excelEpoch.getTime() + excelDate * 86400000);
        return jsDate.toISOString().split('T')[0];
      }
      return excelDate;
    }

    // Trim field names, parse dates, filter out empty rows and validate critical fields
    jsonData = jsonData.map(row => {
      const trimmedRow = {};
      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          const trimmedKey = key.trim();
          let value = row[key];

          // Add any date parsing if necessary for Hospital schema
          if (trimmedKey === 'established_date' && value) {
            value = parseDate(value);
          }

          trimmedRow[trimmedKey] = value;
        }
      }
      return trimmedRow;
    });

    jsonData = jsonData.filter(row => {
      const hasData = Object.values(row).some(value => value !== null && value !== '');
      const hasCriticalFields = row.hospital_id && row.hospital_name;
      if (!hasData) {
        console.warn('Empty row:', row);
      }
      if (!hasCriticalFields) {
        console.warn('Row with missing critical data:', row);
      }
      return hasData && hasCriticalFields;
    });

    console.log('Filtered data to be imported:', jsonData);

    // Clear existing data
    await DELETE.from(Hospital);

    // Insert new data
    for (const row of jsonData) {
      console.log('Inserting row:', row);
      await INSERT.into(Hospital).entries(row);
    }

    console.log('Data imported successfully');
  }
});
*/
const express = require('express');
const bodyParser = require('body-parser');
const cds = require('@sap/cds');
const xlsx = require('xlsx');

const app = express();
app.use(bodyParser.json());

// Route for importing Excel data
app.get('http://localhost:4004/odata/v4/hospital/Hospital', async (req, res) => {
    try {
        await importExcelData();
        res.status(200).send('Excel data imported successfully.');
    } catch (error) {
        console.error("Error importing Excel data:", error);
        res.status(500).send('Error importing Excel data.');
    }
});

async function importExcelData() {
    const db = await cds.connect.to('db');
    const { Hospital } = db.entities('com.satinfotech.hospital');

    // Read the Excel file
    const workbook = xlsx.readFile('C:/Users/srinivas rupa/hospital.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    let jsonData = xlsx.utils.sheet_to_json(worksheet, { defval: null });

    function parseDate(excelDate) {
        if (typeof excelDate === 'number') {
            const excelEpoch = new Date(Date.UTC(1899, 11, 30));
            const jsDate = new Date(excelEpoch.getTime() + excelDate * 86400000);
            return jsDate.toISOString().split('T')[0];
        }
        return excelDate;
    }

    jsonData = jsonData.map(row => {
        const trimmedRow = {};
        for (const key in row) {
            if (row.hasOwnProperty(key)) {
                const trimmedKey = key.trim();
                let value = row[key];
                if (trimmedKey === 'established_date' && value) {
                    value = parseDate(value);
                }
                trimmedRow[trimmedKey] = value;
            }
        }
        return trimmedRow;
    });

    jsonData = jsonData.filter(row => {
        const hasData = Object.values(row).some(value => value !== null && value !== '');
        const hasCriticalFields = row.hospital_id && row.hospital_name;
        if (!hasData) {
            console.warn('Empty row:', row);
        }
        if (!hasCriticalFields) {
            console.warn('Row with missing critical data:', row);
        }
        return hasData && hasCriticalFields;
    });

    console.log('Filtered data to be imported:', jsonData);

    await db.run(DELETE.from(Hospital));

    for (const row of jsonData) {
        console.log('Inserting row:', row);
        await db.run(INSERT.into(Hospital).entries(row));
    }

    console.log('Data imported successfully');
}

app.listen(3000, () => {
    console.log('Server is running on port 4004');
});
