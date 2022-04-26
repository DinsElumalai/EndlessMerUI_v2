import { Component, OnInit, ViewChild } from '@angular/core';
import { EntranceRegister } from '../../entranceRegister';
import { ApiUrls } from '../../../services/api.urls';
import { ApiHelper } from '../../../services/apiHelper';
import { Observable } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../../../services/helperService';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../../../master/employee/employee';
import { SessionHelper } from '../../../services/sessionHelper';

@Component({
  selector: 'app-listempreg',
  templateUrl: './listempreg.component.html',
  styleUrls: ['./listempreg.component.scss']
})
export class ListempregComponent implements OnInit {

  entries : EntranceRegister[];
  updateEntry : EntranceRegister;
  upExitdttm : boolean = false;
  exitDate : any;
  exitTime : any;
  isShowList : boolean = false;
  getDetailDate : Date;
  modelReference : any;
  canUpdate : boolean = true;
  setExitInfo : boolean = false;
  employees : Employee[];
  showExitTimeOption : boolean = false;
  showUpdatedExitTime : boolean = false;
  
  setEtime : boolean = true;
  setEtimeOption : boolean = false;

  updateRole : boolean = false;
  exitUpdateRole : boolean = false;

  staticAlertClosed = false;
  alertMessage = '';
  alertMsg = false;
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

  constructor(private apiHelper : ApiHelper, private modalService: NgbModal,
              public helperService : HelperService,private sessionHelper : SessionHelper) { }

  

    ngOnInit(): void {

      this.getDetailDate = new Date();
      this.isShowList = true;
      this.getDetails();
      this.getEmployees();
      this.exitTime = this.helperService.getCurrTime();
      this.exitDate = this.helperService.getCurrDate();
      this.updateRole = this.sessionHelper.checkUserRole("rl_entrReg_emp_update");
      this.exitUpdateRole = this.sessionHelper.checkUserRole("rl_entrReg_emp_entryedit");
  }


    getDetails()
    {
      this.apiHelper.getList(ApiUrls.entranceRegApi).subscribe(data => {
                            this.entries = data;
                            this.entries = this.entries.sort((a,b) => (a.entranceRegId > b.entranceRegId ? -1 : 1));
                            this.entries = this.entries.filter(entry => {return entry.registerType == "Employee"});
                            this.entries = this.entries.filter(entry =>
                              {
                                let regDate = new Date(entry.entryTime);
                                let serDate = new Date(this.getDetailDate);
                                  if(this.getDetailDate != null)
                                  {
                                    this.isShowList = true;
                                    return ((regDate.getDate() == serDate.getDate() && 
                                            regDate.getMonth() == serDate.getMonth() &&
                                            regDate.getFullYear() == serDate.getFullYear()) || entry.exitTime == null);
                                  }
                                  else
                                    return ((regDate.getDate() == new Date().getDate()) || entry.exitTime == null);
                              });
                              //console.log(this.entries);
                                                                    });
         //console.log(this.entries);
        
    }

    getEmployees()
    {
      this.helperService.getEmployees().subscribe(data => 
                      {
                          this.employees =  data;
                      }, error => {console.log(error);});
    }

    setExitTime()
    {
      if(this.upExitdttm)
      {
        this.setEtime = false;
        this.exitTime = this.helperService.getCurrTime();
        this.exitDate = this.helperService.getCurrDate();
      }
      else
      {
        this.setEtime = true;
      }
    }

    getVendorFromEmployee()
    {
      let employees = this.employees;
      let employee = employees.filter(emp =>{  return (emp.employeeId == Number(this.updateEntry.personName)) }) || new Employee();
      
      this.apiHelper.get(ApiUrls.vendorApi + "/" + employee[0].vendorId).subscribe(data => 
                                        {
                                          //console.log(data);
                                          this.updateEntry.vendorName = data.vendorName;
                                          this.updateEntry.vendorId = data.vendorId;
                                        });
      
    }

    openVerticallyCentered(content : any, entry : EntranceRegister) 
    {
      this.showUpdatedExitTime = false;
      this.showExitTimeOption = false;
      this.updateEntry = entry;
      if(entry.exitTime != null)
        this.showUpdatedExitTime = true;
      else
        this.showExitTimeOption = true;

      if(this.exitUpdateRole)
      {
        this.showExitTimeOption = true;
      }
      this.modelReference = this.modalService.open(content, { centered: true , size: 'lg'});

    }
    
    updateEntranceRegister(entry : EntranceRegister)
    {

      entry = this.dataValidation(entry);
      if(this.canUpdate)
          this.apiHelper.update(ApiUrls.entranceRegApi + "/" + entry.entranceRegId, entry).subscribe(data => 
            {
            //console.log(data);
            let returnedEntry : any = data;
            if(returnedEntry.roundedExitTime != null)
            {
              returnedEntry.rdurationHrs = this.helperService.dateTimeDiff(returnedEntry.roundedEntryTime, returnedEntry.roundedExitTime, "hrmins");
              returnedEntry.rdurationMins = this.helperService.dateTimeDiff(returnedEntry.roundedEntryTime, returnedEntry.roundedExitTime, "mins");
              this.apiHelper.update(ApiUrls.entranceRegApi + "/" + returnedEntry.entranceRegId, returnedEntry).subscribe(result => { //console.log(result);
              });
            }
            sessionStorage.setItem('mms_entrreg_tab', '1');
            this.modelReference.close('Save click');
            this.helperService.reloadCurrentRoute();
            //this.getDetails();
            });
      
    }

    dataValidation(entry : EntranceRegister)
    {
      this.alertMsg = false;
      this.canUpdate = true;
      if(this.upExitdttm)
      {
        this.setExitInfo = false;
        entry.exitTime = this.helperService.dateTimeConcat(this.exitDate, this.exitTime );
        
        this.entryExitCompare(entry.entryTime, entry.exitTime)
        
      }
      
      let updatedEntry = this.setDefaultData(entry);
      if(this.alertMsg)
            this.canUpdate = false;
      else
            this.canUpdate = true;

      //console.log(this.canUpdate );

      return updatedEntry;
    }

    
    entryExitCompare(entryDate : Date, exitDate : Date)
    {
      if(exitDate < new Date(entryDate))
        {
          this.alertMessage = "Exit Date can't be lesser than Entry Date";
          this.alertMsg = true;
        }
      else
      {
        this.setExitInfo = true;
      }
    }

    setDefaultData(entry : EntranceRegister)
    {
      if(this.setExitInfo)
      {
        //entry.exitTime = this.helperService.dateTimeConcat(this.exitDate, this.exitTime);
        entry.roundedExitTime = this.helperService.getRoundedDate(this.sessionHelper.getSoftwareSetupInfo("exitMins"), entry.exitTime );

        
        if(entry.exitCreatedDate == null)
            entry.exitCreatedDate = this.helperService.getCurrDateTime();
        //entry.exitCreatedBy = "";

        //this.entryExitCompare(entry.entryTime, entry.exitTime);
      }    
   
      return entry;
    }

}
