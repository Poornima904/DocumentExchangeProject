sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('supplier.ext.controller.Listreport', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf supplier.ext.controller.Listreport
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			routing:
			{
				onBeforeBinding: async function (oEvent) {
					debugger
					var email = new sap.ushell.services.UserInfo().getEmail();
					let functionname = 'email';
					let oFunction = this.getView().getModel().bindContext(`/${functionname}(...)`);
					oFunction.setParameter('email', email);
					await oFunction.execute();
					debugger
					let context = oFunction.getBoundContext();
					let getdata = context.getValue();
					let result = getdata.value;
					
					if(result == 1){
					var filterVal = sap.ui.getCore().byId("supplier::PODetails1List--fe::FilterBar::PODetails1").getFilterConditions();
					filterVal.email[0].values[0] = email;
					sap.ui.getCore().byId("supplier::PODetails1List--fe::FilterBar::PODetails1").setFilterConditions(filterVal);
					}
					
				}

			}
		}
	});
});
