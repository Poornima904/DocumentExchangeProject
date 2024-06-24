//@ui5-bundle supplier/Component-preload.js
sap.ui.require.preload({
	"supplier/Component.js":function(){
sap.ui.define(["sap/fe/core/AppComponent"],function(e){"use strict";return e.extend("supplier.Component",{metadata:{manifest:"json"}})});
},
	"supplier/ext/controller/Listreport.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/ControllerExtension"],function(e){"use strict";return e.extend("supplier.ext.controller.Listreport",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel()},routing:{onBeforeBinding:async function(e){debugger;var t=(new sap.ushell.services.UserInfo).getEmail();let i="email";let r=this.getView().getModel().bindContext(`/${i}(...)`);r.setParameter("email",t);await r.execute();debugger;let n=r.getBoundContext();let s=n.getValue();let l=s.value;if(l==1){var o=sap.ui.getCore().byId("supplier::PODetails1List--fe::FilterBar::PODetails1").getFilterConditions();o.email[0].values[0]=t;sap.ui.getCore().byId("supplier::PODetails1List--fe::FilterBar::PODetails1").setFilterConditions(o)}}}}})});
},
	"supplier/ext/controller/Objc.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/ControllerExtension"],function(e){"use strict";return e.extend("supplier.ext.controller.Objc",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel()},routing:{onAfterBinding:async function(e){debugger;var t=(new sap.ushell.services.UserInfo).getEmail();debugger;var i=sap.ui.getCore().byId("supplier::PODetails1ObjectPage--fe::CustomSubSection::DocAttach--uploadSet").mBindingInfos.items.binding;i.filter(new sap.ui.model.Filter({path:"email",operator:sap.ui.model.FilterOperator.EQ,value1:t}));i.refresh()}}}})});
},
	"supplier/ext/fragment/DocAttach.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core" xmlns="sap.m" xmlns:macros="sap.fe.macros" displayBlock="true"\nxmlns:mvc="sap.ui.core.mvc" xmlns:upload="sap.m.upload"><VBox id="11"><upload:UploadSet\n\t\t\t\t\tid="uploadSet"\n\t\t\t\t\tinstantUpload="false"\n\t\t\t\t\tuploadEnabled="false"\n\t\t\t\t\tshowIcons="true"\n\t\t\t\t\tmode="None"\n\t\t\t\t\tuploadButtonInvisible="true"\n\t\t\t\t\tafterItemAdded="handler.onAfterItemAdded"\n\t\t\t\t\tuploadCompleted="handler.onUploadCompleted"\n\t\t\t\t\titems="{\n\t\t\t\t\t\t\t\tpath: \'/Filesseparate\',\n\t\t\t\t\t\t\t\tparameters: {\n\t\t\t\t\t\t\t\t\t$orderby: \'createdAt desc\'\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\ttemplateShareable: false}"><upload:toolbar></upload:toolbar><upload:items><upload:UploadSetItem\n\t\t\t\t\t\tid="ddd"\n\t\t\t\t\t\t\tfileName="{fileName}"\n\t\t\t\t\t\t\tmediaType="{mediaType}"\n\t\t\t\t\t\t\turl="{url}"\n\t\t\t\t\t\t\tthumbnailUrl="{\n\t\t\t\t\t\t\t\tpath: \'/mediaType\',\n\t\t\t\t\t\t\t\tformatter: \'handler.formatThumbnailUrl\'\n\t\t\t\t\t\t\t}"\n\t\t\t\t\t\t\tenabledEdit="false"\n\t\t\t\t\t\t\tvisibleEdit="false"\n\t\t\t\t\t\t\tvisibleRemove="false"\n\t\t\t\t\t\t\topenPressed="handler.onOpenPressed"\n\t\t\t\t\t\t\tremovePressed="handler.onRemovePressed"><upload:attributes><ObjectAttribute\n\t\t\t\t\t\t\t\tid="dd"\n\t\t\t\t\t\t\t\t\ttitle="Uploaded By"\n\t\t\t\t\t\t\t\t\ttext="{createdBy}"\n\t\t\t\t\t\t\t\t\tactive="false"\n\t\t\t\t\t\t\t\t/><ObjectAttribute\n\t\t\t\t\t\t\t\tid="dd22"\n\t\t\t\t\t\t\t\t\ttitle="Uploaded on"\n\t\t\t\t\t\t\t\t\ttext="{createdAt}"\n\t\t\t\t\t\t\t\t\tactive="false"\n\t\t\t\t\t\t\t\t/><ObjectAttribute\n\t\t\t\t\t\t\t\tid="dddw2"\n\n\t\t\t\t\t\t\t\t\ttitle="File Type"\n\t\t\t\t\t\t\t\t\ttext="{mediaType}"\n\t\t\t\t\t\t\t\t\tactive="false"\n\t\t\t\t\t\t\t\t/><ObjectAttribute\n\t\t\t\t\t\t\t\tid="dd22a"\n\t\t\t\t\t\t\t\t\ttitle="File Size"\n\t\t\t\t\t\t\t\t\ttext="{size}"\n\t\t\t\t\t\t\t\t\tactive="false"\n\t\t\t\t\t\t\t\t/></upload:attributes></upload:UploadSetItem></upload:items></upload:UploadSet></VBox></core:FragmentDefinition>',
	"supplier/i18n/i18n.properties":'# This is the resource bundle for supplier\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=supplier\n\n#YDES: Application description\nappDescription=An SAP Fiori application.\n\n#XFLD,24\nflpTitle=supplier\n',
	"supplier/manifest.json":'{"_version":"1.59.0","sap.app":{"id":"supplier","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:lrop","version":"1.13.6","toolsId":"d5e105fe-42a1-4de4-84d3-d2a7733c08bd"},"dataSources":{"mainService":{"uri":"odata/v4/my/","type":"OData","settings":{"annotations":[],"odataVersion":"4.0"}}},"crossNavigation":{"inbounds":{"supplier-display":{"semanticObject":"supplier","action":"display","title":"{{flpTitle}}","signature":{"parameters":{},"additionalParameters":"allowed"}}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.125.1","libs":{"sap.m":{},"sap.ui.core":{},"sap.ushell":{},"sap.fe.templates":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"supplier.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}},"@i18n":{"type":"sap.ui.model.resource.ResourceModel","uri":"i18n/i18n.properties"}},"resources":{"css":[]},"routing":{"config":{},"routes":[{"pattern":":?query:","name":"PODetails1List","target":"PODetails1List"},{"pattern":"PODetails1({key}):?query:","name":"PODetails1ObjectPage","target":"PODetails1ObjectPage"}],"targets":{"PODetails1List":{"type":"Component","id":"PODetails1List","name":"sap.fe.templates.ListReport","options":{"settings":{"contextPath":"/PODetails1","variantManagement":"Page","navigation":{"PODetails1":{"detail":{"route":"PODetails1ObjectPage"}}},"controlConfiguration":{"@com.sap.vocabularies.UI.v1.LineItem":{"tableSettings":{"type":"ResponsiveTable"}}},"defaultTemplateAnnotationPath":"com.sap.vocabularies.UI.v1.SelectionPresentationVariant#table"}}},"PODetails1ObjectPage":{"type":"Component","id":"PODetails1ObjectPage","name":"sap.fe.templates.ObjectPage","options":{"settings":{"editableHeaderContent":false,"contextPath":"/PODetails1","content":{"body":{"sections":{"DocAttach":{"template":"supplier.ext.fragment.DocAttach","position":{"placement":"After","anchor":"GeneratedFacet1"},"title":"Doc Exchange"}}}}}}}}},"extends":{"extensions":{"sap.ui.controllerExtensions":{"sap.fe.templates.ObjectPage.ObjectPageController":{"controllerName":"supplier.ext.controller.Objc"},"sap.fe.templates.ListReport.ListReportController":{"controllerName":"supplier.ext.controller.Listreport"}}}}},"sap.fiori":{"registrationIds":[],"archeType":"transactional"},"sap.cloud":{"public":true,"service":"apr"}}'
});
//# sourceMappingURL=Component-preload.js.map
