import { Component, OnInit, Input } from '@angular/core';
import { EntranceRegister } from '../../entranceRegister';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vehicle-dialog',
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.scss']
})
export class VehicleDialogComponent implements OnInit {

  @Input() vehicle : EntranceRegister;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

}
