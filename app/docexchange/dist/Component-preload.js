//@ui5-bundle docexchange/Component-preload.js
sap.ui.require.preload({
	"docexchange/Component.js":function(){
sap.ui.define(["sap/fe/core/AppComponent"],function(e){"use strict";return e.extend("docexchange.Component",{metadata:{manifest:"json"}})});
},
	"docexchange/ext/controller/ListReportC.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/ControllerExtension"],function(e){"use strict";return e.extend("docexchange.ext.controller.ListReportC",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel()},routing:{onBeforeBinding:function(){debugger},onAfterBinding:async function(e){debugger;sap.ui.getCore().byId("docexchange::PODetailsList--fe::table::PODetails::LineItem::C::copySupplier-innerColumn").setVisible(false);var t=sap.ui.getCore().byId("docexchange::PODetailsList--fe::table::PODetails::LineItem-innerTable");t.attachSelectionChange(function(e){debugger;var t=e.mParameters.listItems[0].mAggregations.cells[5].mProperties.text;if(t=="X"){sap.ui.getCore().byId("docexchange::PODetailsList--fe::table::PODetails::LineItem::CustomAction::createinvoice").setVisible(true)}else{sap.ui.getCore().byId("docexchange::PODetailsList--fe::table::PODetails::LineItem::CustomAction::createinvoice").setVisible(false)}})}}}})});
},
	"docexchange/ext/controller/ObjectC.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/ControllerExtension"],function(e){"use strict";return e.extend("docexchange.ext.controller.ObjectC",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel()},routing:{onBeforeBinding:function(){debugger}}}})});
},
	"docexchange/ext/fragment/CompletionDoc.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core" xmlns="sap.m" xmlns:macros="sap.fe.macros" displayBlock="true"\nxmlns:mvc="sap.ui.core.mvc" xmlns:upload="sap.m.upload"><VBox id="11"><upload:UploadSet\n\t\t\t\t\tid="uploadSet"\n\t\t\t\t\tcore:require="{ handler: \'docexchange/ext/fragment/CompletionDoc\'}"\n\t\t\t\t\tinstantUpload="false"\n\t\t\t\t\tuploadEnabled="true"\n\t\t\t\t\tshowIcons="true"\n\t\t\t\t\tuploadButtonInvisible="false"\n\t\t\t\t\tafterItemAdded="handler.onAfterItemAdded"\n\t\t\t\t\tuploadCompleted="handler.onUploadCompleted"\n\t\t\t\t\titems="{\n\t\t\t\t\t\t\t\tpath: \'/Files1\',\n\t\t\t\t\t\t\t\tparameters: {\n\t\t\t\t\t\t\t\t\t$orderby: \'createdAt desc\'\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\ttemplateShareable: false}"><upload:toolbar></upload:toolbar><upload:items><upload:UploadSetItem\n\t\t\t\t\t\tid="ddd"\n\t\t\t\t\t\t\tfileName="{fileName}"\n\t\t\t\t\t\t\tmediaType="{mediaType}"\n\t\t\t\t\t\t\turl="{url}"\n\t\t\t\t\t\t\tthumbnailUrl="{\n\t\t\t\t\t\t\t\tpath: \'mediaType\',\n\t\t\t\t\t\t\t\tformatter: \'handler.formatThumbnailUrl\'\n\t\t\t\t\t\t\t}"\n\t\t\t\t\t\t\tenabledEdit="true"\n\t\t\t\t\t\t\tvisibleEdit="true"\n\t\t\t\t\t\t\tvisibleRemove="true"\n\t\t\t\t\t\t\topenPressed="handler.onOpenPressed"\n\t\t\t\t\t\t\tremovePressed="handler.onRemovePressed"><upload:attributes><ObjectAttribute\n\t\t\t\t\t\t\t\tid="dd"\n\t\t\t\t\t\t\t\t\ttitle="Uploaded By"\n\t\t\t\t\t\t\t\t\ttext="{createdBy}"\n\t\t\t\t\t\t\t\t\tactive="false"\n\t\t\t\t\t\t\t\t/><ObjectAttribute\n\t\t\t\t\t\t\t\tid="dd22"\n\t\t\t\t\t\t\t\t\ttitle="Uploaded on"\n\t\t\t\t\t\t\t\t\ttext="{createdAt}"\n\t\t\t\t\t\t\t\t\tactive="false"\n\t\t\t\t\t\t\t\t/><ObjectAttribute\n\t\t\t\t\t\t\t\tid="dddw2"\n\n\t\t\t\t\t\t\t\t\ttitle="File Type"\n\t\t\t\t\t\t\t\t\ttext="{mediaType}"\n\t\t\t\t\t\t\t\t\tactive="false"\n\t\t\t\t\t\t\t\t/><ObjectAttribute\n\t\t\t\t\t\t\t\tid="dd22a"\n\t\t\t\t\t\t\t\t\ttitle="File Size"\n\t\t\t\t\t\t\t\t\ttext="{size}"\n\t\t\t\t\t\t\t\t\tactive="false"\n\t\t\t\t\t\t\t\t/></upload:attributes></upload:UploadSetItem></upload:items></upload:UploadSet></VBox></core:FragmentDefinition>',
	"docexchange/ext/fragment/CompletionDoc.js":function(){
sap.ui.define(["sap/m/MessageToast","sap/ui/model/json/JSONModel","sap/ui/core/Item","sap/m/Dialog","sap/m/Button"],function(e,t,a,o,n){"use strict";var r=this;return{onPress:function(t){debugger;e.show("Custom handler invoked.")},onAfterItemAdded:function(e){debugger;var t=e.getParameter("item");var a=this._view.getModel().sServiceUrl;var o=function(e){var t=window.location.href;var o=/vendorNo='(\d+)'/;var n=t.match(o);var r=n[1];var i={mediaType:e.getMediaType(),fileName:e.getFileName(),size:e.getFileObject().size,vendorNo:r};var s={url:a+`Files1`,method:"POST",headers:{"Content-type":"application/json"},data:JSON.stringify(i)};return new Promise((e,t)=>{$.ajax(s).done((t,a,o)=>{debugger;e(t.ID)}).fail(e=>{t(e)})})};debugger;o(t).then(e=>{debugger;var o=a+`Files1(ID=${e})/content`;t.setUploadUrl(o);var n=this.byId("uploadSet");n.setHttpRequestMethod("PUT");n.uploadItem(t)}).catch(e=>{console.log(e)})},onUploadCompleted:function(e){debugger;var t=this.byId("uploadSet");t.removeAllIncompleteItems();t.getBinding("items").refresh();var a=e.mParameters.item.mProperties.fileName;var r=window.location.href;var i=/vendorNo='(\d+)'/;var s=r.match(i);var d=s[1];var l=new o({title:"Exchange Document with Supplier",type:"Message",contentWidth:"600px",contentHeight:"300px",content:new sap.m.Text({text:a}),beginButton:new n({text:"OK",press:function(){l.close()}}),afterClose:function(){l.destroy()}});l.open()},onRemovePressed:function(t){t.preventDefault();t.getParameter("item").getBindingContext().delete();e.show("Selected file has been deleted")},onOpenPressed:function(e){debugger;e.preventDefault();var t=e.getSource();var a=t.getFileName();var o=function(e){var t={url:e.getUrl(),method:"GET",headers:{"Content-type":"application/octet-stream"},xhrFields:{responseType:"blob"}};return new Promise((e,a)=>{$.ajax(t).done(t=>{console.log("Downloaded Blob:",t);e(t)}).fail(e=>{console.error("Download Error:",e);a(e)})})};o(t).then(e=>{var t=window.URL.createObjectURL(e);window.open(t,"_blank")}).catch(e=>{console.log(e)})},_download:function(e){var t={url:e.getUrl(),method:"GET",headers:{"Content-type":"application/octet-stream"},xhrFields:{responseType:"blob"}};return new Promise((e,a)=>{$.ajax(t).done(t=>{e(t)}).fail(e=>{a(e)})})},_createEntity:function(e){var t={mediaType:e.getMediaType(),fileName:e.getFileName(),size:e.getFileObject().size};var a={url:"/my/Files1",method:"POST",headers:{"Content-type":"application/json"},data:JSON.stringify(t)};return new Promise((e,t)=>{$.ajax(a).done((t,a,o)=>{e(t.ID)}).fail(e=>{t(e)})})},_uploadContent:function(e,t){debugger;var a=`/my/Files1(${req.data.ID})/content`;e.setUploadUrl(a);var o=this.byId("uploadSet");o.setHttpRequestMethod("PUT");o.uploadItem(e)},formatThumbnailUrl:function(e){var t;switch(e){case"image/png":t="sap-icon://card";break;case"text/plain":t="sap-icon://document-text";break;case"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":t="sap-icon://excel-attachment";break;case"application/vnd.openxmlformats-officedocument.wordprocessingml.document":t="sap-icon://doc-attachment";break;case"application/pdf":t="sap-icon://pdf-attachment";break;default:t="sap-icon://attachment"}return t}}});
},
	"docexchange/ext/fragment/DocExchange.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core" xmlns="sap.m" xmlns:macros="sap.fe.macros" displayBlock="true"\nxmlns:mvc="sap.ui.core.mvc" xmlns:upload="sap.m.upload" xmlns:Button="sap.m.Button"><VBox id="11"><upload:UploadSet\n\t\t\t\t\tid="uploadSet"\n\t\t\t\t\tcore:require="{ handler: \'docexchange/ext/fragment/DocExchange\'}"\n\t\t\t\t\tinstantUpload="false"\n\t\t\t\t\tuploadEnabled="true"\n\t\t\t\t\tshowIcons="true"\n\t\t\t\t\tuploadButtonInvisible="false"\n\t\t\t\t\tafterItemAdded="handler.onAfterItemAdded"\n\t\t\t\t\tuploadCompleted="handler.onUploadCompleted"\n\t\t\t\t\titems="{\n\t\t\t\t\t\t\t\tpath: \'/Files2\',\n\t\t\t\t\t\t\t\tparameters: {\n\t\t\t\t\t\t\t\t\t$orderby: \'createdAt desc\'\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\ttemplateShareable: false}"><upload:toolbar><OverflowToolbar id="overflow"><ToolbarSpacer id="toolspacer"/><Button id="manageDocon" text="Manage Document" press="handler.onManageDocumentPress" /><upload:UploadSetToolbarPlaceholder id="ooo" /></OverflowToolbar></upload:toolbar><upload:items><upload:UploadSetItem\n\t\t\t\t\t\tid="ddd"\n\t\t\t\t\t\t\tfileName="{fileName}"\n\t\t\t\t\t\t\tmediaType="{mediaType}"\n\t\t\t\t\t\t\turl="{url}"\n\t\t\t\t\t\t\tthumbnailUrl="{\n\t\t\t\t\t\t\t\tpath: \'mediaType\',\n\t\t\t\t\t\t\t\tformatter: \'handler.formatThumbnailUrl\'\n\t\t\t\t\t\t\t}"\n\t\t\t\t\t\t\tenabledEdit="true"\n\t\t\t\t\t\t\tvisibleEdit="true"\n\t\t\t\t\t\t\tvisibleRemove="true"\n\t\t\t\t\t\t\topenPressed="handler.onOpenPressed"\n\t\t\t\t\t\t\tremovePressed="handler.onRemovePressed"><upload:attributes><ObjectAttribute\n\t\t\t\t\t\t\t\tid="dd"\n\t\t\t\t\t\t\t\t\ttitle="Uploaded By"\n\t\t\t\t\t\t\t\t\ttext="{createdBy}"\n\t\t\t\t\t\t\t\t\tactive="false"\n\t\t\t\t\t\t\t\t/><ObjectAttribute\n\t\t\t\t\t\t\t\tid="dd22"\n\t\t\t\t\t\t\t\t\ttitle="Uploaded on"\n\t\t\t\t\t\t\t\t\ttext="{createdAt}"\n\t\t\t\t\t\t\t\t\tactive="false"\n\t\t\t\t\t\t\t\t/><ObjectAttribute\n\t\t\t\t\t\t\t\tid="dddw2"\n\n\t\t\t\t\t\t\t\t\ttitle="File Type"\n\t\t\t\t\t\t\t\t\ttext="{mediaType}"\n\t\t\t\t\t\t\t\t\tactive="false"\n\t\t\t\t\t\t\t\t/><ObjectAttribute\n\t\t\t\t\t\t\t\tid="dd22a"\n\t\t\t\t\t\t\t\t\ttitle="File Size"\n\t\t\t\t\t\t\t\t\ttext="{size}"\n\t\t\t\t\t\t\t\t\tactive="false"\n\t\t\t\t\t\t\t\t/></upload:attributes></upload:UploadSetItem></upload:items></upload:UploadSet></VBox></core:FragmentDefinition>',
	"docexchange/ext/fragment/DocExchange.js":function(){
sap.ui.define(["sap/m/MessageToast","sap/ui/model/json/JSONModel","sap/ui/core/Item","sap/m/Dialog","sap/m/Button","sap/ui/base/Object","sap/m/Text","sap/m/Title","sap/uxap/ObjectPageLayout","sap/uxap/ObjectPageSection","sap/uxap/ObjectPageSubSection","sap/m/VBox","sap/m/TextArea","sap/m/Input","sap/m/Select","sap/m/Image","sap/m/CheckBox"],function(e,t,n,o,a,s,i,r,l,c,m,p,d,u,w,g,h){"use strict";var b=this;return{onPress:function(t){debugger;e.show("Custom handler invoked.")},onAfterItemAdded:function(e){debugger;var t=e.getParameter("item");var n=this._view.getModel().sServiceUrl;var o=function(e){var t=window.location.href;var o=/vendorNo='(\d+)'/;var a=t.match(o);var s=a[1];var i={mediaType:e.getMediaType(),fileName:e.getFileName(),size:e.getFileObject().size,vendorNo:s};var r={url:n+`Files2`,method:"POST",headers:{"Content-type":"application/json"},data:JSON.stringify(i)};return new Promise((e,t)=>{$.ajax(r).done((t,n,o)=>{debugger;e(t.ID)}).fail(e=>{t(e)})})};debugger;o(t).then(e=>{debugger;var o=n+`Files2(ID=${e})/content`;t.setUploadUrl(o);var a=this.byId("uploadSet");a.setHttpRequestMethod("PUT");a.uploadItem(t)}).catch(e=>{console.log(e)})},onUploadCompleted:function(e){debugger;var t=this.byId("uploadSet");t.removeAllIncompleteItems();t.getBinding("items").refresh();var n=e.mParameters.item.mProperties.fileName;var a=window.location.href;var s=/vendorNo='(\d+)'/;var u=a.match(s);var w=u[1];var g=e.getParameter("item");var h={mediaType:g.getMediaType(),fileName:g.getFileName(),size:g.getFileObject().size,vendorNo:w};var b=new o({title:"Exchange Document with Supplier",type:"Message",contentWidth:"700px",contentHeight:"600px",content:[new p({items:[new r({text:n}),new i({text:w}),new sap.m.Image({src:"dfghj",width:"200px",height:"auto"})]}),new l({sections:[new c({title:"Communication ",subSections:[new m({blocks:[new p({alignItems:"Center",items:[new i({text:"No Communication"})]})]})]}),new c({title:"Suppliers",subSections:[new m({blocks:[new sap.m.VBox({items:[new sap.m.Title({text:"Suppliers"}),new sap.m.MultiComboBox({width:"300px",items:[new sap.ui.core.ListItem({key:"1",text:"poornima.am@peolsolutions.com"}),new sap.ui.core.ListItem({key:"2",text:"sai.kumar@peolsolutions.com"}),new sap.ui.core.ListItem({key:"3",text:"prem.k@peolsolutions.com"})]})]})]})]}),new c({title:"Add Comments",subSections:[new m({blocks:[new p({items:[new d({width:"100%",placeholder:"Type your comments here...",rows:5})]})]})]})]})],beginButton:new sap.m.Button({text:"Submit",press:function(){sap.m.MessageToast.show("Document submitted successfully.");b.close()}}),endButton:new sap.m.Button({text:"Close",press:function(){b.close()}}),afterClose:function(){b.destroy()}});b.open()},onRemovePressed:function(t){t.preventDefault();t.getParameter("item").getBindingContext().delete();e.show("Selected file has been deleted")},onOpenPressed:function(e){debugger;e.preventDefault();var t=e.getSource();var n=t.getFileName();var o=function(e){var t={url:e.getUrl(),method:"GET",headers:{"Content-type":"application/octet-stream"},xhrFields:{responseType:"blob"}};return new Promise((e,n)=>{$.ajax(t).done(t=>{console.log("Downloaded Blob:",t);e(t)}).fail(e=>{console.error("Download Error:",e);n(e)})})};o(t).then(e=>{var t=window.URL.createObjectURL(e);window.open(t,"_blank")}).catch(e=>{console.log(e)})},_download:function(e){var t={url:e.getUrl(),method:"GET",headers:{"Content-type":"application/octet-stream"},xhrFields:{responseType:"blob"}};return new Promise((e,n)=>{$.ajax(t).done(t=>{e(t)}).fail(e=>{n(e)})})},_createEntity:function(e){var t={mediaType:e.getMediaType(),fileName:e.getFileName(),size:e.getFileObject().size};var n={url:"/my/Files2",method:"POST",headers:{"Content-type":"application/json"},data:JSON.stringify(t)};return new Promise((e,t)=>{$.ajax(n).done((t,n,o)=>{e(t.ID)}).fail(e=>{t(e)})})},_uploadContent:function(e,t){debugger;var n=`/my/Files2(${req.data.ID})/content`;e.setUploadUrl(n);var o=this.byId("uploadSet");o.setHttpRequestMethod("PUT");o.uploadItem(e)},formatThumbnailUrl:function(e){var t;switch(e){case"image/png":t="sap-icon://card";break;case"text/plain":t="sap-icon://document-text";break;case"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":t="sap-icon://excel-attachment";break;case"application/vnd.openxmlformats-officedocument.wordprocessingml.document":t="sap-icon://doc-attachment";break;case"application/pdf":t="sap-icon://pdf-attachment";break;default:t="sap-icon://attachment"}return t},onManageDocumentPress:function(){debugger;var e=new o({title:"Exchange Document with Supplier",type:"Message",contentWidth:"900px",contentHeight:"500px",content:[new r({text:"add file name here"}),new l({sections:[new c({title:"Communication ",subSections:[new m({blocks:[new p({alignItems:"Center",items:[new i({text:"No Communication"})]})]})]}),new c({title:"Suppliers",subSections:[new m({blocks:[new p({items:[new r({text:"Suppliers"}),new w({items:[new n({key:"1",text:"poornima.am@peolsolutions.com"}),new n({key:"2",text:"sai.k@peolsolutions.com"}),new n({key:"3",text:"prem.k@peolsolutions.com"})]})]})]})]}),new c({title:"Add Comments",subSections:[new m({blocks:[new p({items:[new d({width:"100%",placeholder:"Type your comments here...",rows:5})]})]})]})]})],beginButton:new a({text:"OK",press:function(){e.close()}}),afterClose:function(){e.destroy()}});e.open()}}});
},
	"docexchange/ext/fragment/ReadinessDoc.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core" xmlns="sap.m" xmlns:macros="sap.fe.macros" displayBlock="true"\nxmlns:mvc="sap.ui.core.mvc" xmlns:upload="sap.m.upload"><VBox id="11"><upload:UploadSet\n\t\t\t\t\tid="uploadSet"\n\t\t\t\t\tcore:require="{ handler: \'docexchange/ext/fragment/ReadinessDoc\'}"\n\t\t\t\t\tinstantUpload="false"\n\t\t\t\t\tuploadEnabled="true"\n\t\t\t\t\tshowIcons="true"\n\t\t\t\t\tuploadButtonInvisible="false"\n\t\t\t\t\tafterItemAdded="handler.onAfterItemAdded"\n\t\t\t\t\tuploadCompleted="handler.onUploadCompleted"\n\t\t\t\t\titems="{\n\t\t\t\t\t\t\t\tpath: \'/Files\',\n\t\t\t\t\t\t\t\tparameters: {\n\t\t\t\t\t\t\t\t\t$orderby: \'createdAt desc\'\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\ttemplateShareable: false}"><upload:toolbar></upload:toolbar><upload:items><upload:UploadSetItem\n\t\t\t\t\t\tid="ddd"\n\t\t\t\t\t\t\tfileName="{fileName}"\n\t\t\t\t\t\t\tmediaType="{mediaType}"\n\t\t\t\t\t\t\turl="{url}"\n\t\t\t\t\t\t\tthumbnailUrl="{\n\t\t\t\t\t\t\t\tpath: \'mediaType\',\n\t\t\t\t\t\t\t\tformatter: \'handler.formatThumbnailUrl\'\n\t\t\t\t\t\t\t}"\n\t\t\t\t\t\t\tenabledEdit="true"\n\t\t\t\t\t\t\tvisibleEdit="true"\n\t\t\t\t\t\t\tvisibleRemove="true"\n\t\t\t\t\t\t\topenPressed="handler.onOpenPressed"\n\t\t\t\t\t\t\tremovePressed="handler.onRemovePressed"><upload:attributes><ObjectAttribute\n\t\t\t\t\t\t\t\tid="dd"\n\t\t\t\t\t\t\t\t\ttitle="Uploaded By"\n\t\t\t\t\t\t\t\t\ttext="{createdBy}"\n\t\t\t\t\t\t\t\t\tactive="false"\n\t\t\t\t\t\t\t\t/><ObjectAttribute\n\t\t\t\t\t\t\t\tid="dd22"\n\t\t\t\t\t\t\t\t\ttitle="Uploaded on"\n\t\t\t\t\t\t\t\t\ttext="{createdAt}"\n\t\t\t\t\t\t\t\t\tactive="false"\n\t\t\t\t\t\t\t\t/><ObjectAttribute\n\t\t\t\t\t\t\t\tid="dddw2"\n\n\t\t\t\t\t\t\t\t\ttitle="File Type"\n\t\t\t\t\t\t\t\t\ttext="{mediaType}"\n\t\t\t\t\t\t\t\t\tactive="false"\n\t\t\t\t\t\t\t\t/><ObjectAttribute\n\t\t\t\t\t\t\t\tid="dd22a"\n\t\t\t\t\t\t\t\t\ttitle="File Size"\n\t\t\t\t\t\t\t\t\ttext="{size}"\n\t\t\t\t\t\t\t\t\tactive="false"\n\t\t\t\t\t\t\t\t/></upload:attributes></upload:UploadSetItem></upload:items></upload:UploadSet></VBox></core:FragmentDefinition>',
	"docexchange/ext/fragment/ReadinessDoc.js":function(){
sap.ui.define(["sap/m/MessageToast","sap/ui/model/json/JSONModel","sap/ui/core/Item","sap/m/Dialog","sap/m/Button"],function(e,t,a,o,n){"use strict";var r=this;return{onPress:function(t){debugger;e.show("Custom handler invoked.")},onAfterItemAdded:function(e){debugger;var t=e.getParameter("item");var a=this._view.getModel().sServiceUrl;var o=function(e){var t=window.location.href;var o=/vendorNo='(\d+)'/;var n=t.match(o);var r=n[1];var i={mediaType:e.getMediaType(),fileName:e.getFileName(),size:e.getFileObject().size,vendorNo:r};var s={url:a+`Files`,method:"POST",headers:{"Content-type":"application/json"},data:JSON.stringify(i)};return new Promise((e,t)=>{$.ajax(s).done((t,a,o)=>{debugger;e(t.ID)}).fail(e=>{t(e)})})};debugger;o(t).then(e=>{debugger;var o=a+`Files(ID=${e})/content`;t.setUploadUrl(o);var n=this.byId("uploadSet");n.setHttpRequestMethod("PUT");n.uploadItem(t)}).catch(e=>{debugger;console.log(e)})},onUploadCompleted:function(e){debugger;var t=this.byId("uploadSet");t.removeAllIncompleteItems();t.getBinding("items").refresh();var a=e.mParameters.item.mProperties.fileName;var r=window.location.href;var i=/vendorNo='(\d+)'/;var s=r.match(i);var d=s[1];var l=new o({title:"Exchange Document with Supplier",type:"Message",contentWidth:"600px",contentHeight:"300px",content:new sap.m.Text({text:a}),beginButton:new n({text:"OK",press:function(){l.close()}}),afterClose:function(){l.destroy()}});l.open()},onRemovePressed:function(t){t.preventDefault();t.getParameter("item").getBindingContext().delete();e.show("Selected file has been deleted")},onOpenPressed:function(e){debugger;e.preventDefault();var t=e.getSource();var a=t.getFileName();var o=function(e){var t={url:e.getUrl(),method:"GET",headers:{"Content-type":"application/octet-stream"},xhrFields:{responseType:"blob"}};return new Promise((e,a)=>{$.ajax(t).done(t=>{console.log("Downloaded Blob:",t);e(t)}).fail(e=>{console.error("Download Error:",e);a(e)})})};o(t).then(e=>{var t=window.URL.createObjectURL(e);window.open(t,"_blank")}).catch(e=>{console.log(e)})},_download:function(e){var t={url:e.getUrl(),method:"GET",headers:{"Content-type":"application/octet-stream"},xhrFields:{responseType:"blob"}};return new Promise((e,a)=>{$.ajax(t).done(t=>{e(t)}).fail(e=>{a(e)})})},_createEntity:function(e){var t={mediaType:e.getMediaType(),fileName:e.getFileName(),size:e.getFileObject().size};var a={url:"/my/Files",method:"POST",headers:{"Content-type":"application/json"},data:JSON.stringify(t)};return new Promise((e,t)=>{$.ajax(a).done((t,a,o)=>{e(t.ID)}).fail(e=>{t(e)})})},_uploadContent:function(e,t){debugger;var a=`/my/Files(${req.data.ID})/content`;e.setUploadUrl(a);var o=this.byId("uploadSet");o.setHttpRequestMethod("PUT");o.uploadItem(e)},formatThumbnailUrl:function(e){var t;switch(e){case"image/png":t="sap-icon://card";break;case"text/plain":t="sap-icon://document-text";break;case"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":t="sap-icon://excel-attachment";break;case"application/vnd.openxmlformats-officedocument.wordprocessingml.document":t="sap-icon://doc-attachment";break;case"application/pdf":t="sap-icon://pdf-attachment";break;default:t="sap-icon://attachment"}return t}}});
},
	"docexchange/i18n/i18n.properties":'# This is the resource bundle for docexchange\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=Document Exchange\n\n#YDES: Application description\nappDescription=An SAP Fiori application.\n\n#XFLD,51\nflpTitle=Document Exchange\n',
	"docexchange/manifest.json":'{"_version":"1.59.0","sap.app":{"id":"docexchange","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:lrop","version":"1.13.5","toolsId":"771e8b2d-a111-4519-8442-38f1a39a48a2"},"dataSources":{"mainService":{"uri":"odata/v4/my/","type":"OData","settings":{"annotations":[],"odataVersion":"4.0"}}},"crossNavigation":{"inbounds":{"sem-display":{"semanticObject":"sem","action":"display","title":"{{flpTitle}}","signature":{"parameters":{},"additionalParameters":"allowed"}}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.124.0","libs":{"sap.m":{},"sap.ui.core":{},"sap.ushell":{},"sap.fe.templates":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"docexchange.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}},"@i18n":{"type":"sap.ui.model.resource.ResourceModel","uri":"i18n/i18n.properties"}},"resources":{"css":[]},"routing":{"config":{},"routes":[{"pattern":":?query:","name":"PODetailsList","target":"PODetailsList"},{"pattern":"PODetails({key}):?query:","name":"PODetailsObjectPage","target":"PODetailsObjectPage"}],"targets":{"PODetailsList":{"type":"Component","id":"PODetailsList","name":"sap.fe.templates.ListReport","options":{"settings":{"contextPath":"/PODetails","variantManagement":"Page","navigation":{"PODetails":{"detail":{"route":"PODetailsObjectPage"}}},"controlConfiguration":{"@com.sap.vocabularies.UI.v1.LineItem":{"tableSettings":{"type":"ResponsiveTable","selectionMode":"Single"}}},"defaultTemplateAnnotationPath":"com.sap.vocabularies.UI.v1.SelectionPresentationVariant#tableView"}}},"PODetailsObjectPage":{"type":"Component","id":"PODetailsObjectPage","name":"sap.fe.templates.ObjectPage","options":{"settings":{"editableHeaderContent":false,"contextPath":"/PODetails","controlConfiguration":{"po_povendor/@com.sap.vocabularies.UI.v1.LineItem#PartnerInformation":{"tableSettings":{"enableExport":false,"personalization":{"filter":false,"sort":false,"column":false},"quickVariantSelection":{"showCounts":false},"enablePaste":false,"condensedTableLayout":false}},"po_polineitems/@com.sap.vocabularies.UI.v1.LineItem#POLineItems":{"tableSettings":{"enableExport":false,"personalization":{"filter":false,"sort":false,"column":false},"quickVariantSelection":{"showCounts":false},"enablePaste":false,"condensedTableLayout":false,"enableFullScreen":false},"columns":{"DataField::itemNo":{"width":"70px"}}}},"content":{"body":{"sections":{"ReadinessDoc":{"template":"docexchange.ext.fragment.ReadinessDoc","position":{"placement":"After","anchor":"POLineItems"},"title":"Readiness Document","type":"XMLFragment"},"CompletionDoc":{"template":"docexchange.ext.fragment.CompletionDoc","position":{"placement":"After","anchor":"ReadinessDoc"},"title":"Completion Document","type":"XMLFragment"},"DocExchange":{"template":"docexchange.ext.fragment.DocExchange","position":{"placement":"After","anchor":"CompletionDoc"},"title":"Doc Exchange","type":"XMLFragment"}}}}}}}}},"extends":{"extensions":{"sap.ui.controllerExtensions":{"sap.fe.templates.ObjectPage.ObjectPageController":{"controllerName":"docexchange.ext.controller.ObjectC"},"sap.fe.templates.ListReport.ListReportController":{"controllerName":"docexchange.ext.controller.ListReportC"}}}}},"sap.fiori":{"registrationIds":[],"archeType":"transactional"},"sap.cloud":{"public":true,"service":"apr"}}'
});
//# sourceMappingURL=Component-preload.js.map
