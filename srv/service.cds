using {db} from '../db/schema';

service MyService {

    entity PODetails as projection on db.PODetails;
    entity POVendors as projection on db.POVendors;
    entity POLineItems as projection on db.POLineItems;
    entity Files as projection on db.Files;
}