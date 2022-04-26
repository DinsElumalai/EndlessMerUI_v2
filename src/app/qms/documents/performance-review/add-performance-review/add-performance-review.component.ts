import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { ApiUrls } from '../../../../services/api.urls';
import { ApiHelper } from '../../../../services/apiHelper';
import { HelperService } from '../../../../services/helperService';
import { DocumentService } from '../../../../services/documentService';
import { Employee } from '../../../../master/employee/employee';
import { TransactionReview } from '../../documentEntities/transactionReview';
import { ListPerformanceReviewComponent } from '../list-performance-review/list-performance-review.component';

@Component({
  selector: 'app-add-performance-review',
  templateUrl: './add-performance-review.component.html',
  styleUrls: ['./add-performance-review.component.scss']
})
export class AddPerformanceReviewComponent implements OnInit {

  
  newRecord : TransactionReview = new TransactionReview();
  performanceRecord : any;
  canInsert : boolean = true;
  performanceRecords : any;
  entryFields : any;
  entryFieldNames : any;
  staticAlertClosed = true;
  employees : Employee[];
  alertMessage = '';
  alertMsg = false;
  alertType = "danger";
  @ViewChild('selfClosingAlert', {static: true}) selfClosingAlert: NgbAlert;

  constructor(private documentService : DocumentService,
    private apiHelper : ApiHelper,
    public helperService : HelperService,
    private list : ListPerformanceReviewComponent) { }

  ngOnInit(): void 
  {
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
         //console.log(this.newRecord);
         this.apiHelper.add(ApiUrls.docRecPerformanceReviewApi, this.newRecord).subscribe(data => 
          {
            
            let insertedRecord : any = data;
            //console.log(insertedRecord);
            this.newRecord = new TransactionReview();
            this.alertMessage = "A new Record Insert Successfully";
            this.alertType = "success";
            this.alertMsg = true;
            this.list.getDetails();

          },error => console.log(error));
    }
  }

  setDefaultValues()
  {
    this.newRecord.docRecPerId = this.list.getGetDetailId();
  }

  dataValidation(entry : TransactionReview)
  {
    this.alertMsg = false;
    this.setDefaultValues();

    this.entryFields = ['docRecPerId', 'reviewDate', 'employeeId', 'reviewComments'];
    
    this.entryFieldNames = ['Doc Rec Per Id', 'Review Date', 'Employee Id', 'Review Comments'];         
    
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
