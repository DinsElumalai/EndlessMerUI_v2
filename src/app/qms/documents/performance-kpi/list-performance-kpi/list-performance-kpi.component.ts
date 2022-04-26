import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiUrls } from '../../../../services/api.urls';
import { ApiHelper } from '../../../../services/apiHelper';
import { Observable } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../../../../services/helperService';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { TransactionKpi } from '../../documentEntities/transactionKpi';
import { DocumentPerformance } from '../../documentEntities/documentPerformance';

@Component({
  selector: 'app-list-performance-kpi',
  templateUrl: './list-performance-kpi.component.html',
  styleUrls: ['./list-performance-kpi.component.scss']
})
export class ListPerformanceKpiComponent implements OnInit {

  entries : TransactionKpi[];
  updateEntry : TransactionKpi;
  getDetailId : any = "";
  isShowList : boolean = false;
  entryFields : any;
  entryFieldNames : any;
  canUpdate : boolean = true; 
  showCreate : boolean = false;
  retensionMonths : any;
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

  }

  getDetails()
  {
    //console.log(this.getDetailId);
    this.apiHelper.getList(ApiUrls.docRecPerformanceKpiApi).subscribe(data => {
      this.entries = data;
      this.entries = this.entries.sort((a,b) => (a.kpiId > b.kpiId ? -1 : 1));
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

  
  dataValidation(entry : TransactionKpi)
  {
    this.alertMsg = false;

    this.entryFields = ['kpiFromMonthYear', 'kpiFrequnecyMonth', 'kpiUom', 'kpiTargetValue'];
    
    this.entryFieldNames = ['Kpi From Month Year', 'Kpi Frequnecy Month', 'Kpi Uom', 'kpi Target Value'];         
    
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

  updateRecord(entry : TransactionKpi)
  {
    this.dataValidation(entry);
    if(this.canUpdate)
    {
      this.apiHelper.update(ApiUrls.docRecPerformanceKpiApi + "/" + entry.kpiId, entry).subscribe(data => 
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
