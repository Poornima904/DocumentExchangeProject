using MyService as service from '../../srv/service';
using from '../../db/schema';

annotate service.Invoiceheader with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : PoNumber,
            Label : 'PoNumber',
        },
        {
            $Type : 'UI.DataField',
            Value : regID,
            Label : 'Registration Id',
        },
        {
            $Type : 'UI.DataField',
            Value : invoiceDate,
            Label : 'Invoice Date',
        },
        {
            $Type : 'UI.DataField',
            Value : contractNumber,
            Label : 'Contract Number',
        },
        {
            $Type : 'UI.DataField',
            Value : companyCode,
            Label : 'Company Code',
        },
        {
            $Type : 'UI.DataField',
            Value : comment,
            Label : 'Comment',
        },
        {
            $Type : 'UI.DataField',
            Value : plantCode,
            Label : 'Plant Code',
        },
        {
            $Type : 'UI.DataField',
            Value : invoiceValue,
            Label : 'Invoice Value',
        },
        {
            $Type : 'UI.DataField',
            Value : invoiceNo,
            Label : 'Invoice No',
        },
        {
            $Type : 'UI.DataField',
            Value : status,
            Label : 'Status',
        },
        {
            $Type : 'UI.DataField',
            Value : status_criticality,
            Label : 'Status Criticality',
        },
        {
            $Type : 'UI.DataField',
            Value : VendorGSTIN,
            Label : 'Vendor Gstin',
        },
        {
            $Type : 'UI.DataField',
            Value : VendorName,
            Label : 'Vendor Name',
        },
    ]
);
annotate service.Invoiceheader with @(
    UI.HeaderFacets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'form1',
            Target : '@UI.FieldGroup#form1',
        },
    ],
    UI.FieldGroup #form1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : VendorName,
                Label : 'VendorName',
            },{
                $Type : 'UI.DataField',
                Value : VendorGSTIN,
                Label : 'VendorGSTIN',
            },],
    }
);
annotate service.Invoiceheader with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Invoice Header',
            ID : 'InvoiceHeader',
            Target : '@UI.FieldGroup#InvoiceHeader',
        },
    ],
    UI.FieldGroup #InvoiceHeader : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : invoiceNo,
                Label : 'invoiceNo',
            },{
                $Type : 'UI.DataField',
                Value : invoiceDate,
                Label : 'invoiceDate',
            },{
                $Type : 'UI.DataField',
                Value : invoiceValue,
                Label : 'invoiceValue',
            },],
    }
);
annotate service.checkeditem with @(
    UI.LineItem #PartnerInformation : [
        {
            $Type : 'UI.DataField',
            Value : checkeditem_to_po.invoice_povendor.email,
            Label : 'email',
        },{
            $Type : 'UI.DataField',
            Value : checkeditem_to_po.invoice_povendor.firstname,
            Label : 'firstname',
        },{
            $Type : 'UI.DataField',
            Value : checkeditem_to_po.invoice_povendor.lastname,
            Label : 'lastname',
        },{
            $Type : 'UI.DataField',
            Value : checkeditem_to_po.invoice_povendor.vendorNo,
            Label : 'vendorNo',
        },]
);

annotate service.Invoiceheader with @(Capabilities.Deletable: false);

annotate service.checkeditem with @(
    UI.LineItem #InvoiceListItems : [
        {
            $Type : 'UI.DataField',
            Value : checkeditem_to_po.po_to_checkeditem.checkeditem_to_po.po_to_checkeditem.itemno1,
            Label : 'itemno1',
        },{
            $Type : 'UI.DataField',
            Value : checkeditem_to_po.po_to_checkeditem.checkeditem_to_po.po_to_checkeditem.itemDesc1,
            Label : 'itemDesc1',
        },{
            $Type : 'UI.DataField',
            Value : checkeditem_to_po.po_to_checkeditem.checkeditem_to_po.po_to_checkeditem.itemCondDesc1,
            Label : 'itemCondDesc1',
        },{
            $Type : 'UI.DataField',
            Value : checkeditem_to_po.po_to_checkeditem.checkeditem_to_po.po_to_checkeditem.condType1,
            Label : 'condType1',
        },{
            $Type : 'UI.DataField',
            Value : checkeditem_to_po.po_to_checkeditem.checkeditem_to_po.po_to_checkeditem.conditionValue1,
            Label : 'conditionValue1',
        },{
            $Type : 'UI.DataField',
            Value : checkeditem_to_po.po_to_checkeditem.checkeditem_to_po.po_to_checkeditem.cgstValue1,
            Label : 'cgstValue1',
        },{
            $Type : 'UI.DataField',
            Value : checkeditem_to_po.po_to_checkeditem.checkeditem_to_po.po_to_checkeditem.cgstValue_static1,
            Label : 'cgstValue_static1',
        },{
            $Type : 'UI.DataField',
            Value : checkeditem_to_po.po_to_checkeditem.checkeditem_to_po.po_to_checkeditem.CgstPercent1,
            Label : 'CgstPercent1',
        },{
            $Type : 'UI.DataField',
            Value : checkeditem_to_po.po_to_checkeditem.checkeditem_to_po.po_to_checkeditem.amount1,
            Label : 'amount1',
        },{
            $Type : 'UI.DataField',
            Value : checkeditem_to_po.po_to_checkeditem.checkeditem_to_po.po_to_checkeditem.amount_dynamic1,
            Label : 'amount_dynamic1',
        },{
            $Type : 'UI.DataField',
            Value : checkeditem_to_po.po_to_checkeditem.checkeditem_to_po.po_to_checkeditem.lineItemQuant_static1,
            Label : 'lineItemQuant_static1',
        },{
            $Type : 'UI.DataField',
            Value : checkeditem_to_po.po_to_checkeditem.checkeditem_to_po.po_to_checkeditem.lineItemQuant1,
            Label : 'lineItemQuant1',
        },{
            $Type : 'UI.DataField',
            Value : checkeditem_to_po.po_to_checkeditem.checkeditem_to_po.po_to_checkeditem.orderNumber1,
            Label : 'orderNumber1',
        },{
            $Type : 'UI.DataField',
            Value : checkeditem_to_po.po_to_checkeditem.checkeditem_to_po.po_to_checkeditem.plant1,
            Label : 'plant1',
        },{
            $Type : 'UI.DataField',
            Value : checkeditem_to_po.po_to_checkeditem.checkeditem_to_po.po_to_checkeditem.registration_id1,
            Label : 'registration_id1',
        },{
            $Type : 'UI.DataField',
            Value : checkeditem_to_po.po_to_checkeditem.checkeditem_to_po.po_to_checkeditem.sgstPercent1,
            Label : 'sgstPercent1',
        },{
            $Type : 'UI.DataField',
            Value : checkeditem_to_po.po_to_checkeditem.checkeditem_to_po.po_to_checkeditem.sgstValue_static1,
            Label : 'sgstValue_static1',
        },{
            $Type : 'UI.DataField',
            Value : checkeditem_to_po.po_to_checkeditem.checkeditem_to_po.po_to_checkeditem.sgstValue1,
            Label : 'sgstValue1',
        },{
            $Type : 'UI.DataField',
            Value : checkeditem_to_po.po_to_checkeditem.checkeditem_to_po.po_to_checkeditem.TotalValue1,
            Label : 'TotalValue1',
        },{
            $Type : 'UI.DataField',
            Value : checkeditem_to_po.po_to_checkeditem.checkeditem_to_po.po_to_checkeditem.unitPrice1,
            Label : 'unitPrice1',
        },]
);
