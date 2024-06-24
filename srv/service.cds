using {db} from '../db/schema';

service MyService {

    entity PODetails as projection on db.PODetails;
    entity PODetails1 as projection on db.PODetails1;
    entity POVendors as projection on db.POVendors;
    @cds.redirection.target
    entity POLineItems as projection on db.POLineItems;
    entity checkedpolineitem as projection on db.POLineItems 
    where checked = 'true';
    entity Files as projection on db.Files;
    entity Files1 as projection on db.Files1;
    entity Files2 as projection on db.Files2;
    entity Files3 as projection on db.Files3;
    entity Filesseparate as projection on db.Filesseparate;

    entity Invoiceheader as projection on db.Invoiceheader;
    entity Comments as projection on db.Comments;


    function fm1(orderNumber : String , itemNo : String , type : String) returns String;
    function fm2(poNum : String , itemId : String , quantity : String , unitPrice : String , sgst_value : String , cgst_value : String) returns String;
    function fm3(poNum : String , itemId : String ) returns String;


    function validation(invoiceno : String ) returns String;
    function email(email : String ) returns String;

    function bpatrigger(email : String,poNum : String,dialogtitle : String ) returns String;
    function getcallforsupplier(vendorno : String ) returns String;
    function getcallforpartnerline(orderNumber : String ) returns String;
    function postcall(invoiceno : String,invoicedate : String ,invoicevalue : String,poNum : String) returns String;

    function storingComments(vendorNo : String, textArea : String) returns String;
    function checkboxSuppplerEmail(vendorNo : String) returns Array of String;
    function UpdateSupplierEmail(vendorNo : String, orderNumber: String, email: String,Separate_email : String) returns String;
    

    
}