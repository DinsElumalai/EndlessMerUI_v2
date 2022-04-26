import { Component, OnInit, Input } from '@angular/core';
import { DocumentService } from '../../../../services/documentService';
import { TransactionResponsibility } from '../../documentEntities/transactionResponsibilty';
import { ApiUrls } from '../../../../services/api.urls';
import { ApiHelper } from '../../../../services/apiHelper';
import { HelperService } from '../../../../services/helperService';
import { Employee } from '../../../../master/employee/employee';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { ListPerformanceResponsibilityComponent } from '../list-performance-responsibility/list-performance-responsibility.component';

@Component({
  selector: 'app-add-performance-responsibility',
  templateUrl: './add-performance-responsibility.component.html',
  styleUrls: ['./add-performance-responsibility.component.scss']
})
export class AddPerformanceResponsibilityComponent implements OnInit {

  constructor(private documentService : DocumentService,
              private apiHelper : ApiHelper,
              public helperService : HelperService,
              private listComponent : ListPerformanceResponsibilityComponent) { }

  newRecord : TransactionResponsibility = new TransactionResponsibility();
  performanceRecord : any;
  canInsert : boolean = true;
  performanceRecords : any;
  alertMsg : boolean = false;
  alertMessage : string = "";
  entryFields : any;
  entryFieldNames : any;
  alertType : string = "danger";
  employees : Employee[];


  ngOnInit(): void 
  {

    //this.getPerformanceRecords();
    this.getEmployees();

  }

  getEmployees()
  {
    this.helperService.getEmployees().subscribe(data => 
                    {
                        this.employees =  data;
                    }, error => {console.log(error);});
  }

  

  save()
  {
    this.dataValidation(this.newRecord);
    if(this.canInsert)
    {
         console.log(this.newRecord);
         this.apiHelper.add(ApiUrls.docRecPerformanceResponsibilityApi, this.newRecord).subscribe(data => 
          {
            
            let insertedRecord : any = data;
            //console.log(insertedRecord);
            this.newRecord = new TransactionResponsibility();
            this.listComponent.getDetails();
            this.alertMessage = "A new Record inserted..";
            this.alertType = "success";
            this.alertMsg = true;
            
          },error => console.log(error));
    }
  }

  dataValidation(entry : TransactionResponsibility)
  {
    this.alertMsg = false;
    this.setDefaultValues();

    this.entryFields = ['docRecPerId','responsibilityFromDate', 'responsibilityEmployeeId', 'responsibilityApproverEmployeeId'];
    
    this.entryFieldNames = ['Doc Rec Per Id','Responsibility From Date', 'Responsibility Employee Id', 'Responsibility Approver Employee Id']             
    
    for(let i=0; i < this.entryFields.length; i++)
    {
      let field : any = this.entryFields[i];
      if(entry[field as keyof typeof entry] == null || entry[field as keyof typeof entry] == "")
      {
        //console.log(entry[field as keyof typeof entry]);
        this.alertType = "danger";
        this.alertMessage = this.entryFieldNames[i] + " is Missing...";
        
        this.alertMsg = true;
      }
    }

    this.canInsert = !this.alertMsg;

  }

  setDefaultValues()
  {
    this.newRecord.docRecPerId = this.listComponent.getGetDetailId();
  }

  
 

}
