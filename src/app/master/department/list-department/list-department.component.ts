import { Component, OnInit } from '@angular/core';
import { Department } from '../department';
import { ApiUrls } from '../../../services/api.urls';
import { ApiHelper } from '../../../services/apiHelper';
import { HelperService } from '../../../services/helperService';

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.scss']
})
export class ListDepartmentComponent implements OnInit {


  entries : Department[];
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
      this.entries = this.entries.sort((a,b) => (a.departmentId > b.departmentId ? -1 : 1));
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
