
const cds = require('@sap/cds');
const XLSX = require('xlsx');
module.exports = cds.service.impl(async function () {
  this.on('fileUpload', async (req) => {
    const { mimeType, fileContent } = req.data;

    if (mimeType !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        return req.error('Unsupported file type. Please upload an Excel file.');
    }

    try {
        const fileBuffer = Buffer.from(fileContent, 'base64');
        const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0]; 
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);

        const tx = cds.transaction(req);
        for (const row of data) {
            await tx.run(INSERT.into('hospital_hospital').entries({
              id:row['id'],
                hospital_id: row['hospital_id'],
                hospital_name: row['hospital_name'],
                address: row['address'],
                no_of_doctors: row['no_of_doctors'],
                no_of_patients: row['no_of_patients']
            }));
        }
        return { success: true };

    } catch (error) {
        console.error('File upload failed:', error);
        return req.error('Failed to process the file. Please try again.');
    }
    });
});
/*const cds = require('@sap/cds');
const ExcelJS = require('exceljs');

module.exports = cds.service.impl(async function() {
  const cds = require('@sap/cds');
const { Buffer } = require('buffer');


    this.on('fileUpload', async (req) => {
        try {
            const { mimeType, fileName, fileContent, process } = req.data;
            
            // Decode file content from Base64
            const buffer = Buffer.from(fileContent, 'base64');

            // Use ExcelJS or another library to process the buffer
            const ExcelJS = require('exceljs');
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(buffer);

            const worksheet = workbook.worksheets[0];
            const data = worksheet.getSheetValues();

            // Process and save data to database
            await processAndSaveData(data);

            return { message: 'File uploaded and processed successfully.' };
        } catch (error) {
            console.error('Error processing file upload:', error);
            throw new Error('Failed to process file upload');
        }
    });
    this.on('UploadData', async (req) => {
      // Retrieve the uploaded data from the request
      const uploadedData = req.data;

      try {
          // Process and save the data into the entity
          await cds.tx(req).run(
              INSERT.into(Hospital).entries(uploadedData)
          );
          return true; // Indicate success
      } catch (error) {
          console.error('Upload failed:', error);
          return false; // Indicate failure
      }
  });

    async function processAndSaveData(data) {
        const db = await cds.connect.to('db');
        const { Hospital } = db.entities;

        // Clear existing data
        await db.run(DELETE.from(Hospital));

        // Parse and insert data
        const rows = data.slice(1); // Skip header row
        for (const row of rows) {
            const [hospital_id, hospital_name, address, no_of_doctors, no_of_patients] = row;
            await db.run(INSERT.into(Hospital).entries({
                hospital_id, hospital_name, address, no_of_doctors, no_of_patients
            }));
        }
    }


    this.on('DownloadTemplate', async (req) => {
        try {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Hospital Template');

            // Define columns based on the entity 'Hospital'
            worksheet.columns = [
                { header: 'Hospital ID', key: 'hospital_id', width: 20 },
                { header: 'Hospital Name', key: 'hospital_name', width: 30 },
                { header: 'Address', key: 'address', width: 30 }
                // Add more columns as needed based on your entity
            ];

            // Optionally, add some example data or leave it blank
            worksheet.addRow({ hospital_id: '', hospital_name: '', address: '' });

            // Generate the Excel file in memory
            const buffer = await workbook.xlsx.writeBuffer();

            // Set headers to download the file
            req._.res.setHeader('Content-Disposition', 'attachment; filename="Hospital_Template.xlsx"');
            req._.res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

            return buffer;
        } catch (error) {
            console.error('Error generating Excel template:', error);
            req.error(500, 'Failed to generate Excel template');
        }
    });
});

*/
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
/*
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
*/
