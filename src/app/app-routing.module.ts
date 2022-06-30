import { ListEmployeeComponent } from './master/employee/list-employee/list-employee.component';
import { AddEmployeeComponent } from './master/employee/add-employee/add-employee.component';
import { ListVendorComponent } from './master/vendor/list-vendor/list-vendor.component';
import { ListvehicleComponent } from './entrance-register/vehicle/listvehicle/listvehicle.component';
import { AddvehicleComponent } from './entrance-register/vehicle/addvehicle/addvehicle.component';
import { AddVendorComponent } from './master/vendor/add-vendor/add-vendor.component';
import { VehicleComponent } from './entrance-register/vehicle/vehicle.component';
import { ListempregComponent } from './entrance-register/employeereg/listempreg/listempreg.component';
import { AddempregComponent } from './entrance-register/employeereg/addempreg/addempreg.component';
import { EmployeeregComponent } from './entrance-register/employeereg/employeereg.component';
import { ListpdrnComponent } from './transaction/pdrn/listpdrn/listpdrn.component';
import { AddpdrnComponent } from './transaction/pdrn/addpdrn/addpdrn.component';
import { PdrnComponent } from './transaction/pdrn/pdrn.component';
import { ListrpanComponent } from './transaction/rpan/listrpan/listrpan.component';
import { AddrpanComponent } from './transaction/rpan/addrpan/addrpan.component';
import { RpanComponent } from './transaction/rpan/rpan.component';
import { ListpponComponent } from './transaction/ppon/listppon/listppon.component';
import { AddpponComponent } from './transaction/ppon/addppon/addppon.component';
import { PponComponent } from './transaction/ppon/ppon.component';
import { ListrcrnComponent } from './transaction/rcrn/listrcrn/listrcrn.component';
import { AddrcrnComponent } from './transaction/rcrn/addrcrn/addrcrn.component';
import { RcrnComponent } from './transaction/rcrn/rcrn.component';
import { ListSoftwaresetupComponent } from './admin/software-setup/list-softwaresetup/list-softwaresetup.component';
import { AddSoftwaresetupComponent } from './admin/software-setup/add-softwaresetup/add-softwaresetup.component';
import { ListPrefixsetupComponent } from './admin/prefix-setup/list-prefixsetup/list-prefixsetup.component';
import { AddPrefixsetupComponent } from './admin/prefix-setup/add-prefixsetup/add-prefixsetup.component';
import { ListRoleComponent } from './admin/user/user-roles/list-role/list-role.component';
import { AddRoleComponent } from './admin/user/user-roles/add-role/add-role.component';
import { UserLogComponent } from './admin/user/user-log/user-log.component';
import { ListGroupComponent } from './admin/user/user-group/list-group/list-group.component';
import { AddGroupComponent } from './admin/user/user-group/add-group/add-group.component';
import { UserGroupComponent } from './admin/user/user-group/user-group.component';
import { ListUserComponent } from './admin/user/list-user/list-user.component';
import { AddUserComponent } from './admin/user/add-user/add-user.component';
import { UserComponent } from './admin/user/user.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SoftwareSetupComponent } from './admin/software-setup/software-setup.component';
import { PrefixSetupComponent } from './admin/prefix-setup/prefix-setup.component';
import { EntranceRegisterComponent } from './entrance-register/entrance-register.component';
import { VendorComponent } from './master/vendor/vendor.component';
import { EmployeeComponent } from './master/employee/employee.component';
import { DocumentsComponent } from './qms/documents/documents.component';
import { DepartmentComponent } from './master/department/department.component';
import { ChangepasswordComponent } from './modules/changepassword/changepassword.component';
import { LoginComponent } from './modules/login/login.component';
import { LogoutComponent } from './modules/logout/logout.component';
import { UnderConstructionComponent } from './modules/under-construction/under-construction.component';
import { UserRolesComponent } from './admin/user/user-roles/user-roles.component';
import { LedgerComponent } from './finance/ledger/ledger.component';
import { ItemDocumentComponent } from './finance/item-document/item-document.component';
import { DcDocpdfComponent } from './finance/dc-docpdf/dc-docpdf.component';
import { DiDocpdfComponent } from './finance/di-docpdf/di-docpdf.component';
import { PrefixsetupSpecialComponent } from './admin/prefixsetup-special/prefixsetup-special.component';
import { ItemTransactionComponent } from './admin/item-transaction/item-transaction.component';
import { HsncodeComponent } from './master/hsncode/hsncode.component';
import { ItemReptSeqVndrComponent } from './master/item-rept-seq-vndr/item-rept-seq-vndr.component';
import { ProcessComponent } from './master/process/process.component';
import { ItemOrderComponent } from './marketing/item-order/item-order.component';
import { ItemOrderScheduleComponent } from './marketing/item-order-schedule/item-order-schedule.component';
import { TestingComponent } from './modules/testing/testing.component';

