import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { ItemDocument } from '../item-document';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { ApiHelper } from '../../../services/apiHelper';
import { ApiUrls } from '../../../services/api.urls';
import { Vendor } from '../../../master/vendor/vendor';
import { Item } from '../../../master/item/item';
import { ItemOrder } from '../../../marketing/item-order/item-order';
import { ItemOrderSchedule } from '../../../marketing/item-order-schedule/itemOrderSchedule';
import { HelperService } from '../../../services/helperService';


@Component({
  selector: 'app-additemdocument',
  templateUrl: './additemdocument.component.html',
  styleUrls: ['./additemdocument.component.scss']
})
export class AdditemdocumentComponent implements OnInit {


  constructor(private modalService: NgbModal, 
    private apiService : ApiHelper, private helperService : HelperService) 
  {
    
   }

  ngOnInit(): void {

    this.newEntry = new ItemDocument();
    this.newEntry.documentCategory = "Domestic";
    this.getVendors();
    this.getItemOrderSchdules();
       
  }

  newEntry : ItemDocument;
  fieldArray: Array<any> = [];
  docSubEntries : ItemDocument[] = new Array();
  docSubEntryTemp : ItemDocument = new ItemDocument();
  docSchSubEntries : SchSubEntry[] = new Array();
  docSchSubEntryTotalDocNo : string = "0";
  docSchSubEntryQtyinNos : string = "";
  docSchSubEntryQtyinKgs : string = "";

  checkSubEntryTpNotNull : boolean = false;


  vendors : Vendor[];
  itemOrders : ItemOrder[];
  itemOrderSchedules : ItemOrderSchedule[];
  orderNoItemOrders : ItemOrder[];
  popup1ItemOrders : ItemOrder[];
  popup2ItemOrderSchedules : ItemOrderSchedule[];
  selectedOrderNo : string;
  selectedItemId : string;
  selectedVendorItemNumber : string;
  selectedItemOrderShId : string;
  overallValues : OverallValues = new OverallValues();

  modelReference : any;
  modelContent : any;
  modelPopupRecord : ItemDocument;
  staticAlertClosed = false;
  alertMessage = '';
  alertMsg = false;
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

    
    insertHeaderColumns = ['Order#', 'Cust. Part #', 'Cust. PartName', 'UOM', 'Unit Price Per UOM', 'Jobwork Reduction %', 
                      'Qty No', 'Qty Kgs',  'Assesable Value', 'Sch No'];
    
    viewHeaderColumns = ['Order#', 'Cust. Part #', 'Cust. PartName', 'UOM', 'Unit Price Per UOM', 'Jobwork Reduction %', 
                       'Doc Qty No', 'Doc Qty Kgs', 'Assesable Value', 'Sch No'];
    
    eliminateList = ['conssiderOrder', 'deliveryFromTo', 'documentCategory', 'documentDate', 'documentFor',
                    'documentOurCode', 'documentPurpose', 'documentTime', 'documentType', 'entranceRegisterId', 
                    'multipleOrder', 'noofExtraCopy', 'removalDate', 'removalTime', 'requisitionNo', 'requistionType',
                    'returnable', 'stockConsidered', 'vendorFromTo', 'vehicleNo'];

    getDocSubEntries()
    {
      return this.docSubEntries;
    }

    checkElimateList(key : string)
    {
      for(let record of this.eliminateList)
      {
        if(record == key)
          return false;
      }
      return true;
    }

    addSubEntry()
    {
      
      for(let schSubEntry of this.docSchSubEntries)
      {
        let subEntry = this.assignSubEntryFromNewEntry(this.newEntry);
        //subEntry = this.newEntry;
        console.log(this.newEntry);
        
        if(schSubEntry.documentQtyinNos != "" && schSubEntry.documentQtyinKgs != "")
        {
          subEntry.documentQtyinNos = schSubEntry.documentQtyinNos;
          subEntry.documentQtyinKgs = schSubEntry.documentQtyinKgs;
          subEntry = this.assignTempToSubEntry(subEntry);
          this.docSubEntries.push(subEntry);
          console.log(this.docSubEntries);
        }

        
      }
      this.docSubEntryTemp = new ItemDocument();
      this.docSchSubEntryTotalDocNo = "0";

      this.checkSubEntryTpNotNull = false;

      this.calculateOverallValues();
    }

    assignSubEntryFromNewEntry(newEntry : ItemDocument)
    {
      let subEntry = new ItemDocument();
      let result = Object.assign({}, subEntry, newEntry);      
      console.log(result);
      return result;
    }

