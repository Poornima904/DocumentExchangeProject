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
				onBeforeBinding:function(){
					debugger
					
				},
				onAfterBinding:async function(oEvent){
					debugger
					sap.ui.getCore().byId("docexchange::PODetailsList--fe::table::PODetails::LineItem::C::copySupplier-innerColumn").setVisible(false);  //hiding copysupplier column
					var tableList = sap.ui.getCore().byId("docexchange::PODetailsList--fe::table::PODetails::LineItem-innerTable");
					tableList.attachSelectionChange(function (oEvent) {
						debugger
						var copySupp = oEvent.mParameters.listItems[0].mAggregations.cells[5].mProperties.text;
						if(copySupp == 'X'){
							sap.ui.getCore().byId("docexchange::PODetailsList--fe::table::PODetails::LineItem::CustomAction::createinvoice").setVisible(true);  //Create Invoice button unhiding
						}else{
							sap.ui.getCore().byId("docexchange::PODetailsList--fe::table::PODetails::LineItem::CustomAction::createinvoice").setVisible(false);
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
					
					
				},
			
				
				
			}
			
		}
	});
});
