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
import {Component, OnInit, Input,  Output,EventEmitter} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HomeService} from "../home/shared/home.service";

@Component({
  selector:'addEmulator-modal',
  templateUrl:'addEmulator.html',
  styleUrls:[],
})
export class AddEmulatorComponent implements OnInit{
  public remove: any;
  private showWarning: any;

  @Input() DeviceInfo: any;
  @Output() IPInfo = new EventEmitter();
  @Output() toggleAddModal =  new EventEmitter();
  public addForm = this.formBuilder.group({
    sysName:['',Validators.required],
    domainName:['',Validators.required],
    userName:['',Validators.required],
    password:['',Validators.required]
  });
  constructor(public formBuilder: FormBuilder ,private homeService:HomeService) {
  }
  ngOnInit() {
  }
  public closeModal() {
    this.IPInfo.emit({'value': false});
  }
    onAddDevice() {

        let credentials = {
          "UserName":this.addForm.value['userName'],
          "Password": this.addForm.value['password']
        };
        this.homeService.setIpAddress( this.addForm.value['sysName']);
        this.homeService.getAuthToken(credentials).subscribe(res => {
            this.homeService.setAuthHeader(res.headers.get('X-Auth-Token'),res.headers.get('Cookie-Headers'));
            sessionStorage.setItem(this.addForm.value['sysName'],res.headers.get('Cookie-Headers'));
            this.IPInfo.emit({'IPAddress': this.addForm.value['sysName'],'DomainName':this.addForm.value['domainName']});
        },
          (error) => {
            alert(error);
            this.addForm.reset();
          })
        ;
    }
    public onRemove() {
       if(this.remove.valid) {
         this.closeModal();
       }
       else {
         this.showWarning = true;
       }
    }

}
