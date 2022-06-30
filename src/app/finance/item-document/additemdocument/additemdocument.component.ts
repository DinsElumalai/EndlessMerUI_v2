import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { ItemDocument } from '../item-document';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { ApiHelper } from '../../../services/apiHelper';
import { ApiUrls } from '../../../services/api.urls';
import { Vendor } from '../../../master/vendor/vendor';
import { Item } from '../../../master/item/item';
import { ItemOrder } from '../../../marketing/item-order/item-order';
import { ItemOrderSchedule } from '../../../marketing/item-order-schedule/itemOrderSchedule';
import { HelperService } from '../../../services/helperService';


@Component({
  selector: 'app-additemdocument',
  templateUrl: './additemdocument.component.html',
  styleUrls: ['./additemdocument.component.scss']
})
export class AdditemdocumentComponent implements OnInit {


  constructor(private modalService: NgbModal, 
    private apiService : ApiHelper, private helperService : HelperService) 
  {
    
   }

  ngOnInit(): void {

    this.newEntry = new ItemDocument();
    this.getVendors();
    this.getItemOrderSchdules();
       
  }

  newEntry : ItemDocument;
  fieldArray: Array<any> = [];
  docSubEntries : SubEntry[] = new Array();
  docSubEntryTemp : SubEntry = new SubEntry();
  docSchSubEntries : SchSubEntry[] = new Array();
  docSchSubEntryTotalDocNo : string = "0";


  vendors : Vendor[];
  itemOrders : ItemOrder[];
  itemOrderSchedules : ItemOrderSchedule[];
  orderNoItemOrders : ItemOrder[];
  popup1ItemOrders : ItemOrder[];
  popup2ItemOrderSchedules : ItemOrderSchedule[];
  selectedOrderNo : string;
  selectedItemId : string;
  selectedVendorItemNumber : string;
  selectedItemOrderShId : string;

  modelReference : any;
  modelContent : any;
  staticAlertClosed = false;
  alertMessage = '';
  alertMsg = false;
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

    
    insertHeaderColumns = ['Order#', 'Cust. Part #', 'Cust. PartName', 'UOM', 'Unit Price Per UOM', 'Jobwork Reduction %', 
                      'Qty No', 'Qty Kgs',  'Assesable Value', 'Sch No'];
    
    viewHeaderColumns = ['Order#', 'Cust. Part #', 'Cust. PartName', 'UOM', 'Unit Price Per UOM', 'Jobwork Reduction %', 
                       'Doc Qty No', 'Doc Qty Kgs', 'Assesable Value', 'Sch No'];
    
    
    getDocSubEntries()
    {
      return this.docSubEntries;
    }

    addSubEntry()
    {
      let subEntry = this.docSubEntryTemp;
      this.docSubEntryTemp = new SubEntry();
      this.docSubEntries.push(subEntry);
      console.log(this.docSubEntries);
    }

    removeSubEntry(index : any)
    {
      this.docSubEntries.splice(index,1);
    }

    selectedPopup1(itemOrder : ItemOrder)
    {
      console.log(itemOrder);
      this.docSubEntryTemp.vendorItemName = itemOrder.vendorItemName;
      this.docSubEntryTemp.vendorItemNameId = itemOrder.vendorItemNameId;
      this.docSubEntryTemp.orderLineNo = itemOrder.orderLineNo;
      this.docSubEntryTemp.orderNos = itemOrder.orderNos;
      this.docSubEntryTemp.orderKgs = itemOrder.orderKgs;
      this.docSubEntryTemp.uom = itemOrder.uom;
      this.docSubEntryTemp.unitPriceUom = itemOrder.unitPriceUom;
      this.docSubEntryTemp.jobworkRedPercentage = itemOrder.jobworkRedPercentage;
      this.docSubEntryTemp.itemId = itemOrder.itemId;
      this.docSubEntryTemp.itemOrderId = itemOrder.itemOrderId;

      this.getPopup2Details(itemOrder.itemOrderId);
    }

    selectedPopup2(itemOrderSchedule : ItemOrderSchedule)
    {
      console.log(itemOrderSchedule);
      this.docSubEntryTemp.itemOrderScheduleId = itemOrderSchedule.itemOrderScheduleId;
      console.log(this.docSchSubEntries);
    }

    calculateSchSubEntry()
    {
      let docQtyInNos : number = 0;
      let result = 0;
        for(let schSubEntry of this.docSchSubEntries)
        {
          if(schSubEntry.docQtyInNos != '')
          {
            docQtyInNos = Number(schSubEntry.docQtyInNos);
            result += docQtyInNos;
          }
        }
        this.docSchSubEntryTotalDocNo = result.toString();
    }

    pageClear()
    {
      this.helperService.reloadCurrentRoute();
    }
 
