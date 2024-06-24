sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('supplier.ext.controller.Objc', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf supplier.ext.controller.Objc
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			routing: {

				onAfterBinding: async function (oEvent) {

					debugger
					var email = new sap.ushell.services.UserInfo().getEmail();
					debugger
					var path5 = sap.ui.getCore().byId("supplier::PODetails1ObjectPage--fe::CustomSubSection::DocAttach--uploadSet").mBindingInfos.items.binding;
					path5.filter(
						new sap.ui.model.Filter({
							path:"email",
							operator: sap.ui.model.FilterOperator.EQ,
							value1: email
						})
					);
					path5.refresh();
					
				}
			}
		}
	});
});
