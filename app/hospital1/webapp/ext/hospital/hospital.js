sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    'use strict';

    return  {
        hospital: async function (oEvent) {
            // Show a message toast indicating the handler was invoked
            MessageToast.show("Custom handler invoked.");

            // Make an AJAX call to your Node.js server to trigger Excel data import
            try {
                await this._importExcelData();
                MessageToast.show("Excel data imported successfully.");
            } catch (error) {
                console.error("Error importing Excel data:", error);
                MessageToast.show("Error importing Excel data.");
            }
        },

        _importExcelData: function () {
            // Define your AJAX call to the backend service here
            return new Promise((resolve, reject) => {
                jQuery.ajax({
                    url: "http://localhost:4004/odata/v4/hospital/Hospital", // Endpoint for importing data
                    method: "GET",
                    success: resolve,
                    error: reject
                });
            });
        }
    }});
