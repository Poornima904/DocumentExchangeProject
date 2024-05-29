const cds = require('@sap/cds');
const { insert } = require('@sap/cds/libx/_runtime/hana/execute');
const axios = require('axios');
const { timeStamp } = require('console');
const { workerData } = require('worker_threads');


module.exports = cds.service.impl(async function () {


    let { PODetails, POVendors, POLineItems, Files, Files1, Files2 } = this.entities;

    this.before('CREATE', Files, (req) => {
        debugger
        console.log('Create called')
        console.log(JSON.stringify(req.data))
        req.data.url = `/odata/v4/my/Files(${req.data.ID})/content`
        return req;
    })
    this.before('CREATE', Files1, (req) => {
        debugger
        console.log('Create called')
        console.log(JSON.stringify(req.data))
        req.data.url = `/odata/v4/my/Files1(${req.data.ID})/content`
        return req;
    })
    this.before('CREATE', Files2, (req) => {
        debugger
        console.log('Create called')
        console.log(JSON.stringify(req.data))
        req.data.url = `/odata/v4/my/Files2(${req.data.ID})/content`
        return req;
    })

        // this.before('READ', PODetails, async (req, next) => {
        //     debugger
        //     var BPA = await cds.connect.to('docExchange');
        //     console.log('getcallll started');
        //     let destt = await BPA.get(`/sap/opu/odata/sap/ZMM_PO_DISPLAY_SRV/supplierPOsSet?$filter=(orderNumber eq '' and supplierNo eq '0000001060')`);
        //     console.log("getcall", destt);
        //     console.log("supplierNoo", destt[0].supplierNo)
        //     var arr = [];
        //     console.log("arr", arr);
        //     for (let i = 0; i < destt.length; i++) {
        //         arr.push({
        //             vendorNo: destt[i].supplierNo,
        //             orderNumber: destt[i].orderNumber,
        //             vendorName: destt[i].vendorName,
        //             CompanyCode: destt[i].companyCode,
        //             PlantCode: destt[i].plantCode,
        //             City: destt[i].city,
        //             TotalValue: destt[i].totalValue,
        //             poDate: destt[i].poDate,
        //             poChangedate: destt[i].poChangeDate,
        //             purchOrgName: destt[i].purchOrgName,
        //             poVersion: destt[i].poVersion,
        //             copySupplier: destt[i].copySupplier
        //         })

        //     }
        //     await DELETE.from(PODetails);
        //     var podetailsInserted = await INSERT.into(PODetails, arr);

        //     console.log("podetailsInserted", podetailsInserted)
        //     console.log("getcallll ended");
        //     // return next;

        // })



});