import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Router} from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PrefixSetupComponent } from './admin/prefix-setup/prefix-setup.component';
import { EmployeeComponent } from './master/employee/employee.component';
import { VendorComponent } from './master/vendor/vendor.component';
import { EntranceRegisterComponent } from './entrance-register/entrance-register.component';
import { DepartmentComponent } from './master/department/department.component';
import { DocumentsComponent } from './qms/documents/documents.component';
import { SoftwareSetupComponent } from './admin/software-setup/software-setup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBaseComponent } from './modules/nav-base/nav-base.component';
import { ChangepasswordComponent } from './modules/changepassword/changepassword.component';
import { LoginComponent } from './modules/login/login.component';
import { LogoutComponent } from './modules/logout/logout.component';
import { UnderConstructionComponent } from './modules/under-construction/under-construction.component';
import { AddEmployeeComponent } from './master/employee/add-employee/add-employee.component';
import { ListEmployeeComponent } from './master/employee/list-employee/list-employee.component';
import { AddVendorComponent } from './master/vendor/add-vendor/add-vendor.component';
import { ListVendorComponent } from './master/vendor/list-vendor/list-vendor.component';
import { AddDepartmentComponent } from './master/department/add-department/add-department.component';
import { ListDepartmentComponent } from './master/department/list-department/list-department.component';
import { AddPrefixsetupComponent } from './admin/prefix-setup/add-prefixsetup/add-prefixsetup.component';
import { ListPrefixsetupComponent } from './admin/prefix-setup/list-prefixsetup/list-prefixsetup.component';
import { AddSoftwaresetupComponent } from './admin/software-setup/add-softwaresetup/add-softwaresetup.component';
import { UserComponent } from './admin/user/user.component';
import { AddUserComponent } from './admin/user/add-user/add-user.component';
import { ListUserComponent } from './admin/user/list-user/list-user.component';
import { UserLogComponent } from './admin/user/user-log/user-log.component';
import { UserGroupComponent } from './admin/user/user-group/user-group.component';
import { AddGroupComponent } from './admin/user/user-group/add-group/add-group.component';
import { ListGroupComponent } from './admin/user/user-group/list-group/list-group.component';
import { UserRolesComponent } from './admin/user/user-roles/user-roles.component';
import { AddRoleComponent } from './admin/user/user-roles/add-role/add-role.component';
import { ListRoleComponent } from './admin/user/user-roles/list-role/list-role.component';
import { RcrnComponent } from './transaction/rcrn/rcrn.component';
import { AddrcrnComponent } from './transaction/rcrn/addrcrn/addrcrn.component';
import { ListrcrnComponent } from './transaction/rcrn/listrcrn/listrcrn.component';
import { PponComponent } from './transaction/ppon/ppon.component';
import { AddpponComponent } from './transaction/ppon/addppon/addppon.component';
import { ListpponComponent } from './transaction/ppon/listppon/listppon.component';
import { RpanComponent } from './transaction/rpan/rpan.component';
import { AddrpanComponent } from './transaction/rpan/addrpan/addrpan.component';
import { ListrpanComponent } from './transaction/rpan/listrpan/listrpan.component';
import { PdrnComponent } from './transaction/pdrn/pdrn.component';
import { AddpdrnComponent } from './transaction/pdrn/addpdrn/addpdrn.component';
import { ListpdrnComponent } from './transaction/pdrn/listpdrn/listpdrn.component';
import { ListSoftwaresetupComponent } from './admin/software-setup/list-softwaresetup/list-softwaresetup.component';
import { VehicleComponent } from './entrance-register/vehicle/vehicle.component';
import { AddvehicleComponent } from './entrance-register/vehicle/addvehicle/addvehicle.component';
import { ListvehicleComponent } from './entrance-register/vehicle/listvehicle/listvehicle.component';
import { EmployeeregComponent } from './entrance-register/employeereg/employeereg.component';
import { AddempregComponent } from './entrance-register/employeereg/addempreg/addempreg.component';
import { ListempregComponent } from './entrance-register/employeereg/listempreg/listempreg.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VehicleDialogComponent } from './entrance-register/vehicle/vehicle-dialog/vehicle-dialog.component';
import { PerformanceComponent } from './qms/documents/performance/performance.component';
import { AddPerformanceComponent } from './qms/documents/performance/add-performance/add-performance.component';
import { ListPerformanceComponent } from './qms/documents/performance/list-performance/list-performance.component';
import { PerformanceFileComponent } from './qms/documents/performance-file/performance-file.component';
import { AddPerformanceFileComponent } from './qms/documents/performance-file/add-performance-file/add-performance-file.component';
import { ListPerformanceFileComponent } from './qms/documents/performance-file/list-performance-file/list-performance-file.component';
import { PerformanceReviewComponent } from './qms/documents/performance-review/performance-review.component';
import { AddPerformanceReviewComponent } from './qms/documents/performance-review/add-performance-review/add-performance-review.component';
import { ListPerformanceReviewComponent } from './qms/documents/performance-review/list-performance-review/list-performance-review.component';
import { PerformanceRevisionComponent } from './qms/documents/performance-revision/performance-revision.component';
import { AddPerformanceRevisionComponent } from './qms/documents/performance-revision/add-performance-revision/add-performance-revision.component';
import { ListPerformanceRevisionComponent } from './qms/documents/performance-revision/list-performance-revision/list-performance-revision.component';
import { PerformanceKpiComponent } from './qms/documents/performance-kpi/performance-kpi.component';
import { AddPerformanceKpiComponent } from './qms/documents/performance-kpi/add-performance-kpi/add-performance-kpi.component';
import { ListPerformanceKpiComponent } from './qms/documents/performance-kpi/list-performance-kpi/list-performance-kpi.component';
import { PerformanceResponsibilityComponent } from './qms/documents/performance-responsibility/performance-responsibility.component';
import { AddPerformanceResponsibilityComponent } from './qms/documents/performance-responsibility/add-performance-responsibility/add-performance-responsibility.component';
import { ListPerformanceResponsibilityComponent } from './qms/documents/performance-responsibility/list-performance-responsibility/list-performance-responsibility.component';
import { PerformanceIssueComponent } from './qms/documents/performance-issue/performance-issue.component';
import { AddPerformanceIssueComponent } from './qms/documents/performance-issue/add-performance-issue/add-performance-issue.component';
import { ListPerformanceIssueComponent } from './qms/documents/performance-issue/list-performance-issue/list-performance-issue.component';
import { HsncodeComponent } from './master/hsncode/hsncode.component';
import { ProcessComponent } from './master/process/process.component';
import { ItemReptSeqVndrComponent } from './master/item-rept-seq-vndr/item-rept-seq-vndr.component';
import { PrefixsetupSpecialComponent } from './admin/prefixsetup-special/prefixsetup-special.component';
import { ItemTransactionComponent } from './admin/item-transaction/item-transaction.component';
import { FinanceComponent } from './finance/finance.component';
import { LedgerComponent } from './finance/ledger/ledger.component';
import { ItemDocumentComponent } from './finance/item-document/item-document.component';
import { DcDocpdfComponent } from './finance/dc-docpdf/dc-docpdf.component';
import { DiDocpdfComponent } from './finance/di-docpdf/di-docpdf.component';
import { MarketingComponent } from './marketing/marketing.component';
import { ItemOrderComponent } from './marketing/item-order/item-order.component';
import { ItemOrderScheduleComponent } from './marketing/item-order-schedule/item-order-schedule.component';
import { AddhsncodeComponent } from './master/hsncode/addhsncode/addhsncode.component';
import { AddprocessComponent } from './master/process/addprocess/addprocess.component';
import { AdditemreptseqvndrComponent } from './master/item-rept-seq-vndr/additemreptseqvndr/additemreptseqvndr.component';
import { AdditemorderComponent } from './marketing/item-order/additemorder/additemorder.component';
import { AdditemorderscheduleComponent } from './marketing/item-order-schedule/additemorderschedule/additemorderschedule.component';
import { AdddcdocpdfComponent } from './finance/dc-docpdf/adddcdocpdf/adddcdocpdf.component';
import { AdddidocpdfComponent } from './finance/di-docpdf/adddidocpdf/adddidocpdf.component';
import { AdditemdocumentComponent } from './finance/item-document/additemdocument/additemdocument.component';
import { AddledgerComponent } from './finance/ledger/addledger/addledger.component';
import { AdditemtransactionComponent } from './admin/item-transaction/additemtransaction/additemtransaction.component';
import { AddprefixsetupspecialComponent } from './admin/prefixsetup-special/addprefixsetupspecial/addprefixsetupspecial.component';
import { ItemTypeComponent } from './master/item-type/item-type.component';
import { AddItemtypeComponent } from './master/itemType/add-itemtype/add-itemtype.component';
import { ItemComponent } from './master/item/item.component';
import { AddItemComponent } from './master/item/add-item/add-item.component';
import { ItemSubtypeComponent } from './master/item-subtype/item-subtype.component';
import { AddItemsubtypeComponent } from './master/itemSubtype/add-itemsubtype/add-itemsubtype.component';
import { DesignationComponent } from './master/designation/designation.component';
import { AddDesignationComponent } from './master/designation/add-designation/add-designation.component';
import { AgGridModule } from 'ag-grid-angular';
import { TestingComponent } from './modules/testing/testing.component';

