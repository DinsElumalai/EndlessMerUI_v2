import { Component, OnInit, ViewChild } from '@angular/core';
import { HelperService } from '../../../services/helperService';
import { ApiHelper } from '../../../services/apiHelper';
import { ApiUrls } from '../../../services/api.urls';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { ItemOrder } from '../item-order';
import { ItemType } from '../../../master/item-type/item-type';
import { ItemReptSeqVndr } from '../../../master/item-rept-seq-vndr/item-rept-seq-vndr';
import { HsnCode } from '../../../master/hsncode/hsncode';
import { Vendor } from '../../../master/vendor/vendor';
import { Item } from '../../../master/item/item';
import { ItemOrderComponent } from '../item-order.component';

@Component({
  selector: 'app-additemorder',
  templateUrl: './additemorder.component.html',
  styleUrls: ['./additemorder.component.scss']
})
export class AdditemorderComponent implements OnInit {

  newEntry : ItemOrder = new ItemOrder();

  alertMsg : boolean = false;
  alertMessage : string = "";
  canInsert : boolean = true;
  alertType : any = "danger";
  entryFields : any ;
  entryFieldNames : any;

  orderIdToLoad : string = "";
  itemOrders : ItemOrder[];
  itemTypes : ItemType[];
  itemReptSeqVndrs : ItemReptSeqVndr[];
  itemReptSeqVndrItemIds : any;
  irsvProcessStageNos : any;
  hsnCodes : HsnCode[];
  vendors : Vendor[];
  items : Item[];
  selectedItemId : string = "";

  @ViewChild('selfClosingAlert', {static: true}) selfClosingAlert: NgbAlert;

  constructor(private helper : HelperService, 
              private apiHelper : ApiHelper,
              private itemOrderComp : ItemOrderComponent) { }

  ngOnInit(): void {

    this.getItemRecptSeqVndrs();
    this.getItemTypes();
    this.getHsnCodes();
    this.getVendors();
    this.getItems();
    this.getItemOrders();
    this.newEntry.modeOfDispatch = "By Road";
    this.newEntry.deliveryTerms = "Ex-Works";
    this.newEntry.orderItemApprovalStatus = "WIP";
    this.newEntry.orderItemStatus = "Active";
  }

  save()
  {
    this.dataValidation(this.newEntry);

    if(this.canInsert)
    {
      this.apiHelper.add(ApiUrls.itemOrderApi, this.newEntry).subscribe(data =>
        {
          //console.log(data);
          this.newEntry = new ItemOrder();
          this.alertMessage = " A new Record inserted Successfully.";
          this.alertMsg = true;
          this.alertType = "success";
          this.itemOrderComp.getDetails();
          //this.helper.reloadCurrentRoute();

        },error =>  { console.log(error); } );
        
    }
  }

  refreshPage()
  {
    this.helper.reloadCurrentRoute();
  }

  setDefaultValues()
  {
    this.newEntry.createdBy = "";
    this.newEntry.createdClient = "";
  }

  dataValidation(entry : ItemOrder)
  {
    this.alertMsg = false;

    this.entryFields = ['orderFor','orderType','orderNo','orderDate','orderRptIssueDate',
    'orderEffectiveFromDate','multipleHsnRate','orderToVendorId',
    'deliveryToVendorId','modeOfDispatch','deliveryTerms',
    'paymentTerms','contactMail','contactNo','contactPerson',
    'comments','specialInstruction','scheduleVariationPercentage',
    'tcsPercentage','packagingCalcType','packagingRateType',
    'packagingRate','freightCalcType','freightRateType','freightRate',
    'pfCalcType','pfRateType','pfRate','itemTypeId','itemId',
    'processStageNo','recipeVendorFlowId','vendorItemNumber',
    'vendorItemName','vendorItemNameId','orderLineNo',
    'orderNos','orderKgs','precisionNosDigit','precisionKgsDigit',
    'uom','unitPriceUom','discountPrecentage','jobworkRedPercentage',
    'hsnsaCodeId','hsnsaCode','hsnsaDescription','hsnsaRatePercentage',
    'hsnsaRateEffectiveFrom','orderItemWtGms','vendorItemWtGms',
    'finishedItemWtGms','consumeItemWtGms','orderItemApprovalStatus',
    'orderItemStatus']
    
    this.entryFieldNames = this.entryFields;        
    
    for(let i=0; i < this.entryFields.length; i++)
    {
      let field : any = this.entryFields[i];
      if(entry[field as keyof typeof entry] == null || entry[field as keyof typeof entry] == "")
      {
        //console.log(entry[field as keyof typeof entry]);
        this.alertMessage = this.entryFieldNames[i].charAt(0).toUpperCase() + this.entryFieldNames[i].slice(1)  + " is Missing...";
        this.alertMsg = true;
      }
    }

    this.canInsert = !this.alertMsg;

  }

