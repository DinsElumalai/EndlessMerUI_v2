import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiUrls } from '../../../../services/api.urls';
import { ApiHelper } from '../../../../services/apiHelper';
import { Observable } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../../../../services/helperService';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../../../../master/employee/employee';
import { TransactionReview } from '../../documentEntities/transactionReview';
import { DocumentPerformance } from '../../documentEntities/documentPerformance';

@Component({
  selector: 'app-list-performance-review',
  templateUrl: './list-performance-review.component.html',
  styleUrls: ['./list-performance-review.component.scss']
})
export class ListPerformanceReviewComponent implements OnInit {

  entries : TransactionReview[];
  updateEntry : TransactionReview;
  getDetailId : any = "";
  isShowList : boolean = false;
  entryFields : any;
  entryFieldNames : any;
  canUpdate : boolean = true; 
  showCreate : boolean = false;
  retensionMonths : any;
  employees : Employee[];
  performanceRecords : DocumentPerformance[];
  performanceRecord : any;

  staticAlertClosed = true;
  alertMessage = '';
  alertMsg = false;
  alertType = "danger";
  @ViewChild('selfClosingAlert', {static: true}) selfClosingAlert: NgbAlert;

  constructor(private apiHelper : ApiHelper, private modalService: NgbModal,
    private helperService : HelperService,) { }

  ngOnInit(): void {

    this.isShowList = true;
    this.getDetails();  
    this.getPerformanceRecords();
    this.retensionMonths = this.helperService.getRetensionMonths(); 
    this.getEmployees(); 

  }

  getEmployees()
  {
    this.helperService.getEmployees().subscribe(data => 
                    {
                        this.employees =  data;
                    }, error => {console.log(error);});
  }

  getDetails()
  {
    //console.log(this.getDetailId);
    this.apiHelper.getList(ApiUrls.docRecPerformanceReviewApi).subscribe(data => {
      this.entries = data;
      this.entries = this.entries.sort((a,b) => (a.reviewId > b.reviewId ? -1 : 1));
      this.entries = this.entries.filter(entry =>
        {
          
          if(this.getDetailId == null || this.getDetailId == "")
            {
              let regDate = new Date(entry.createdDate);
              this.isShowList = true;
              return (regDate.getDate() == new Date(this.helperService.getCurrDate()).getDate());
            }
            else
            {
              return entry.docRecPerId == this.getDetailId;
            }
            
        });
      });

  }

  
  dataValidation(entry : TransactionReview)
  {
    this.alertMsg = false;

    this.entryFields = ['reviewDate', 'employeeId', 'reviewComments'];
    
    this.entryFieldNames = ['Review Date', 'Reviewed By', 'Review Comments'];         
    
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

    this.canUpdate = !this.alertMsg;

  }

  updateRecord(entry : TransactionReview)
  {
    this.dataValidation(entry);
    if(this.canUpdate)
    {
      this.apiHelper.update(ApiUrls.docRecPerformanceReviewApi + "/" + entry.reviewId, entry).subscribe(data => 
        {
        //console.log(data);
          this.alertType = "success";
          this.alertMessage = "Updated Successfully...";
          this.alertMsg = true;
        this.getDetails();
        });
    }
  }

  getGetDetailId()
  {
    return this.getDetailId;
  }

  getPerformanceRecords()
  {
    this.apiHelper.getList(ApiUrls.docRecPerformanceApi).subscribe(data => {
                              this.performanceRecords = data;
                        },error => {console.log(error);});
  }

  //Get the last inserted record for the table
  getPerformanceRecord()
  {

    if(this.getDetailId != null || this.getDetailId != "")
        this.apiHelper.get(ApiUrls.docRecPerformanceApi + "/" + this.getDetailId)
              .subscribe( data => 
                              {
                                  //console.log(data);
                                  //this.newRecord.docRecPerId = data.docRecPerformanceId;
                                  this.performanceRecord = data;
                              },
                          error => { 
                            console.log(error);
                            this.getDetailId = "";
                          });
     
      
  }

}
