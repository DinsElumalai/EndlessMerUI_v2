import { Component, OnInit } from '@angular/core';
import { ApiHelper } from '../../services/apiHelper';
import { ApiUrls } from '../../services/api.urls';
import { ItemDocument } from './item-document';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-item-document',
  templateUrl: './item-document.component.html',
  styleUrls: ['./item-document.component.scss']
})
export class ItemDocumentComponent implements OnInit {

  constructor(private apiHelper : ApiHelper, private modalService: NgbModal) { }

  entries : ItemDocument[] = [];
  itemDocuments : ItemDocument[] = [];
  vendorFromToSR : string = "";
  documentDateSR : Date = new Date();
  docNoSR : string = "";
  modelPopupRecord : ItemDocument;
  
  entryNames : string[] = ['documentOurCode', 'documentFor', 'documentPurpose', 'documentType', 'documentDate',
                            'itemDocumentId', 'vendorFromTo', 'vehicleNo', 'documentQtyinNos',
                          'documentQtyinKgs', 'assessableValue', 'sgst', 'cgst', 'totalValue'];

  

  ngOnInit(): void {

    this.getItemDocuments();
  }

  openVerticallyCentered(content : any, record : ItemDocument) {
    this.modalService.open(content, { centered: true });
    this.modelPopupRecord = record;
  }

  getItemDocuments()
  {
      this.apiHelper.get(ApiUrls.itemDocumentApi).subscribe(
       
          data => { this.entries = data; 
          this.itemDocuments = data;},
          error => { console.log(error); }
        
      );
  }

  getEntryProperty(entry : any, entryName : any)
  {
    return entry[entryName];
  }

  searchFilter()
  {
    let entries = this.itemDocuments;
    if(this.vendorFromToSR != null && this.vendorFromToSR != "")
    {
      entries = entries.filter(itemDoc =>  itemDoc.vendorFromTo.toLocaleLowerCase().includes(this.vendorFromToSR.toLocaleLowerCase()) );
    }
    if(this.docNoSR != null && this.docNoSR != "")
    {
      entries = entries.filter(itemDoc =>  itemDoc.documentOurCode.toLocaleLowerCase().includes(this.docNoSR.toLocaleLowerCase()) );
    }
    if(this.documentDateSR != null)
    {
      entries = entries.filter(itemDoc =>  itemDoc.documentDate.toString().toLocaleLowerCase().includes(this.documentDateSR.toString().toLocaleLowerCase()) );
    }

    this.entries = entries;
  }

}