  getItemTypes()
  {
    this.apiHelper.getList(ApiUrls.itemTypeApi).subscribe(data => {

      this.itemTypes = data;
      
    }, error => { console.log(error);});
  }

  getVendors()
  {
    this.apiHelper.getList(ApiUrls.vendorApi).subscribe(data => {
      this.vendors = data;
    }, error => { console.log(error);});
  }

  getItemOrders()
  {
    this.apiHelper.getList(ApiUrls.itemOrderApi).subscribe(data => {
      this.itemOrders = data;
    }, error => { console.log(error);});
  }

  getItems()
  {
    this.apiHelper.getList(ApiUrls.itemApi).subscribe(data => {

      this.items = data;
      
    }, error => { console.log(error);});
  }

  getItemRecptSeqVndrs()
  {
    this.apiHelper.getList(ApiUrls.itemReptSeqVndrApi).subscribe(data => {

      this.itemReptSeqVndrs = data;
      //console.log(data);
      //this.getItemIdFromRecptSeqVndrs();
    }, error => { console.log(error);});
  }

  getUniqueProcessStageNos()
  {
    let irsvProcessStageNos = this.itemReptSeqVndrs;

    irsvProcessStageNos = irsvProcessStageNos.filter( irvs => {
                return    (irvs.item == this.newEntry.itemId && irvs.processVendor == this.newEntry.orderToVendorId)
    });
    let irsvPSnos = new Set();
    for(let irsv of irsvProcessStageNos)
    {
      irsvPSnos.add(irsv.processStageNo);
    }
    
    this.irsvProcessStageNos = irsvPSnos;
    
  }

  getIdFromSelection(selectedVal : string)
  {
    if(selectedVal != null && selectedVal != "")
    {
      let valArr = selectedVal.split("-");
      let result = valArr[valArr.length-1].trim();
      return result;
    }
    return "";
  }

  getItemIdFromRecptSeqVndrs()
  {
    this.newEntry.itemId = "";
    this.newEntry.processStageNo = "";
    this.newEntry.recipeVendorFlowId = "";
    this.newEntry.vendorItemName = "";
    this.newEntry.vendorItemNameId = "";
    this.itemReptSeqVndrItemIds = new Set();
    let itemReptSeqVndrsLcl = this.itemReptSeqVndrs; 
    
   itemReptSeqVndrsLcl = itemReptSeqVndrsLcl.filter(irvs => { 
                             return irvs.processVendor == this.newEntry.orderToVendorId});
    let irsvItemId = new Set();
    for(let irsv of itemReptSeqVndrsLcl)
    {
      irsvItemId.add(irsv.item);
    }
    this.itemReptSeqVndrItemIds = irsvItemId;
  }

  getItemReptSeqVndrItemIds()
  {
    return this.itemReptSeqVndrItemIds;
  }
  

  getRecptSeqVndrsByItemId(itemId : string)
  {
    let itemReptSeqVndrs = this.itemReptSeqVndrs;
    return itemReptSeqVndrs.filter(irsv => { return irsv.item == itemId })[0];
  }

  fillDetailsByItemId()
  {
    this.getUniqueProcessStageNos();
    let items = this.items;
    this.newEntry.processStageNo = "";
    
    if(this.newEntry.itemId != null)
    {
      items = items.filter(item => { return (item.itemId).toString() == this.newEntry.itemId });
      if(items[0] != null)
      {
        this.newEntry.orderItemWtGms = items[0].vendorItemWtGms;
        this.newEntry.vendorItemWtGms = items[0].vendorItemWtGms;
      }
    }
    
  }

