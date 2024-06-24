sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('docexchange.ext.controller.ListReportC', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf docexchange.ext.controller.ListReportC
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			routing:{

				onBeforeBinding:async function(oEvent){
					debugger
					let funcname = "getcallforsupplier";
					var oFunc = this.getView().getModel().bindContext(`/${funcname}(...)`);
					oFunc.setParameter('vendorno', '0000001060');
					await oFunc.execute();
				},

				
				onAfterBinding:async function(oEvent){
					debugger

					sap.ui.getCore().byId("docexchange::PODetailsList--fe::table::PODetails::LineItem::DataFieldForIntentBasedNavigation::semadv::display").setVisible(false);  //Create Invoice button hiding
					// sap.ui.getCore().byId("docexchange::PODetailsList--fe::table::PODetails::LineItem::C::copySupplier-innerColumn").setVisible(false);  //hiding copysupplier column
					var tableList =this.getView().mAggregations.content[0].mAggregations.content.mAggregations.content;
					tableList.attachSelectionChange(function (oEvent) {
						debugger
						var copySupp = oEvent.getSource().mAggregations._content.getSelectedItem().getCells()[5].mProperties.text;
						if(copySupp == ''){
							sap.ui.getCore().byId("docexchange::PODetailsList--fe::table::PODetails::LineItem::DataFieldForIntentBasedNavigation::semadv::display").setVisible(false);  //Create Invoice button hiding
						}
						else if(copySupp == 'X'){
							sap.ui.getCore().byId("docexchange::PODetailsList--fe::table::PODetails::LineItem::DataFieldForIntentBasedNavigation::semadv::display").setVisible(true);  //Create Invoice button unhiding
						}
					})

					// setTimeout((oEvent)=>{
					// 	debugger
					// 	console.log(tableList);
					// 	var tabitems = tableList.getItems();
					// 	for (let i = 0; i < tabitems.length; i++) {
					// 		tabitems[i].attachPress((oEvent)=>{
					// 			debugger
					// 		})
						
						
					// 	}
					// },3000);
					
				}
			
				
				
			}
			
		}
	});
});
