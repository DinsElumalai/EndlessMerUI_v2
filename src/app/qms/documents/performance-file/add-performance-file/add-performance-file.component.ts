import { Component, OnInit } from '@angular/core';

import { ApiUrls } from '../../../../services/api.urls';
import { ApiHelper } from '../../../../services/apiHelper';
import { HelperService } from '../../../../services/helperService';
import { DocumentService } from '../../../../services/documentService';
import { TransactionFile } from '../../documentEntities/transactionFile';

@Component({
  selector: 'app-add-performance-file',
  templateUrl: './add-performance-file.component.html',
  styleUrls: ['./add-performance-file.component.scss']
})
export class AddPerformanceFileComponent implements OnInit {

  newRecord : TransactionFile = new TransactionFile();
  performanceRecord : any;
  canInsert : boolean = true;
  performanceRecords : any;
  sampleImg : any;

  constructor(private documentService : DocumentService,
    private apiHelper : ApiHelper,
    private helperService : HelperService) { }

  ngOnInit(): void 
  {
    this.getPerformanceRecords();

  }

  save()
  {
    //this.convertArrayToFile(this.convertDataURIToBinary(this.newRecord.filePath));
    //this.convertDataURIToBinary(this.newRecord.filePath);

    this.getBase64(this.newRecord.filePath).then(
      data => console.log(data)
    );
    
    //console.log();
    this.canInsert = false;
    if(this.canInsert)
    {
         //console.log(this.newRecord);
         this.apiHelper.add(ApiUrls.docRecPerformanceFileApi, this.newRecord).subscribe(data => 
          {
            
            let insertedRecord : any = data;
            //console.log(insertedRecord);
            this.newRecord = new TransactionFile();
            //sessionStorage.setItem('mms__tab', '0');
            this.helperService.reloadCurrentRoute();

          },error => console.log(error));
    }
  }

  getBase64(file : any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  convertDataURIToBinary(dataURI : any) {
    //let base64Index = dataURI.indexOf(';base64,') + ';base64,'.length;
    //let base64 = dataURI.substring(base64Index);
    //let raw = window.atob(base64);
    //let rawLength = raw.length;
    let array = new Uint8Array(new ArrayBuffer(dataURI.length));
  
    for(let i = 0; i < dataURI.length; i++) {
      array[i] = dataURI.charCodeAt(i);
    }
    console.log(array);
    this.sampleImg = array;
    return array;
  }

  

  convertArrayToFile(byteArr : any)
  {
    //let response = this.base64ToArrayBuffer(byteArr);
    let file = new Blob([byteArr], { type: 'application/pdf' });            
    let fileURL = URL.createObjectURL(file);
    //this.sampleImg = this.convertDataURIToBinary(this.newRecord.filePath)
    //window.open(fileURL);
  }

  base64ToArrayBuffer(base64:any):ArrayBuffer {
    let binary_string =  window.atob(base64);
    let len = binary_string.length;
    let bytes = new Uint8Array( len );
    for (let i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  //Get the last inserted record for the table
  getPerformanceRecord()
  {
      this.apiHelper.get(ApiUrls.docRecPerformanceApi + "/" + this.newRecord.docRecPerId)
          .subscribe( data => 
                          {
                              //console.log(data);
                              this.newRecord.docRecPerId = data.docRecPerformanceId;
                              this.performanceRecord = data;
                          },
                      error => { console.log(error)});
      
  }

  //Get all Performance Records
  getPerformanceRecords()
  {
    this.apiHelper.getList(ApiUrls.docRecPerformanceApi).subscribe(data => 
                    {
                        this.performanceRecords = data;
                        this.performanceRecords = this.performanceRecords.sort((a : any, b : any) => (a.docRecPerformanceId > b.docRecPerformanceId ? -1 : 1));
                    },
                    error => {console.log(error)});
  }

}
