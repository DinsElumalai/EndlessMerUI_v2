import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { ApiUrls } from '../../../../services/api.urls';
import { ApiHelper } from '../../../../services/apiHelper';
import { HelperService } from '../../../../services/helperService';
import { DocumentService } from '../../../../services/documentService';
import { TransactionRevision } from '../../documentEntities/transactionRevision';
import { ListPerformanceRevisionComponent } from '../list-performance-revision/list-performance-revision.component';

@Component({
  selector: 'app-add-performance-revision',
  templateUrl: './add-performance-revision.component.html',
  styleUrls: ['./add-performance-revision.component.scss']
})
export class AddPerformanceRevisionComponent implements OnInit {

  newRecord : TransactionRevision = new TransactionRevision();
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
    private list : ListPerformanceRevisionComponent) { }

  ngOnInit(): void 
  {
  }

  save()
  {
    this.dataValidation(this.newRecord);
    if(this.canInsert)
    {
         //console.log(this.newRecord);
         this.apiHelper.add(ApiUrls.docRecPerformanceRevisionApi, this.newRecord).subscribe(data => 
          {
            
            let insertedRecord : any = data;
            //console.log(insertedRecord);
            this.newRecord = new TransactionRevision();
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

  dataValidation(entry : TransactionRevision)
  {
    this.alertMsg = false;
    this.setDefaultValues();

    this.entryFields = ['docRecPerId','revisionNo', 'revisionDate', 'revisionReason'];
    
    this.entryFieldNames = ['Doc Performance Id', 'Revision No', 'Revision Date', 'Revision Reason'];         
    
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
