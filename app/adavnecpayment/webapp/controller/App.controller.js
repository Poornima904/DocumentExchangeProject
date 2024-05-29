sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Item",
    "sap/m/Dialog",
    "sap/m/Button"
  ],
  function (BaseController, MessageToast, JSONModel, Item, Dialog, Button) {
    "use strict";

    return BaseController.extend("adavnecpayment.controller.App", {
      onInit: function () {
      },
      onRowSelected: async function (oEvent) {
        debugger
        var count = oEvent.getSource().getItems();
        for (let i = 0; i < count.length; i++) {
          if (count[i].getSelected() == true) {
            let vendorNo;
            let itemNo;
            let funcname = "fm1";
            var oFunc = oEvent.oSource.getParent().getModel().bindContext(`/${funcname}(...)`);
            oFunc.setParameter('vendorNo', vendorNo);
            oFunc.setParameter('itemNo', itemNo);
            oFunc.setParameter('type', 'checked');
          }

        }
      },
      onPress: function (oEvent) {
        debugger
        MessageToast.show("Custom handler invoked.");
      },
      onAfterItemAdded: function (oEvent) {
        debugger;
        var item = oEvent.getParameter("item");
        var url1 = this.getView().getModel().sServiceUrl;
        var _createEntity = function (item) {
          // var path1 = window.location.href;
          // var regex = /vendorNo='(\d+)'/;
          // var match = path1.match(regex);
          // var key = match[1];
          var data = {
            mediaType: item.getMediaType(),
            fileName: item.getFileName(),
            size: item.getFileObject().size,
            // vendorNo: key

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
        var regex = /vendorNo='(\d+)'/;
        var match = path1.match(regex);
        var key = match[1];

        var oDialog = new Dialog({
          title: 'Exchange Document with Supplier',
          type: 'Message',
          contentWidth: "600px",
          contentHeight: "300px",
          content: new sap.m.Text({ text: fname }),

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

    })
  }
);
