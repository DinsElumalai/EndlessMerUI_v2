import { Component, OnInit } from '@angular/core';
import { ApiUrls } from '../../services/api.urls';
import { ApiHelper } from '../../services/apiHelper';
import { HelperService } from '../../services/helperService';
import { ItemOrderSchedule } from './itemOrderSchedule';
import { Vendor } from '../../master/vendor/vendor';
import { Item } from '../../master/item/item';
import { ItemOrder } from '../item-order/item-order';

@Component({
  selector: 'app-item-order-schedule',
  templateUrl: './item-order-schedule.component.html',
  styleUrls: ['./item-order-schedule.component.scss']
})
export class ItemOrderScheduleComponent implements OnInit {

  entries : ItemOrderSchedule[];
  alertMsg : boolean = false;
  alertMessage : string = "";
  canInsert : boolean = true;
  alertType : any = "success";

  filterItem : string;
  filterVendor : string;
  filterOrderId : string;

  filterItems : any;
  filterVendors : any;
  filterOrderIds : any;

  selectedItem : string;
  selectedVendor : string;
  selectedOrderId : string;

  filteredData : string;
  vendors : Vendor[];
  items : Item[];
  itemOrders : ItemOrder[];
  itemOrderSchedules : ItemOrderSchedule[];

  constructor(private apiHelper : ApiHelper,
              private helperService : HelperService) { }

  ngOnInit(): void 
  {
    this.getDetails();
    this.getVendors();
    this.getItems();
    this.getItemOrders();
    
  }

  getDetails()
  {
    this.apiHelper.getList(ApiUrls.itemOrderScheduleApi).subscribe(data => {
      this.entries = data;

      
      this.filterData();
      this.filterItems = this.entries;
      this.getUniqueItemIds();
      this.filterVendors = this.entries;
      this.getUniqueScheduleVendorIds();
      this.filterOrderIds = this.entries;
      this.getUniqueOrderIds();

      this.entries = this.entries.sort((a,b) => (a.itemOrderScheduleId > b.itemOrderScheduleId ? -1 : 1));
      
    },error => {console.log(error);});
  }

  filterData()
  {
    if(this.filterVendor != null && this.filterVendor != "")
      this.entries = this.entries.filter(entry => { return entry.scheduleVendor == this.filterVendor});

    if(this.filterItem != null && this.filterItem != "")
      this.entries = this.entries.filter(entry => { return entry.itemId == this.filterItem});

    if(this.filterOrderId != null && this.filterOrderId != "")
      this.entries = this.entries.filter(entry => { return entry.itemOrderId == this.filterOrderId});
    
  }

  getSelectedFilterId(selectedData : string)
  {
    let result = selectedData.split("-");
    
    return result[result.length-1].trim();
  }

  getUniqueScheduleVendorIds()
  {
    let itemOrderSchedules = this.filterVendors;
    let unqIds = new Set();
    console.log(this.filterVendors);
    for(let itemOrderSchedule of itemOrderSchedules)
    {
      unqIds.add(itemOrderSchedule.scheduleVendor);
    }
    this.filterVendors = unqIds;
  }

  getVendors()
  {
    this.apiHelper.getList(ApiUrls.vendorApi).subscribe(data => {
      this.vendors = data;
    });
  }

  getVendorName(vendorId : string)
  {
    if(vendorId != null && vendorId != "" && this.vendors != null && this.vendors != [])
    {
      let vendors = this.vendors;
      vendors = vendors.filter(vndr => { return vndr.vendorId == Number(vendorId.trim())});
      return  vendors[0].vendorNameId + " - " + vendors[0].vendorName;
    }
    else
      return "";
   }
   getUniqueItemIds()
  {
    let itemOrderSchedules = this.filterItems;
    let unqIds = new Set();
    for(let itemOrderSchedule of itemOrderSchedules)
    {
      unqIds.add(itemOrderSchedule.itemId);
    }
    this.filterItems = unqIds;
  }

  getItems()
  {
    this.apiHelper.getList(ApiUrls.itemApi).subscribe(data => {
      this.items = data;
    });
  }

  getItemName(itemId : string)
  {
    if(itemId != null && itemId != "" && this.items != null && this.items != [])
    {
      let items = this.items;
      items = items.filter(item => { return item.itemId == Number(itemId.trim())});
      return  items[0].itemName + " - " + items[0].itemNameId;
    }
    else
      return "";
   }

   getUniqueOrderIds()
   {
     let itemOrderSchedules = this.filterOrderIds;
     let unqIds = new Set();
     for(let itemOrderSchedule of itemOrderSchedules)
     {
       unqIds.add(itemOrderSchedule.itemOrderId);
     }
     this.filterOrderIds = unqIds;
   }
 
   getItemOrders()
   {
     this.apiHelper.getList(ApiUrls.itemOrderApi).subscribe(data => {
       this.itemOrders = data;
     });
   }
 
   getItemOrderNo(itemOrderId : string)
   {
     if(itemOrderId != null && itemOrderId != "" && this.itemOrders != null && this.itemOrders != [])
     {
       let itemOrders = this.itemOrders;
       itemOrders = itemOrders.filter(itemOrder => { return itemOrder.itemOrderId == itemOrderId.trim()});
       return  itemOrders[0].orderOurCode + " - " + itemOrders[0].orderNo;
     }
     else
       return "";
    }

  delete(entryId : string)
  {
    this.apiHelper.delete(ApiUrls.itemOrderScheduleApi, entryId).subscribe(data => {

        this.alertMessage = "Deleted the Record successfully.";
        this.alertMsg = true;
        this.alertType = "success";
        this.helperService.reloadCurrentRoute();

    },error => {console.log(error);});
  }

}
