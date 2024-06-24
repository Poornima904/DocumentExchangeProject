sap.ui.define(["sap/m/MessageToast","sap/ui/model/json/JSONModel","sap/ui/core/Item","sap/m/Dialog","sap/m/Button","sap/ui/base/Object","sap/m/Text","sap/m/Title","sap/uxap/ObjectPageLayout","sap/uxap/ObjectPageSection","sap/uxap/ObjectPageSubSection","sap/m/VBox","sap/m/TextArea","sap/m/Input","sap/m/Select","sap/m/Image","sap/m/CheckBox"],function(e,t,a,n,o,r,i,s,c,l,m,d,p,u,g,h,w){"use strict";var b=this;var f;var v;let x;var y;return{onPress:function(t){debugger;e.show("Custom handler invoked.")},onAfterItemAdded:function(e){debugger;var t=e.getParameter("item");var a=this._view.getModel().sServiceUrl;var n=function(e){var t=window.location.href;var n=/orderNumber='([^']+)'/;var o=t.match(n);var r=o[1];var i={mediaType:e.getMediaType(),fileName:e.getFileName(),size:e.getFileObject().size,orderNumber:r};var s={url:a+`Files2`,method:"POST",headers:{"Content-type":"application/json"},data:JSON.stringify(i)};return new Promise((e,t)=>{$.ajax(s).done((t,a,n)=>{debugger;e(t.ID)}).fail(e=>{t(e)})})};debugger;n(t).then(e=>{debugger;var n=a+`Files2(ID=${e})/content`;t.setUploadUrl(n);var o=this.byId("uploadSet");o.setHttpRequestMethod("PUT");o.uploadItem(t)}).catch(e=>{console.log(e)})},onUploadCompleted:async function(e){debugger;var t=this.byId("uploadSet");t.removeAllIncompleteItems();t.getBinding("items").refresh();v=e.mParameters.item.mProperties.fileName;var a=window.location.href;var o=/vendorNo='([^']+)'/;var r=/orderNumber='([^']+)'/;var u=a.match(o);var g=a.match(r);var h=u?u[1]:null;var w=g?g[1]:null;var b=e.getParameter("item");var x={mediaType:b.getMediaType(),fileName:b.getFileName(),size:b.getFileObject().size,orderNumber:w};let S="checkboxSuppplerEmail";var P=sap.ui.getCore().byId("docexchange::PODetailsObjectPage--fe::FacetSection::PartnerInformation-innerGrid").getModel().bindContext(`/${S}(...)`);P.setParameter("vendorNo",h);await P.execute();var I=P.getBoundContext().getValue().value;var T=new sap.m.MultiComboBox("checkboxSelected",{width:"300px"});for(let e=0;e<I.length;e++){var C=new sap.ui.core.ListItem({key:`key${e}`,text:I[e].email});T.addItem(C)}var k=new n({id:"exchangeDocumentDialog",title:"Exchange Document with Supplier",type:"Message",contentWidth:"700px",contentHeight:"600px",content:[new d({items:[new s({text:v}),new i({text:w}),new sap.ui.core.Icon({src:"sap-icon://attachment",contentWidth:"1000px",contentHeight:"1000px",size:"40px"})]}),new c({sections:[new l({title:"Communication ",subSections:[new m({blocks:[new d({alignItems:"Center",items:[new i({text:"No Communication"})]})]})]}),new l({title:"Suppliers",subSections:[new m({blocks:[new sap.m.VBox({items:[new sap.m.Title({text:"Suppliers"}),T]})]})]}),new l({title:"Add Comments",subSections:[new m({blocks:[new d({items:[new p({id:"myTextArea",width:"100%",placeholder:"Type your comments here...",rows:5})]})]})]})]})],beginButton:new sap.m.Button({text:"Submit",press:async function(e,t){debugger;f=sap.ui.getCore().byId("myTextArea").mProperties.value;var a="storingComments";let n=sap.ui.getCore().byId("docexchange::PODetailsObjectPage--fe::FacetSection::PartnerInformation-innerGrid").getModel().bindContext(`/${a}(...)`);n.setParameter("vendorNo",h);n.setParameter("textArea",f);await n.execute();y=sap.ui.getCore().byId("checkboxSelected").getSelectedItems();sap.m.MessageToast.show("Document submitted successfully.");k.close()}}),endButton:new sap.m.Button({text:"Close",press:function(){k.close()}}),afterClose:function(){k.destroy()}});k.open()},onRemovePressed:function(t){t.preventDefault();t.getParameter("item").getBindingContext().delete();e.show("Selected file has been deleted")},onOpenPressed:function(e){debugger;e.preventDefault();var t=e.getSource();var a=t.getFileName();var n=function(e){var t={url:e.getUrl(),method:"GET",headers:{"Content-type":"application/octet-stream"},xhrFields:{responseType:"blob"}};return new Promise((e,a)=>{$.ajax(t).done(t=>{console.log("Downloaded Blob:",t);e(t)}).fail(e=>{console.error("Download Error:",e);a(e)})})};n(t).then(e=>{var t=window.URL.createObjectURL(e);window.open(t,"_blank")}).catch(e=>{console.log(e)})},_download:function(e){var t={url:e.getUrl(),method:"GET",headers:{"Content-type":"application/octet-stream"},xhrFields:{responseType:"blob"}};return new Promise((e,a)=>{$.ajax(t).done(t=>{e(t)}).fail(e=>{a(e)})})},_createEntity:function(e){var t={mediaType:e.getMediaType(),fileName:e.getFileName(),size:e.getFileObject().size};var a={url:"/my/Files2",method:"POST",headers:{"Content-type":"application/json"},data:JSON.stringify(t)};return new Promise((e,t)=>{$.ajax(a).done((t,a,n)=>{e(t.ID)}).fail(e=>{t(e)})})},_uploadContent:function(e,t){debugger;var a=`/my/Files2(${req.data.ID})/content`;e.setUploadUrl(a);var n=this.byId("uploadSet");n.setHttpRequestMethod("PUT");n.uploadItem(e)},formatThumbnailUrl:function(e){var t;switch(e){case"image/png":t="sap-icon://card";break;case"text/plain":t="sap-icon://document-text";break;case"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":t="sap-icon://excel-attachment";break;case"application/vnd.openxmlformats-officedocument.wordprocessingml.document":t="sap-icon://doc-attachment";break;case"application/pdf":t="sap-icon://pdf-attachment";break;default:t="sap-icon://attachment"}return t},onManageDocumentPress:function(e){debugger;function t(){var e=Math.floor(Math.random()*1e6);var t=(new Date).getTime();var a=t+"-"+e;return a}var a=new sap.m.VBox;for(let e=0;e<y.length;e++){var r=new sap.m.Text({text:y[e].mProperties.text});a.addItem(r)}var i=new n({title:"Exchange Document with Supplier",type:"Message",contentWidth:"900px",contentHeight:"500px",content:[new s({text:v,design:"Bold"}),new c({sections:[new l({title:"Communication ",subSections:[new m({blocks:[new d({items:[new sap.suite.ui.commons.Timeline({axisOrientation:"Horizontal",enableScroll:false,showSearch:false,showSort:false,showFilter:false,showHeaderBar:false,showItemFilter:false,showIcons:false,content:[new sap.suite.ui.commons.TimelineItem({id:"thisuniqid1"+t(),dateTime:"11/6/24",userNameClickable:false,text:f,userPicture:"Photo"})]})]})]})]}),new l({title:"Suppliers",subSections:[new m({blocks:[new d({items:[new s({text:"Suppliers"}),a]})]})]}),new l({title:"Add Comments",subSections:[new m({blocks:[new d({items:[new p({width:"100%",placeholder:"Type your comments here...",rows:5})]})]})]})]})],beginButton:new o({text:"OK",press:function(){i.close()}}),afterClose:function(){i.destroy()}});i.open()}}});
//# sourceMappingURL=DocExchange1.js.map