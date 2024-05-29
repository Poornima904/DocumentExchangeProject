sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("adavnecpayment.controller.App", {
        onInit: function() {
        },
        onRowSelected : async function(oEvent){
          debugger
          var count = oEvent.getSource().getItems();
          for (let i = 0; i < count.length; i++) 
          {
            if (count[i].getSelected() == true) 
            {
              let vendorNo;
              let itemNo;
              let funcname = "fm1";
              var oFunc = oEvent.oSource.getParent().getModel().bindContext(`/${funcname}(...)`);
              oFunc.setParameter('vendorNo', vendorNo);
              oFunc.setParameter('itemNo', itemNo);
              oFunc.setParameter('type', 'checked');
            }

          }
        } 
      });
    }
  );
  