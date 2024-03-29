
export class ApiUrls
{
    //static baseUrl = 'http://localhost:9090/api/';
    static baseUrl = window.location.href.substring(0,window.location.href.indexOf("mercuryMMS")) + "mmswebservice/api/";  //fetching from login component

    static appUrl = window.location.href.substring(0,window.location.href.lastIndexOf("/"));
    
    //EntranceRegister
    static entranceRegApi = ApiUrls.baseUrl + 'entrancereg';
    static entranceRegCodeApi = ApiUrls.baseUrl + 'entrancereg/code/';
    static entranceRegLastApi = ApiUrls.baseUrl + 'entrancereg/last';
    static entranceRegLastCodeApi = ApiUrls.baseUrl + 'entrancereg/lastcode';

    //----------------------------------------------------------------------------------
    //Master
    //Employee
    static employeeApi = ApiUrls.baseUrl + 'emp';
    static employeeLastApi = ApiUrls.baseUrl + 'emplast';
    static hsncodeApi = ApiUrls.baseUrl + 'hsnCode';
    static processApi = ApiUrls.baseUrl + 'process';
    
    //User
    static userApi = ApiUrls.baseUrl + 'user';
    //Department
    static departmentApi = ApiUrls.baseUrl + 'department';
    static departmentLastApi = ApiUrls.baseUrl + 'department/last';
    //Vendor
    static vendorApi = ApiUrls.baseUrl + 'vendor';
    static vendorLastApi = ApiUrls.baseUrl + 'vendorlast';

    static designationApi = ApiUrls.baseUrl + 'empdg';
    static itemApi = ApiUrls.baseUrl + 'item';
    static itemBySubTypeIdApi = ApiUrls.baseUrl + 'itembyst/';
    static itemLastApi = ApiUrls.baseUrl + 'itemlast';
    static itemTypeApi = ApiUrls.baseUrl + 'itemType';
    static itemSubTypeApi = ApiUrls.baseUrl + 'itemsubtype';
    static itemSubTypeByTypeIdApi = ApiUrls.baseUrl + 'itemstbytyid/';
    static itemReptSeqVndrApi = ApiUrls.baseUrl + 'itemReptSeqVndr/';
    
    //-----------------------------------------------------------------------------------
    //HR / Admin
    //------------------------------------------------------------------------------------
    //Marketing
    static itemOrderApi = ApiUrls.baseUrl + 'itemOrder';
    static itemOrderByVendorIdApi = ApiUrls.baseUrl + 'itemOrder/ordertovndrId/';
    static itemOrderByItemIdApi = ApiUrls.baseUrl + 'itemOrder/itemId/';
    static itemOrderScheduleApi = ApiUrls.baseUrl + 'itemOrderSchedule';
    //------------------------------------------------------------------------------------
    //Shores
    //------------------------------------------------------------------------------------
    //MFG / MNT
    //------------------------------------------------------------------------------------
    //QA
    //------------------------------------------------------------------------------------
    //Finance
    static ledgerApi = ApiUrls.baseUrl + 'ledger';
    static itemDocumentApi = ApiUrls.baseUrl + 'itemDocument';
    static itemDocumentDocOurCodeApi = ApiUrls.baseUrl + 'itemDocument/docOurcode/';
    //------------------------------------------------------------------------------------
    //QMS
    //DocRecPerformance
    static docRecPerformanceApi = ApiUrls.baseUrl + 'docrecperf';
    static docRecPerformanceLastApi = ApiUrls.baseUrl + 'docrecperf/last';

    //DocRecPerformanceFile
    static docRecPerformanceFileApi = ApiUrls.docRecPerformanceApi + '/file';
    static docRecPerformanceFileLastApi = ApiUrls.docRecPerformanceFileApi + '/last';
    static docRecPerformanceFileByDocRecApi = ApiUrls.docRecPerformanceFileApi+ '/docrec/';

    //DocRecPerformanceIssue
    static docRecPerformanceIssueApi = ApiUrls.docRecPerformanceApi + '/issue';
    static docRecPerformanceIssueLastApi = ApiUrls.docRecPerformanceIssueApi + '/last';
    static docRecPerformanceIssueByDocRecApi = ApiUrls.docRecPerformanceIssueApi+ '/docrec/';

    //DocRecPerformanceKpi
    static docRecPerformanceKpiApi = ApiUrls.docRecPerformanceApi + '/kpi';
    static docRecPerformanceKpiLastApi = ApiUrls.docRecPerformanceKpiApi + '/last';
    static docRecPerformanceKpiByDocRecApi = ApiUrls.docRecPerformanceKpiApi+ '/docrec/';

    //DocRecPerformanceReview
    static docRecPerformanceReviewApi = ApiUrls.docRecPerformanceApi + '/review';
    static docRecPerformanceReviewLastApi = ApiUrls.docRecPerformanceReviewApi + '/last';
    static docRecPerformanceReviewByDocRecApi = ApiUrls.docRecPerformanceReviewApi+ '/docrec/';

    //DocRecPerformanceRevision
    static docRecPerformanceRevisionApi = ApiUrls.docRecPerformanceApi + '/revision';
    static docRecPerformanceRevisionLastApi = ApiUrls.docRecPerformanceRevisionApi + '/last';
    static docRecPerformanceRevisionByDocRecApi = ApiUrls.docRecPerformanceRevisionApi + '/docrec/';

    //DocRecPerformanceResponsibility
    static docRecPerformanceResponsibilityApi = ApiUrls.docRecPerformanceApi + '/responsibility';
    static docRecPerformanceResponsibilityLastApi = ApiUrls.docRecPerformanceResponsibilityApi + '/last';
    static docRecPerformanceResponsibilityByDocRecApi = ApiUrls.docRecPerformanceResponsibilityApi + '/docrec/';

    //------------------------------------------------------------------------------------
    //Admin
    //Userlog
    static userLogApi = ApiUrls.baseUrl + 'usrlog';
    //UserGroup
    static userGroupApi = ApiUrls.baseUrl + 'userGroup';
    //UserRoles
    static userRoleApi = ApiUrls.baseUrl + 'userRole';
    //Prefix Setup
    static prefixApi = ApiUrls.baseUrl + 'ps';
    static prefixLastApi = ApiUrls.baseUrl + 'pslast';
    static prefixSplApi = ApiUrls.baseUrl + 'prefixSetupSpl';
    //Software Setup
    static softwareApi = ApiUrls.baseUrl + 'ss';
    static softwareConstantApi = ApiUrls.baseUrl + 'ss/con/';
    //------------------------------------------------------------------------------------
}