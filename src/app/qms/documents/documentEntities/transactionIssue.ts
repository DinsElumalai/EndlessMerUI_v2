
export class TransactionIssue
{
    issueId : string;
    createdClient : string;
    createdBy : string;
    createdDate : Date;
    updatedBy : string;
    updatedDate : Date;

    docRecPerId : string;
    issueNo : string;
    issueDate : string;
    issueReason : string;
    active : boolean = true;
    inActivedDate : Date;
    inActivatedComments : string;

}