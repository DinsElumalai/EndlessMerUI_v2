import { Component, OnInit } from '@angular/core';
import { ApiUrls } from '../../services/api.urls';
import { ApiHelper } from '../../services/apiHelper';
import { SessionHelper } from '../../services/sessionHelper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private apiHelper : ApiHelper, private sessionHelper : SessionHelper) { }

  ngOnInit(): void {

    this.sessionHelper.setSoftwareSetupInfo();
    this.sessionHelper.setUserRoles("Admin");
  }

  handleLogin()
  {

  }

}
