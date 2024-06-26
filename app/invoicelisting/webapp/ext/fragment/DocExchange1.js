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
    "sap/m/TextArea",
    "sap/m/Input",
    "sap/m/Select",
    "sap/m/Image",
    "sap/m/CheckBox"

], function (MessageToast, JSONModel, Item, Dialog, Button, BaseObject, Text, Title, ObjectPageLayout, ObjectPageSection, ObjectPageSubSection, VBox, TextArea, Input, Select, Image, CheckBox) {
    'use strict';
    var that = this;
    var commentFromSupplier;
    var fname;
    let itemselText;
    var selItems;

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
                    orderNumber: key

                };


                var settings = {
                    // url: "/odata/v4/my/Files2",
                    url: url1 + `Files2`,
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
                    // var url = `/odata/v4/my/Files2(ID=${id})/content`;
                    // var url = url1 + `Files2(fileId=${results.fileId})/content`;
                    var url = url1 + `Files2(ID=${id})/content`;

                    item.setUploadUrl(url);
                    var oUploadSet = this.byId("uploadSet");
                    oUploadSet.setHttpRequestMethod("PUT");
                    oUploadSet.uploadItem(item);
                })
                .catch((err) => {
                    console.log(err);
                });
        },



        onUploadCompleted: async function (oEvent) {
            debugger
            var oUploadSet = this.byId("uploadSet");
            oUploadSet.removeAllIncompleteItems();
            oUploadSet.getBinding("items").refresh();

            fname = oEvent.mParameters.item.mProperties.fileName;

            var path1 = window.location.href;
            var vendorNoRegex = /vendorNo='([^']+)'/;
            var orderNumberRegex = /orderNumber='([^']+)'/;
            var vendorNoMatch = path1.match(vendorNoRegex);
            var orderNumberMatch = path1.match(orderNumberRegex);
            var vendorNum = vendorNoMatch ? vendorNoMatch[1] : null;
            var orderNum = orderNumberMatch ? orderNumberMatch[1] : null;


            // var regex = /orderNumber='([^']+)'/;
            // var match = path1.match(regex);
            // var key = match[1];

            var item = oEvent.getParameter("item");
            var data = {
                mediaType: item.getMediaType(),
                fileName: item.getFileName(),
                size: item.getFileObject().size,
                orderNumber: orderNum

            };

            //function import to get supplier mail 
            let funcname = 'checkboxSuppplerEmail';
            var oFunc = sap.ui.getCore().byId("docexchange::PODetailsObjectPage--fe::FacetSection::PartnerInformation-innerGrid").getModel().bindContext(`/${funcname}(...)`);
            oFunc.setParameter('vendorNo', vendorNum);
            await oFunc.execute();

            var table = oFunc.getBoundContext().getValue().value;   //to get the data from service.js
            var oMultiComboBox = new sap.m.MultiComboBox("checkboxSelected", {
                width: "300px"
            });

            for (let i = 0; i < table.length; i++) {
                var oItem = new sap.ui.core.ListItem({
                    key: `key${i}`,
                    text: table[i].email
                });
                oMultiComboBox.addItem(oItem);
            }

            var oDialog = new Dialog({
                id: 'exchangeDocumentDialog',
                title: 'Exchange Document with Supplier',
                type: 'Message',
                contentWidth: "700px",
                contentHeight: "600px",
                
                content: [
                    new VBox({
                        items: [
                            new Title({ text: fname }),
                            new Text({ text: orderNum }),
                            new sap.ui.core.Icon({
                                src: "sap-icon://attachment",
                                contentWidth: "1000px",
                                contentHeight: "1000px",
                                size: "40px"
                            })
                        ]
                    }),
                    new ObjectPageLayout({
                        sections: [
                            new ObjectPageSection({
                                title: "Communication ",
                                subSections: [
                                    new ObjectPageSubSection({
                                        blocks: [
                                            new VBox({
                                                alignItems: "Center",
                                                items: [
                                                    new Text({ text: "No Communication" })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                            new ObjectPageSection({
                                title: "Suppliers",
                                subSections: [
                                    new ObjectPageSubSection({
                                        blocks: [
                                            new sap.m.VBox({
                                                items: [
                                                    new sap.m.Title({ text: "Suppliers" }),
                                                    oMultiComboBox // Add the dynamically created MultiComboBox
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                            new ObjectPageSection({
                                title: "Add Comments",
                                subSections: [
                                    new ObjectPageSubSection({
                                        blocks: [
                                            new VBox({
                                                items: [
                                                    new TextArea({
                                                        id: "myTextArea",
                                                        width: "100%",
                                                        placeholder: "Type your comments here...",
                                                        rows: 5
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


                beginButton: new sap.m.Button({
                    text: 'Submit',
                    press: async function (oEvent, oModel) {
                        debugger
                        commentFromSupplier = sap.ui.getCore().byId("myTextArea").mProperties.value;
                        //function import to insert comments
                        var funcname = 'storingComments';
                        let oFunc = sap.ui.getCore().byId("docexchange::PODetailsObjectPage--fe::FacetSection::PartnerInformation-innerGrid").getModel().bindContext(`/${funcname}(...)`);
                        oFunc.setParameter('vendorNo', vendorNum);
                        oFunc.setParameter('textArea', commentFromSupplier);
                        await oFunc.execute();


                        selItems = sap.ui.getCore().byId("checkboxSelected").getSelectedItems();
                        // for (let j = 0; j < selItems.length; j++) {
                        //     itemselText = selItems[j].mProperties.text;

                        // }



                        sap.m.MessageToast.show("Document submitted successfully.");
                        oDialog.close();
                    }
                }),
                endButton: new sap.m.Button({
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
                url: "/my/Files2",
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

            var url = `/my/Files2(${req.data.ID})/content`
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
        },


        onManageDocumentPress: function (oEvent) {
            debugger

            function generateUniqueId() {
                // Generate a random number
                var randomNumber = Math.floor(Math.random() * 1000000);

                // Get the current timestamp
                var timestamp = new Date().getTime();

                // Combine timestamp and random number to create a unique ID
                var uniqueId = timestamp + '-' + randomNumber;

                return uniqueId;
            }

            var oVBox = new sap.m.VBox();
            for (let i = 0; i < selItems.length; i++) {
                var oText = new sap.m.Text({
                    text: selItems[i].mProperties.text
                });
                oVBox.addItem(oText);
            }


            var oDialog = new Dialog({
                title: 'Exchange Document with Supplier',
                type: 'Message',
                contentWidth: "900px",
                contentHeight: "500px",

                content: [
                    new Title({
                        text: fname,
                        design: "Bold",
                    }),
                    new ObjectPageLayout({
                        sections: [
                            new ObjectPageSection({
                                title: "Communication ",
                                subSections: [
                                    new ObjectPageSubSection({
                                        blocks: [
                                            new VBox({

                                                items: [
                                                    new sap.suite.ui.commons.Timeline({
                                                        axisOrientation: "Horizontal",
                                                        enableScroll: false,
                                                        showSearch: false,
                                                        showSort: false,
                                                        showFilter: false,
                                                        showHeaderBar: false,
                                                        showItemFilter: false,
                                                        showIcons: false,
                                                        content: [
                                                            new sap.suite.ui.commons.TimelineItem({
                                                                id: "thisuniqid1" + generateUniqueId(),
                                                                dateTime: "11/6/24",
                                                                userNameClickable: false,
                                                                text: commentFromSupplier,
                                                                userPicture: "Photo"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                            new ObjectPageSection({
                                title: "Suppliers",
                                subSections: [
                                    new ObjectPageSubSection({
                                        blocks: [
                                            new VBox({
                                                items: [
                                                    new Title({ text: "Suppliers" }),
                                                    oVBox
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                            new ObjectPageSection({
                                title: "Add Comments",
                                subSections: [
                                    new ObjectPageSubSection({
                                        blocks: [
                                            new VBox({
                                                items: [
                                                    new TextArea({
                                                        width: "100%",
                                                        placeholder: "Type your comments here...",
                                                        rows: 5
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
                    text: 'OK',
                    press: function () {
                        oDialog.close();
                    }
                }),
                afterClose: function () {
                    oDialog.destroy();
                }
            });
            oDialog.open();

        }

    };
});