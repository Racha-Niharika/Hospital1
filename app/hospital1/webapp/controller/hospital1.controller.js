sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    'use strict';

    return Controller.extend("hospital1.controller.hospital1", {
        hospital: async function (oEvent) {
            MessageToast.show("Button was pressed");
            // Additional logic
        }
    });
});
