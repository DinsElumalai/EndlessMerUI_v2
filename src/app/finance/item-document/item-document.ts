export class ItemDocument
{
    itemDocumentId : string;
    createdClient : string;
    createdBy : string;
    createdDate : Date;
    updatedBy : string;
    updatedDate : Date;

    documentFor : string;
    documentCategory : string;
    documentPurpose : string;
    documentType : string;
    returnable : string;
    conssiderOrder : string;
    multipleOrder : string;
    requistionType : string;
    requisitionNo : string;
    stockConsidered : string;
    vendorFromTo : string;
    deliveryFromTo : string;
    prefixSpecial : string;
    noofExtraCopy : string;
    documentOurCode : string;
    documentDate : string;
    documentTime : string;
    removalDate : string;
    removalTime : string;
    entranceRegisterId : string;
    vehicleNo : string;
    convertedDocument : string;
    convertedItemDocumentId : string;
    stockCalcMethod : string;
    itemOrderId : string;
    itemId : string;
    processStageNo : string;
    vendorItemNumber : string;
    vendorItemName : string;
    uom : string;
    unitPricePerUOM : string;
    itemOrderScheduleId : string;
    jobworkReductionPercentage : string;
    qtyinNos : string = "";
    qtyinKgs : string = "";
    documentQtyinNos : string = "0";
    documentQtyinKgs : string = "0"; // net wt
    assessableValue : string = "0";
    sgst : string = "0";
    cgst : string = "0";
    igst : string = "0";
    totalValue : string ="0";
    packaging : string;  // dropdown type
    noofPackaging : string; // no of bundles .......
    packagingWt : string = "0";  //gross wt
    hsnsaCode : string;
    hsnsaDescription : string;
    hsnsaRatePercentage : string;
    hsnsaID : string;
    hsnsaRateEffectiveFrom : string;
    orderItemWeightinGms : string;
    vendorItemWeightinGms : string;
    finishedItemWeightinGms : string;
    consumeItemWeightinGms : string;
    freightRate : string;
    freightRateType : string;
    freightValue : string = "0";
    packagingRate : string;
    packagingRateType : string;
    packagingValue : string = "0";
    pfRate : string;
    pfRateType : string;
    pfValue : string = "0";
    tcsPercentage : string;
    tcsValue : string = "0";

    //temp data
    orderNo: string = "";
    orderLineNo: string ="";
    orderNos : string ="";
    orderKgs: string ="";
    vendorItemNameId : string ="";
    
}