import { Component, OnInit, ViewChild } from '@angular/core';
import { HelperService } from '../../../services/helperService';
import { ApiHelper } from '../../../services/apiHelper';
import { ApiUrls } from '../../../services/api.urls';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { PrefixSetupSpl } from '../prefixsetupspl';
import { Vendor } from '../../../master/vendor/vendor';

@Component({
  selector: 'app-addprefixsetupspecial',
  templateUrl: './addprefixsetupspecial.component.html',
  styleUrls: ['./addprefixsetupspecial.component.scss']
})
export class AddprefixsetupspecialComponent implements OnInit {

  newEntry : PrefixSetupSpl = new PrefixSetupSpl();

  alertMsg : boolean = false;
  alertMessage : string = "";
  canInsert : boolean = true;
  alertType : any = "danger";
  entryFields : any ;
  entryFieldNames : any;
  vendors : Vendor[];
  vndrSelectedValue : any;

  @ViewChild('selfClosingAlert', {static: true}) selfClosingAlert: NgbAlert;

  constructor(private helper : HelperService, 
              private apiHelper : ApiHelper) { }

  ngOnInit(): void {

    this.getVendors();
    this.getFinancialYear();
  }

  getVendors()
  {
     this.apiHelper.getList(ApiUrls.vendorApi).subscribe(data =>{
                                              this.vendors = data;
                                              //console.log(this.vendors);
                                            });
  }

  getFinancialYear()
  {
    this.apiHelper.get(ApiUrls.softwareConstantApi + "FinancialYear").subscribe(data =>{
      
      this.newEntry.financialYear = data.constantValue;
      //console.log(data);
    });
  }

  showName(vndrCode : any)
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
        this.alertMsg = false;
        this.canInsert = false;
        this.alertMessage = "Invalid Transporter Name is Selected...";
        this.alertMsg = true;
      }
    }


  save()
  {
    this.dataValidation(this.newEntry);

    if(this.canInsert)
    {
      this.apiHelper.add(ApiUrls.prefixSplApi, this.newEntry).subscribe(data =>
        {
          console.log(data);
          this.newEntry = new PrefixSetupSpl();
          this.alertMessage = " A new Record inserted Successfully.";
          this.alertMsg = true;
          this.alertType = "success";
          this.helper.reloadCurrentRoute();

        },error =>  { console.log(error); } );
        
    }
  }

  setDefaultValues()
  {
    this.newEntry.createdBy = "";
    this.newEntry.createdClient = "";
  }

  dataValidation(entry : PrefixSetupSpl)
  {
    this.alertMsg = false;

    this.entryFields = ['vendorId','financialYear', 'ospiOurCodePrefix','osdiOurCodePrefix', 'osdcOurCodePrefix'];
    
    this.entryFieldNames = ['Vendor ID','Financial Year', 'OSPI Our Code Prefix','OSDI Our Code Prefix','OSDC Our Code Prefix'];         
    
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