    calculateOverallValues()
    {
      this.overallValues = new OverallValues();
      for(let subEntry of this.docSubEntries)
      {
          this.overallValues.packageRate += Number(subEntry.packagingRate);
          this.overallValues.freightRate += Number(subEntry.freightRate);
          this.overallValues.sgst += Number(subEntry.sgst);
          this.overallValues.cgst += Number(subEntry.cgst);
          this.overallValues.assessibleValue += Number(subEntry.assessableValue);
          this.overallValues.tcs += Number(subEntry.tcsValue);
      }
    }

    assignTempToSubEntry(subEntry : ItemDocument)
    {
      subEntry.vendorItemName  = this.docSubEntryTemp.vendorItemName ;
      subEntry.vendorItemNameId  = this.docSubEntryTemp.vendorItemNameId ;
      subEntry.orderLineNo = this.docSubEntryTemp.orderLineNo;
      subEntry.orderNos = this.docSubEntryTemp.orderNos ;
      subEntry.orderKgs  = this.docSubEntryTemp.orderKgs ;
      subEntry.uom = this.docSubEntryTemp.uom ;
      subEntry.unitPricePerUOM =  this.docSubEntryTemp.unitPricePerUOM ;
      subEntry.jobworkReductionPercentage = this.docSubEntryTemp.jobworkReductionPercentage;
      subEntry.itemId  = this.docSubEntryTemp.itemId ;
      subEntry.itemOrderId = this.docSubEntryTemp.itemOrderId ;
      subEntry.processStageNo = this.docSubEntryTemp.processStageNo;
      subEntry.vendorItemNumber  = this.docSubEntryTemp.vendorItemNumber ;
      subEntry.hsnsaCode = this.docSubEntryTemp.hsnsaCode;
      subEntry.hsnsaID = this.docSubEntryTemp.hsnsaID;
      subEntry.hsnsaDescription = this.docSubEntryTemp.hsnsaDescription;
      subEntry.hsnsaRateEffectiveFrom = this.docSubEntryTemp.hsnsaRateEffectiveFrom ;
      subEntry.hsnsaRatePercentage = this.docSubEntryTemp.hsnsaRatePercentage;
      subEntry.orderItemWeightinGms = this.docSubEntryTemp.orderItemWeightinGms ;
      subEntry.vendorItemWeightinGms = this.docSubEntryTemp.vendorItemWeightinGms;
      //subEntry.freightCalcType = this.docSubEntryTemp.freightCalcType;
      subEntry.freightRate = this.docSubEntryTemp.freightRate;
      subEntry.freightRateType = this.docSubEntryTemp.freightRateType ;
      //subEntry.packagingCalcType = this.docSubEntryTemp.packagingCalcType;
      subEntry.packagingRate = this.docSubEntryTemp.packagingRate;
      subEntry.packagingRateType =  this.docSubEntryTemp.packagingRateType ;
      //subEntry.pfCalcType = this.docSubEntryTemp.pfCalcType ;
      subEntry.pfRate = this.docSubEntryTemp.pfRate ;
      subEntry.pfRateType = this.docSubEntryTemp.pfRateType ;
      subEntry.tcsPercentage = this.docSubEntryTemp.tcsPercentage ;

      subEntry.orderNo = this.docSubEntryTemp.orderNo;
      subEntry.vendorItemName = this.docSubEntryTemp.vendorItemName;
      subEntry.uom = this.docSubEntryTemp.uom;
      subEntry.unitPricePerUOM = this.docSubEntryTemp.unitPricePerUOM;
      subEntry.jobworkReductionPercentage = this.docSubEntryTemp.jobworkReductionPercentage;
      subEntry.qtyinNos = this.docSubEntryTemp.qtyinNos;
      subEntry.qtyinKgs = this.docSubEntryTemp.qtyinKgs;
      subEntry.assessableValue = this.docSubEntryTemp.assessableValue;
      subEntry.itemOrderScheduleId = this.docSubEntryTemp.itemOrderScheduleId;

      subEntry = this.docSubEntryCalculation(subEntry);
      return subEntry;
    }

