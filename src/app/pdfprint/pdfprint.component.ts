
import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ApiUrls } from '../services/api.urls';
import { ItemDocument } from '../finance/item-document/item-document';
import { ApiHelper } from '../services/apiHelper';
import { Vendor } from '../master/vendor/vendor';
import * as converter from 'number-to-words';

@Component({
  selector: 'app-pdfprint',
  templateUrl: './pdfprint.component.html',
  styleUrls: ['./pdfprint.component.scss']
})
export class PdfprintComponent implements OnInit {

  @ViewChild('invoice') invoiceElement!: ElementRef;
  sampleData = "<h2>Hello</h2>";

  @Input() docOurCode : string;

  itemDocuments : ItemDocument[];
  vendor : Vendor = new Vendor();

  forVendor : Vendor = new Vendor();
  currDate : Date = new Date();
  ttAssessableVal : number = 0;
  ttSgst : number = 0;
  ttCgst : number = 0;
  ttIgst : number = 0;
  ttTcs : number = 0;
  ttTotalVal : number = 0;

  
  constructor(private apiHelper : ApiHelper) { }

  ngOnInit(): void {

   this.getItemDocuments();
   this.getForVendor();
  }

  getItemDocuments()
  {
    this.apiHelper.getList(ApiUrls.itemDocumentDocOurCodeApi + this.docOurCode).subscribe(
              data => { 
                
                this.itemDocuments = data; console.log(data);
                let vendorId = this.itemDocuments[0].vendorFromTo.split("-")[2].trim();
                //console.log(vendorId);

                for(let itemDocument of this.itemDocuments)
                {
                  this.ttAssessableVal += Number(itemDocument.assessableValue);
                  this.ttIgst += Number(itemDocument.igst);
                  this.ttSgst += Number(itemDocument.sgst);
                  this.ttCgst += Number(itemDocument.cgst);
                  this.ttTcs += Number(itemDocument.tcsValue);
                }

                this.ttTotalVal = this.ttAssessableVal + this.ttCgst + this.ttIgst +  this.ttSgst + this.ttTcs;

              this.apiHelper.get(ApiUrls.vendorApi + "/" + vendorId).subscribe(

                data => { this.vendor = data; console.log(data);},
                err => { console.log(err);}
              );
                            
              },
              err => { console.log(err);}
    );
  }

  getForVendor()
  {
    this.apiHelper.get(ApiUrls.vendorApi + "/1").subscribe(

      data => { this.forVendor = data; console.log(data);},
      err => { console.log(err);}
    );
  }

  numToWords(num : number)
  {
    let convertedWords = converter.toWords(num).split(" ");

    let result = "";
    for(let wrd of convertedWords)
    {
      result += wrd[0].toUpperCase() + wrd.substring(1) + " ";
    }

    return result;
  }
  



  /*public generatePDF(): void {

    html2canvas(this.invoiceElement.nativeElement, { scale: 3 }).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
      const fileWidth = 200;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('p', 'mm', 'a4',);
      PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
      PDF.html(this.invoiceElement.nativeElement.innerHTML);
      PDF.autoPrint();
      PDF.output('dataurlnewwindow');
      //PDF.save('angular-invoice-pdf-demo.pdf');
    });
  }
*/
  
  

}
