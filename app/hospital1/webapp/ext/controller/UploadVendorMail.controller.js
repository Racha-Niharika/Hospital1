sap.ui.define(['sap/ui/core/mvc/ControllerExtension',
	 "sap/m/MessageToast",
	
], function (ControllerExtension, MessageToast) {
	'use strict';
	const Constants = {
		fragmentName: "hospital1.ext.fragment.uploadFileDialog"
	};

	return ControllerExtension.extend('hospital1.ext.controller.UploadVendorMail', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf hospital1.ext.controller.UploadVendorMail
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			}
		},
		uploadMailDialog: function(oEvent){
			var oDialog; 
			this.base.getExtensionAPI().loadFragment({
				name: Constants.fragmentName,
				type: "XML",
				controller: this
			}).then(function (oDialogResult) {
				
				oDialog = oDialogResult;
				oDialogResult.open();
			})
		}
	});
});
