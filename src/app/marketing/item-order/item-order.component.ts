import { Component, OnInit } from '@angular/core';
import { ItemOrder } from './item-order';
import { ApiUrls } from '../../services/api.urls';
import { ApiHelper } from '../../services/apiHelper';
import { HelperService } from '../../services/helperService';

@Component({
  selector: 'app-item-order',
  templateUrl: './item-order.component.html',
  styleUrls: ['./item-order.component.scss']
})
export class ItemOrderComponent implements OnInit {

  entries : ItemOrder[];
  alertMsg : boolean = false;
  alertMessage : string = "";
  canInsert : boolean = true;
  alertType : any = "success";
  isCreate : boolean = true;

  entryFields : any ;
  entryFieldNames : any;

  itemOrders : ItemOrder[];
  filterItem : string;
  filteredData : string;

  constructor(private apiHelper : ApiHelper,
              private helperService : HelperService) { }

  ngOnInit(): void 
  {
    this.getDetails();

    this.entryFields = ['orderOurCode','orderFor','orderType','orderNo','orderDate','orderRptIssueDate',
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
    'orderItemStatus'];
    
    this.entryFieldNames =  this.entryFields;
  
  }

  getDetails()
  {
    this.apiHelper.getList(ApiUrls.itemOrderApi).subscribe(data => {
      this.entries = data;
      this.itemOrders = data;
      //console.log(data);
      this.setFilterItem(this.filterItem);
      if(this.filterItem != null && this.filterItem != "")
      {
        this.entries = this.entries.filter(itemOrder => { return itemOrder.orderNo == this.filterItem });
      }
      
      this.entries = this.entries.sort((a,b) => (a.itemOrderId > b.itemOrderId ? -1 : 1));
    },error => {console.log(error);});
  }

  setFilterItem(filteredData : string)
  {
    if(filteredData != null && filteredData != "")
    {
      let filteredInputs = filteredData.split("-");
      this.filterItem = filteredInputs[0].trim();
    }    
  }
 
  delete(entryId : string)
  {
    this.apiHelper.delete(ApiUrls.itemOrderApi, entryId).subscribe(data => {

        this.alertMessage = "Deleted the Record successfully.";
        this.alertMsg = true;
        this.alertType = "success";
        this.helperService.reloadCurrentRoute();

    },error => {console.log(error);});
  }

  getEntryValue(entry : any, entryName : any)
  {
    return "" + entry[entryName];
  }
}
