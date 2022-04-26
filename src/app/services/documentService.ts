import {Injectable} from '@angular/core';
import { ApiHelper } from './apiHelper';
import {ApiUrls} from './api.urls';
import { DocumentPerformance } from '../qms/documents/documentEntities/documentPerformance';

@Injectable({
    providedIn: 'root'
  })

export class DocumentService
{
    constructor(private apiHelper : ApiHelper)
    {}

    //Set the doc rec ID to session from performance tab
    setPerformanceDocRecId(id : string)
    {
        sessionStorage.setItem("mms_perfr_id", id);
    }

    //Get the doc rec ID from session stored from performance tab
    getPerformanceDocRecId()
    {
        return sessionStorage.getItem("mms_perfr_id") || '';
    }

    //Get the last inserted record for the table
    getInsertedPerformanceRecord()
    {
        let result = new DocumentPerformance();
        if(this.getPerformanceDocRecId() != '')
            this.apiHelper.get(ApiUrls.docRecPerformanceApi + "/" + this.getPerformanceDocRecId())
                .subscribe( data => 
                                {
                                    console.log(data);
                                    result = data;
                                },
                            error => { console.log(error)});
        
        return result;
    }

    //Get PerformanceRecor dString from Object
    getPerformanceRecFromObj(perfRecordObj : DocumentPerformance)
    {
        let record : string;
        record = "Doc Rec Id  :" +  perfRecordObj.docRecPerformanceId + "\n";
        record += "Type : " + perfRecordObj.type + "\n";
        record += "Type Department Name : " + perfRecordObj.typeDepartmentName + "\n";
        record += "Type No : " + perfRecordObj.typeNo + "\n";
        record += "Type Purpose: " + perfRecordObj.typePurpose + "\n";
        record += "Implemented On : " + perfRecordObj.implementedOn + "\n";
        record += "Implemented By : " + perfRecordObj.implementedBy + "\n";
        record += "File Location : " + perfRecordObj.fileLocation + "\n";
        record += "Is Kpi Required : " + perfRecordObj.kpiRequired + "\n";
        record += "Kpi Value Must Be : " + perfRecordObj.kpiValueMustBe + "\n";
        record += "Retension Month : " + perfRecordObj.retensionMonth + "\n";
        record += "Retained Location : " + perfRecordObj.retainedLocation + "\n";
        record += "Active Status : " + perfRecordObj.active + "\n";

        return record;
    }
}