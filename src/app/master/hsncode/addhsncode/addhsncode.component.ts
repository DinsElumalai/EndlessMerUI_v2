import { Component, OnInit, ViewChild } from '@angular/core';
import { HsnCode } from '../hsncode';
import { HelperService } from '../../../services/helperService';
import { ApiHelper } from '../../../services/apiHelper';
import { ApiUrls } from '../../../services/api.urls';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-addhsncode',
  templateUrl: './addhsncode.component.html',
  styleUrls: ['./addhsncode.component.scss']
})
export class AddhsncodeComponent implements OnInit {

  newEntry : HsnCode = new HsnCode();

  alertMsg : boolean = false;
  alertMessage : string = "";
  canInsert : boolean = true;
  alertType : any = "danger";
  entryFields : any ;
  entryFieldNames : any;

  @ViewChild('selfClosingAlert', {static: true}) selfClosingAlert: NgbAlert;

  constructor(private helper : HelperService, 
              private apiHelper : ApiHelper) { }

  ngOnInit(): void {
  }

  save()
  {
    this.dataValidation(this.newEntry);

    if(this.canInsert)
    {
      this.apiHelper.add(ApiUrls.hsncodeApi, this.newEntry).subscribe(data =>
        {
          //console.log(data);
          this.newEntry = new HsnCode();
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

  dataValidation(entry : HsnCode)
  {
    this.alertMsg = false;

    this.entryFields = ['hsnCode','hsnDescription', 'hsnRate', 'hsnRateFrom'];
    
    this.entryFieldNames = ['Hsn Code','Hsn Description', 'Hsn Rate', 'Hsn Rate From'];         
    
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
