sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        CreateInvoice: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        }
    };
});
