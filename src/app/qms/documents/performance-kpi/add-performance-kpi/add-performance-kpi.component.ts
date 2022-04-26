import { Component, OnInit, ViewChild } from '@angular/core';

import { ApiUrls } from '../../../../services/api.urls';
import { ApiHelper } from '../../../../services/apiHelper';
import { HelperService } from '../../../../services/helperService';
import { DocumentService } from '../../../../services/documentService';
import { TransactionKpi } from '../../documentEntities/transactionKpi';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { ListPerformanceKpiComponent } from '../list-performance-kpi/list-performance-kpi.component';

@Component({
  selector: 'app-add-performance-kpi',
  templateUrl: './add-performance-kpi.component.html',
  styleUrls: ['./add-performance-kpi.component.scss']
})
export class AddPerformanceKpiComponent implements OnInit {

  constructor(private documentService : DocumentService,
              private apiHelper : ApiHelper,
              private helperService : HelperService,
              private listComponent : ListPerformanceKpiComponent) { }

  retensionMonths : any;

  newRecord : TransactionKpi = new TransactionKpi();
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

  ngOnInit(): void 
  {
    this.retensionMonths = this.helperService.getRetensionMonths();
  }

  save()
  {
    this.dataValidation(this.newRecord);
    if(this.canInsert)
    {
         //console.log(this.newRecord);
         this.apiHelper.add(ApiUrls.docRecPerformanceKpiApi, this.newRecord).subscribe(data => 
          {
            
            let insertedRecord : any = data;
            //console.log(insertedRecord);
            this.newRecord = new TransactionKpi();
            this.listComponent.getDetails();
            this.alertMessage = "A new Record inserted..";
            this.alertType = "success";
            this.alertMsg = true;

          },error => console.log(error));
    }
  }

  setDefaultValues()
  {
    this.newRecord.docRecPerId = this.listComponent.getGetDetailId();
  }

  dataValidation(entry : TransactionKpi)
  {
    this.alertMsg = false;
    this.setDefaultValues();

    this.entryFields = ['docRecPerId','kpiFromMonthYear', 'kpiFrequnecyMonth', 'kpiUom', 'kpiTargetValue'];
    
    this.entryFieldNames = ['Doc Rec Per Id', 'Kpi From Month Year', 'Kpi Frequnecy Month', 'Kpi Uom', 'kpi Target Value'];         
    
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
