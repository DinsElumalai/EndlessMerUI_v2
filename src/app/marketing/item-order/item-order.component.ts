import { Component, OnInit } from '@angular/core';
import { ItemOrder } from './item-order';
import { ApiUrls } from '../../services/api.urls';
import { ApiHelper } from '../../services/apiHelper';
import { HelperService } from '../../services/helperService';
import { Vendor } from '../../master/vendor/vendor';

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

  selectedOrderToVendorId : string = "";
  selectedrOrderOurCode : string = "";
  filteredOrderToVendorId : string = "";
  filteredrOrderOurCode : string = "";
  filteredOrderToVendorIds : any;
  filteredrOrderOurCodes : any;
  vendors : Vendor[];

  constructor(private apiHelper : ApiHelper,
              private helperService : HelperService) { }

  ngOnInit(): void 
  {
    this.getVendors();
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
      this.filteredOrderToVendorIds = data;
      this.filteredrOrderOurCodes = data;
      this.getUniqueOrderToVendorIds();
      //console.log(data);
      if(this.filteredOrderToVendorId != null && this.filteredOrderToVendorId != "")
      {
        this.entries = this.entries.filter(itemOrder => { return itemOrder.orderToVendorId == this.filteredOrderToVendorId });
        this.filteredrOrderOurCodes = this.entries;
      }
      if(this.filteredrOrderOurCode != null && this.filteredrOrderOurCode != "")
      {
        this.entries = this.entries.filter(itemOrder => { return itemOrder.orderOurCode == this.filteredrOrderOurCode });
      }
      
      this.entries = this.entries.sort((a,b) => (a.itemOrderId > b.itemOrderId ? -1 : 1));
    },error => {console.log(error);});
  }

  getVendors()
  {
    this.apiHelper.getList(ApiUrls.vendorApi).subscribe(data => {

      this.vendors = data;
      
    });
  }

  getUniqueOrderToVendorIds()
  {
    let itemOrders = this.filteredOrderToVendorIds;
    let unqOrderToVendorIds = new Set();
    for(let itemOrder of itemOrders)
    {
      unqOrderToVendorIds.add(itemOrder.orderToVendorId);
    }
    this.filteredOrderToVendorIds = unqOrderToVendorIds;
  }

  getVendorName(vendorId : string)
  {
    if(vendorId != null && vendorId != "" && this.vendors != null && this.vendors != [])
    {
      let vendors = this.vendors;
      vendors = vendors.filter(vndr => { return vndr.vendorId == Number(vendorId.trim())});
      return  vendors[0].vendorNameId;
    }
    else
      return "";
   }

  getSelectedFilterId(selectedData : string)
  {
    let result = selectedData.split("-");
    
    return result[result.length-1].trim();
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
