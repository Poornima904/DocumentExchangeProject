namespace db;
using { cuid,managed } from '@sap/cds/common';

entity PODetails{
    key vendorNo : String;
    key orderNumber: String;
    vendorName :String;
    vendorGstin :String;
    CompanyCode : String;
    City : String;
    TotalValue : String;
    poDate : String;
    poChangedate : String;
    purchOrgName : String;
    poVersion : String;
    copySupplier: String;
     PlantCode : String;
     contractNo : String;
     curr: String;
     email: String;
    po_povendor : Composition of many POVendors
                                on po_povendor.povenodor = $self;
    po_polineitems : Composition of many POLineItems
                                on po_polineitems.polineitems = $self;
    po_files : Composition of many Files on po_files.files = $self;
    po_files1 : Composition of many Files1 on po_files1.files1 = $self;
    po_files2 : Composition of many Files2 on po_files2.files2 = $self;
    
}
entity POVendors{
    key vendorNo : String;
    orderNumber : String;
    firstname : String;
    lastname : String;
    email : String;
    povenodor : Association to one PODetails
                                    on povenodor.vendorNo = vendorNo;
}
entity POLineItems{
    key vendorNo : String; 
    key itemNo : String;
    itemDesc: String; 
    itemCondDesc: String;
    plant: String;
    lineItemQuant: String;
    unitPrice: String;
    TotalValue: String;
    CgstPercent: String;
    sgstPercent: String;
    cgstValue: String;
    sgstValue: String;
    orderNumber: String;
    condType: String;
    amount: String;
    conditionValue: String;
    polineitems : Association to one PODetails
                                    on polineitems.vendorNo = vendorNo;
}
entity Files : cuid, managed {
        vendorNo : String;
        @Core.MediaType  : mediaType
        content        : LargeBinary;
        @Core.IsMediaType: true
        mediaType      : String;
        fileName       : String;
        size           : Integer;
        url            : String;
        files          : Association to one PODetails
                             on files.vendorNo = vendorNo;
}
entity Files1 : cuid, managed {
        vendorNo : String;
        @Core.MediaType  : mediaType
        content        : LargeBinary;
        @Core.IsMediaType: true
        mediaType      : String;
        fileName       : String;
        size           : Integer;
        url            : String;
        files1          : Association to one PODetails
                             on files1.vendorNo = vendorNo;
}
entity Files2 : cuid, managed {
        vendorNo : String;
        @Core.MediaType  : mediaType
        content        : LargeBinary;
        @Core.IsMediaType: true
        mediaType      : String;
        fileName       : String;
        size           : Integer;
        url            : String;
        files2          : Association to one PODetails
                             on files2.vendorNo = vendorNo;
}

