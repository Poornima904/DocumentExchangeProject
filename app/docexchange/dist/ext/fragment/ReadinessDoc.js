sap.ui.define(["sap/m/MessageToast","sap/ui/model/json/JSONModel","sap/ui/core/Item","sap/m/Dialog","sap/m/Button","sap/ui/base/Object","sap/m/Text","sap/m/Title","sap/uxap/ObjectPageLayout","sap/uxap/ObjectPageSection","sap/uxap/ObjectPageSubSection","sap/m/VBox","sap/m/HBox","sap/m/TextArea","sap/m/Input","sap/m/Select","sap/m/Image","sap/m/CheckBox","sap/m/Label","sap/m/ComboBox"],function(e,t,a,o,n,r,s,i,p,c,l,m,d,u,g,b,v,x,f,w){"use strict";var h=this;return{onPress:function(t){debugger;e.show("Custom handler invoked.")},onAfterItemAdded:function(e){debugger;var t=e.getParameter("item");var a=this._view.getModel().sServiceUrl;var o=function(e){var t=window.location.href;var o=/orderNumber='([^']+)'/;var n=t.match(o);var r=n[1];var s={mediaType:e.getMediaType(),fileName:e.getFileName(),size:e.getFileObject().size,status:"PENDING",orderNumber:r};var i={url:a+`Files`,method:"POST",headers:{"Content-type":"application/json"},data:JSON.stringify(s)};return new Promise((e,t)=>{$.ajax(i).done((t,a,o)=>{debugger;e(t.ID)}).fail(e=>{t(e)})})};debugger;o(t).then(e=>{debugger;var o=a+`Files(ID=${e})/content`;t.setUploadUrl(o);var n=this.byId("uploadSet");n.setHttpRequestMethod("PUT");n.uploadItem(t)}).catch(e=>{debugger;console.log(e)})},onUploadCompleted:function(e){debugger;var t=this.byId("uploadSet");t.removeAllIncompleteItems();t.getBinding("items").refresh();var a=e.mParameters.item.mProperties.fileName;var r=window.location.href;var p=/orderNumber='([^']+)'/;var c=r.match(p);var l=c[1];var u=new o({title:"Readiness Document",type:"Message",contentWidth:"600px",contentHeight:"300px",scroll:false,content:[new m({items:[new i({text:a}),new s({text:l}),new d("iconNcreationdateHbox",{items:[new sap.ui.core.Icon({src:"sap-icon://customer",contentWidth:"1000px",contentHeight:"1000px",size:"30px"}),new m("createbydate",{items:[new s({text:"createdBy:"}),new s({text:"createdDate:"})]})]})]}),new sap.uxap.ObjectPageLayout({sections:[new sap.uxap.ObjectPageSection({title:"Suppliers",subSections:[new sap.uxap.ObjectPageSubSection({blocks:[new sap.m.VBox({items:[new sap.m.HBox({items:[new sap.m.Label({text:"Approver docType  ",labelFor:"comboboxApproverDocType"}),new sap.m.ComboBox("comboboxApproverDocType",{width:"300px",editable:false,selectedKey:"1",items:[new sap.ui.core.ListItem({key:"1",text:"Readiness Document"})]})],alignItems:"Center",justifyContent:"Start"}),new sap.m.HBox({items:[new sap.m.Label({text:"Approver mail  ",labelFor:"approverMailInput"}),new sap.m.Input("approverMailInput",{width:"300px"})],alignItems:"Center",justifyContent:"Start"}),new sap.m.HBox({items:[new sap.m.Label({text:"Approver Name  ",labelFor:"approverNameInput"}),new sap.m.Input("approverNameInput",{width:"300px"})],alignItems:"Center",justifyContent:"Start"})]})]})]})]})],beginButton:new n({text:"Submit",press:async function(e){debugger;var t=window.location.href;const a=/orderNumber='(\d+)'/;const o=t.match(a);let n=null;if(o){n=o[1]}var r=sap.ui.getCore().byId("approverNameInput").mProperties.value;var s=sap.ui.getCore().byId("approverMailInput").mProperties.value;var i=e.oSource.oParent.mProperties.title;let p="bpatrigger";var c=sap.ui.getCore().byId("docexchange::PODetailsObjectPage--fe::FacetSection::PartnerInformation-innerGrid").getModel().bindContext(`/${p}(...)`);c.setParameter("poNum",n);c.setParameter("email",s);c.setParameter("dialogtitle",i);await c.execute();u.close()}}),endButton:new n({text:"Close",press:function(){u.close()}}),endButton:new n({text:"Close",press:function(){u.close()}}),afterClose:function(){u.destroy()}});u.open()},onRemovePressed:function(t){t.preventDefault();t.getParameter("item").getBindingContext().delete();e.show("Selected file has been deleted")},onOpenPressed:function(e){debugger;e.preventDefault();var t=e.getSource();var a=t.getFileName();var o=function(e){var t={url:e.getUrl(),method:"GET",headers:{"Content-type":"application/octet-stream"},xhrFields:{responseType:"blob"}};return new Promise((e,a)=>{$.ajax(t).done(t=>{console.log("Downloaded Blob:",t);e(t)}).fail(e=>{console.error("Download Error:",e);a(e)})})};o(t).then(e=>{var t=window.URL.createObjectURL(e);window.open(t,"_blank")}).catch(e=>{console.log(e)})},_download:function(e){var t={url:e.getUrl(),method:"GET",headers:{"Content-type":"application/octet-stream"},xhrFields:{responseType:"blob"}};return new Promise((e,a)=>{$.ajax(t).done(t=>{e(t)}).fail(e=>{a(e)})})},_createEntity:function(e){var t={mediaType:e.getMediaType(),fileName:e.getFileName(),size:e.getFileObject().size};var a={url:"/my/Files",method:"POST",headers:{"Content-type":"application/json"},data:JSON.stringify(t)};return new Promise((e,t)=>{$.ajax(a).done((t,a,o)=>{e(t.ID)}).fail(e=>{t(e)})})},_uploadContent:function(e,t){debugger;var a=`/my/Files(${req.data.ID})/content`;e.setUploadUrl(a);var o=this.byId("uploadSet");o.setHttpRequestMethod("PUT");o.uploadItem(e)},formatThumbnailUrl:function(e){var t;switch(e){case"image/png":t="sap-icon://card";break;case"text/plain":t="sap-icon://document-text";break;case"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":t="sap-icon://excel-attachment";break;case"application/vnd.openxmlformats-officedocument.wordprocessingml.document":t="sap-icon://doc-attachment";break;case"application/pdf":t="sap-icon://pdf-attachment";break;default:t="sap-icon://attachment"}return t}}});
//# sourceMappingURL=ReadinessDoc.js.map