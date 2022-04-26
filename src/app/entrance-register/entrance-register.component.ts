import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entrance-register',
  templateUrl: './entrance-register.component.html',
  styleUrls: ['./entrance-register.component.scss']
})
export class EntranceRegisterComponent implements OnInit {

  constructor() { }

  entrregTab : string;

  ngOnInit(): void 
  {
    this.entrregTab = sessionStorage.getItem('mms_entrreg_tab') || '0';
  }

  
}
