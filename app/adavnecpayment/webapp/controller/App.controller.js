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
    var total_amount = 0;
    var total_Sgst = 0;
    var total_Cgst = 0;
    var url = window.location.href;
    // const url = "https://f38e00betrial.launchpad.cfapps.us10.hana.ondemand.com/cp.portal/ui5appruntime.html?siteId=b40fce8e-78bd-4d16-9b3d-1f6439065d68&subaccountId=b4b4333f-6409-4e78-bdf8-ab9f092b5593&saasApprouter=true&sap-ui-app-id=docexchange&scenario=LAUNCHPAD&sap-startup-params=&sap-shell=FLP&sap-touch=0&sap-ui-versionedLibCss=true&sap-plugins=RTAPluginAgent&sap-theme=sap_horizon&sap-locale=en&sap-propagate-async-loading=true&sap-iframe-hint=UI5#semadv-display?%2540%2524ui5.context.isSelected=true&CompanyCode=1000&copySupplier=X&sap-app-origin-hint=saas_approuter&sap-xapp-state=TASY4F8YB5QTP0PXAW5SGMLP4TVIH2UTVA06NB4AB&semadv=4500011283&vendorName=Chemische%2520Werke%2520Halle&vendorNo=0000001060";
    function getQueryParam(url, paramName) {
      const hashIndex = url.indexOf('#');
      const queryString = hashIndex !== -1 ? url.substring(hashIndex + 1) : '';
      const queryStartIndex = queryString.indexOf('?');
      const queryParamsString = queryStartIndex !== -1 ? queryString.substring(queryStartIndex + 1) : '';
      const urlParams = new URLSearchParams(queryParamsString);
      return urlParams.get(paramName);
    }
    const id = getQueryParam(url, 'semadv');
    // const id  =  '4500011283';



    return BaseController.extend("adavnecpayment.controller.App", {
      onInit: function () {
      },

      onBeforeRendering: async function (oEvent) {

        debugger
        this.byId("submit").setVisible(false);
        let funcname = "getcallforpartnerline";//Updating true or false for a field named checked in line
        var oFunc = oEvent.oSource.getParent().getModel().bindContext(`/${funcname}(...)`);
        oFunc.setParameter('orderNumber',id);

        try {
          await oFunc.execute();
        } catch (error) {
          //
          console.log(error)
        }



        //   //Partner Information
        var path2 = this.byId("table_partner").mBindingInfos.items.binding;
        path2.filter(
          new sap.ui.model.Filter({
            path: "orderNumber",
            operator: sap.ui.model.FilterOperator.EQ,
            value1:id
          })
        );
        path2.refresh()

        //   //PO Line Items

        debugger
        var path = this.byId("table_line").mBindingInfos.items.binding;
        path.filter(
          new sap.ui.model.Filter({
            path: "orderNumber",
            operator: sap.ui.model.FilterOperator.EQ,
            value1:id
          })
        );
        path.refresh()

        //Invoice Line Items
        var path1 = this.byId("inLineItems").mBindingInfos.items.binding;
        path1.filter(
          new sap.ui.model.Filter({
            path: "orderNumber",
            operator: sap.ui.model.FilterOperator.EQ,
            value1:id
          })
        );
        path1.refresh()

        //Readiness Document
        var path3 = this.byId("uploadSet").mBindingInfos.items.binding;
        path3.filter(
          new sap.ui.model.Filter({
            path: "orderNumber",
            operator: sap.ui.model.FilterOperator.EQ,
            value1:id
          })
        );
        path3.refresh()

        //Completion Document
        var path4 = this.byId("uploadSe3t").mBindingInfos.items.binding;
        path4.filter(
          new sap.ui.model.Filter({
            path: "orderNumber",
            operator: sap.ui.model.FilterOperator.EQ,
            value1:id
          })
        );
        path4.refresh()

        //Doc Exchange
        var path5 = this.byId("uploadSet2").mBindingInfos.items.binding;
        path5.filter(
          new sap.ui.model.Filter({
            path: "orderNumber",
            operator: sap.ui.model.FilterOperator.EQ,
            value1:id
          })
        );
        path5.refresh()

        //Attachments
        var path6 = this.byId("uploa2dSet").mBindingInfos.items.binding;
        path6.filter(
          new sap.ui.model.Filter({
            path: "regID",
            operator: sap.ui.model.FilterOperator.EQ,
            value1:"test"
          })
        );
        path6.refresh()

      },

      // ==================VALIDATIONS====================

      invoiceNum: async function (oEvent) {
        debugger
        var advanceno = this.byId("inp-a").getValue()
        let funcname = "validation";//Updating true or false for a field named checked in line
        var oFunc = oEvent.oSource.getParent().getModel().bindContext(`/${funcname}(...)`);
        oFunc.setParameter('invoiceno', advanceno);
     
        try {
          await oFunc.execute();
        } catch (error) {
          //
          console.log(error)
        }

        let context = oFunc.getBoundContext();
        let getdata = context.getValue();
        let invoice = getdata.value;




        if(invoice != advanceno ){
            this.byId("inp-a").setValueState("None");
            this.byId("inp-a").setValueStateText("");
            // this.byId("submit").setVisible(true);
        }
        else{
          this.byId("inp-a").setValueState("Error");
          this.byId("inp-a").setValueStateText(`Invoice No ${advanceno} already exists `);
          this.byId("submit").setVisible(false);
        }
    },

    invoiceVal: async function(oEvent){

        debugger
      var invoiceval = this.byId("inp-c").getValue()
      var totval = this.byId("input-12").getValue()

      
      if(parseFloat(invoiceval) <= parseFloat(totval) ){
        this.byId("inp-c").setValueState("None");
        this.byId("inp-c").setValueStateText("");
        this.byId("submit").setVisible(true);
    }
    else{
      this.byId("inp-c").setValueState("Error");
      this.byId("inp-c").setValueStateText(`Amount entered ${invoiceval} is greater than ${totval} `);
      this.byId("submit").setVisible(false);
    }





    },

      // ==================VALIDATIONS====================
      Submit: async function (oEvent) {
        debugger
        var advanceno = this.byId("inp-a").mProperties.value
        var advancedate = this.byId("inp-b").mProperties.value
        var advanceval = this.byId("inp-c").mProperties.value
        debugger
        let funcname = "postcall";//Updating true or false for a field named checked in line
        var oFunc = oEvent.oSource.getParent().getModel().bindContext(`/${funcname}(...)`);
        oFunc.setParameter('invoiceno', advanceno);
        oFunc.setParameter('invoicedate', advancedate);
        oFunc.setParameter('invoicevalue', advanceval);
        oFunc.setParameter('poNum',id);

        try {
          await oFunc.execute();
        } catch (error) {
          //
          console.log(error)
        }

        console.log("func completed");




        let context = oFunc.getBoundContext();
        let getdata = context.getValue();
        let registerid = getdata.value;


        let d = new sap.m.Dialog
          ({
            title: "Success",
            type: "Message",
            content: new sap.m.Text
              ({
                text: `Advance Payment request created successfully,Referece-ID : ${registerid}`
              }),
            beginButton: new sap.m.Button
              ({
                type: "Accept",
                text: "OK",
                press: async function (oEvent, oPath) {
                  //
                  d.close();
                  window.history.back();

                }
              }),
          });
        //
        d.open();



        // var href_For_Product_display = await sap.ushell.Container.getServiceAsync("Navigation");
        // href_For_Product_display.navigate({
        //     target: { semanticObject: "advance", action: "display" },
        // });





      },
      
      onRowSelected: async function (oEvent) {
        debugger
        var count = oEvent.getSource().getItems();
        for (let i = 0; i < count.length; i++) {
          if (count[i].getSelected() == true) {
            let orderNumber =id;
            let itemNo = count[i].mAggregations.cells[0].mProperties.text;
            let funcname = "fm1";
            var oFunc = oEvent.oSource.getParent().getModel().bindContext(`/${funcname}(...)`);
            oFunc.setParameter('orderNumber', orderNumber);
            oFunc.setParameter('itemNo', itemNo);
            oFunc.setParameter('type', 'checked');
            await oFunc.execute();
            this.byId("inLineItems").mBindingInfos.items.binding.refresh();
            var table = oFunc.getBoundContext().getValue().value;
            // var parse = JSON.parse(table);
            var amount = table.amount;
            debugger
            if (table.checked == "true") {
              var amount = table.amount;
              if (amount.includes(',')) {
                amount = parseFloat(amount.replace(/,/g, ''));
              } else {
                amount = parseFloat(amount);
              }
            }
            total_amount = parseFloat(total_amount) + amount;
            var cgst_percentage = parseFloat(count[i].mAggregations.cells[6].mProperties.text);
            var sgst_percentage = parseFloat(count[i].mAggregations.cells[7].mProperties.text);
            var res_cgst = parseFloat((amount * cgst_percentage) / 100);
            // var cgst_string = JSON.stringify(res_cgst);
            var res_sgst = parseFloat((amount * sgst_percentage) / 100);
            // var sgst_string = JSON.stringify(res_sgst);
            var Sgst = parseFloat(count[i].mAggregations.cells[9].mProperties.text)
            total_Sgst = parseFloat(total_Sgst) + res_sgst;
            var Cgst = parseFloat(count[i].mAggregations.cells[8].mProperties.text)
            total_Cgst = parseFloat(total_Cgst) + res_cgst;


          }
          else {
            let orderNumber =id;
            let itemNo = count[i].mAggregations.cells[0].mProperties.text;
            let funcname = "fm1";
            var oFunc = oEvent.oSource.getParent().getModel().bindContext(`/${funcname}(...)`);
            oFunc.setParameter('orderNumber', orderNumber);
            oFunc.setParameter('itemNo', itemNo);
            oFunc.setParameter('type', 'unchecked');
            await oFunc.execute();
            this.byId("inLineItems").mBindingInfos.items.binding.refresh()
          }
        }
        total_amount = parseFloat(total_amount.toFixed(2));
        this.byId("input-a").setValue(total_amount);
        total_Cgst = parseFloat(total_Cgst.toFixed(2));
        this.byId("input-9").setValue(total_Cgst);
        total_Sgst = parseFloat(total_Sgst.toFixed(2));
        this.byId("input-11").setValue(total_Sgst);
        var result = total_amount + total_Cgst + total_Sgst;
        result = parseFloat(result.toFixed(2));
        this.byId("input-12").setValue(result);
        total_amount = 0;
        total_Sgst = 0;
        total_Cgst = 0;
      },

      submit: async function (oEvent) {
        //
        debugger
        var poNum =id;
        var itemId = oEvent.getSource().getParent().mAggregations.cells[0].mProperties.text;
        var quantity = parseFloat(oEvent.mParameters.value);
        let func = "fm3";
        var oFunc = oEvent.oSource.getParent().getModel().bindContext(`/${func}(...)`);
        oFunc.setParameter('poNum', poNum);
        oFunc.setParameter('itemId', itemId);
        await oFunc.execute();
        var table = oFunc.getBoundContext().getValue().value;
        var parse = JSON.parse(table);
        if (quantity > parseFloat(parse[0].lineItemQuant_static)) {
          oEvent.getSource().setValueState("Error")
          oEvent.getSource().setValueStateText(`Quantity is more than ${parse[0].lineItemQuant_static}`);
        }
        else if (quantity <= parseFloat(parse[0].lineItemQuant_static)) {
          oEvent.getSource().setValueState("None")
          var itemId = oEvent.getSource().getParent().mAggregations.cells[0].mProperties.text;
          var unitPrice = oEvent.getSource().getParent().mAggregations.cells[5].mProperties.value;
          var cgst = oEvent.getSource().getParent().mAggregations.cells[9].mProperties.text;
          var sgst = oEvent.getSource().getParent().mAggregations.cells[10].mProperties.text;
          let funcname = "fm2";
          var oFunc = oEvent.oSource.getParent().getModel().bindContext(`/${funcname}(...)`);
          oFunc.setParameter('poNum', poNum);
          oFunc.setParameter('itemId', itemId);
          oFunc.setParameter('quantity', quantity);
          oFunc.setParameter('unitPrice', unitPrice);
          oFunc.setParameter('sgst_value', cgst);
          oFunc.setParameter('cgst_value', sgst);
          await oFunc.execute();
          //;
          var table = oFunc.getBoundContext().getValue().value;
          var parse = JSON.parse(table);
          this.byId("table_line").mBindingInfos.items.binding.refresh();
          this.byId("inLineItems").mBindingInfos.items.binding.refresh();
          var total_amount = 0;
          var total_Sgst = 0;
          var total_Cgst = 0;
          let count = oEvent.oSource.oParent.oParent.mAggregations.items;
          for (let i = 0; i < count.length; i++) {
            //
            if (parse[0].itemNo == count[i].mAggregations.cells[0].mProperties.text) {
              total_amount = parseFloat(total_amount) + parseFloat(parse[0].amount_dynamic);
              total_Sgst = parseFloat(total_Sgst) + parseFloat(parse[0].sgstValue);
              total_Cgst = parseFloat(total_Cgst) + parseFloat(parse[0].cgstValue);
              continue;
            }
            var amount = count[i].mAggregations.cells[10].mProperties.text;
            if (amount.includes(',')) {
              amount = parseFloat(amount.replace(/,/g, ''));
            } else {
              amount = parseFloat(amount);
            }
            total_amount = parseFloat(total_amount) + amount;
            // var cgst_percentage = parseFloat(count[i].mAggregations.cells[6].mProperties.text);
            // var sgst_percentage = parseFloat(count[i].mAggregations.cells[7].mProperties.text);
            // var res_cgst = JSON.stringify((amount * cgst_percentage) / 100);
            // var res_sgst = JSON.stringify((amount * sgst_percentage) / 100);
            // let funcname = "cgst";
            // var oFunc = oEvent.oSource.getParent().getModel().bindContext(`/${funcname}(...)`);
            // oFunc.setParameter('poNum', poNum);
            // oFunc.setParameter('itemId', count[i].mAggregations.cells[0].mProperties.text);
            // oFunc.setParameter('cgst', res_cgst);
            // oFunc.setParameter('sgst', res_sgst);
            // await oFunc.execute();
            var Sgst = parseFloat(count[i].mAggregations.cells[9].mProperties.text)
            total_Sgst = parseFloat(total_Sgst) + Sgst;
            var Cgst = parseFloat(count[i].mAggregations.cells[8].mProperties.text)
            total_Cgst = parseFloat(total_Cgst) + Cgst;
            // var totalval = parseFloat(count[i].mAggregations.cells[7].mProperties.text)
            // totalval = parseFloat(totalval) + total_amount + total_Sgst + total_Cgst

          }
          total_amount = parseFloat(total_amount.toFixed(2));
          this.byId("input-a").setValue(total_amount);
          total_Cgst = parseFloat(total_Cgst.toFixed(2));
          this.byId("input-9").setValue(total_Cgst);
          total_Sgst = parseFloat(total_Sgst.toFixed(2));
          this.byId("input-11").setValue(total_Sgst);
          var result = total_amount + total_Cgst + total_Sgst;
          result = result.toFixed(2);
          this.byId("input-12").setValue(result);
          // total_amount = 0;
          // total_Sgst = 0;
          // total_Cgst = 0;
        }


      },





      //READINESSS
      onAfterItemAdded: function (oEvent) {
        debugger;
        var item = oEvent.getParameter("item");
        var url1 = this.getView().getModel().sServiceUrl;
        var _createEntity = function (item) {
         
          var data = {
            mediaType: item.getMediaType(),
            fileName: item.getFileName(),
            size: item.getFileObject().size,
            orderNumber:id

           
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
        debugger
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


      // COMPLETIONN

      onAfterItemAddedComp: function (oEvent) {
        debugger;
        var item = oEvent.getParameter("item");
        var url1 = this.getView().getModel().sServiceUrl;
        var _createEntityComp = function (item) {
         
        var dataComp = {
            mediaType: item.getMediaType(),
            fileName: item.getFileName(),
            size: item.getFileObject().size,
            orderNumber:id
           
          };


          var settingsComp = {
            // url: "/odata/v4/my/Files",
            url: url1 + `Files1`,
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            data: JSON.stringify(dataComp)
          };

          return new Promise((resolve, reject) => {
            $.ajax(settingsComp)
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
        _createEntityComp(item)
          .then((id) => {
            debugger
            var url = url1 + `Files1(ID=${id})/content`;

            item.setUploadUrl(url);
            var oUploadSet = this.byId("uploadSe3t");
            oUploadSet.setHttpRequestMethod("PUT");
            oUploadSet.uploadItem(item);
          })
          .catch((err) => {
            debugger
            console.log(err);
          });
      },
      onUploadCompletedComp: function (oEvent) {
        debugger
        var oUploadSet = this.byId("uploadSe3t");
        oUploadSet.removeAllIncompleteItems();
        oUploadSet.getBinding("items").refresh();

      },
      onOpenPressedComp: function (oEvent) {
        debugger;
        oEvent.preventDefault();
        var item = oEvent.getSource();
        var fileName = item.getFileName();

        var _downloadComp = function (item) {
          var settingsComp = {
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
            $.ajax(settingsComp)
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

        _downloadComp(item)
          .then((blob) => {
            var url = window.URL.createObjectURL(blob);
            // Open the URL in a new tab
            window.open(url, '_blank');
          })
          .catch((err) => {
            console.log(err);
          });
      },
      _downloadComp: function (item) {
        var settingsComp = {
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
          $.ajax(settingsComp)
            .done((result) => {
              resolve(result)
            })
            .fail((err) => {
              reject(err)
            })
        });
      },
      _createEntityComp: function (item) {
        var dataComp = {
          mediaType: item.getMediaType(),
          fileName: item.getFileName(),
          size: item.getFileObject().size
        };

        var settingsComp = {
          url: "/my/Files1",
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          data: JSON.stringify(dataComp)
        }

        return new Promise((resolve, reject) => {
          $.ajax(settingsComp)
            .done((results, textStatus, request) => {
              resolve(results.ID);
            })
            .fail((err) => {
              reject(err);
            })
        })
      },

      _uploadContentComp: function (item, id) {
        debugger

        var url = `/my/Files1(${req.data.ID})/content`
        item.setUploadUrl(url);
        var oUploadSet = this.byId("uploadSet2");
        oUploadSet.setHttpRequestMethod("PUT")
        oUploadSet.uploadItem(item);
      },


      // DOCExchange
      onAfterItemAddedDoc: function (oEvent) {
        debugger;
        var item = oEvent.getParameter("item");
        var url1 = this.getView().getModel().sServiceUrl;
        var _createEntityDoc = function (item) {
         
          var dataDoc = {
            mediaType: item.getMediaType(),
            fileName: item.getFileName(),
            size: item.getFileObject().size,
            orderNumber:id
           
          };


          var settingsDoc = {
            // url: "/odata/v4/my/Files",
            url: url1 + `Files2`,
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            data: JSON.stringify(dataDoc)
          };

          return new Promise((resolve, reject) => {
            $.ajax(settingsDoc)
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
        _createEntityDoc(item)
          .then((id) => {
            debugger
            var url = url1 + `Files2(ID=${id})/content`;

            item.setUploadUrl(url);
            var oUploadSet = this.byId("uploadSet2");
            oUploadSet.setHttpRequestMethod("PUT");
            oUploadSet.uploadItem(item);
          })
          .catch((err) => {
            debugger
            console.log(err);
          });
      },
      onUploadCompletedDoc: function (oEvent) {
        debugger

        var oUploadSet = this.byId("uploadSet2");
        oUploadSet.removeAllIncompleteItems();
        oUploadSet.getBinding("items").refresh();

      },
      onOpenPressedDoc: function (oEvent) {
        debugger;
        oEvent.preventDefault();
        var item = oEvent.getSource();
        var fileName = item.getFileName();

        var _downloadDoc = function (item) {
          var settingsDoc = {
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
            $.ajax(settingsDoc)
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

        _downloadDoc(item)
          .then((blob) => {
            var url = window.URL.createObjectURL(blob);
            // Open the URL in a new tab
            window.open(url, '_blank');
          })
          .catch((err) => {
            console.log(err);
          });
      },
      _downloadDoc: function (item) {
        var settingsDoc = {
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
          $.ajax(settingsDoc)
            .done((result) => {
              resolve(result)
            })
            .fail((err) => {
              reject(err)
            })
        });
      },
      _createEntityDoc: function (item) {
        var dataDoc = {
          mediaType: item.getMediaType(),
          fileName: item.getFileName(),
          size: item.getFileObject().size
        };

        var settingsDoc = {
          url: "/my/Files2",
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          data: JSON.stringify(dataDoc)
        }

        return new Promise((resolve, reject) => {
          $.ajax(settingsDoc)
            .done((results, textStatus, request) => {
              resolve(results.ID);
            })
            .fail((err) => {
              reject(err);
            })
        })
      },

      _uploadContentDoc: function (item, id) {
        debugger

        var url = `/my/Files2(${req.data.ID})/content`
        item.setUploadUrl(url);
        var oUploadSet = this.byId("uploadSet");
        oUploadSet.setHttpRequestMethod("PUT")
        oUploadSet.uploadItem(item);
      },

      // ATTACHMENTS

      onAfterItemAddedAttach: function (oEvent) {
        debugger;
        var item = oEvent.getParameter("item");
        var url1 = this.getView().getModel().sServiceUrl;
        var _createEntityAttach = function (item) {
         
          var dataAttach = {
            mediaType: item.getMediaType(),
            fileName: item.getFileName(),
            size: item.getFileObject().size,
            orderNumber:id,
            regID:"test"
           
          };


          var settingsAttach = {
            // url: "/odata/v4/my/Files",
            url: url1 + `Files3`,
            method: "POST",
            headers: {
              "Content-type": "application/json"
             },
            data: JSON.stringify(dataAttach)
          };

          return new Promise((resolve, reject) => {
            $.ajax(settingsAttach)
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
        _createEntityAttach(item)
          .then((id) => {
            debugger
            var url = url1 + `Files3(ID=${id})/content`;

            item.setUploadUrl(url);
            var oUploadSet = this.byId("uploa2dSet");
            oUploadSet.setHttpRequestMethod("PUT");
            oUploadSet.uploadItem(item);
          })
          .catch((err) => {
            debugger
            console.log(err);
          });
      },
      onUploadCompletedAttach: function (oEvent) {
        debugger
        var oUploadSet = this.byId("uploa2dSet");
        oUploadSet.removeAllIncompleteItems();
        oUploadSet.getBinding("items").refresh();

           //Attachments
           var path6 = this.byId("uploa2dSet").mBindingInfos.items.binding;
           path6.filter(
             new sap.ui.model.Filter({
               path: "regID",
               operator: sap.ui.model.FilterOperator.EQ,
               value1:"test"
             })
           );
           path6.refresh()

      },
      onOpenPressedAttach: function (oEvent) {
        debugger;
        // oEvent.preventDefault();
        // var item = oEvent.getSource();
        // var fileName = item.getFileName();

        // var _downloadAttach = function (item) {
        //   var settingsAttach = {
        //     url: item.getUrl(),
        //     method: "GET",
        //     headers: {
        //       "Content-type": "application/octet-stream"
        //     },
        //     xhrFields: {
        //       responseType: 'blob'
        //     }
        //   };

        //   return new Promise((resolve, reject) => {
        //     $.ajax(settingsAttach)
        //       .done((result) => {
        //         console.log('Downloaded Blob:', result);
        //         resolve(result);
        //       })
        //       .fail((err) => {
        //         console.error('Download Error:', err);
        //         reject(err);
        //       });
        //   });
        // };

        // _downloadAttach(item)
        //   .then((blob) => {
        //     var url = window.URL.createObjectURL(blob);
        //     // Open the URL in a new tab
        //     window.open(url, '_blank');
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      },
      _downloadAttach: function (item) {
        var settingsAttach = {
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
          $.ajax(settingsAttach)
            .done((result) => {
              resolve(result)
            })
            .fail((err) => {
              reject(err)
            })
        });
      },
      _createEntityAttach: function (item) {
        var dataAttach = {
          mediaType: item.getMediaType(),
          fileName: item.getFileName(),
          size: item.getFileObject().size
        };

        var settingsAttach = {
          url: "/my/Files3",
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          data: JSON.stringify(dataAttach)
        }

        return new Promise((resolve, reject) => {
          $.ajax(settingsAttach)
            .done((results, textStatus, request) => {
              resolve(results.ID);
            })
            .fail((err) => {
              reject(err);
            })
        })
      },

      _uploadContentAttach: function (item, id) {
        debugger

        var url = `/my/Files3(${req.data.ID})/content`
        item.setUploadUrl(url);
        var oUploadSet = this.byId("uploa2dSet");
        oUploadSet.setHttpRequestMethod("PUT")
        oUploadSet.uploadItem(item);
      }


    })
  }
);
