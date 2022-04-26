import { Component, OnInit } from '@angular/core';
import { HsnCode } from './hsncode';
import { ApiUrls } from '../../services/api.urls';
import { ApiHelper } from '../../services/apiHelper';
import { HelperService } from '../../services/helperService';

@Component({
  selector: 'app-hsncode',
  templateUrl: './hsncode.component.html',
  styleUrls: ['./hsncode.component.scss']
})
export class HsncodeComponent implements OnInit {

  entries : HsnCode[];
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
    this.apiHelper.getList(ApiUrls.hsncodeApi).subscribe(data => {
      this.entries = data;
      this.entries = this.entries.sort((a,b) => (a.hsnId > b.hsnId ? -1 : 1));
    },error => {console.log(error);});
  }

  delete(entryId : string)
  {
    this.apiHelper.delete(ApiUrls.hsncodeApi, entryId).subscribe(data => {

        this.alertMessage = "Deleted the Record successfully.";
        this.alertMsg = true;
        this.alertType = "success";
        this.helperService.reloadCurrentRoute();

    },error => {console.log(error);});
  }

}
