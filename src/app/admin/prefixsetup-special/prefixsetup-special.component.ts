import { Component, OnInit } from '@angular/core';
import { ApiUrls } from '../../services/api.urls';
import { ApiHelper } from '../../services/apiHelper';
import { HelperService } from '../../services/helperService';
import { PrefixSetupSpl } from './prefixsetupspl';

@Component({
  selector: 'app-prefixsetup-special',
  templateUrl: './prefixsetup-special.component.html',
  styleUrls: ['./prefixsetup-special.component.scss']
})
export class PrefixsetupSpecialComponent implements OnInit {

  entries : PrefixSetupSpl[];
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
    this.apiHelper.getList(ApiUrls.prefixSplApi).subscribe(data => {
      this.entries = data;
      this.entries = this.entries.sort((a,b) => (a.prefixSetupSplId > b.prefixSetupSplId ? -1 : 1));
    },error => {console.log(error);});
  }

  delete(entryId : string)
  {
    this.apiHelper.delete(ApiUrls.prefixSplApi, entryId).subscribe(data => {

        this.alertMessage = "Deleted the Record successfully.";
        this.alertMsg = true;
        this.alertType = "success";
        this.helperService.reloadCurrentRoute();

    },error => {console.log(error);});
  }


}
