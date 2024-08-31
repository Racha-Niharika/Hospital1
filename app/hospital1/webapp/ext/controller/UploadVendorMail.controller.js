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
        override: {
            onInit: function () {
                var oModel = this.base.getExtensionAPI().getModel();
            }
        },

        uploadMailDialog: function (oEvent) {
            var oDialog;
            this.base.getExtensionAPI().loadFragment({
                name: Constants.fragmentName,
                type: "XML",
                controller: this
            }).then(function (oDialogResult) {
                oDialog = oDialogResult;
                oDialog.open();
            });
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
					MessageToast.show(oResourceBundle.getText("uploadFileSuccMsg"));
					// Clear the file uploader and file content
					sap.ui.getCore().byId("idFileUpload").clear();
					that.fileContent = undefined;
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
			var that = this;
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			
			$.ajax({
				url: "/odata/v4/hospital/downloadFile",  // Replace with your actual service URL
				type: "POST",
				contentType: "application/json",
				dataType: "json",
				success: function (response) {
					// Assuming response contains the file details
					var fileData = response;
		
					// Convert base64 encoded fileContent to binary
					var fileContent = atob(fileData.fileContent);
					var uint8Array = new Uint8Array(fileContent.length);
					for (var i = 0; i < fileContent.length; i++) {
						uint8Array[i] = fileContent.charCodeAt(i);
					}
					var blob = new Blob([uint8Array], { type: fileData.mimeType });
		
					// Trigger file download
					var link = document.createElement('a');
					link.href = URL.createObjectURL(blob);
					link.download = fileData.fileName;
					link.click();
		
					MessageToast.show(oResourceBundle.getText("downloadTempSuccMsg"));
				},
				error: function (xhr, status, error) {
					// Handle error
					MessageToast.show(oResourceBundle.getText("downloadTempErrMsg"));
				}
			});
		}
		
    });
});
