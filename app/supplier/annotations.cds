using MyService as service from '../../srv/service';
annotate service.PODetails1 with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Vendor Number',
                Value : vendorNo,
            },
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
                Label : 'Vendor Gstin',
                Value : vendorGstin,
            },
            {
                $Type : 'UI.DataField',
                Label : 'City',
                Value : City,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Company Code',
                Value : CompanyCode,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Total Value',
                Value : TotalValue,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PO Date',
                Value : poDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PO Change Date',
                Value : poChangedate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Purchase Organization  Name',
                Value : purchOrgName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PO Version',
                Value : poVersion,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Copy Supplier',
                Value : copySupplier,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Plant Code',
                Value : PlantCode,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Contract Number',
                Value : contractNo,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Currency',
                Value : curr,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Email',
                Value : email,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Order Number',
            Value : orderNumber,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Vendor No',
            Value : vendorNo,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Vendor Name',
            Value : vendorName,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Vendor Gstin',
            Value : vendorGstin,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Company Code',
            Value : CompanyCode,
        },
    ],
);

annotate service.PODetails1 with @(
    UI.SelectionPresentationVariant #table : {
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
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : email,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'null',
                        },
                    ],
                },],
        },
    }
);
