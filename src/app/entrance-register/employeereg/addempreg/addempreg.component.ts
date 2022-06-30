import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ApiUrls } from '../../../services/api.urls';
import { ApiHelper } from '../../../services/apiHelper';
import { HelperService } from '../../../services/helperService';
import { EntranceRegister } from '../../entranceRegister';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../../../master/employee/employee';
import { SessionHelper } from '../../../services/sessionHelper';

@Component({
  selector: 'app-addempreg',
  templateUrl: './addempreg.component.html',
  styleUrls: ['./addempreg.component.scss']
})
export class AddempregComponent implements OnInit {

  constructor(private modalService: NgbModal, public helperService : HelperService,
    private apiHelper : ApiHelper, private router: Router, private sessionHelper : SessionHelper) { }



    staticAlertClosed = false;
    alertMessage = '';
    alertMsg = false;
    @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

    newEntry : EntranceRegister = new EntranceRegister();
    currDate : string;
    entryDate : Date ;
    entryTime : any;
    exitDate : Date ;
    exitTime : Date;
    canInsert : boolean = true;
    modelReference : any;
    employees : Employee[];
    employeesList : Employee[];
    empSelectedValue : any;
    setEtime : boolean = true;
    setEtimeOption : boolean = false;


    ngOnInit(): void {

        this.entryDate = new Date();
        this.getEmployees();
        this.entryTime = this.helperService.getCurrTime();

    }

    save()
    {
        this.dataValidation();
        this.setDefaultData();
        //this.canInsert = false;
        if(this.canInsert)
        {
            this.apiHelper.add(ApiUrls.entranceRegApi, this.newEntry).subscribe(data => 
                              {
                                //console.log(data);
                                this.newEntry = new EntranceRegister();
                                sessionStorage.setItem('mms_entrreg_tab', '1');
                                this.modelReference.close('Save click');
                                this.helperService.reloadCurrentRoute();
                              },error => console.log(error));
        }

    }

    showName(empCode : any)
    {
      let employees = this.employees;
      empCode = empCode.split("-")[0].trim();
      let employee = employees.filter(emp =>{ return (emp.employeeOurCode == empCode)}) || new Employee();
      
      if(employee.length > 0)
      {
        this.newEntry.employeeId = employee[0].employeeId.toString();
        this.getVendorFromEmployee();
      }
      else{
        this.empSelectedValue = "";
        this.newEntry.employeeId = "";
        this.newEntry.personName = "";
        this.newEntry.vendorId = "";
      }
    }

    setEntryTime()
    {
      if(this.setEtimeOption)
      {
        this.entryTime = this.helperService.getCurrTime();
        if(this.sessionHelper.checkUserRole("rl_entrReg_emp_entryedit"))
          this.setEtime = false;
      }
    }

    
    getEmployees()
    {
      this.helperService.getEmployees().subscribe(data => 
                      {
                          this.employees =  data;
                          this.employeesList = data;

                          this.employeesList = this.employeesList.filter(emp => { return emp.resigned == false;});
                      }, error => {console.log(error);});
    }

    getVendorFromEmployee()
    {
      let employees = this.employees;
      let employee = employees.filter(emp =>{ return (emp.employeeId == Number(this.newEntry.employeeId))}) || new Employee();
      
      
      this.apiHelper.get(ApiUrls.vendorApi + "/" + employee[0].vendorId).subscribe(data => 
                                        {
                                          //console.log(data);
                                          this.newEntry.personName = employee[0].employeeName;
                                          this.newEntry.vendorName = data.vendorName;
                                          this.newEntry.vendorId = employee[0].vendorId;
                                        });
      
    }
    

      setDefaultData()
      {
        
          this.newEntry.entryTime = this.helperService.dateTimeConcat(this.helperService.getCurrDate(), this.entryTime );
          //console.log(this.newEntry.entryTime);
          this.newEntry.registerType = "Employee";
          this.newEntry.registerDate = new Date();
          //this.newEntry.createdBy = "";
          this.newEntry.roundedEntryTime = this.helperService.getRoundedDate(this.sessionHelper.getSoftwareSetupInfo("entryMins"), this.newEntry.entryTime);
          this.newEntry.entryCreatedDate = this.helperService.getCurrDateTime();

          this.dataValidation();
      }

      openVerticallyCentered(content : any) 
      {
          this.modelReference = this.modalService.open(content, { centered: true , size: 'lg'});
      }

      dataValidation()
      {
          this.canInsert = true;
          if(this.newEntry.employeeId == null || this.newEntry.employeeId == "")
          {
          this.alertMsg = false;
          this.canInsert = false;
          this.alertMessage = "Employee Id is Mandatory...";
          this.alertMsg = true;
          }

          if(this.newEntry.entryTime == null)
          {
            this.canInsert = false;
          }

          if(!this.setEtimeOption)
          {
            this.alertMsg = false;
            this.canInsert = false;
            this.alertMessage = "Entry Time is Mandatory...";
            this.alertMsg = true;
          }
      }

}