    docSubEntryCalculation(subEntry : ItemDocument)
    {
      console.log("inside", subEntry);
      subEntry.assessableValue = (Number(subEntry.documentQtyinNos) * Number(subEntry.unitPricePerUOM)).toString();
      subEntry.cgst = ((Number(subEntry.assessableValue) * (Number(subEntry.hsnsaRatePercentage))/100 ) / 2).toString();
      subEntry.sgst = ((Number(subEntry.assessableValue) * (Number(subEntry.hsnsaRatePercentage))/100 ) / 2).toString();
      subEntry.freightValue = (Number(subEntry.documentQtyinNos) * Number(subEntry.freightRate)).toString();
      console.log(subEntry.freightValue);
      console.log((Number(subEntry.documentQtyinNos) * Number(subEntry.freightRate)));
      subEntry.packagingValue = (Number(subEntry.documentQtyinNos) * Number(subEntry.packagingRate)).toString();
      subEntry.igst = ((Number(subEntry.assessableValue) * Number(subEntry.hsnsaRatePercentage)) / 100).toString();
      subEntry.pfValue = (Number(subEntry.documentQtyinNos) * Number(subEntry.pfRate)).toString();
      subEntry.tcsValue = ((Number(subEntry.assessableValue) + Number(subEntry.cgst) + Number(subEntry.sgst) + Number(subEntry.freightValue) 
                            + Number(subEntry.packagingValue) + Number(subEntry.pfValue) + Number(subEntry.igst) ) * (Number(subEntry.tcsPercentage) / 100)).toString();
      subEntry.totalValue = (Number(subEntry.assessableValue) + Number(subEntry.cgst) + Number(subEntry.sgst) + Number(subEntry.freightValue) 
                            + Number(subEntry.packagingValue) + Number(subEntry.pfValue) + Number(subEntry.igst) + Number(subEntry.tcsValue) ).toString();
      subEntry.stockCalcMethod;
      subEntry.noofPackaging;
      subEntry.packaging;

      console.log("returning", subEntry);

      return subEntry;
    }

    removeSubEntry(index : any)
    {
      this.docSubEntries.splice(index,1);
      this.calculateOverallValues();
    }

    selectedPopup1(itemOrder : ItemOrder)
    {
      console.log(itemOrder);
      this.docSubEntryTemp.vendorItemName = itemOrder.vendorItemName;
      this.docSubEntryTemp.vendorItemNameId = itemOrder.vendorItemNameId;
      this.docSubEntryTemp.orderLineNo = itemOrder.orderLineNo;
      this.docSubEntryTemp.orderNos = itemOrder.orderNos;
      this.docSubEntryTemp.orderKgs = itemOrder.orderKgs;
      this.docSubEntryTemp.uom = itemOrder.uom;
      this.docSubEntryTemp.unitPricePerUOM = itemOrder.unitPriceUom;
      this.docSubEntryTemp.jobworkReductionPercentage = itemOrder.jobworkRedPercentage;
      this.docSubEntryTemp.itemId = itemOrder.itemId;
      this.docSubEntryTemp.itemOrderId = itemOrder.itemOrderId;
      this.docSubEntryTemp.processStageNo = itemOrder.processStageNo;
      this.docSubEntryTemp.vendorItemNumber = itemOrder.vendorItemNumber;
      this.docSubEntryTemp.hsnsaCode = itemOrder.hsnsaCode;
      this.docSubEntryTemp.hsnsaID = itemOrder.hsnsaCodeId;
      this.docSubEntryTemp.hsnsaDescription = itemOrder.hsnsaDescription;
      this.docSubEntryTemp.hsnsaRateEffectiveFrom = itemOrder.hsnsaRateEffectiveFrom;
      this.docSubEntryTemp.hsnsaRatePercentage = itemOrder.hsnsaRatePercentage;
      this.docSubEntryTemp.orderItemWeightinGms = itemOrder.orderItemWtGms;
      this.docSubEntryTemp.vendorItemWeightinGms = itemOrder.vendorItemWtGms;
      //this.docSubEntryTemp.freightCalcType = itemOrder.freightCalcType;
      this.docSubEntryTemp.freightRate = itemOrder.freightRate;
      this.docSubEntryTemp.freightRateType = itemOrder.freightRateType;
      //this.docSubEntryTemp.packagingCalcType = itemOrder.packagingCalcType;
      this.docSubEntryTemp.packagingRate = itemOrder.packagingRate;
      this.docSubEntryTemp.packagingRateType = itemOrder.packagingRateType;
      //this.docSubEntryTemp.pfCalcType = itemOrder.pfCalcType;
      this.docSubEntryTemp.pfRate = itemOrder.pfRate;
      this.docSubEntryTemp.pfRateType = itemOrder.pfRateType;
      this.docSubEntryTemp.tcsPercentage = itemOrder.tcsPercentage;

      this.getPopup2Details(itemOrder.itemOrderId);
    }

