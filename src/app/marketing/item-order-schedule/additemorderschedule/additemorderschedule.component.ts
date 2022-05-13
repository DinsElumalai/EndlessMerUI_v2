import { Component, OnInit, ViewChild } from '@angular/core';
import { HelperService } from '../../../services/helperService';
import { ApiHelper } from '../../../services/apiHelper';
import { ApiUrls } from '../../../services/api.urls';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { ItemOrderSchedule } from '../itemOrderSchedule';
import { ItemOrder} from '../../item-order/item-order';
import { Vendor } from '../../../master/vendor/vendor';

@Component({
  selector: 'app-additemorderschedule',
  templateUrl: './additemorderschedule.component.html',
  styleUrls: ['./additemorderschedule.component.scss']
})
export class AdditemorderscheduleComponent implements OnInit {

  newEntry : ItemOrderSchedule = new ItemOrderSchedule();

  alertMsg : boolean = false;
  alertMessage : string = "";
  canInsert : boolean = true;
  alertType : any = "danger";
  entryFields : any ;
  entryFieldNames : any;

  currDate : Date = new Date();
  itemOrders : ItemOrder[];
  scheduleVendorIOs : any;
  itemOrderItemIds : any;
  itemOrderOrderNos : ItemOrder[];
  scheduleVendors : Vendor[];
  vendors : Vendor[];
  processStageNo : string;

  @ViewChild('selfClosingAlert', {static: true}) selfClosingAlert: NgbAlert;

  constructor(private helper : HelperService, 
              private apiHelper : ApiHelper) { }

  ngOnInit(): void {

    this.getItemOrders();
    this.getVendors();

    this.newEntry.scheduleDate = this.helper.getCurrDate();
    this.setScheduleValidDate();
    }

  save()
  {
    this.dataValidation(this.newEntry);

    if(this.canInsert)
    {
      this.apiHelper.add(ApiUrls.itemOrderScheduleApi, this.newEntry).subscribe(data =>
        {
          console.log(data);
          this.newEntry = new ItemOrderSchedule();
          this.alertMessage = " A new Record inserted Successfully.";
          this.alertMsg = true;
          this.alertType = "success";
          this.helper.reloadCurrentRoute();

        },error =>  { console.log(error); } );
        
    }

  }

  setDefaultValues()
  {
    this.newEntry.createdBy = "";
    this.newEntry.createdClient = "";
  }

  dataValidation(entry : ItemOrderSchedule)
  {
    this.alertMsg = false;

    this.entryFields = ['scheduleFor','itemOrderId','itemId','vendorScheduleReference','scheduleType','scheduleDate',
                        'scheduleNos','scheduleKgs','scheduleValidDate'];
    
    this.entryFieldNames = ['scheduleFor','itemOrderId','itemId','vendorScheduleReference','scheduleType','scheduleDate',
    'scheduleNos','scheduleKgs','scheduleValidDate'];      
    
    for(let i=0; i < this.entryFields.length; i++)
    {
      let field : any = this.entryFields[i];
      if(entry[field as keyof typeof entry] == null || entry[field as keyof typeof entry] == "")
      {
        //console.log(entry[field as keyof typeof entry]);
        this.alertMessage = this.entryFieldNames[i].charAt(0).toUpperCase() + this.entryFieldNames[i].slice(1) + " is Missing...";
        this.alertMsg = true;
      }
    }

    this.canInsert = !this.alertMsg;

  }

  getItemOrders()
  {
    this.apiHelper.getList(ApiUrls.itemOrderApi).subscribe(data => {

      this.itemOrders = data;
      this.getScheduleVendorItemOrders();
    }, error => { console.log(error);});
  }

  displayScheduleVendor(vendorId : string)
  {
    let scheduleVendors = this.vendors;
    let result = "";
    if(scheduleVendors != null)
    {
    scheduleVendors = scheduleVendors.filter( vnd => (vnd.vendorId).toString() == vendorId);
    if(scheduleVendors != null)
     {
        result = scheduleVendors[0].vendorName + " - " + scheduleVendors[0].vendorNameId;
     }
    }
    return result;
  }

  setScheduleValidDate()
  {
    let month = new Date(this.newEntry.scheduleDate).getMonth();
    let year = new Date(this.newEntry.scheduleDate).getFullYear();
    this.newEntry.scheduleValidDate = this.helper.getLastDayOfMonth(month, year);
  
  }

  getScheduleVendorItemOrders()
  {
     let scheduleVendorIOs= this.itemOrders;
     let svItemOrders = new Set();
     for(let itemOrder of scheduleVendorIOs)
     {
        svItemOrders.add(itemOrder.orderToVendorId);
     }
     this.scheduleVendorIOs = svItemOrders;
     
  }

  getItemOrderItemIds()
  {
    let itemOrderItemIds = this.itemOrders;
    console.log(itemOrderItemIds);
    if(this.newEntry.scheduleVendor != null)
    {
      itemOrderItemIds = itemOrderItemIds.filter(itemOrder => {

        return itemOrder.orderToVendorId == this.newEntry.scheduleVendor;
      });
      let psItemOrders = new Set();
      for(let itemOrder of itemOrderItemIds)
      {
         psItemOrders.add(itemOrder.processStageNo);
      }
      this.itemOrderItemIds = psItemOrders;
      
    }
  }

  getItemIdByProcessStageNo(processStageNo : string)
  {
    this.processStageNo = processStageNo;
      let itemOrderItemIds = this.itemOrders;
      itemOrderItemIds = itemOrderItemIds.filter(itemOrder => 
        {
          return (itemOrder.processStageNo == processStageNo 
                  && itemOrder.orderToVendorId == this.newEntry.scheduleVendor
                  )
        });
  
      return itemOrderItemIds[0].itemId;
    
  }

  getItemOrderOrderNos()
  {
    this.itemOrderOrderNos = this.itemOrders;

    if(this.newEntry.itemId != null)
    {
      this.itemOrderOrderNos = this.itemOrderOrderNos.filter(itemOrder => {

        return (itemOrder.itemId == this.newEntry.itemId
              && itemOrder.orderToVendorId == this.newEntry.scheduleVendor
              && itemOrder.processStageNo == this.processStageNo);
      });
    }
  }

  getVendors()
  {
    this.apiHelper.getList(ApiUrls.vendorApi).subscribe(data => {

      this.vendors = data;
      
    }, error => { console.log(error);});
  }

}
