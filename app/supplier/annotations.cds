using MyService as service from '../../srv/service';
annotate service.PODetails1 with @(
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
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
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