    onSubmit() 
    {  
      let index = 0;
        for(let docSubEntry of this.docSubEntries)
        {
          index++;
          let docEntry = this.newEntry;
          docEntry.vendorItemName = docSubEntry.vendorItemName;
          //docEntry.vendorItemNameId = docSubEntry.vendorItemNameId;
          //docEntry.orderLineNo = docSubEntry.orderLineNo;
          //docEntry.orderNos = docSubEntry.orderNos;
          //docEntry.orderKgs = docSubEntry.orderKgs;
          docEntry.uom = docSubEntry.uom;
          docEntry.jobworkReductionPercentage = docSubEntry.jobworkRedPercentage;
          docEntry.itemId = docSubEntry.itemId;
          docEntry.unitPricePerUOM = docSubEntry.unitPriceUom;
          docEntry.itemOrderId = docSubEntry.itemOrderId;
          docEntry.itemOrderScheduleId = docSubEntry.itemOrderScheduleId;

          this.apiService.add(ApiUrls.itemDocumentApi, docEntry).subscribe(
            result => { console.log(result);}, err => { console.log(err);}
          );

          if(index == this.docSubEntries.length)
          {
            this.pageClear();
          }
        }
    }


    openVerticallyCentered(content : any) 
    {
        this.modelReference = this.modalService.open(content, { centered: true , size: 'lg'});
    }

    setVendorDetails()
    {
      let vendorFromTos = this.newEntry.vendorFromTo.split("-");
      let vendorFromTo = vendorFromTos[vendorFromTos.length-1].trim();
      let vendors = this.vendors;

      vendors = vendors.filter(vndr => { return vndr.vendorId == Number(vendorFromTo);});

      let vendor = vendors[0];
      this.newEntry.prefixSpecial = vendor.prefixSpecial;
      this.newEntry.noofExtraCopy = vendor.extraCopy;

      this.newEntry.deliveryFromTo = this.newEntry.vendorFromTo;
    }

    //Get details block
    getVendors()
    {
      this.apiService.get(ApiUrls.vendorApi).subscribe(
        data => { this.vendors = data;},
        error => { console.log(error);}
      );
    }

    getItemOrders()
    {

      let vendorFromTos = this.newEntry.vendorFromTo.split("-");
      let vendorFromTo = vendorFromTos[vendorFromTos.length-1].trim();
      console.log(vendorFromTo);
      this.apiService.get(ApiUrls.itemOrderApi).subscribe(
        data => { 
          
          let itemOrders = data;
          this.itemOrders = data;
          this.orderNoItemOrders = data;
          this.popup1ItemOrders = data;
          itemOrders = itemOrders.filter((itemOrder : ItemOrder) => { return itemOrder.orderToVendorId == vendorFromTo});
          this.orderNoItemOrders = itemOrders;
          console.log(this.orderNoItemOrders);
        
        },
        error => { console.log(error);}
      );
    }

    getItemOrderSchdules()
    {
        this.apiService.get(ApiUrls.itemOrderScheduleApi).subscribe(
          data => { this.itemOrderSchedules = data;},
          err => { console.log(err);}
        );
    }

    getItems(id : string)
    {
      let items : Item[] = [];
       this.apiService.get(ApiUrls.itemApi).subscribe(
        data => { items = data;}
       );
       items = items.filter(item => {return item.itemId == Number(id);});
       return items;
    }

    
    getPopup1Details(docSubEntryTemp : any)
    {
      let itemOrders = this.itemOrders;
      console.log(itemOrders);
      itemOrders = itemOrders.filter( itemOrder => {return itemOrder.orderNo == docSubEntryTemp.orderNo});
      this.popup1ItemOrders = itemOrders;
      console.log(itemOrders);
    }

    getPopup2Details(itemOrderId : string)
    {
      let itemOrderSchedules = this.itemOrderSchedules;
      console.log(itemOrderSchedules);
      console.log(itemOrderId);
      itemOrderSchedules = itemOrderSchedules.filter( itemOrderSchedule => {return itemOrderSchedule.itemOrderId == itemOrderId});
      this.popup2ItemOrderSchedules = itemOrderSchedules;
      console.log(itemOrderSchedules);

      
      for(let temp of itemOrderSchedules)
      {
        this.docSchSubEntries.push(new SchSubEntry());
      }
      console.log(this.docSchSubEntries);
    }

}
export class SchSubEntry
{
  docQtyInNos: string ="";
  docQtyInKgs : string ="";
}
export class SubEntry
{
        orderNo: string = ""; 
        vendorItemNumber : string = "";  
        vendorItemName : string = "";
        vendorItemNameId : string ="";
        orderLineNo: string ="";
        orderNos : string ="";
        orderKgs: string ="";
        uom : string ="";
        unitPriceUom : string ="";
        jobworkRedPercentage: string ="";
        itemId: string ="";
        itemOrderId : string ="";
        qtyInNos : string ="";
        qtyInKgs : string ="";
        docQtyInNos: string ="";
        docQtyInKgs : string ="";
        assessableValue : string ="";
        itemOrderScheduleId : string ="";
}

