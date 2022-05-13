import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemReptSeqVndr } from '../item-rept-seq-vndr';
import { HelperService } from '../../../services/helperService';
import { ApiHelper } from '../../../services/apiHelper';
import { ApiUrls } from '../../../services/api.urls';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { ItemType } from '../../item-type/item-type';
import { Item } from '../../item/item';
import { Vendor } from '../../vendor/vendor';
import { Process } from '../../process/process';
import { HsnCode } from '../../hsncode/hsncode';
import { ItemReptSeqVndrComponent } from '../item-rept-seq-vndr.component';

@Component({
  selector: 'app-additemreptseqvndr',
  templateUrl: './additemreptseqvndr.component.html',
  styleUrls: ['./additemreptseqvndr.component.scss']
})
export class AdditemreptseqvndrComponent implements OnInit {

  newEntry : ItemReptSeqVndr = new ItemReptSeqVndr();

  alertMsg : boolean = false;
  alertMessage : string = "";
  canInsert : boolean = true;
  alertType : any = "danger";
  entryFields : any ;
  entryFieldNames : any;

  itemTypes : ItemType[];
  items : Item[];
  subItems : Item[];
  vendors : Vendor[];
  processVendors : Vendor[];
  receipeVendors : Vendor[];
  processes : Process[];
  hsnCodes : HsnCode[];



  @ViewChild('selfClosingAlert', {static: true}) selfClosingAlert: NgbAlert;

  constructor(private helper : HelperService, 
              private apiHelper : ApiHelper,
              private irvsList : ItemReptSeqVndrComponent) { }

  ngOnInit(): void {

    this.getItemTypes();
    this.getHsnCodes();
    this.getItems();
    this.getProcesses();
    this.getVendors();
    
  }

  save()
  {
    this.dataValidation(this.newEntry);

    if(this.canInsert)
    {
      this.apiHelper.add(ApiUrls.itemReptSeqVndrApi, this.newEntry).subscribe(data =>
        {
          //console.log(data);
          this.newEntry = new ItemReptSeqVndr();
          this.alertMessage = " A new Record inserted Successfully.";
          this.alertMsg = true;
          this.alertType = "success";
          //this.helper.reloadCurrentRoute();
          this.irvsList.getDetails();

        },error =>  { console.log(error); } );
        
    }
  }

  setDefaultValues()
  {
    this.newEntry.createdBy = "";
    this.newEntry.createdClient = "";
  }

  dataValidation(entry : ItemReptSeqVndr)
  {
    this.alertMsg = false;

    this.entryFields = ['itemType','item', 'receipeVendor', 'processStageNo', 'processStageName', 
                        'processStageFor', 'processSequenceNo','processName','processFor','subItemId','subItemPriority',
                        'uom','consumptionForQty','consumptionQty','finishQty','balanceQty','processVendor','hsnCodeId',
                        'vendorItemNumber','vendorItemName','vendorItemNameId','vendorPriority','processSharingPrecentage'];
    
    this.entryFieldNames = ['itemType','item', 'receipeVendor', 'processStageNo', 'processStageName', 
    'processStageFor', 'processSequenceNo','processName','processFor','subItemId','subItemPriority',
    'uom','consumptionForQty','consumptionQty','finishQty','balanceQty','processVendor','hsnCodeId',
    'vendorItemNumber','vendorItemName','vendorItemNameId','vendorPriority','processSharingPrecentage'];         
    
    for(let i=0; i < this.entryFields.length; i++)
    {
      let field : any = this.entryFields[i];
      if(entry[field as keyof typeof entry] == null || entry[field as keyof typeof entry] == "")
      {
        //console.log(entry[field as keyof typeof entry]);
        this.alertMessage = this.entryFieldNames[i].charAt(0).toUpperCase() + this.entryFieldNames[i].slice(1) + " is Missing...";
        this.alertMsg = true;
      }
    }

    this.canInsert = !this.alertMsg;

  }

  getItemTypes()
  {
    this.apiHelper.getList(ApiUrls.itemTypeApi).subscribe(data => {

      this.itemTypes = data;

    }, error => { console.log(error);});
  }

  getItems()
  {
    this.apiHelper.getList(ApiUrls.itemApi).subscribe(data => {

      this.items = data;
      this.subItems = data;
      
    }, error => { console.log(error);});
  }
  getProcesses()
  {
    this.apiHelper.getList(ApiUrls.processApi).subscribe(data => {

      this.processes = data;

    }, error => { console.log(error);});
  }

  getHsnCodes()
  {
    this.apiHelper.getList(ApiUrls.hsncodeApi).subscribe(data => {

      this.hsnCodes = data;

    }, error => { console.log(error);});
  }
 
  getVendors()
  {
    this.apiHelper.getList(ApiUrls.vendorApi).subscribe(data => {

      this.vendors = data;
      this.receipeVendors = data;
      this.processVendors = data;
      this.receipeVendors = this.receipeVendors.filter( vendor => vendor.sales == true);

    }, error => { console.log(error);});
  }

  counter(num : number)
  {
    
    return new Array(num);
  }

  validateItemId()
  {
    let items = this.items;
    let selectedItemValue = this.newEntry.item;
    if(selectedItemValue != null && selectedItemValue != "")
    {
      selectedItemValue = selectedItemValue.split("-")[2];
      if(selectedItemValue)
      {
        selectedItemValue = selectedItemValue.trim();
      }
      else{
        this.newEntry.vendorItemNumber = "";
        this.newEntry.vendorItemNameId = "";
        this.newEntry.vendorItemName = "";
      }
      let item = items.filter(item => {return item.itemId == Number(selectedItemValue)})[0];
      
      if(item != null)
        this.newEntry.item = selectedItemValue;
      else
        this.newEntry.item = "";
    }
  }

  setDetails()
  {
    this.validateItemId();
    if(this.newEntry.consumptionQty != null && this.newEntry.finishQty != null)
    {
      this.newEntry.balanceQty = (Number(this.newEntry.consumptionQty) - Number(this.newEntry.finishQty)).toString();
      this.newEntry.balanceQty = this.helper.fixDecimal(this.newEntry.balanceQty);
    }

    if(this.newEntry.item != null)
    {
      let items = this.items;
      items = items.filter(item => { return (item.itemId).toString() == this.newEntry.item });

      if(items[0] != null)
      {
        this.newEntry.vendorItemNumber = items[0].itemNumber;
        this.newEntry.vendorItemNameId = items[0].itemNameId;
        this.newEntry.vendorItemName = items[0].itemName;
      }
      
    }
  }
}
