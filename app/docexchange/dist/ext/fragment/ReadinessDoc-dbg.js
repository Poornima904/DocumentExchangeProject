sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Item",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/ui/base/Object",
    "sap/m/Text",
    "sap/m/Title",
    "sap/uxap/ObjectPageLayout",
    "sap/uxap/ObjectPageSection",
    "sap/uxap/ObjectPageSubSection",
    "sap/m/VBox",
    "sap/m/HBox",
    "sap/m/TextArea",
    "sap/m/Input",
    "sap/m/Select",
    "sap/m/Image",
    "sap/m/CheckBox",
    "sap/m/Label",
    "sap/m/ComboBox"

], function (MessageToast, JSONModel, Item, Dialog, Button, BaseObject, Text, Title, ObjectPageLayout,
    ObjectPageSection, ObjectPageSubSection, VBox, HBox, TextArea, Input, Select, Image, CheckBox, Label, ComboBox) {
    'use strict';
    var that = this;

    return {
        onPress: function (oEvent) {
            debugger
            MessageToast.show("Custom handler invoked.");
        },
        onAfterItemAdded: function (oEvent) {
            debugger;
            var item = oEvent.getParameter("item");
            var url1 = this._view.getModel().sServiceUrl;
            var _createEntity = function (item) {
                var path1 = window.location.href;
                // var regex = /vendorNo='(\d+)'/;
                var regex = /orderNumber='([^']+)'/;
                var match = path1.match(regex);
                var key = match[1];
                var data = {
                    mediaType: item.getMediaType(),
                    fileName: item.getFileName(),
                    size: item.getFileObject().size,
                    status : "PENDING",
                    orderNumber: key

                };


                var settings = {
                    // url: "/odata/v4/my/Files",
                    url: url1 + `Files`,
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                };

                return new Promise((resolve, reject) => {
                    $.ajax(settings)
                        .done((results, textStatus, request) => {
                            debugger
                            // var ids = [results.fileId]
                            resolve(results.ID);
                            // resolve(results.fileId,results.ID);
                        })
                        .fail((err) => {
                            reject(err);
                        });

                });
            };
            debugger
            _createEntity(item)
                .then((id) => {
                    debugger
                    // var url = `/odata/v4/my/Files(ID=${id})/content`;
                    // var url = url1 + `Files(fileId=${results.fileId})/content`;
                    var url = url1 + `Files(ID=${id})/content`;

                    item.setUploadUrl(url);
                    var oUploadSet = this.byId("uploadSet");
                    oUploadSet.setHttpRequestMethod("PUT");
                    oUploadSet.uploadItem(item);
                })
                .catch((err) => {
                    debugger
                    console.log(err);
                });
        },


        onUploadCompleted: function (oEvent) {
            debugger
      
            var oUploadSet = this.byId("uploadSet");
            oUploadSet.removeAllIncompleteItems();
            oUploadSet.getBinding("items").refresh();

            var fname = oEvent.mParameters.item.mProperties.fileName;
            var path1 = window.location.href;
            var regex = /orderNumber='([^']+)'/;
            var match = path1.match(regex);
            var key = match[1];
    
            var oDialog = new Dialog({
                title: 'Readiness Document',
                type: 'Message',
                contentWidth: "600px",
                contentHeight: "300px",
                scroll: false,
                content: [
                    new VBox({
                        items: [
                            new Title({ text: fname }),
                            new Text({ text: key }),
                            new HBox("iconNcreationdateHbox",{
                                items: [
                                    
                                    new sap.ui.core.Icon({
                                        src: "sap-icon://customer",
                                        contentWidth: "1000px",
                                        contentHeight: "1000px",
                                        size: "30px"
                                    }),
                                    new VBox("createbydate",{
                                        items: [
                                            new Text({ text: "createdBy:" }), // Assuming createdBy is a variable holding the creator's name
                                            new Text({ text: "createdDate:" }) // Assuming createdDate is a variable holding the creation date
                                        ]
                                    })
                                ]


                            })
                        ]



                    }),

                    new sap.uxap.ObjectPageLayout({
                        sections: [
                            new sap.uxap.ObjectPageSection({
                                title: "Suppliers",
                                subSections: [
                                    new sap.uxap.ObjectPageSubSection({
                                        blocks: [
                                            new sap.m.VBox({
                                                items: [
                                                    // Approver docType input field in HBox
                                                    new sap.m.HBox({
                                                        items: [
                                                            new sap.m.Label({
                                                                text: "Approver docType  ",
                                                                labelFor: "comboboxApproverDocType"
                                                            }),

                                                            new sap.m.ComboBox("comboboxApproverDocType", {
                                                                width: "300px",
                                                                editable: false,
                                                                selectedKey: "1",
                                                                items: [
                                                                    new sap.ui.core.ListItem({ key: "1", text: "Readiness Document" }),
                                                                ]
                                                            })


                                                        ],
                                                        alignItems: "Center",
                                                        justifyContent: "Start"
                                                    }),

                                                    // Approver mail input field in HBox with Spacer
                                                    new sap.m.HBox({
                                                        items: [
                                                            new sap.m.Label({
                                                                text: "Approver mail  ",
                                                                labelFor: "approverMailInput"
                                                            }),
                                                            new sap.m.Input("approverMailInput", {
                                                                width: "300px"
                                                            })
                                                        ],
                                                        alignItems: "Center",
                                                        justifyContent: "Start"
                                                    }),
                                                    // Approver Name input field in HBox with Spacer
                                                    new sap.m.HBox({
                                                        items: [
                                                            new sap.m.Label({
                                                                text: "Approver Name  ",
                                                                labelFor: "approverNameInput"
                                                            }),
                                                            new sap.m.Input("approverNameInput", {
                                                                width: "300px"
                                                            })
                                                        ],
                                                        alignItems: "Center",
                                                        justifyContent: "Start"
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })

                ],


                beginButton: new Button({
                    text: 'Submit',
                    press: async function (oEvent) {
                        debugger
                        var url = window.location.href
                        const regex = /orderNumber='(\d+)'/;
                        const match = url.match(regex);

                        let ponum = null;

                        if (match) {
                            ponum = match[1];
                        }
                            
                        var name = sap.ui.getCore().byId("approverNameInput").mProperties.value
                        var email = sap.ui.getCore().byId("approverMailInput").mProperties.value
                        var dialogcomptitle = oEvent.oSource.oParent.mProperties.title
                       
                        let funcname = "bpatrigger";
                        var oFunc = sap.ui.getCore().byId("docexchange::PODetailsObjectPage--fe::FacetSection::PartnerInformation-innerGrid").getModel().bindContext(`/${funcname}(...)`);
                        oFunc.setParameter('poNum', ponum);
                        oFunc.setParameter('email', email);
                        oFunc.setParameter('dialogtitle', dialogcomptitle);
                        await oFunc.execute();

                        oDialog.close();
                    }
                }),
                endButton: new Button({
                    text: 'Close',
                    press: function () {
                        oDialog.close();
                    }
                }),
                endButton: new Button({
                    text: 'Close',
                    press: function () {
                        oDialog.close();
                    }
                }),
                afterClose: function () {
                    oDialog.destroy();
                }
            });
            oDialog.open();

        },

        onRemovePressed: function (oEvent) {
            oEvent.preventDefault();
            oEvent.getParameter("item").getBindingContext().delete();
            MessageToast.show("Selected file has been deleted");
        },

        onOpenPressed: function (oEvent) {
            debugger;
            oEvent.preventDefault();
            var item = oEvent.getSource();
            var fileName = item.getFileName();

            var _download = function (item) {
                var settings = {
                    url: item.getUrl(),
                    method: "GET",
                    headers: {
                        "Content-type": "application/octet-stream"
                    },
                    xhrFields: {
                        responseType: 'blob'
                    }
                };

                return new Promise((resolve, reject) => {
                    $.ajax(settings)
                        .done((result) => {
                            console.log('Downloaded Blob:', result);
                            resolve(result);
                        })
                        .fail((err) => {
                            console.error('Download Error:', err);
                            reject(err);
                        });
                });
            };

            _download(item)
                .then((blob) => {
                    var url = window.URL.createObjectURL(blob);
                    // Open the URL in a new tab
                    window.open(url, '_blank');
                })
                .catch((err) => {
                    console.log(err);
                });
        },


        _download: function (item) {
            var settings = {
                url: item.getUrl(),
                method: "GET",
                headers: {
                    "Content-type": "application/octet-stream"
                },
                xhrFields: {
                    responseType: 'blob'
                }
            }

            return new Promise((resolve, reject) => {
                $.ajax(settings)
                    .done((result) => {
                        resolve(result)
                    })
                    .fail((err) => {
                        reject(err)
                    })
            });
        },

        _createEntity: function (item) {
            var data = {
                mediaType: item.getMediaType(),
                fileName: item.getFileName(),
                size: item.getFileObject().size
            };

            var settings = {
                url: "/my/Files",
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                data: JSON.stringify(data)
            }

            return new Promise((resolve, reject) => {
                $.ajax(settings)
                    .done((results, textStatus, request) => {
                        resolve(results.ID);
                    })
                    .fail((err) => {
                        reject(err);
                    })
            })
        },

        _uploadContent: function (item, id) {
            debugger

            var url = `/my/Files(${req.data.ID})/content`
            item.setUploadUrl(url);
            var oUploadSet = this.byId("uploadSet");
            oUploadSet.setHttpRequestMethod("PUT")
            oUploadSet.uploadItem(item);
        },

        //formatters
        formatThumbnailUrl: function (mediaType) {
            var iconUrl;
            switch (mediaType) {
                case "image/png":
                    iconUrl = "sap-icon://card";
                    break;
                case "text/plain":
                    iconUrl = "sap-icon://document-text";
                    break;
                case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    iconUrl = "sap-icon://excel-attachment";
                    break;
                case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    iconUrl = "sap-icon://doc-attachment";
                    break;
                case "application/pdf":
                    iconUrl = "sap-icon://pdf-attachment";
                    break;
                default:
                    iconUrl = "sap-icon://attachment";
            }
            return iconUrl;
        }

    };
});