/*
 Copyright (c) 2017, The Storage Networking Industry Association.
 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:
 Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice,
 this list of conditions and the following disclaimer in the documentation
 and/or other materials provided with the distribution.
 Neither the name of The Storage Networking Industry Association (SNIA) nor
 the names of its contributors may be used to endorse or promote products
 derived from this software without specific prior written permission.
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 THE POSSIBILITY OF SUCH DAMAGE.
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
