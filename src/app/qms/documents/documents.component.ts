import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  constructor() { }

  retensionMonths = [0,1,3,6,12,18,24,30,36,48,60];

  ngOnInit(): void 
  {
    
  }

}
