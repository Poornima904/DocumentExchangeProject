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
            Label : 'Order Number',
            Value : orderNumber,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Vendor Name',
            Value : vendorName,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Company Code',
            Value : CompanyCode,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Vendor No',
            Value : vendorNo,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Vendor Gstin',
            Value : vendorGstin,
        },
        {
            $Type : 'UI.DataField',
            Value : copySupplier,
            Label : 'Copy Supplier',
        },
        {
            $Type : 'UI.DataFieldForIntentBasedNavigation',
            SemanticObject : 'semadv',
            Action : 'display',
            Label : 'Create Invoice',
            Mapping : [
                {
                    $Type : 'Common.SemanticObjectMappingType',
                    SemanticObjectProperty : 'semadv',
                    LocalProperty : orderNumber,
                },
            ],
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
    orderNumber @Common.Label : 'Order Number'
};
annotate service.PODetails with {
    vendorName @Common.Label : 'Vendor Name'
};
annotate service.PODetails with {
    PlantCode @Common.Label : 'Plant Code'
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
                Label : 'Contract No',
            },{
                $Type : 'UI.DataField',
                Value : vendorName,
            },{
                $Type : 'UI.DataField',
                Value : vendorGstin,
                Label : 'Vendor Gstin',
            },{
                $Type : 'UI.DataField',
                Value : CompanyCode,
                Label : 'Company Code',
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
            Label : 'Email',
        },{
            $Type : 'UI.DataField',
            Value : firstname,
            Label : 'First Name',
        },{
            $Type : 'UI.DataField',
            Value : lastname,
            Label : 'Last Name',
        },{
            $Type : 'UI.DataField',
            Value : vendorNo,
            Label : 'Vendor No',
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
            Label : 'Item No',
        },{
            $Type : 'UI.DataField',
            Value : itemDesc,
            Label : 'Item Description',
        },{
            $Type : 'UI.DataField',
            Value : itemCondDesc,
            Label : 'Item Description Condition',
        },{
            $Type : 'UI.DataField',
            Value : plant,
            Label : 'Plant',
        },{
            $Type : 'UI.DataField',
            Value : unitPrice,
            Label : 'Unit Price',
        },
        {
            $Type : 'UI.DataField',
            Value : lineItemQuant,
            Label : 'Quantity',
        },{
            $Type : 'UI.DataField',
            Value : CgstPercent,
            Label : 'Cgst%',
        },{
            $Type : 'UI.DataField',
            Value : sgstPercent,
            Label : 'Sgst%',
        },{
            $Type : 'UI.DataField',
            Value : cgstValue,
            Label : 'Cgst Value',
        },{
            $Type : 'UI.DataField',
            Value : sgstValue,
            Label : 'Sgst Value',
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
