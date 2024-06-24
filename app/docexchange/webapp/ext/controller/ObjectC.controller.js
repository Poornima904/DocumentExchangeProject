
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
				// var oModel = this.base.getExtensionAPI().getModel();
			},
			routing: {
				onBeforeBinding:async function (oEvent) {
					debugger

					var str = oEvent.sPath
					var orderNumber = str.match(/orderNumber='(.*?)'/)[1];

					let funcname = "getcallforpartnerline";
					var oFunc = this.getView().getModel().bindContext(`/${funcname}(...)`);
					oFunc.setParameter('orderNumber', orderNumber);
					// await oFunc.execute();

					await new Promise(async (resolve, reject) => {
						await oFunc.execute();
						resolve();
					})

					oEvent.requestRefresh();

					// sap.ui.getCore().byId("docexchange::PODetailsObjectPage--fe::table::po_povendor::LineItem::PartnerInformation").mBindingInfos.selectionMode.binding.refresh;

					//for hiding standard symbols in both the tables
					// sap.ui.getCore().byId("docexchange::PODetailsObjectPage--fe::table::po_polineitems::LineItem::POLineItems-copy-img").setVisible(false)
					// sap.ui.getCore().byId("docexchange::PODetailsObjectPage--fe::table::po_povendor::LineItem::PartnerInformation-copy-img").setVisible(false)
				},
				onAfterBinding: function (oEvent) {
					debugger

					var str = oEvent.sPath
					var orderNumber = str.match(/orderNumber='(.*?)'/)[1];

					var path1 = sap.ui.getCore().byId("docexchange::PODetailsObjectPage--fe::CustomSubSection::CompletionDoc--uploadSet").mBindingInfos.items.binding;
					path1.filter(
						new sap.ui.model.Filter({
							path: "orderNumber",
							operator: sap.ui.model.FilterOperator.EQ,
							value1: orderNumber
						})
					);
					path1.refresh();

					var path2 = sap.ui.getCore().byId("docexchange::PODetailsObjectPage--fe::CustomSubSection::ReadinessDoc--uploadSet").mBindingInfos.items.binding;
					path2.filter(
						new sap.ui.model.Filter({
							path: "orderNumber",
							operator: sap.ui.model.FilterOperator.EQ,
							value1: orderNumber
						})
					);
					path2.refresh();

					var path3 = sap.ui.getCore().byId("docexchange::PODetailsObjectPage--fe::CustomSubSection::DocExchange--uploadSet").mBindingInfos.items.binding;
					path3.filter(
						new sap.ui.model.Filter({
							path: "orderNumber",
							operator: sap.ui.model.FilterOperator.EQ,
							value1: orderNumber
						})
					);
					path3.refresh();



				

					// var pathPI = sap.ui.getCore().byId("docexchange::PODetailsObjectPage--fe::table::po_povendor::LineItem::PartnerInformation").mBindingInfos.items.binding;
					// pathPI.refresh();
					// var pathPOlineitems = sap.ui.getCore().byId("docexchange::PODetailsObjectPage--fe::table::po_polineitems::LineItem::POLineItems-innerTable-listUl").mBindingInfos.items.binding;
					// pathPOlineitems.refresh();
					// sap.ui.getCore().byId("docexchange::PODetailsObjectPage--fe::table::po_povendor::LineItem::PartnerInformation").mBindingInfos.selectionMode.binding.refresh;


					


					// await new Promise((resolve, reject) => {
					// 	var timeVar = setTimeout(function (params) {
					// 		console.log("test");
					// 		resolve();
					// 	}, 1000)
					// })


					oEvent.requestRefresh();


				}
			}
		}
	});
});
