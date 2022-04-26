import { Component, OnInit } from '@angular/core';
import { DocumentPerformance } from '../../documentEntities/documentPerformance';
import { Employee } from '../../../../master/employee/employee';
import { Router } from '@angular/router';
import { ApiUrls } from '../../../../services/api.urls';
import { ApiHelper } from '../../../../services/apiHelper';
import { HelperService } from '../../../../services/helperService';
import { DocumentService } from '../../../../services/documentService';
import { ListPerformanceComponent } from '../list-performance/list-performance.component';

@Component({
  selector: 'app-add-performance',
  templateUrl: './add-performance.component.html',
  styleUrls: ['./add-performance.component.scss']
})
export class AddPerformanceComponent implements OnInit {

  constructor(private apiHelper : ApiHelper, 
              public helperService : HelperService,
              private router: Router,
              private documentService : DocumentService,
              private listComponent : ListPerformanceComponent) { }

  retensionMonths = this.helperService.getRetensionMonths();
  newRecord : DocumentPerformance = new DocumentPerformance();
  canInsert : boolean = true;
  alertMessage : string = "";
  alertMsg : boolean = false;
  entryFields : any;
  entryFieldNames : any;
  employees : Employee[];

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

  dataValidation(entry : DocumentPerformance)
  {
    this.alertMsg = false;

    this.entryFields = ['type', 'typeDepartmentName', 'typePurpose', 'implementedBy', 'implementedOn',
                   'retensionMonth', 'retainedLocation', 'kpiRequired', 'kpiValueMustBe',
                  'fileLocation', 'active', 'typeNo'];
    
    this.entryFieldNames = ['Type', 'Type Department Name', 'Type Purpose', 'Implemented By', 'Implemented On',
                        'Retension Month', 'Retained Location', 'Kpi Required', 'Kpi Value MustBe',
                        'File Location', 'Active', 'Type No']             
    
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


  save()
  {
    this.dataValidation(this.newRecord);
    if(this.canInsert)
    {
        console.log(this.newRecord);
         this.apiHelper.add(ApiUrls.docRecPerformanceApi, this.newRecord).subscribe(data => 
          {
            
            let insertedRecord : any = data;
            //console.log(insertedRecord);
            this.documentService.setPerformanceDocRecId(insertedRecord.docRecPerformanceId);
            this.newRecord = new DocumentPerformance();
            this.listComponent.getDetails();

          },error => console.log(error));
    }
  }



}