const routes: Routes = [

  {path : '', component: LoginComponent},
  {path : 'dashboard', component: DashboardComponent},
  //Entrance Register
  {path : 'entranceregister', component : EntranceRegisterComponent},
  {path : 'empreg', component : EmployeeregComponent},
  {path : 'addempreg', component : AddempregComponent},
  {path : 'listempreg', component : ListempregComponent},
  {path : 'vehicle', component : VehicleComponent},
  {path : 'addvehicle', component : AddvehicleComponent},
  {path : 'listvehicle', component : ListvehicleComponent},
  //Master
  {path : 'user', component : UserComponent},
  {path : 'adduser', component : AddUserComponent},
  {path : 'listuser', component : ListUserComponent},
  {path : 'department', component: DepartmentComponent},
  {path : 'employee', component : EmployeeComponent},
  {path : 'addemployee', component : AddEmployeeComponent},
  {path : 'listemployee', component : ListEmployeeComponent},
  {path : 'vendor', component : VendorComponent},
  {path : 'addvendor', component : AddVendorComponent},
  {path : 'listvendor', component : ListVendorComponent},
  {path : 'hsncode', component : HsncodeComponent},
  {path : 'itemreptseqvndr', component : ItemReptSeqVndrComponent},
  {path : 'process', component : ProcessComponent},
  //Marketing
  {path : 'itemrorder', component : ItemOrderComponent},
  {path : 'itemorderschedule', component : ItemOrderScheduleComponent},
  //Modules
  {path : 'changepassword', component : ChangepasswordComponent},
  {path : 'login', component : LoginComponent},
  {path : 'logout', component : LogoutComponent},
  {path : 'underconstruction', component : UnderConstructionComponent},
  //Finannce
  {path : 'ledger', component : LedgerComponent},
  {path : 'itemdocument', component : ItemDocumentComponent},
  {path : 'dcdocumentpdf', component : DcDocpdfComponent},
  {path : 'didocumentpdf', component : DiDocpdfComponent},
  //Transaction
  {path : 'rcrn', component : RcrnComponent},
  {path : 'addrcrn', component : AddrcrnComponent},
  {path : 'listrcrn', component : ListrcrnComponent},
  {path : 'ppon', component : PponComponent},
  {path : 'addppon', component : AddpponComponent},
  {path : 'listppon', component : ListpponComponent},
  {path : 'rpan', component : RpanComponent},
  {path : 'addrpan', component : AddrpanComponent},
  {path : 'listrpan', component : ListrpanComponent},
  {path : 'pdrn', component : PdrnComponent},
  {path : 'addpdrn', component : AddpdrnComponent},
  {path : 'listpdrn', component : ListpdrnComponent},
  //QMS
  {path : 'documents', component : DocumentsComponent},
  //Admin
  {path : 'prefixsetup', component : PrefixSetupComponent},
  {path : 'prefixsetupspl', component : PrefixsetupSpecialComponent},
  {path : 'addprefixsetup', component : AddPrefixsetupComponent},
  {path : 'listprefixsetup', component : ListPrefixsetupComponent},
  {path : 'softwaresetup', component : SoftwareSetupComponent},
  {path : 'addsoftwaresetup', component : AddSoftwaresetupComponent},
  {path : 'listsoftwaresetup', component : ListSoftwaresetupComponent},
  {path : 'usergroup', component : UserGroupComponent},
  {path : 'addgroup', component : AddGroupComponent},
  {path : 'listgroup', component : ListGroupComponent},
  {path : 'userlog', component : UserLogComponent},
  {path : 'userroles', component : UserRolesComponent},
  {path : 'addrole', component : AddRoleComponent},
  {path : 'listrole', component : ListRoleComponent},
  {path : 'itemtransaction', component : ItemTransactionComponent},
  //Testing
  {path : 'test', component : TestingComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
