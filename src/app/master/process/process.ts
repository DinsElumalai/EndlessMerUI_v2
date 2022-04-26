export class Process
{
    processId : string;
    createdClient : string;
    createdBy : string;
    createdDate : Date;
    updatedBy : string;
    updatedDate : Date;

    processName : string;
    processNameId : string;
    processDescription : string;
    active : boolean = true;
    inactiveDate : Date;
    inactiveComments : string;
}