import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MmsConstants } from './mms.constants';
import { ApiHelper } from './apiHelper';
import { ApiUrls } from './api.urls';
import { SoftwareSetup } from '../admin/software-setup/software-setup';

@Injectable({
    providedIn: 'root'
  })
export class SessionHelper
{
  constructor(private router: Router,
              private apiHelper : ApiHelper){}


    sessionPrefix : string = "Mry_";

    setSoftwareSetupInfo()
    {
        let setups : SoftwareSetup[];
        this.apiHelper.get(ApiUrls.softwareApi).subscribe(data => 
            {
                setups = data;
                setups.forEach(element  => {
                    
                    sessionStorage.setItem(this.sessionPrefix + element.constantName, element.constantValue);
                });
            });
    }

    setUserRoles(groupName : string)
    {
        this.apiHelper
        .get(ApiUrls.userGroupApi + '/gp/' + groupName).subscribe(data => {
        //console.log(data)
        let userRoles = new Array();
        for(let element of data)
        {
            userRoles.push(element.roleName);
        }

        sessionStorage.setItem(this.sessionPrefix + 'UserRoles', userRoles.toString());

        }, 
        error => console.log(error));
    }

    checkUserRole(roleName : string)
    {
        let userRoles = this.getFromSession(this.sessionPrefix + 'UserRoles') || "";
        return userRoles.includes(roleName);
    }

    getSoftwareSetupInfo(name : any)
    {
        let result : any = "";
        switch(name)
        {
            case "client":
                result = this.getFromSession(this.sessionPrefix + "ClientName");
                break;
            case "logout":
                result = this.getFromSession(this.sessionPrefix + "LogoutTime");
                break;
            case "employee":
                result = this.getFromSession(this.sessionPrefix + "EmployeeDuration");
                break;
            case "entryMins":
                result = this.getFromSession(this.sessionPrefix + "EmplRoundedEntryMinutes");
                break;
            case "exitMins":
                result = this.getFromSession(this.sessionPrefix + "EmplRoundedExitMinutes");
                break;
        }

        return result;
    }

    getFromSession(name : any)
    {
        return sessionStorage.getItem(name) || "";
    }

    
}