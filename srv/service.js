const cds = require('@sap/cds');
const { insert } = require('@sap/cds/libx/_runtime/hana/execute');
const axios = require('axios');
const { timeStamp } = require('console');
const { workerData } = require('worker_threads');


module.exports = cds.service.impl(async function () {


  let { PODetails, Files3, PODetails1, checkeditem, Invoiceheader, POVendors, POLineItems, Files, Files1, Files2, Comments, checkedpolineitem, Filesseparate } = this.entities;
  this.before('CREATE', Files, (req) => {
    //
    console.log('Create called')
    console.log(JSON.stringify(req.data))
    req.data.url = `/odata/v4/my/Files(${req.data.ID})/content`
    return req;
  })
  this.before('CREATE', Files1, (req) => {
    //
    console.log('Create called')
    console.log(JSON.stringify(req.data))
    req.data.url = `/odata/v4/my/Files1(${req.data.ID})/content`
    return req;
  })
  this.before('CREATE', Files2, (req) => {
    //
    console.log('Create called')
    console.log(JSON.stringify(req.data))
    req.data.url = `/odata/v4/my/Files2(${req.data.ID})/content`
    return req;
  })

  this.before('CREATE', Files3, (req) => {
    //
    console.log('Create called')
    console.log(JSON.stringify(req.data))
    req.data.url = `/odata/v4/my/Files3(${req.data.ID})/content`
    return req;
  })


  this.on('validation', async (req) => {

    //

    let invoice = await SELECT.from(Invoiceheader).where({ invoiceNo: req.data.invoiceno });

    if (invoice.length > 0) {
      return invoice[0].invoiceNo
    }
    else {
      return 1
    }
  })

  this.on('email', async (req) => {

    debugger
    let poline = await SELECT.from(PODetails1).where({ email: req.data.email });

    if (poline) {
      return 1
    }
    else {
      return 0
    }



  })

  this.on('bpatrigger', async (req) => {

    //
    if (req.data.dialogtitle == "Completion Document") {
      var bodyy = {
        "definitionId": process.env.completion,
        "context": {
          "ponumber": `${req.data.poNum}`,
          "vendono": "0000001060",
          "email": `${req.data.email}`
        }
      }
    }
    else {
      var bodyy = {
        "definitionId": process.env.readiness,
        "context": {
          "po": `${req.data.poNum}`,
          "vendorno": "0000001060",
          "email": `${req.data.email}`
        }
      }
    }


    console.log("bpabodyy", bodyy);

    var BPA = await cds.connect.to('BPA_S');
    let response11
    try {
      response11 = await BPA.post("/workflow/rest/v1/workflow-instances", bodyy);
      console.log("testetst")
    } catch (error) {
      console.log("Dest error", error)
    }


    console.log("response11", response11)
  })



  this.on('getcallforsupplier', async (req) => {


    //
    var BPA = await cds.connect.to('docExchange');

    let supplier = await BPA.get(`/sap/opu/odata/sap/ZMM_PO_DISPLAY_SRV/supplierPOsSet?$filter=(orderNumber eq '' and supplierNo eq '0000001060')`);
    console.log("supplier", supplier);

    var arr = [];

    for (let i = 0; i < supplier.length; i++) {
      arr.push({
        vendorNo: supplier[i].supplierNo,
        orderNumber: supplier[i].orderNumber,
        vendorName: supplier[i].vendorName,
        CompanyCode: supplier[i].companyCode,
        City: supplier[i].city,
        TotalValue: supplier[i].totalValue,
        poDate: supplier[i].poDate,
        poChangedate: supplier[i].poChangeDate,
        purchOrgName: supplier[i].purchOrgName,
        poVersion: supplier[i].poVersion,
        copySupplier: 'X',
        PlantCode: supplier[i].plantCode,


      })

    }

    await DELETE.from(PODetails);
    console.log("arr", arr);
    await INSERT.into(PODetails, arr);


  })


  this.on('getcallforpartnerline', async (req, next) => {
    //
    var BPA = await cds.connect.to('docExchange');

    let destt = await BPA.get(`/sap/opu/odata/sap/ZMM_PO_DISPLAY_SRV/PODetailsSet(orderNumber='${req.data.orderNumber}',vendorNo='0000001060')?$expand=POLineItemsSet,POVendorsSet`);
    console.log("getcall", destt);

    var arr = [];

    for (let i = 0; i < destt.POVendorsSet.length; i++) {
      arr.push({
        vendorNo: destt.POVendorsSet[i].vendorNo,
        orderNumber: destt.POVendorsSet[i].orderNumber,
        firstname: destt.POVendorsSet[i].firstname,
        lastname: destt.POVendorsSet[i].lastname,
        email: destt.POVendorsSet[i].email,

      })

    }
    await DELETE.from(POVendors);
    console.log("arr", arr);
    await INSERT.into(POVendors, arr);


    var array = [];

    for (let i = 0; i < destt.POLineItemsSet.length; i++) {
      // var amount = parseFloat(destt.POLineItemsSet[i].unitPrice) * parseFloat(destt.POLineItemsSet[i].lineItemQuant);
      // var am = amount.toString();
      array.push({
        vendorNo: "0000001060",
        itemNo: destt.POLineItemsSet[i].itemNo,
        itemDesc: destt.POLineItemsSet[i].itemDesc,
        itemCondDesc: destt.POLineItemsSet[i].itemCondDesc,
        plant: destt.POLineItemsSet[i].plant,
        lineItemQuant: parseFloat(destt.POLineItemsSet[i].lineItemQuant),
        lineItemQuant_static: parseFloat(destt.POLineItemsSet[i].lineItemQuant),
        unitPrice: parseFloat(destt.POLineItemsSet[i].unitPrice),
        amount: parseFloat(parseFloat(destt.POLineItemsSet[i].unitPrice) * parseFloat(destt.POLineItemsSet[i].lineItemQuant)),
        amount_dynamic: parseFloat(parseFloat(destt.POLineItemsSet[i].unitPrice) * parseFloat(destt.POLineItemsSet[i].lineItemQuant)),
        sgstPercent: parseFloat(destt.POLineItemsSet[i].sgstPercent),
        CgstPercent: parseFloat(destt.POLineItemsSet[i].CgstPercent),
        cgstValue: parseFloat(destt.POLineItemsSet[i].cgstValue),
        cgstValue_static: parseFloat(destt.POLineItemsSet[i].cgstValue),
        sgstValue: parseFloat(destt.POLineItemsSet[i].sgstValue),
        sgstValue_static: parseFloat(destt.POLineItemsSet[i].sgstValue),
        orderNumber: destt.POLineItemsSet[i].orderNumber,
        condType: destt.POLineItemsSet[i].condType,
        conditionValue: destt.POLineItemsSet[i].conditionValue,


      })

      amount = ""

    }
    console.log("array", array);
    await DELETE.from(POLineItems);
    await INSERT.into(POLineItems, array);





  });

  this.on('postcall', async (req) => {
    //
    //
    let poline = await SELECT.from(POLineItems).where({ orderNumber: req.data.poNum, checked: 'true' });

    let header = await SELECT.from(PODetails).where({ orderNumber: req.data.poNum });

    let advancePaymentLineItemsSet = poline.map(item => ({
      ItemNumber: `${item.itemNo}`,
      Itemdescription: `${item.itemDesc}`,
      ItemCondnDesc: `${item.itemCondDesc}`,
      plant: `${item.plant}`,
      lineItemQuantity: `${item.lineItemQuant}`,
      unitPrice: `${item.unitPrice}`,
      TotalValue: `${item.amount}`,
      cgstPerc: `${item.CgstPercent}`,
      sgstPerc: `${item.sgstPercent}`,
      cgstValue: `${item.cgstValue}`,
      sgstValue: `${item.sgstValue}`,
      poNo: `${req.data.poNum}`

    }));

    const currentDate = new Date();
    const year1 = currentDate.getFullYear();
    const month1 = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
    const day1 = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate1 = `${year1}${month1}${day1}`;

    const data =
    {
      "poNo": `${req.data.poNum}`,
      "regId": "",
      "advancePayNo": `${req.data.invoiceno}`,
      "contractNo": `${header[0].contractNo}`,
      "vendorName": `${header[0].vendorName}`,
      "vendorGstin": `${header[0].vendorGstin}`,
      "companyCode": `${header[0].CompanyCode}`,
      "purchasingOrg": `${header[0].purchOrgName}`,
      "advancePayValue": `${req.data.invoicevalue}`,
      "advancePayDate": `${formattedDate1}`,
      "status": "",
      "comment": "",
      "supplierNo": `${header[0].vendorNo}`,
      "curr": "INR",
      "advancePaymentLineItemsSet": advancePaymentLineItemsSet
    };

    var BPA = await cds.connect.to('docExchange');
    let destt = await BPA.post(`/sap/opu/odata/sap/ZMM_ADVANCE_PAY_SRV/AdvancePayRequestSet`, data);
    console.log("desttttt", destt)
    console.log("regId", destt.regId)


    let invoicehead = await INSERT.into(Invoiceheader).entries({

      invoiceNo: req.data.invoiceno,
      orderNumber: req.data.poNum,
      regID: destt.regId,
      contractNumber: header[0].contractNo,
      VendorName: header[0].vendorName,
      VendorGSTIN: header[0].vendorGstin,
      companyCode: header[0].CompanyCode,
      purchasingOrg: header[0].purchOrgName,
      invoiceDate: req.data.invoicedate,
      invoiceValue: req.data.invoicevalue,
      status: "Submitted",
      status_criticality: 2,

    });

    console.log("invoicehead", invoicehead);

    console.log("success");

    var arr = [];

    for (let i = 0; i < poline.length; i++) {
      arr.push({
        itemno1: poline[i].itemNo,
        registration_id1: destt.regId,
        itemDesc1: poline[i].itemDesc,
        itemCondDesc1: poline[i].itemCondDesc,
        plant1: poline[i].plant,
        lineItemQuant1: poline[i].lineItemQuant,
        lineItemQuant_static1: poline[i].lineItemQuant,
        unitPrice1: poline[i].unitPrice,
        amount1: poline[i].amount,
        amount_dynamic1: poline[i].amount_dynamic,
        sgstPercent1: poline[i].sgstPercent,
        CgstPercent1: poline[i].CgstPercent,
        cgstValue1: poline[i].cgstValue,
        cgstValue_static1: poline[i].cgstValue,
        sgstValue1: poline[i].sgstValue,
        sgstValue_static1: poline[i].sgstValue,
        orderNumber1: poline[i].orderNumber,
        condType1: poline[i].condType,
        conditionValue1: poline[i].conditionValue,


      })

    }

    console.log("arr", arr);
    await INSERT.into(checkeditem, arr);

    let checkfalse = await UPDATE(POLineItems).set({ checked: 'false' });

    /////////////
    let updatefile = await UPDATE(Files3).set({ regID: destt.regId }).where({ orderNumber: req.data.poNum, regID: "test" });
    console.log("updatinf files3 attachments", updatefile)



    return destt.regId


  })


  this.on('fm1', async (req, next) => {
    //
    if (req.data.type == 'checked') {
      await UPDATE(POLineItems).set({ checked: 'true' }).where({ itemno: req.data.itemNo, orderNumber: req.data.orderNumber });
      let table = await SELECT.from(POLineItems).where({ itemno: req.data.itemNo, orderNumber: req.data.orderNumber });
      return 'true', table;
    }
    else {
      await UPDATE(POLineItems).set({ checked: 'false' }).where({ itemno: req.data.itemNo, orderNumber: req.data.orderNumber });
      //   let update = await UPDATE(polineitem).set({ amount: table[0].amount_value_static, sgst_value: table[0].sgst_value_static, cgst_value: table[0].cgst_value_static, quantity: table[0].quantity_static }).where({ itemno: req.data.content, vendorNo: req.data.id });
      let table = await SELECT.from(POLineItems).where({ itemno: req.data.itemNo, orderNumber: req.data.orderNumber });
      return 'false', table;
    }

  });



  this.on('fm2', async (req, next) => {
    //
    let table = await SELECT.from(checkedpolineitem).where({ vendorNo: req.data.poNum, itemNo: req.data.itemId });
    var quantity = parseFloat(table[0].lineItemQuant);
    var unit_price = parseFloat(table[0].unitPrice);
    var amounts = parseFloat(quantity * unit_price);
    var cgst_val = parseFloat((table[0].CgstPercent * amounts) / 100);
    var sgst_val = parseFloat((table[0].sgstPercent * amounts) / 100);
    var afterUpdate = await UPDATE(checkedpolineitem).set({ amount_dynamic: amounts, cgstValue: cgst_val, sgstValue: sgst_val }).where({ orderNumber: req.data.poNum, itemNo: req.data.itemId });

    let updatedtable = await SELECT.from(checkedpolineitem).where({ orderNumber: req.data.poNum, itemNo: req.data.itemId });
    // let table_1 = await SELECT.from(checkedpolineitem).where({ vendorNo : req.data.poNum});
    // for (let i = 0; i < table_1.length; i++) {
    //   table_1[i].cgst_percentage;
    // }  
    return JSON.stringify(updatedtable);
  });
  this.on('cgst', async (req, next) => {
    // //
    let table = await SELECT.from(checkedpolineitem).where({ orderNumber: req.data.poNum, itemNo: req.data.itemId });
    if (table) {
      await UPDATE(checkedpolineitem).set({ cgst_value: parseFloat(req.data.cgst), sgst_value: parseFloat(req.data.sgst) }).where({ orderNumber: req.data.poNum, itemNo: req.data.itemId })
    }
  });




  this.on('fm3', async (req) => {

    let table = await SELECT.from(POLineItems).where({ orderNumber: req.data.poNum, itemno: req.data.itemId });
    return JSON.stringify(table);
  });

  this.on('storingComments', async (req) => {
    //
    await INSERT.into(Comments).entries({ orderNumber: req.data.orderNumber, textArea: req.data.textArea });
  });

  this.on('checkboxSuppplerEmail', async (req) => {
    //
    let supplierEmails = await SELECT.from(POVendors).where({ vendorNo: req.data.vendorNo });
    console.log("emails", supplierEmails);
    return supplierEmails;

  });
  this.on('UpdateSupplierEmail', async (req) => {

    debugger

    // let updateEmailFiles2 = await UPDATE(Files2).set({ SupplierEmail: req.data.email }).where({ orderNumber: req.data.orderNumber });
    let podeatail = await SELECT.from(PODetails).where({ orderNumber: req.data.orderNumber });
    let filesSep = await SELECT.from(Files2).where({ orderNumber: req.data.orderNumber }).orderBy ({ref:['modifiedAt'],sort:'desc'}).limit(1);

    let emailArray = JSON.parse(req.data.Separate_email);

    for (let i = 0; i < emailArray.length; i++) {
    let podeatail13 = await SELECT.from(PODetails1).where({ orderNumber: req.data.orderNumber,email:emailArray[i]});
    if(podeatail13.length == 0){
     
        await INSERT.into(PODetails1).entries({
          orderNumber: req.data.orderNumber,
          vendorNo: req.data.vendorNo,
          email: emailArray[i]
  
        });
      }
      
    }

  for (let i = 0; i < emailArray.length; i++) {
  await INSERT.into(Filesseparate).entries({
    mediaType: filesSep[0].mediaType,
    fileName: filesSep[0].mediaType,
    size: filesSep[0].size,
    url :filesSep[0].url,
    content:filesSep[0].content,
    orderNumber: req.data.orderNumber,
    email: emailArray[i]

  })
}

    console.log("podetails1 inserted");

  });



});