  setDetailsByProcessStageNos()
  {
    let itemReptSeqVndrs = this.itemReptSeqVndrs;

    itemReptSeqVndrs = itemReptSeqVndrs.filter( irsv => 
      {
        return (irsv.processStageNo == this.newEntry.processStageNo && irsv.item == this.newEntry.itemId 
                  && irsv.processVendor == this.newEntry.orderToVendorId)
      });

      let itemReptSeqVndr = itemReptSeqVndrs[0];

      
      this.newEntry.recipeVendorFlowId = itemReptSeqVndr.recipeVendorFlowId;
      this.newEntry.hsnsaCodeId = itemReptSeqVndr.hsnCodeId;
      this.newEntry.vendorItemNumber = itemReptSeqVndr.vendorItemNumber;
      this.newEntry.vendorItemNameId = itemReptSeqVndr.vendorItemNameId;
      this.newEntry.vendorItemName = itemReptSeqVndr.vendorItemName;
      this.newEntry.consumeItemWtGms = itemReptSeqVndr.consumptionQty;
      this.newEntry.finishedItemWtGms = itemReptSeqVndr.finishQty;

      this.fillHsnDetails();
  }

  getHsnCodes()
  {
    this.apiHelper.getList(ApiUrls.hsncodeApi).subscribe(data => {

      this.hsnCodes = data;
      
    }, error => { console.log(error);});
  }

  fillHsnDetails()
  {
    let hsnCodes = this.hsnCodes;
    let hsnCodeRecord = hsnCodes.filter(hsnCode => hsnCode.hsnId == this.newEntry.hsnsaCodeId)[0];

    this.newEntry.hsnsaCode = hsnCodeRecord.hsnCode;
    this.newEntry.hsnsaDescription = hsnCodeRecord.hsnDescription;
    this.newEntry.hsnsaRatePercentage = hsnCodeRecord.hsnRate;
    this.newEntry.hsnsaRateEffectiveFrom = hsnCodeRecord.hsnRateFrom;
  }

  fillDataByOrderNo()
  {
    if(this.orderIdToLoad != null || this.orderIdToLoad != "")
    {
      if(this.itemOrders != null)
      {
        let itemOrders = this.itemOrders;

        let itemOrder = itemOrders.filter(itemOrder => itemOrder.orderOurCode == this.orderIdToLoad)[0];
        //console.log(itemOrder);

        this.newEntry.orderFor = itemOrder.orderFor;
        this.newEntry.orderType = itemOrder.orderType;
        this.newEntry.orderNo = itemOrder.orderNo;
        this.newEntry.orderDate = itemOrder.orderDate;
        this.newEntry.orderRptIssueDate = itemOrder.orderRptIssueDate;
        this.newEntry.orderEffectiveFromDate = itemOrder.orderEffectiveFromDate;
        this.newEntry.multipleHsnRate = itemOrder.multipleHsnRate;
        this.newEntry.orderToVendorId = itemOrder.orderToVendorId;
        this.newEntry.deliveryToVendorId = itemOrder.deliveryToVendorId;
        this.newEntry.modeOfDispatch = itemOrder.modeOfDispatch;
        this.newEntry.deliveryTerms = itemOrder.deliveryTerms;
        this.newEntry.paymentTerms = itemOrder.paymentTerms;
        this.newEntry.contactMail = itemOrder.contactMail;
        this.newEntry.contactNo = itemOrder.contactNo;
        this.newEntry.contactPerson = itemOrder.contactPerson;
        this.newEntry.comments = itemOrder.comments;
        this.newEntry.specialInstruction = itemOrder.specialInstruction;
        this.newEntry.scheduleVariationPercentage = itemOrder.scheduleVariationPercentage;
        this.newEntry.tcsPercentage = itemOrder.tcsPercentage;
        this.newEntry.packagingCalcType = itemOrder.packagingCalcType;
        this.newEntry.packagingRateType = itemOrder.packagingRateType;
        this.newEntry.packagingRate = itemOrder.packagingRate;
        this.newEntry.freightCalcType = itemOrder.freightCalcType;
        this.newEntry.freightRateType = itemOrder.freightRateType;
        this.newEntry.freightRate = itemOrder.freightRate;
        this.newEntry.pfCalcType = itemOrder.pfCalcType;
        this.newEntry.pfRateType = itemOrder.pfRateType;
        this.newEntry.pfRate = itemOrder.pfRate;
        this.newEntry.itemTypeId = itemOrder.itemTypeId;
        this.newEntry.orderOurCode = itemOrder.orderOurCode;

        this.getItemIdFromRecptSeqVndrs();
      }
    }
  }
}

