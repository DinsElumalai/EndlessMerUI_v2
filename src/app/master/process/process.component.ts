import { Component, OnInit } from '@angular/core';
import { ApiUrls } from '../../services/api.urls';
import { ApiHelper } from '../../services/apiHelper';
import { HelperService } from '../../services/helperService';
import { Process } from './process';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {

  entries : Process[];
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
    this.apiHelper.getList(ApiUrls.processApi).subscribe(data => {
      this.entries = data;
      this.entries = this.entries.sort((a,b) => (a.processId > b.processId ? -1 : 1));
    },error => {console.log(error);});
  }

  delete(entryId : string)
  {
    this.apiHelper.delete(ApiUrls.processApi, entryId).subscribe(data => {

        this.alertMessage = "Deleted the Record successfully.";
        this.alertMsg = true;
        this.alertType = "success";
        this.helperService.reloadCurrentRoute();

    },error => {console.log(error);});
  }

}
