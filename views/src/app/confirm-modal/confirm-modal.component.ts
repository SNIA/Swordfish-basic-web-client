/**
 * Created by Sravanthi on 6/13/2017.
 */
import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";

@Component({
  selector:'confirm-modal',
  templateUrl:'confirm-modal.html',
  styleUrls:[],
})

export class ConfirmModalComponent implements OnInit {
  @ViewChild('cnfrmModal') modal:ModalComponent;
  @Input() DeviceInfo:any ;
  @Input() serviceToRemove: any;
  @Output() toggleCnfmModel = new EventEmitter();

    constructor() {
    }
    ngOnInit() {
       this.modal.open();
    }
    closeModal() {
      this.toggleCnfmModel.emit({'data':this.DeviceInfo,'toDel':true});
      this.modal.close();
    }
    deleteService() {
      let servicesDetails = JSON.parse(localStorage.getItem('DeviceInfo'));
      servicesDetails.splice(this.DeviceInfo.indexOf(this.serviceToRemove),1);
      localStorage.setItem('DeviceInfo',JSON.stringify(servicesDetails));
      this.DeviceInfo.splice(this.DeviceInfo.indexOf(this.serviceToRemove),1);
      this.toggleCnfmModel.emit({'data':this.DeviceInfo,'toDel':false});
      this.modal.close();
     }
}
