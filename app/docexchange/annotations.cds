using MyService as service from '../../srv/service';
annotate service.PODetails with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'vendorNo',
                Value : vendorNo,
            },
            {
                $Type : 'UI.DataField',
                Label : 'orderNumber',
                Value : orderNumber,
            },
            {
                $Type : 'UI.DataField',
                Label : 'vendorName',
                Value : vendorName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'vendorGstin',
                Value : vendorGstin,
            },
            {
                $Type : 'UI.DataField',
                Label : 'CompanyCode',
                Value : CompanyCode,
            },
            {
                $Type : 'UI.DataField',
                Label : 'City',
                Value : City,
            },
            {
                $Type : 'UI.DataField',
                Label : 'TotalValue',
                Value : TotalValue,
            },
            {
                $Type : 'UI.DataField',
                Label : 'poDate',
                Value : poDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'poChangedate',
                Value : poChangedate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'purchOrgName',
                Value : purchOrgName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'poVersion',
                Value : poVersion,
            },
            {
                $Type : 'UI.DataField',
                Label : 'copySupplier',
                Value : copySupplier,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PlantCode',
                Value : PlantCode,
            },
            {
                $Type : 'UI.DataField',
                Label : 'contractNo',
                Value : contractNo,
            },
            {
                $Type : 'UI.DataField',
                Label : 'curr',
                Value : curr,
            },
            {
                $Type : 'UI.DataField',
                Label : 'email',
                Value : email,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Partner Information',
            ID : 'PartnerInformation',
            Target : 'po_povendor/@UI.LineItem#PartnerInformation',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'PO Line Items',
            ID : 'POLineItems',
            Target : 'po_polineitems/@UI.LineItem#POLineItems',
        },],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'orderNumber',
            Value : orderNumber,
        },
        {
            $Type : 'UI.DataField',
            Label : 'vendorNo',
            Value : vendorNo,
        },
        {
            $Type : 'UI.DataField',
            Label : 'vendorName',
            Value : vendorName,
        },
        {
            $Type : 'UI.DataField',
            Label : 'vendorGstin',
            Value : vendorGstin,
        },
        {
            $Type : 'UI.DataField',
            Label : 'CompanyCode',
            Value : CompanyCode,
        },
        {
            $Type : 'UI.DataField',
            Value : copySupplier,
            Label : 'copySupplier',
        },
        {
            $Type : 'UI.DataFieldForIntentBasedNavigation',
            SemanticObject : 'semadv',
            Action : 'display',
            Label : 'Create Invoice',
        },
    ],
);

annotate service.PODetails with @(
    UI.SelectionFields : [
        orderNumber,
        vendorName,
        PlantCode,
    ]
);
annotate service.PODetails with {
    orderNumber @Common.Label : 'orderNumber'
};
annotate service.PODetails with {
    vendorName @Common.Label : 'vendorName'
};
annotate service.PODetails with {
    PlantCode @Common.Label : 'PlantCode'
};
annotate service.PODetails with @(
    UI.HeaderFacets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'General Information',
            ID : 'GeneralInformation',
            Target : '@UI.FieldGroup#GeneralInformation',
        },
    ],
    UI.FieldGroup #GeneralInformation : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : orderNumber,
            },{
                $Type : 'UI.DataField',
                Value : contractNo,
                Label : 'contractNo',
            },{
                $Type : 'UI.DataField',
                Value : vendorName,
            },{
                $Type : 'UI.DataField',
                Value : vendorGstin,
                Label : 'vendorGstin',
            },{
                $Type : 'UI.DataField',
                Value : CompanyCode,
                Label : 'CompanyCode',
            },],
    }
);
 @Capabilities.SearchRestrictions: {
                Searchable: false
              }
annotate service.POVendors with @(
    UI.LineItem #PartnerInformation : [
        {
            $Type : 'UI.DataField',
            Value : email,
            Label : 'email',
        },{
            $Type : 'UI.DataField',
            Value : firstname,
            Label : 'firstname',
        },{
            $Type : 'UI.DataField',
            Value : lastname,
            Label : 'lastname',
        },{
            $Type : 'UI.DataField',
            Value : vendorNo,
            Label : 'vendorNo',
        },]
);
 @Capabilities.SearchRestrictions: {
                Searchable: false
              }
annotate service.POLineItems with @(
    UI.LineItem #POLineItems : [
        {
            $Type : 'UI.DataField',
            Value : itemNo,
            Label : 'itemNo',
        },{
            $Type : 'UI.DataField',
            Value : itemDesc,
            Label : 'itemDesc',
        },{
            $Type : 'UI.DataField',
            Value : itemCondDesc,
            Label : 'itemCondDesc',
        },{
            $Type : 'UI.DataField',
            Value : plant,
            Label : 'plant',
        },{
            $Type : 'UI.DataField',
            Value : unitPrice,
            Label : 'unitPrice',
        },
        {
            $Type : 'UI.DataField',
            Value : lineItemQuant,
            Label : 'lineItemQuant',
        },{
            $Type : 'UI.DataField',
            Value : CgstPercent,
            Label : 'CgstPercent',
        },{
            $Type : 'UI.DataField',
            Value : sgstPercent,
            Label : 'sgstPercent',
        },{
            $Type : 'UI.DataField',
            Value : cgstValue,
            Label : 'cgstValue',
        },{
            $Type : 'UI.DataField',
            Value : sgstValue,
            Label : 'sgstValue',
        },]
);
annotate service.PODetails with @(
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Table View',
    }
);
annotate service.POVendors with @(
    UI.LineItem #tableView : [
        {
            $Type : 'UI.DataField',
            Value : email,
            Label : 'email',
        },],
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Table View POVendors',
    }
);
