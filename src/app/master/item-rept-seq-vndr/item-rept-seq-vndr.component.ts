import { Component, OnInit } from '@angular/core';
import { ItemReptSeqVndr } from './item-rept-seq-vndr';
import { Item } from '../item/item';
import { ApiUrls } from '../../services/api.urls';
import { ApiHelper } from '../../services/apiHelper';
import { HelperService } from '../../services/helperService';


@Component({
  selector: 'app-item-rept-seq-vndr',
  templateUrl: './item-rept-seq-vndr.component.html',
  styleUrls: ['./item-rept-seq-vndr.component.scss']
})
export class ItemReptSeqVndrComponent implements OnInit {

  entries : ItemReptSeqVndr[];
  alertMsg : boolean = false;
  alertMessage : string = "";
  canInsert : boolean = true;
  alertType : any = "success";
  isCreate : boolean = true;

  entryFields : any ;
  entryFieldNames : any;
  filterItem : string = "";
  selectedFilterItem : string = "";
  irvss : any;
  filterSelectedValue : string;
  items : Item[];
  

  constructor(private apiHelper : ApiHelper,
              private helperService : HelperService) { }

  ngOnInit(): void 
  {
    this.getDetails();
    this.getItems();

    this.entryFields = ['itemType','item', 'receipeVendor', 'processStageNo', 'processStageName', 
                        'processStageFor', 'processSequenceNo','processName','processFor','subItemSequenceNo','subItemId','subItemPriority',
                        'uom','consumptionForQty','consumptionQty','finishQty','balanceQty','processVendor','hsnCodeId',
                        'vendorItemNumber','vendorItemName','vendorItemNameId','vendorPriority','processSharingPrecentage'];
    
    this.entryFieldNames = ['itemType','item', 'receipeVendor', 'processStageNo', 'processStageName', 
    'processStageFor', 'processSequenceNo','processName','processFor','subItemSequenceNo','subItemId','subItemPriority',
    'uom','consumptionForQty','consumptionQty','finishQty','balanceQty','processVendor','hsnCodeId',
    'vendorItemNumber','vendorItemName','vendorItemNameId','vendorPriority','processSharingPrecentage']; 
  
  }

  getDetails()
  {
    this.apiHelper.getList(ApiUrls.itemReptSeqVndrApi).subscribe(data => {
      this.entries = data;
      //console.log(data);
      this.entries = this.entries.sort((a,b) => (a.recipeVendorFlowId > b.recipeVendorFlowId ? -1 : 1));

      this.irvss = this.entries;
      //console.log(this.irvss);
      this.getUniqueItemIds();
      this.setFilterItem(this.filterItem);
                  
      if(this.filterItem != null && this.filterItem != "")
      {
        this.entries = this.entries.filter(irsv => { return irsv.item == this.filterItem} );
        //console.log(this.entries);
      }
    },error => {console.log(error);});
  }

  getUniqueItemIds()
  {
    let itemrvss = this.irvss;
    let uniqueIrvs = new Set();
    for(let itemrv of itemrvss)
    {
      uniqueIrvs.add(itemrv.item);
    }

    this.irvss = uniqueIrvs;
  }

  getItems()
  {
    this.apiHelper.getList(ApiUrls.itemApi).subscribe(data => {

      this.items = data;
    });
  }

  getItemName(id : string)
  {
    let items = this.items;
    let result = new Item();
    if(items != null)
      result = items[0];
    if(id != null && id != "")
    {
      try{
        items = items.filter(item => { return item.itemId == Number(id) });
        result = items[0];
      }
      catch(err)
      {
        //console.log(err);
      }
    }
    return result;
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
    this.apiHelper.delete(ApiUrls.itemReptSeqVndrApi, entryId).subscribe(data => {

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
