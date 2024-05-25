const cds = require('@sap/cds');
const { insert } = require('@sap/cds/libx/_runtime/hana/execute');
const axios = require('axios');
const { timeStamp } = require('console');
const { workerData } = require('worker_threads');


module.exports = cds.service.impl(async function () {

    
    let { PODetails, POVendors, POLineItems, Files, Files1, Files2} = this.entities;

    this.before('CREATE', Files, (req) => {
        debugger
        console.log('Create called')
        console.log(JSON.stringify(req.data))
        req.data.url = `/odata/v4/my/Files(${req.data.ID})/content`
     // req.data.url = `/odata/v4/my/Files(fileId=${req.data.fileId})/content`

        return req;
    })
    this.before('CREATE', Files1, (req) => {
        debugger
        console.log('Create called')
        console.log(JSON.stringify(req.data))
        req.data.url = `/odata/v4/my/Files1(${req.data.ID})/content`
     // req.data.url = `/odata/v4/my/Files(fileId=${req.data.fileId})/content`

        return req;
    })
    this.before('CREATE', Files2, (req) => {
        debugger
        console.log('Create called')
        console.log(JSON.stringify(req.data))
        req.data.url = `/odata/v4/my/Files2(${req.data.ID})/content`
     // req.data.url = `/odata/v4/my/Files(fileId=${req.data.fileId})/content`

        return req;
    })

});