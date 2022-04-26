export class Ledger
{
    ledgerId : string;
    createdClient : string;
    createdBy : string;
    createdDate : Date;
    updatedBy : string;
    updatedDate : Date;

    ledgerName : string;
    ledgerNameId : string;
    ledgerDescription : string;
    active : boolean = true;
    inactiveDate : Date;
    inactiveComments : string;
}