@NgModule({
  declarations: [
    AppComponent,
    PrefixSetupComponent,
    EmployeeComponent,
    VendorComponent,
    EntranceRegisterComponent,
    DepartmentComponent,
    DocumentsComponent,
    SoftwareSetupComponent,
    DashboardComponent,
    NavBaseComponent,
    ChangepasswordComponent,
    LoginComponent,
    LogoutComponent,
    UnderConstructionComponent,
    AddEmployeeComponent,
    ListEmployeeComponent,
    AddVendorComponent,
    ListVendorComponent,
    AddDepartmentComponent,
    ListDepartmentComponent,
    AddPrefixsetupComponent,
    ListPrefixsetupComponent,
    AddSoftwaresetupComponent,
    UserComponent,
    AddUserComponent,
    ListUserComponent,
    UserLogComponent,
    UserGroupComponent,
    AddGroupComponent,
    ListGroupComponent,
    UserRolesComponent,
    AddRoleComponent,
    ListRoleComponent,
    RcrnComponent,
    AddrcrnComponent,
    ListrcrnComponent,
    PponComponent,
    AddpponComponent,
    ListpponComponent,
    RpanComponent,
    AddrpanComponent,
    ListrpanComponent,
    PdrnComponent,
    AddpdrnComponent,
    ListpdrnComponent,
    ListSoftwaresetupComponent,
    VehicleComponent,
    AddvehicleComponent,
    ListvehicleComponent,
    EmployeeregComponent,
    AddempregComponent,
    ListempregComponent,
    VehicleDialogComponent,
    PerformanceComponent,
    AddPerformanceComponent,
    ListPerformanceComponent,
    PerformanceFileComponent,
    AddPerformanceFileComponent,
    ListPerformanceFileComponent,
    PerformanceReviewComponent,
    AddPerformanceReviewComponent,
    ListPerformanceReviewComponent,
    PerformanceRevisionComponent,
    AddPerformanceRevisionComponent,
    ListPerformanceRevisionComponent,
    PerformanceKpiComponent,
    AddPerformanceKpiComponent,
    ListPerformanceKpiComponent,
    PerformanceResponsibilityComponent,
    AddPerformanceResponsibilityComponent,
    ListPerformanceResponsibilityComponent,
    PerformanceIssueComponent,
    AddPerformanceIssueComponent,
    ListPerformanceIssueComponent,
    HsncodeComponent,
    ProcessComponent,
    ItemReptSeqVndrComponent,
    PrefixsetupSpecialComponent,
    ItemTransactionComponent,
    FinanceComponent,
    LedgerComponent,
    ItemDocumentComponent,
    DcDocpdfComponent,
    DiDocpdfComponent,
    MarketingComponent,
    ItemOrderComponent,
    ItemOrderScheduleComponent,
    AddhsncodeComponent,
    AddprocessComponent,
    AdditemreptseqvndrComponent,
    AdditemorderComponent,
    AdditemorderscheduleComponent,
    AdddcdocpdfComponent,
    AdddidocpdfComponent,
    AdditemdocumentComponent,
    AddledgerComponent,
    AdditemtransactionComponent,
    AddprefixsetupspecialComponent,
    ItemTypeComponent,
    AddItemtypeComponent,
    ItemComponent,
    AddItemComponent,
    ItemSubtypeComponent,
    AddItemsubtypeComponent,
    DesignationComponent,
    AddDesignationComponent,
    TestingComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AgGridModule.withComponents(null),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
