import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MmsConstants } from './mms.constants';
import { ApiHelper } from './apiHelper';
import { ApiUrls } from './api.urls';
import { SoftwareSetup } from '../admin/software-setup/software-setup';

@Injectable({
    providedIn: 'root'
  })
export class SetupHelper
{
  constructor(private router: Router,
              private apiHelper : ApiHelper){}



    
}