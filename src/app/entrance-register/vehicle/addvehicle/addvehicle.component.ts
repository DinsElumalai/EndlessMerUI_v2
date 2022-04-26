import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ApiUrls } from '../../../services/api.urls';
import { ApiHelper } from '../../../services/apiHelper';
import { HelperService } from '../../../services/helperService';
import { EntranceRegister } from '../../entranceRegister';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { Vendor } from '../../../master/vendor/vendor';
import { ListvehicleComponent } from '../listvehicle/listvehicle.component';
import { SessionHelper } from '../../../services/sessionHelper';


@Component({
  selector: 'app-addvehicle',
  templateUrl: './addvehicle.component.html',
  styleUrls: ['./addvehicle.component.scss']
})
export class AddvehicleComponent implements OnInit {

  constructor(private modalService: NgbModal, public helperService : HelperService,
              private apiHelper : ApiHelper, private router: Router,
              private list : ListvehicleComponent, private sessionHelper : SessionHelper) { }


 
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
  vendors : Vendor[];
  vndrSelectedValue : any;
  
  setEtime : boolean = true;
  setEtimeOption : boolean = false;


  ngOnInit(): void {

    this.entryDate = new Date();
    this.entryTime = this.helperService.getCurrTime();
    this.getVendors();

  }

  setEntryTime()
    {
      if(this.setEtimeOption)
      {
        this.setEtime = false;
        this.entryTime = this.helperService.getCurrTime();
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

  showVendorName(vndrCode : any)
    {
      let vendors = this.vendors;
      vndrCode = vndrCode.split("-")[0].trim();
      let vendor = vendors.filter(vndr =>{ return (vndr.vendorOurCode == vndrCode)}) || new Vendor();
      
      if(vendor.length > 0)
      {
        this.newEntry.vendorId = vendor[0].vendorId.toString();
      }
      else{
        this.vndrSelectedValue = "";
        this.newEntry.vendorId = "";
        this.newEntry.personName = "";
        this.alertMsg = false;
        this.canInsert = false;
        this.alertMessage = "Invalid Transporter Name is Selected...";
        this.alertMsg = true;
      }
    }

  save()
  {
    this.dataValidation();
    this.setDefaultData();
    if(this.canInsert)
    {
         this.apiHelper.add(ApiUrls.entranceRegApi, this.newEntry).subscribe(data => 
          {
            //console.log(data);
            this.newEntry = new EntranceRegister();
            sessionStorage.setItem('mms_entrreg_tab', '0');
            this.modelReference.close('Save click');
            this.helperService.reloadCurrentRoute();
          },error => console.log(error));
    }
    
  }

  setDefaultData()
  {
    this.setVendorName();
    this.newEntry.entryTime = this.helperService.dateTimeConcat(this.helperService.getCurrDate(), this.entryTime );
    //console.log(this.newEntry.entryTime);
    this.newEntry.registerType = "Vehicle";
    this.newEntry.registerDate = new Date();
    //this.newEntry.createdBy = "";
    this.newEntry.roundedEntryTime = this.helperService.getRoundedDate(this.sessionHelper.getSoftwareSetupInfo("entryMins"), this.newEntry.entryTime);
    this.newEntry.entryCreatedDate = this.helperService.getCurrDateTime();

    this.dataValidation();
  }

  openVerticallyCentered(content : any) 
  {
    this.modelReference =this.modalService.open(content, { centered: true , size: 'lg'});
  }

  dataValidation()
  {
    console.log(this.entryDate);
    console.log(this.entryTime);
    this.canInsert = true;
    if(this.newEntry.vehicleNo == null || this.newEntry.vehicleNo == "")
    {
      this.alertMsg = false;
      this.canInsert = false;
      this.alertMessage = "Vehicle No is Mandatory...";
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

  setVendorName()
  {
    if(this.newEntry.vendorId != null)
    {
      let vendor = this.vendors.filter( vendor => { return vendor.vendorId == Number(this.newEntry.vendorId) });
      this.newEntry.vendorName = vendor[0].vendorName;
    }
    
  }
  
 
}
