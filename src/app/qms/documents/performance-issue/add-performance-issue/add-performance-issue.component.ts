import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { ApiUrls } from '../../../../services/api.urls';
import { ApiHelper } from '../../../../services/apiHelper';
import { HelperService } from '../../../../services/helperService';
import { DocumentService } from '../../../../services/documentService';
import { TransactionIssue } from '../../documentEntities/transactionIssue';
import { ListPerformanceIssueComponent } from '../list-performance-issue/list-performance-issue.component';

@Component({
  selector: 'app-add-performance-issue',
  templateUrl: './add-performance-issue.component.html',
  styleUrls: ['./add-performance-issue.component.scss']
})
export class AddPerformanceIssueComponent implements OnInit {

  newRecord : TransactionIssue = new TransactionIssue();
  performanceRecord : any;
  canInsert : boolean = true;
  performanceRecords : any;
  entryFields : any;
  entryFieldNames : any;
  staticAlertClosed = true;
  alertMessage = '';
  alertMsg = false;
  alertType = "danger";
  @ViewChild('selfClosingAlert', {static: true}) selfClosingAlert: NgbAlert;

  constructor(private documentService : DocumentService,
    private apiHelper : ApiHelper,
    private helperService : HelperService,
    private list : ListPerformanceIssueComponent) { }

  ngOnInit(): void 
  {

    this.newRecord.active = true;
  }

  save()
  {
    this.dataValidation(this.newRecord);
    if(this.canInsert)
    {
         //console.log(this.newRecord);
         this.apiHelper.add(ApiUrls.docRecPerformanceIssueApi, this.newRecord).subscribe(data => 
          {
            
            let insertedRecord : any = data;
            //console.log(insertedRecord);
            this.newRecord = new TransactionIssue();
            this.alertMessage = "A New Record inserted Successfully";
            this.alertMsg = true;
            this.alertType = "success";
            this.list.getDetails();

          },error => console.log(error));
    }
  }

  
  setDefaultValues()
  {
    this.newRecord.docRecPerId = this.list.getGetDetailId();
  }

  dataValidation(entry : TransactionIssue)
  {
    this.alertMsg = false;
    this.setDefaultValues();

    this.entryFields = ['docRecPerId','issueNo', 'issueDate', 'issueReason'];
    
    this.entryFieldNames = ['Doc Rec Per Id','Issue No', 'Issue Date', 'Issue Reason'];         
    
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

  
}
