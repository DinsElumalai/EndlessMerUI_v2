import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentPerformance } from '../../documentEntities/documentPerformance';
import { ApiUrls } from '../../../../services/api.urls';
import { ApiHelper } from '../../../../services/apiHelper';
import { Employee } from '../../../../master/employee/employee';
import { Observable } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../../../../services/helperService';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-performance',
  templateUrl: './list-performance.component.html',
  styleUrls: ['./list-performance.component.scss']
})
export class ListPerformanceComponent implements OnInit {

  entries : DocumentPerformance[];
  updateEntry : DocumentPerformance;
  getDetailId : any = "";
  isShowList : boolean = false;
  modelReference : any;
  retensionMonths = this.helperService.getRetensionMonths();
  entryFields : any;
  entryFieldNames : any;
  canUpdate : boolean = true; 
  showCreate : boolean = false;
  employees : Employee[];
  performanceRecords : DocumentPerformance[];

  staticAlertClosed = false;
  alertMessage = '';
  alertMsg = false;
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

  constructor(private apiHelper : ApiHelper, private modalService: NgbModal,
    public helperService : HelperService,) { }

  ngOnInit(): void {

    this.isShowList = true;
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

 

  getDetails()
  {
    this.apiHelper.getList(ApiUrls.docRecPerformanceApi).subscribe(data => {
      this.entries = data;
      this.performanceRecords = data;
      this.entries = this.entries.sort((a,b) => (a.docRecPerformanceId > b.docRecPerformanceId ? -1 : 1));
      this.entries = this.entries.filter(entry =>
        {
            if(this.getDetailId == null || this.getDetailId == "")
            {
              //let regDate = new Date(entry.createdDate);
              this.isShowList = true;
              //return (regDate.getDate() == new Date(this.helperService.getCurrDate()).getDate());
              return entry;
            }
            else
            {
              return entry.typeNo == this.getDetailId;
            }
        });
      });

  }

  openVerticallyCentered(content : any, entry : DocumentPerformance) 
  {
    this.updateEntry = entry;
    this.modelReference = this.modalService.open(content, { centered: true , size: 'xl'});

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

    this.canUpdate = !this.alertMsg;

  }

  updateRecord(entry : DocumentPerformance)
  {
    this.dataValidation(entry);

    if(this.canUpdate)
    {
      this.apiHelper.update(ApiUrls.docRecPerformanceApi + "/" + entry.docRecPerformanceId, entry).subscribe(data => 
        {
        //console.log(data);
        sessionStorage.setItem('mms_docu_tab', '1');
        this.modelReference.close('Save click');
        //this.helperService.reloadCurrentRoute();
        this.getDetails();
        });
    }
  }

}
