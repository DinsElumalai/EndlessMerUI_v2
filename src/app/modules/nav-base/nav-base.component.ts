import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'; 

@Component({
  selector: 'app-nav-base',
  templateUrl: './nav-base.component.html',
  styleUrls: ['./nav-base.component.scss']
})
export class NavBaseComponent implements OnInit {

  isExpanded = false;
  masterState = false;
  qmsState = false;
  transactionState = false;
  adminState = false;
  financeState = false;
  marketingState = false;
  
  ngOnInit(): void {
  }


  constructor(private router: Router){}

    getComponent(cmpName : string)
    {
        this.router.navigate(['/'+ cmpName ]);
    }
}
