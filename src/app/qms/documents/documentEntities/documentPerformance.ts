export class DocumentPerformance
{
    docRecPerformanceId : number;
    createdClient : string = "";
    createdBy : string = "";
    createdDate : Date;
    updatedBy : string = "";
    updatedDate : Date;

    type : string = "";
    typeDepartmentName : string = "";
    typeNo : string = "";
    typePurpose : string = "";
    implementedOn : Date = new Date();
    implementedBy : string = "";
    fileLocation : string = "";
    kpiRequired : boolean;
    kpiValueMustBe : string = "";
    retensionMonth : string = "";
    retainedLocation : string = "";
    active : boolean = true;
    inActivatedDate : Date;
    inActivatedComments : string = "";

}