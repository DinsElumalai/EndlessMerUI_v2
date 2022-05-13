import { Component, OnInit } from '@angular/core';
import { ApiUrls } from '../../services/api.urls';
import { ApiHelper } from '../../services/apiHelper';
import { HelperService } from '../../services/helperService';
import { ItemOrderSchedule } from './itemOrderSchedule';

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
  filteredData : string;
  itemOrderSchedules : ItemOrderSchedule[];

  constructor(private apiHelper : ApiHelper,
              private helperService : HelperService) { }

  ngOnInit(): void 
  {
    this.getDetails();
  }

  getDetails()
  {
    this.apiHelper.getList(ApiUrls.itemOrderScheduleApi).subscribe(data => {
      this.entries = data;

      this.filterData();

      this.entries = this.entries.sort((a,b) => (a.itemOrderScheduleId > b.itemOrderScheduleId ? -1 : 1));
      this.itemOrderSchedules = this.entries;
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
