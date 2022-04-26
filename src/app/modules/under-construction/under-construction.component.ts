import { Component, OnInit } from '@angular/core';
import { ApiUrls } from '../../services/api.urls';

@Component({
  selector: 'app-under-construction',
  templateUrl: './under-construction.component.html',
  styleUrls: ['./under-construction.component.scss']
})
export class UnderConstructionComponent implements OnInit {

  constructor() { }

  imgPath : string = "";

  ngOnInit(): void {

    //console.log(ApiUrls.appUrl);
    this.imgPath = ApiUrls.appUrl + "/assets/images/underconstruction.webp";
  }

}
