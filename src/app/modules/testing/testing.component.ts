import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {


  ngOnInit(): void {
  }
  itemDocForm: FormGroup;  
     
  constructor(private fb:FormBuilder) {  
     
    this.itemDocForm = this.fb.group({
      docSubEntries: this.fb.array([]) ,  
    });  
  }  
    
  docSubEntries() : FormArray {  
    return this.itemDocForm.get("docSubEntries") as FormArray  
  }  
     
  newSubEntry(): FormGroup {  
    return this.fb.group({  
      orderNo: '',  
      vendorItemNumber: '',  
      vendorItemName: '',
      uom : '',
      unitPricePerUom : '',
      jobworkReductionOnPercentage : '',
      qtyInNos : '',
      qtyInKgs : '',
      docQtyInNos:'',
      docQtyInKgs : '',
      assessableValue : '',
      itemOrderScheduleId : ''
    })  
  }  
     
  addSubEntry() {  
    this.docSubEntries().push(this.newSubEntry());  
  }  
     
  removeSubEntry(i:number) {  
    this.docSubEntries().removeAt(i);  
  }  
     
  onSubmit() {  
    console.log(this.itemDocForm.value);  
  }  

}
