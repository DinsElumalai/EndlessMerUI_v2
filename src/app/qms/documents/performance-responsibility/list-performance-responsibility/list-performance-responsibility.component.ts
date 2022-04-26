import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiUrls } from '../../../../services/api.urls';
import { ApiHelper } from '../../../../services/apiHelper';
import { Observable } from 'rxjs';
import { Employee } from '../../../../master/employee/employee';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../../../../services/helperService';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { TransactionResponsibility } from '../../documentEntities/transactionResponsibilty';
import { DocumentPerformance } from '../../documentEntities/documentPerformance';

@Component({
  selector: 'app-list-performance-responsibility',
  templateUrl: './list-performance-responsibility.component.html',
  styleUrls: ['./list-performance-responsibility.component.scss']
})
export class ListPerformanceResponsibilityComponent implements OnInit {

  entries : TransactionResponsibility[];
  updateEntry : TransactionResponsibility;
  getDetailId : string = "";
  isShowList : boolean = false;
  entryFields : any;
  entryFieldNames : any;
  canUpdate : boolean = true; 
  showCreate : boolean = false;
  employees : Employee[];
  performanceRecords : DocumentPerformance[];
  performanceRecord : any;

  staticAlertClosed = true;
  alertMessage = '';
  alertMsg = false;
  alertType = "danger";
  @ViewChild('selfClosingAlert', {static: true}) selfClosingAlert: NgbAlert;

  constructor(private apiHelper : ApiHelper, private modalService: NgbModal,
    public helperService : HelperService,
    ) { }

  ngOnInit(): void {

    this.isShowList = true;
    this.getPerformanceRecords();
    this.getDetails(); 
    this.getEmployees();   

  }

  getEmployees()
  {
    this.helperService.getEmployees().subscribe(data => 
                    {
                        this.employees =  data;
                    }, error => {console.log(error);});
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

  getDetails()
  {
    this.apiHelper.getList(ApiUrls.docRecPerformanceResponsibilityApi).subscribe(data => {
      this.entries = data;
      this.entries = this.entries.sort((a,b) => (a.responsibilityId > b.responsibilityId ? -1 : 1));
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

  
  dataValidation(entry : TransactionResponsibility)
  {
    this.alertMsg = false;
    this.getPerformanceRecord();

    this.entryFields = ['responsibilityFromDate', 'responsibilityEmployeeId', 'responsibilityApproverEmployeeId'];
    
    this.entryFieldNames = ['Responsibility From Date', 'Responsibility Employee Id', 'Responsibility Approver Employee Id']             
    
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

  updateRecord(entry : TransactionResponsibility)
  {
    this.dataValidation(entry);
    if(this.canUpdate)
    {
      this.apiHelper.update(ApiUrls.docRecPerformanceResponsibilityApi + "/" + entry.responsibilityId, entry).subscribe(data => 
        {
        //console.log(data);
        sessionStorage.setItem('mms_docu_tab', '2');
          this.alertType = "success";
          this.alertMessage = "Updated Successfully...";
          this.alertMsg = true;
        //this.helperService.reloadCurrentRoute();
        this.getDetails();
        });
    }
  }

}
