sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('docexchange.ext.controller.ObjectC', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf docexchange.ext.controller.ObjectC
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			routing:{
			onBeforeBinding: function(){
				debugger
				//for hiding standard symbols in both the tables
				// sap.ui.getCore().byId("docexchange::PODetailsObjectPage--fe::table::po_polineitems::LineItem::POLineItems-copy-img").setVisible(false)
				// sap.ui.getCore().byId("docexchange::PODetailsObjectPage--fe::table::po_povendor::LineItem::PartnerInformation-copy-img").setVisible(false)
			}
		}
		}
	});
});
