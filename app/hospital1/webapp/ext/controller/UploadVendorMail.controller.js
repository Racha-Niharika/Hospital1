sap.ui.define([
    'sap/ui/core/mvc/ControllerExtension',
    'sap/ui/core/Fragment',
    'sap/m/MessageToast',
    'sap/ui/model/odata/v4/ODataModel'
], function (ControllerExtension, Fragment, MessageToast, ODataModel) {
    'use strict';

    const Constants = {
        fragmentName: "hospital1.ext.fragment.uploadFileDialog",
        serviceNamespace: "com.satinfotech.hospital"
    };

    return ControllerExtension.extend('hospital1.ext.controller.UploadVendorMail', {
        oDialog: null,
        override: {
            onInit: function () {
                
            }
        },

        uploadMailDialog: function (oEvent) {
            var that = this;
            if (!this.oDialog) {  // Check if the dialog is already created
                Fragment.load({
                    name: Constants.fragmentName,
                    controller: this
                }).then(function (oDialog) {
                    that.oDialog = oDialog;  // Store the dialog instance
                    that.getView().addDependent(that.oDialog);  // Ensure the dialog is properly attached to the view
                    that.oDialog.open();
                });
            } else {
                this.oDialog.open();  // Open the dialog if it already exists
            }
        },
        onCancelPress: function () {
            var oDialog = this.oDialog || sap.ui.getCore().byId("idFileDialog");

            if (oDialog) {
                oDialog.close();
            } else {
                console.error("Dialog not found.");
            }
        },
		onFileChange: function (oEvent) {
			var file = oEvent.getParameter("files")[0];
			if (!file) {
				return;
			}
		
			this.fileType = file.type;  // Mime type or file type
			this.fileName = file.name;  // File name
			this.fileExtension = file.name.split('.').pop(); // Extract file extension
		
			var fileReader = new FileReader();
			
			fileReader.onload = function (loadEvent) {
				// Extract base64 content from data URL
				this.fileContent = loadEvent.target.result.split(",")[1];
			}.bind(this);  // Bind 'this' to ensure it refers to the controller instance
		
			fileReader.readAsDataURL(file);
		},
		
		onUploadPress: function (oEvent) {
            var that = this;
            var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
        
            // Check if fileContent is defined
            if (!this.fileContent || this.fileContent === "") {
                MessageToast.show(oResourceBundle.getText("uploadFileErrMsg"));
                return;
            }
        
            // Prepare data for upload
            var data = JSON.stringify({
                mimeType: this.fileType,
                fileName: this.fileName,
                fileContent: this.fileContent,
                fileExtension: this.fileExtension
            });
        
            $.ajax({
                url: "/odata/v4/hospital/fileUpload",  // Replace with your actual service URL
                type: "POST",
                contentType: "application/json",
                data: data,
                dataType: "json",
                success: function (response) {
                    MessageToast.show(oResourceBundle.getText("sucessfully uploaded the file"));
                    // Clear the file uploader and file content
                    sap.ui.getCore().byId("idFileUpload").clear();
                    that.fileContent = undefined;
        
                    // Close the dialog after successful upload
                    if (that.oDialog) {
                        that.oDialog.close();
                    }
                },
                error: function (xhr, status, error) {
                    // Handle error
                    var errorMessage = oResourceBundle.getText("uploadFileErrMsg");
                    MessageToast.show(errorMessage);
        
                    // Log or handle specific error details if needed
                    console.error("Upload failed:", error);
                }
            });
        },
        
        onTempDownload: function (oEvent) {
			var wb = XLSX.utils.book_new();
            var wsData = [
                ["id", "hospital_id", "hospital_name", "address", "no_of_doctors", "no_of_patients"] 
            ];
            var ws = XLSX.utils.aoa_to_sheet(wsData);
            XLSX.utils.book_append_sheet(wb, ws, "Template");
            var wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
            function s2ab(s) {
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;
            }
            var blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
            var url = URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            a.download = "hospital_template.xlsx";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
		},
		
		
    });
});