using {db} from '../db/schema';

service MyService {

    entity PODetails as projection on db.PODetails;
    entity POVendors as projection on db.POVendors;
    @cds.redirection.target
    entity POLineItems as projection on db.POLineItems;
    entity checkedpolineitem as projection on db.POLineItems 
    where checked = 'true';
    entity Files as projection on db.Files;
    entity Files1 as projection on db.Files1;
    entity Files2 as projection on db.Files2;
    entity Invoiceheader as projection on db.Invoiceheader;


    function fm1(vendorNo : String , itemNo : String , type : String) returns String;
    
}