    selectedPopup2(itemOrderSchedule : ItemOrderSchedule)
    {
      this.docSubEntryTemp.itemOrderScheduleId = itemOrderSchedule.itemOrderScheduleId;
    }

    checkSubEntryTempNotNull()
    {
      let result = false;
      if(this.docSubEntryTemp.qtyinNos != "" && this.docSubEntryTemp.qtyinKgs != "")
         {
          result = true;
          this.docSubEntryTemp.assessableValue = (Number(this.docSubEntryTemp.qtyinNos) * Number(this.docSubEntryTemp.unitPricePerUOM)).toString();
         }

         this.checkSubEntryTpNotNull = result;
    }

    calculateSchSubEntry()
    {
      let documentQtyinNos : number = 0;
      let result = 0;
        for(let subEntry of this.docSchSubEntries)
        {
          if(subEntry.documentQtyinNos != '')
          {
            documentQtyinNos = Number(subEntry.documentQtyinNos);
            result += documentQtyinNos;
          }
        }
        this.docSchSubEntryTotalDocNo = result.toString();
    }

    showSchCheckbox(docSubEntry : ItemDocument[], index : any)
    {
      let result = false;
      if(docSubEntry != null && docSubEntry[index] != null && docSubEntry[index].documentQtyinNos != "")
      {
        result = true;
      }
      return result;
    }

    pageClear()
    {
      this.helperService.reloadCurrentRoute();
    }
 
    onSubmit() 
    {  
      let index = 0;
        for(let docSubEntry of this.docSubEntries)
        {
          console.log(docSubEntry);
          index++;
          /*let docEntry = this.newEntry;
          docEntry.vendorItemName = docSubEntry.vendorItemName;
          docEntry.uom = docSubEntry.uom;
          docEntry.jobworkReductionPercentage = docSubEntry.jobworkReductionPercentage;
          docEntry.itemId = docSubEntry.itemId;
          docEntry.unitPricePerUOM = docSubEntry.unitPricePerUOM;
          docEntry.itemOrderId = docSubEntry.itemOrderId;
          docEntry.itemOrderScheduleId = docSubEntry.itemOrderScheduleId;
          docEntry.qtyinNos = docSubEntry.qtyinNos;
          docEntry.qtyinKgs = docSubEntry.qtyinKgs;
          docEntry.documentQtyinNos = docSubEntry.documentQtyinNos;
          docEntry.documentQtyinKgs = docSubEntry.documentQtyinKgs;
          docEntry.processStageNo = docSubEntry.processStageNo;
          docEntry.vendorItemNumber = docSubEntry.vendorItemNumber;
          docEntry.hsnsaCode = docSubEntry.hsnsaCode;
          docEntry.hsnsaID = docSubEntry.hsnsaID;
          docEntry.hsnsaDescription = docSubEntry.hsnsaDescription;
          docEntry.hsnsaRateEffectiveFrom = docSubEntry.hsnsaRateEffectiveFrom;
          docEntry.hsnsaRatePercentage = docSubEntry.hsnsaRatePercentage;
          docEntry.orderItemWeightinGms = docSubEntry.orderItemWeightinGms;
          docEntry.vendorItemWeightinGms = docSubEntry.vendorItemWeightinGms;
          //docEntry.freightCalcType = docSubEntry.freightCalcType;
          docEntry.freightRate = docSubEntry.freightRate;
          docEntry.freightRateType = docSubEntry.freightRateType;
          //docEntry.packagingCalcType = docSubEntry.packagingCalcType;
          docEntry.packagingRate = docSubEntry.packagingRate;
          docEntry.packagingRateType = docSubEntry.packagingRateType;
          //docEntry.pfCalcType = docSubEntry.pfCalcType;
          docEntry.pfRate = docSubEntry.pfRate;
          docEntry.pfRateType = docSubEntry.pfRateType;
          docEntry.tcsPercentage = docSubEntry.tcsPercentage;*/

          this.apiService.add(ApiUrls.itemDocumentApi, docSubEntry).subscribe(
            result => { console.log(result);}, err => { console.log(err);}
          );

          if(index == this.docSubEntries.length)
          {
            this.pageClear();
          }
        }
    }


