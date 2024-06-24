sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('invoicelisting.ext.controller.Objectpage', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf invoicelisting.ext.controller.Objectpage
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			routing: {
				onAfterBinding: async function (oEvent) {
					debugger
					var url = window.location.href;
					var idRegex = /regID='(\d+)'/;
					var match = url.match(idRegex);
					var regID = match ? match[1] : null;
					

					var currentUrl = window.location.href;
					var orderNumberMatch = currentUrl.match(/orderNumber='(\d+)'/);
					var orderNumber = orderNumberMatch ? orderNumberMatch[1] : null;
					var str = oEvent.sPath
					var orderNumber = str.match(/orderNumber='(.*?)'/)[1];
					let funcname = "getcallforpartnerline";
					var oFunc = this.getView().getModel().bindContext(`/${funcname}(...)`);
					oFunc.setParameter('orderNumber', orderNumber);
					await oFunc.execute();

					var path = sap.ui.getCore().byId("invoicelisting::InvoiceheaderObjectPage--fe::CustomSubSection::PartnerInformation--table_partner").mBindingInfos.items.binding;
					path.filter(
					  new sap.ui.model.Filter({
						path: "orderNumber",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: orderNumber
					  })
					);
					path.refresh()

					var path1 = sap.ui.getCore().byId("invoicelisting::InvoiceheaderObjectPage--fe::CustomSubSection::InvoiceListItems--table_line").mBindingInfos.items.binding;
					path1.filter(
					  new sap.ui.model.Filter({
						path: "orderNumber",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: orderNumber
					  })
					);
					path1.refresh()


					var path2 = sap.ui.getCore().byId("invoicelisting::InvoiceheaderObjectPage--fe::CustomSubSection::Readiness--uploadSet").mBindingInfos.items.binding;
					path2.filter(
						new sap.ui.model.Filter({
							path:"orderNumber",
							operator: sap.ui.model.FilterOperator.EQ,
							value1: orderNumber
						})
					);
					path2.refresh();


					var path3 = sap.ui.getCore().byId("invoicelisting::InvoiceheaderObjectPage--fe::CustomSubSection::CompletionD--uploadSet").mBindingInfos.items.binding;
					path3.filter(
						new sap.ui.model.Filter({
							path:"orderNumber",
							operator: sap.ui.model.FilterOperator.EQ,
							value1: orderNumber
						})
					);
					path3.refresh();


					var path4 = sap.ui.getCore().byId("invoicelisting::InvoiceheaderObjectPage--fe::CustomSubSection::DocExchange1--uploadSet").mBindingInfos.items.binding;
					path4.filter(
						new sap.ui.model.Filter({
							path:"orderNumber",
							operator: sap.ui.model.FilterOperator.EQ,
							value1: orderNumber
						})
					);
					path4.refresh();


					var path5 = sap.ui.getCore().byId("invoicelisting::InvoiceheaderObjectPage--fe::CustomSubSection::Attachments--uploadSet").mBindingInfos.items.binding;
					path5.filter(
						new sap.ui.model.Filter({
							path:"regID",
							operator: sap.ui.model.FilterOperator.EQ,
							value1: regID
						})
					);
					path5.refresh();
					
				}
			}
		}
	});
});
