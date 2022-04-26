import { Component, OnInit, ViewChild } from '@angular/core';
import { EntranceRegister } from '../../entranceRegister';
import { ApiUrls } from '../../../services/api.urls';
import { ApiHelper } from '../../../services/apiHelper';
import { Observable } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../../../services/helperService';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { Vendor } from '../../../master/vendor/vendor';
import { SessionHelper } from '../../../services/sessionHelper';

@Component({
  selector: 'app-listvehicle',
  templateUrl: './listvehicle.component.html',
  styleUrls: ['./listvehicle.component.scss']
})
export class ListvehicleComponent implements OnInit {

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
  showExitTimeOption : boolean = false;
  vendors : Vendor[];
  vndrSelectedValue : any;
  showUpdatedExitTime : boolean = false;
  setEtime : boolean = true;

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
      this.getVendors();  
      this.exitTime = this.helperService.getCurrTime();
      this.exitDate = this.helperService.getCurrDate();
      this.updateRole = this.sessionHelper.checkUserRole("rl_entrReg_vehicle_update");
      this.exitUpdateRole = this.sessionHelper.checkUserRole("rl_entrReg_vehicle_entryedit");   
      
  }


    getDetails()
    {
      this.apiHelper.getList(ApiUrls.entranceRegApi).subscribe(data => {
                    this.entries = data;
                    this.entries = this.entries.sort((a,b) => (a.entranceRegId > b.entranceRegId ? -1 : 1));
                    this.entries = this.entries.filter(entry => {return entry.registerType == "Vehicle"});
                    //console.log(this.entries);
                    this.entries = this.entries.filter(entry =>
                      {
                        let regDate = new Date(entry.entryTime);
                        let serDate = new Date(this.getDetailDate);
                        this.isShowList = true;
                          if(this.getDetailDate != null)
                          {
                            return ((regDate.getDate() == serDate.getDate() && 
                            regDate.getMonth() == serDate.getMonth() &&
                            regDate.getFullYear() == serDate.getFullYear()) || entry.exitTime == null );
                            
                          }
                          else
                          {
                            return ((regDate.getDate() == new Date().getDate()) || entry.exitTime == null);
                          }
                            
                      });
                      //console.log(this.entries);
                    });
         
        
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

    
    getVendors()
    {
     this.apiHelper.getList(ApiUrls.vendorApi).subscribe(data =>{
                                              this.vendors = data;
                                              this.vendors = this.vendors.filter(vendor => { return vendor.transporter == true});
                                              //console.log(this.vendors);
                                            });
    }

    setVendorName()
    {
    if(this.updateEntry.vendorId != null)
    {
      this.vndrSelectedValue = this.updateEntry.vendorId;
      let vendor = this.vendors.filter( vendor => { return vendor.vendorId == Number(this.updateEntry.vendorId) });
      this.updateEntry.vendorName = vendor[0].vendorName;
    }
    
    }
    
    openVerticallyCentered(content : any, entry : EntranceRegister) 
    {
      this.showUpdatedExitTime = false;
      this.showExitTimeOption = false;
      this.updateEntry = entry;
      this.setVendorName();
      if(entry.exitTime != null)
        this.showUpdatedExitTime = true;
      else
        this.showExitTimeOption = true;

      if(this.exitUpdateRole)
        this.showExitTimeOption = true;

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
              this.apiHelper.update(ApiUrls.entranceRegApi + "/" + returnedEntry.entranceRegId, returnedEntry).subscribe(result => { 
                //console.log(result);
              });
            }
            sessionStorage.setItem('mms_entrreg_tab', '0');
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
        entry.roundedExitTime = this.helperService.getRoundedDate(this.sessionHelper.getSoftwareSetupInfo("exitMins"), entry.exitTime);
        if(entry.exitCreatedDate == null)
            entry.exitCreatedDate = this.helperService.getCurrDateTime();
        //entry.exitCreatedBy = "";

        //this.entryExitCompare(entry.entryTime, entry.exitTime);
      }    
   
      return entry;
    }

    showVendorName(vndrCode : any)
    {
      let vendors = this.vendors;
      vndrCode = vndrCode.split("-")[0].trim();
      let vendor = vendors.filter(vndr =>{ return (vndr.vendorOurCode == vndrCode)}) || new Vendor();
      
      if(vendor.length > 0)
      {
        this.updateEntry.vendorId = vendor[0].vendorId.toString();
      }
      else{
        this.vndrSelectedValue = "";
        this.updateEntry.vendorId = "";
        this.updateEntry.personName = "";
        this.alertMsg = false;
        this.canUpdate = false;
        this.alertMessage = "Invalid Transporter Name is Selected...";
        this.alertMsg = true;
      }
    }

    showHideExitTime(entry : EntranceRegister)
    {
      let result = true;
      if(this.exitTime == null && this.exitDate == null)
      {
        result = true;
      }
    }
}
