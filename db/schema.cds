namespace db;

using {
    cuid,
    managed
} from '@sap/cds/common';

entity PODetails {
    key vendorNo       : String;
    key orderNumber    : String;
        vendorName     : String;
        vendorGstin    : String;
        CompanyCode    : String;
        City           : String;
        TotalValue     : String;
        poDate         : String;
        poChangedate   : String;
        purchOrgName   : String;
        poVersion      : String;
        copySupplier   : String;
        PlantCode      : String;
        contractNo     : String;
        curr           : String;
        email          : String;
        po_povendor    : Composition of many POVendors
                             on po_povendor.povenodor = $self;
        po_polineitems : Composition of many POLineItems
                             on po_polineitems.polineitems = $self;
        po_files       : Composition of many Files
                             on po_files.files = $self;
        po_files1      : Composition of many Files1
                             on po_files1.files1 = $self;
        po_files2      : Composition of many Files2
                             on po_files2.files2 = $self;
        po_comments    : Composition of many Comments
                             on po_comments.comment1 = $self;

}

entity POVendors {
    key POVendorsid    : UUID;
    key vendorNo       : String;
        orderNumber    : String;
        firstname      : String;
        lastname       : String;
        email          : String;
        povenodor      : Association to one PODetails
                             on povenodor.vendorNo = vendorNo;
        invoicevendors : Association to one Invoiceheader
                             on invoicevendors.orderNumber = orderNumber;
        povenodor1     : Association to one PODetails1
                             on povenodor1.vendorNo = vendorNo;
}

entity POLineItems {
    key vendorNo             : String;
    key itemNo               : String;
        itemDesc             : String;
        itemCondDesc         : String;
        plant                : String;
        lineItemQuant        : Decimal(10, 2);
        lineItemQuant_static : Decimal(10, 2);
        unitPrice            : Decimal(10, 2);
        TotalValue           : Decimal(10, 2);
        CgstPercent          : Decimal(10, 2);
        sgstPercent          : Decimal(10, 2);
        cgstValue            : Decimal(10, 2);
        cgstValue_static     : Decimal(10, 2);
        sgstValue            : Decimal(10, 2);
        sgstValue_static     : Decimal(10, 2);
        orderNumber          : String;
        condType             : String;
        amount               : Decimal(10, 2);
        amount_dynamic       : Decimal(10, 2);
        conditionValue       : String;
        checked              : String;
        polineitems          : Association to one PODetails
                                   on polineitems.vendorNo = vendorNo;
        polineitems1         : Association to one PODetails1
                                   on polineitems1.vendorNo = vendorNo;
}

entity Files : cuid, managed {
    vendorNo           : String;
    orderNumber        : String;

    @Core.MediaType  : mediaType
    content            : LargeBinary;

    @Core.IsMediaType: true
    mediaType          : String;
    fileName           : String;
    size               : Integer;
    url                : String;
    status             : String;
    status_criticality : Integer;
    files              : Association to one PODetails
                             on files.vendorNo = vendorNo;
}

entity Files1 : cuid, managed {
    vendorNo           : String;
    orderNumber        : String;

    @Core.MediaType  : mediaType
    content            : LargeBinary;

    @Core.IsMediaType: true
    mediaType          : String;
    fileName           : String;
    size               : Integer;
    url                : String;
    status             : String;
    status_criticality : Integer;
    files1             : Association to one PODetails
                             on files1.vendorNo = vendorNo;
}

entity Files2 : cuid, managed {
    vendorNo      : String;
    orderNumber   : String;

    @Core.MediaType  : mediaType
    content       : LargeBinary;

    @Core.IsMediaType: true
    mediaType     : String;
    fileName      : String;
    size          : Integer;
    url           : String;
    files2        : Association to one PODetails
                        on files2.vendorNo = vendorNo;
  
}
entity Filesseparate : cuid, managed {
    vendorNo      : String;
    orderNumber   : String;

    @Core.MediaType  : mediaType
    content       : LargeBinary;

    @Core.IsMediaType: true
    mediaType     : String;
    fileName      : String;
    size          : Integer;
    url           : String;
    email : String;

     Filesseparate_to_podetails1        : Association to one PODetails1
                        on Filesseparate_to_podetails1.email = email;


   
}

entity Files3 : cuid, managed {
    vendorNo    : String;
    orderNumber : String;
    regID       : String;


    @Core.MediaType  : mediaType
    content     : LargeBinary;

    @Core.IsMediaType: true
    mediaType   : String;
    fileName    : String;
    size        : Integer;
    url         : String;
    files3      : Association to one Invoiceheader
                      on files3.orderNumber = orderNumber;
}

entity Invoiceheader {
    key orderNumber        : String;
    key regID              : String;
        invoiceNo          : String;
        contractNumber     : String;
        VendorName         : String;
        VendorGSTIN        : String;
        companyCode        : String;
        plantCode          : String;
        purchasingOrg      : String;
        invoiceDate        : String;
        invoiceValue       : String;
        status             : String;
        status_criticality : Integer;
        comment            : String;
        po_to_checkeditem  : Composition of many checkeditem
                                 on po_to_checkeditem.checkeditem_to_po = $self;
        invoice_povendor   : Composition of many POVendors
                                 on invoice_povendor.invoicevendors = $self;
        invoice_files3     : Composition of many Files3
                                 on invoice_files3.files3 = $self;
}

entity Comments {
    key commentId : UUID;
        vendorNo  : String;
        textArea  : String;
        comment1  : Association to one PODetails
                        on comment1.vendorNo = vendorNo;

}

entity checkeditem {
    key itemno1               : String;
    key registration_id1      : String;
        itemDesc1             : String;
        itemCondDesc1         : String;
        plant1                : String;
        lineItemQuant1        : Decimal(10, 2);
        lineItemQuant_static1 : Decimal(10, 2);
        unitPrice1            : Decimal(10, 2);
        TotalValue1           : Decimal(10, 2);
        CgstPercent1          : String;
        sgstPercent1          : String;
        cgstValue1            : Decimal(10, 2);
        cgstValue_static1     : Decimal(10, 2);
        sgstValue1            : Decimal(10, 2);
        sgstValue_static1     : Decimal(10, 2);
        orderNumber1          : String;
        condType1             : String;
        amount1               : Decimal(10, 2);
        amount_dynamic1       : Decimal(10, 2);
        conditionValue1       : String;
        checkeditem_to_po     : Association to one Invoiceheader
                                    on checkeditem_to_po.regID = registration_id1;

}

entity PODetails1 {
    key poid :UUID;
    key vendorNo        : String;
    key orderNumber     : String;
        vendorName      : String;
        vendorGstin     : String;
        CompanyCode     : String;
        City            : String;
        TotalValue      : String;
        poDate          : String;
        poChangedate    : String;
        purchOrgName    : String;
        poVersion       : String;
        copySupplier    : String;
        PlantCode       : String;
        contractNo      : String;
        curr            : String;
        email           : String;
        po_povendor1    : Composition of many POVendors
                              on po_povendor1.povenodor1 = $self;
        po_polineitems1 : Composition of many POLineItems
                              on po_polineitems1.polineitems1 = $self;

        podetails1_to_fileseparate      : Composition of many Filesseparate
                              on podetails1_to_fileseparate.email = email ;


}