    openVerticallyCentered(content : any) 
    {
        this.modelReference = this.modalService.open(content, { centered: true , size: 'lg'});
    }

    openVerticallyCenteredForSubEntry(content : any, record : ItemDocument) {
      this.modalService.open(content, { centered: true });
      this.modelPopupRecord = record;
    }

    setVendorDetails()
    {
      let vendorFromTos = this.newEntry.vendorFromTo.split("-");
      let vendorFromTo = vendorFromTos[vendorFromTos.length-1].trim();
      let vendors = this.vendors;

      vendors = vendors.filter(vndr => { return vndr.vendorId == Number(vendorFromTo);});

      let vendor = vendors[0];
      this.newEntry.prefixSpecial = vendor.prefixSpecial;
      this.newEntry.noofExtraCopy = vendor.extraCopy;

      this.newEntry.deliveryFromTo = this.newEntry.vendorFromTo;
    }

    //Get details block
    getVendors()
    {
      this.apiService.get(ApiUrls.vendorApi).subscribe(
        data => { this.vendors = data;},
        error => { console.log(error);}
      );
    }

    getItemOrders()
    {

      let vendorFromTos = this.newEntry.vendorFromTo.split("-");
      let vendorFromTo = vendorFromTos[vendorFromTos.length-1].trim();
      this.apiService.get(ApiUrls.itemOrderApi).subscribe(
        data => { 
          
          let itemOrders = data;
          this.itemOrders = data;
          this.orderNoItemOrders = data;
          this.popup1ItemOrders = data;
          itemOrders = itemOrders.filter((itemOrder : ItemOrder) => { return itemOrder.orderToVendorId == vendorFromTo});
          this.orderNoItemOrders = itemOrders;
        
        },
        error => { console.log(error);}
      );
    }

    getItemOrderSchdules()
    {
        this.apiService.get(ApiUrls.itemOrderScheduleApi).subscribe(
          data => { this.itemOrderSchedules = data;},
          err => { console.log(err);}
        );
    }

    getItems(id : string)
    {
      let items : Item[] = [];
       this.apiService.get(ApiUrls.itemApi).subscribe(
        data => { items = data;}
       );
       items = items.filter(item => {return item.itemId == Number(id);});
       return items;
    }

    
    getPopup1Details(docSubEntryTemp : any)
    {
      let itemOrders = this.itemOrders;
      itemOrders = itemOrders.filter( itemOrder => {return itemOrder.orderNo == docSubEntryTemp.orderNo});
      this.popup1ItemOrders = itemOrders;
    }

    getPopup2Details(itemOrderId : string)
    {
      let itemOrderSchedules = this.itemOrderSchedules;
      this.docSchSubEntries = new Array();
      itemOrderSchedules = itemOrderSchedules.filter( itemOrderSchedule => {return itemOrderSchedule.itemOrderId == itemOrderId});
      this.popup2ItemOrderSchedules = itemOrderSchedules;

      
      for(let temp of itemOrderSchedules)
      {
        this.docSchSubEntries.push(new SchSubEntry());
      }
    }

    

}
export class SchSubEntry
{
  documentQtyinNos: string ="";
  documentQtyinKgs : string ="";
}

export class OverallValues
{
  packageRate : number = 0;
  freightRate : number = 0;;
  assessibleValue : number = 0;
  sgst : number = 0;
  cgst : number = 0;
  tcs : number = 0;
}
/*export class SubEntry
{
        orderNo: string = ""; 
        vendorItemNumber : string = "";  
        vendorItemName : string = "";
        vendorItemNameId : string ="";
        orderLineNo: string ="";
        orderNos : string ="";
        orderKgs: string ="";
        uom : string ="";
        unitPriceUom : string ="";
        jobworkRedPercentage: string ="";
        itemId: string ="";
        itemOrderId : string ="";
        qtyinNos : string ="";
        qtyinKgs : string ="";
        documentQtyinNos: string ="";
        documentQtyinKgs : string ="";
        assessableValue : string ="";
        itemOrderScheduleId : string ="";

        processStageNo : string;
        hsnsaCodeId : string;
        hsnsaCode : string;
        hsnsaDescription : string;
        hsnsaRatePercentage : string;
        hsnsaRateEffectiveFrom : string;
        orderItemWtGms : string;
        vendorItemWtGms : string;
        freightCalcType : string;
        freightRateType : string;
        freightRate : string;
        pfCalcType : string;
        pfRateType : string;
        pfRate : string;
        tcsPercentage : string;
}*/

