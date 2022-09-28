import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
  })
  
  export class PrintService
  {

    constructor()
    {}

    private documentOurCode : string = "";
    private itemDocuments : ItemDocument[] = [];

    setItemDocPrintData(documentOurCode : string, itemDocuments : ItemDocument[])
    {
        this.documentOurCode = documentOurCode;
        this.itemDocuments = itemDocuments;
    }

    getItemDocPrintData()
    {
        return this.itemDocuments.filter(itemDoc => {
                                                      return  itemDoc.documentOurCode = this.documentOurCode;
                                                      });
    }

  }