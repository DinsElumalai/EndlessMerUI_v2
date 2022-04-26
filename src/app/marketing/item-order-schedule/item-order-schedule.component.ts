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

  constructor(private apiHelper : ApiHelper,
              private helperService : HelperService) { }

  ngOnInit(): void 
  {
    this.getDetails();
  }

  getDetails()
  {
    this.apiHelper.getList(ApiUrls.departmentApi).subscribe(data => {
      this.entries = data;
      this.entries = this.entries.sort((a,b) => (a.itemOrderScheduleId > b.itemOrderScheduleId ? -1 : 1));
    },error => {console.log(error);});
  }

  delete(entryId : string)
  {
    this.apiHelper.delete(ApiUrls.departmentApi, entryId).subscribe(data => {

        this.alertMessage = "Deleted the Record successfully.";
        this.alertMsg = true;
        this.alertType = "success";
        this.helperService.reloadCurrentRoute();

    },error => {console.log(error);});
  }

}
