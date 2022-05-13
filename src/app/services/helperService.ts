import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MmsConstants } from './mms.constants';
import { ApiHelper } from './apiHelper';
import { ApiUrls } from './api.urls';
import { Employee } from '../master/employee/employee';
import { Vendor } from '../master/vendor/vendor';
import * as moment from 'moment';


@Injectable({
    providedIn: 'root'
  })
export class HelperService
{
  constructor(private router: Router,
              private apiHelper : ApiHelper){

              }


  getEmployees()
  {
    return this.apiHelper.get(ApiUrls.employeeApi);
  }

  getEmployee(id : any, employees : Employee[])
    {
        if(employees)
        {
          let employee = employees.find(emp => emp.employeeId == Number(id));
          if(employee)
            return employee.employeeName;
        }
        return "";
    }

    getVendor(id : any, vendors : Vendor[])
    {
        if(vendors)
        {
          let vendor = vendors.find(vendor => vendor.vendorId == Number(id));
          if(vendor)
            return vendor.vendorName;
        }
        return "";
    }

  getRetensionMonths()
  {
    let retensionMonths = [0,1,3,6,12,18,24,30,36,48,60];
    return retensionMonths;
  }

  setSession(tabName : any, data : any)
  {
    sessionStorage.setItem(tabName, data);
  }

  getSession(tabName : any)
  {
    return sessionStorage.getItem(tabName) || "";
  }

  setDefaultCreatedInfo(entry : any)
  {
    let createdClient = this.getSession(MmsConstants.createdClient);
    entry.createdClient = createdClient;
    entry.createdBy = createdClient;
    entry.updatedBy = createdClient;
    
    return entry;
  }

  setDefaultUpdatedInfo(entry : any)
  {
    let createdClient = this.getSession(MmsConstants.createdClient);
    entry.updatedBy = createdClient;

    return entry;
  }

  //Concat Date and Time
  dateTimeConcat(date : any, time : any)
  {
    let concateDate =  new Date(new Date(date + "T" + time).getTime() + (5*60+30)*60000);
    return concateDate;
  }

  //Get seconds
  getSeconds()
  {
    let seconds = (new Date().getSeconds() < 2 ? "0" : "") + new Date().getSeconds();
    return seconds;
  }

  //Get Current Date
  getCurrDate()
  {
    var dt = new Date();

    let year  = dt.getFullYear();
    let month = (dt.getMonth() + 1).toString().padStart(2, "0");
    let day   = dt.getDate().toString().padStart(2, "0");
    
    return year + '-' + month + '-' + day;
  }

  getLastDayOfMonth(month : number, year : number)
  {
    let day = "31";
    month += 1;
    if(month == 4 || month == 6 || month == 9 || month == 11)
      day = "30";
    else if(month == 2)
      day = "28";

    let mon = month.toString().padStart(2, "0");
    return year + '-' + mon + '-' + day;    
  }

  //Get Current Time
  getCurrTime()
  {
    let dt = new Date();

    let result = this.addZeroBefore(dt.getHours()) + ':' + this.addZeroBefore(dt.getMinutes()) +
           ':' + this.addZeroBefore(dt.getSeconds());

    return result;
  }

  //Get Current Date and Time
  getCurrDateTime()
  {
    return this.dateTimeConcat(this.getCurrDate(), this.getCurrTime());
  }

  //Adding Zero
  addZeroBefore(n : number) 
  {
    return (n < 10 ? '0' : '') + n;
  }

  
  //Get Rounded Date for Entrance Register
  getRoundedDate(minutes : number, d=new Date()) 
  {

    let ms = 1000 * 60 * minutes; // convert minutes to ms
    let roundedDate = new Date(Math.ceil(d.getTime() / ms) * ms);
  
    return roundedDate
  }

  //Reload the current page
  reloadCurrentRoute() {
    setTimeout(() => {
            
          let currentUrl = this.router.url;
          //console.log(currentUrl);
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate([currentUrl]);
          });
    },500);
  }

  fixDecimal(num : string)
  {
    let decPt = num.indexOf(".") + 1;
    let decVal = num.slice(decPt, decPt+4);
    let realVal = num.substr(0, decPt);
    let result = realVal + decVal;
    //console.log(result);
    return result;
    
  }
  

  dateTimeDiff(fromDate : any, toDate : any, mode : any)
  {    
    var startTime = moment(fromDate.toString(), 'YYYY-MM-DD hh:mm:ss');
    var endTime = moment(toDate.toString(), 'YYYY-MM-DD hh:mm:ss');
    var hoursDiff = endTime.diff(startTime, 'hours');
    //console.log('Hours:' + hoursDiff);
  
    var minutesDiff = endTime.diff(startTime, 'minutes');
    //console.log('Minutes:' + minutesDiff);
    var toHoursDec = minutesDiff/60;
    var toHours = Math.floor(minutesDiff/60);
    var toMins = Math.floor((toHoursDec%1)*60)

    //return "Hours :" + toHours + " ,Minutes :" + toMins + " ,Total Minutes :" + minutesDiff;
    if(mode == "hrmins")
      return toHours + ":" + toMins;
    else 
      return (toHours * 60) + toMins;
  }

  

  

  
  
}