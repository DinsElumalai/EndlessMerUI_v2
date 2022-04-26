import { Component, OnInit, ViewChild } from '@angular/core';
import { HelperService } from '../../../services/helperService';
import { ApiHelper } from '../../../services/apiHelper';
import { ApiUrls } from '../../../services/api.urls';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { ItemOrderSchedule } from '../itemOrderSchedule';

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

  @ViewChild('selfClosingAlert', {static: true}) selfClosingAlert: NgbAlert;

  constructor(private helper : HelperService, 
              private apiHelper : ApiHelper) { }

  ngOnInit(): void {
  }

  save()
  {

  }

  setDefaultValues()
  {
    this.newEntry.createdBy = "";
    this.newEntry.createdClient = "";
  }

  dataValidation(entry : ItemOrderSchedule)
  {
    this.alertMsg = false;

    this.entryFields = ['scheduleFor', 'itemOrderId', 'vendorScheduleReference', 'scheduleType', 'scheduleDate', 'scheduleQtyInNos', 'scheduleQtyInKgs','scheduleValidUpto'];
    
    this.entryFieldNames = ['Schedule For', 'Item Order Id', 'Vendor Schedule Reference', 'Schedule Type', 'Schedule Date', 'Schedule Qty In Nos', 'Schedule Qty In Kgs','Schedule Valid Upto'];         
    
    for(let i=0; i < this.entryFields.length; i++)
    {
      let field : any = this.entryFields[i];
      if(entry[field as keyof typeof entry] == null || entry[field as keyof typeof entry] == "")
      {
        //console.log(entry[field as keyof typeof entry]);
        this.alertMessage = this.entryFieldNames[i] + " is Missing...";
        this.alertMsg = true;
      }
    }

    this.canInsert = !this.alertMsg;

  }

}
