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

import {Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {HomeService} from './shared/home.service';
import {ListMenuComponent} from './list-menu';
import {routeParamsPipe} from '../pipes/routeParams';
import {KeysPipe} from "../pipes/key-value";

@Component({
  selector: 'home',
  templateUrl: 'home.html',
  styleUrls: [ 'home.css']
})
export class HomeComponent   {

  @ViewChild('dynamicCom', { read: ViewContainerRef}) viewData: ViewContainerRef;
  @ViewChild('dynamicCom') vd:ElementRef;

  public dataToDisplay: any = [];
  public DeviceInfo: any= [];
  public resourcesMenu: any;
  public level: any = 0;
  public highestLevel: any = 0;
  public show: any;
  private addDevice: any = false;

  private memoryDetails: any;

  public breadCrums: any = [];
  public breadCrumKey: any;
  public canEdit: any = false;

  public data: any = [];
  public showMainMenu: any = false;
  public toClose: any;
  public sh:any;
  public deviceName:any ;
  public cnfrmRemove: any= false;
  public serviceToRemove: any;
  public showRemove: any;
  public domainName:any;
  public showError:any = "Service Not Available";
  public dd:any = {};
  public isLoading:any;

  constructor(
    public componentFactoryResolver: ComponentFactoryResolver ,
    public router: Router,
    public homeService: HomeService,
   ) {
    if (!localStorage.getItem('user-token')) {
      this.router.navigate(['']);
    }
    if(this.homeService.getIPAddress()) {
      this.DeviceInfo = JSON.parse(this.homeService.getIPAddress());
    }
    else {
      this.DeviceInfo = [];
    }
  }
  IPInfo(data: any) {
    if(data.IPAddress) {
     this.DeviceInfo.push(data);
     localStorage.setItem("DeviceInfo",JSON.stringify(this.DeviceInfo));
    }
    this.addDevice = false;
  }
  /* ToDo: Retrieves the information related to specific IPAddress*/
  homePage(value: any,name:any) {
    this.dd = {};
    this.resourcesMenu = "";
    this.showMainMenu = true;
    if(this.showRemove || this.addDevice) {
      this.showMainMenu = false;
      this.isLoading = false;
    }
    else {
      this.isLoading = true;
      this.deviceName = value;
      this.domainName = name;
       this.homeService.setIpAddress(value);
      this.homeService.getDeviceInfo('/redfish/v1/').subscribe(data => {
          Object.keys(data).forEach(item => {
            if(typeof data[item] === 'object') {
              new KeysPipe().transform(data[item]).forEach(key => {
                if(typeof key.value === 'object') {
                    new KeysPipe().transform(key.value).forEach(subKey => {
                      this.dd[key.key] = subKey;
                    });
                }
                else {
                  this.dd[item] = key;
                }
              });
            }
          });
          this.resourcesMenu = this.dd;
          this.isLoading = false;
      },
        (error) => {
          this.isLoading = false;
          this.showError = "Something Went Wrong";
        },
      );
      this.breadCrums = [];
      for ( let i = 0; i <= this.highestLevel + 1; i++) {
        if ( this.dataToDisplay[i]) {
          this.dataToDisplay[i].destroy();
        }
      }
      this.show = null;
      this.memoryDetails = '';
      this.canEdit = false;
    }
  }
  /* ToDo: Get request to collection which  will display the info regarding it and created blade if it has a sub collection */
  create(value: any, index: any, selected: any, key: any) {
    this.breadCrums[index] = value;
    this.show = selected;
    this.memoryDetails = key;
    this.toClose = index;
    if (index === 0) {
      this.level = 0;
      this.canEdit = false;
    }
    for ( let i = index; i <= this.highestLevel + 1; i++) {
      if ( this.dataToDisplay[i]) {
        this.dataToDisplay[i].destroy();

      }
      this.breadCrums.splice( index + 1  , 1);
    }
    this.dataToDisplay[index] = this.viewData.createComponent(this.componentFactoryResolver.resolveComponentFactory(ListMenuComponent));
    this.dataToDisplay[index].instance.value = value;
    this.dataToDisplay[index].instance.level = this.level;
    this.dataToDisplay[index].instance.canUpdate = this.canEdit;
    this.dataToDisplay[index].instance.showSysData.subscribe((result: any) => {
      this.level = result.level;
      this.highestLevel = result.highestLevel;
      this.canEdit = result.permissions;
      this.create(result.value, result.level, selected, key);
    });
    this.dataToDisplay[index].instance.onClose.subscribe((item: any) => {
      if (this.dataToDisplay[item.index - 1]) {
           this.dataToDisplay[item.index - 1].instance.show = null;
      }
      if (item.index === 0) {
        this.show = null;
      }
      this.close(item.index);
    });
    document.body.scrollLeft = 100000;
  }
  close(index: any) {
    for (let i = index; i <= this.highestLevel + 1; i++) {
      if (this.dataToDisplay[i]) {
        this.dataToDisplay[i].destroy();
      }
      this.breadCrums.splice(index , 1);
    }
  }
  getName(value: any) {
    this.breadCrumKey = new routeParamsPipe().transform(value);
  }
    logout() {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['']);
    }

    onAddDevice() {
        this.addDevice = true;
    }
    toggleAddModal(data: any) {
        this.addDevice = data.value;
    }
  home() {
    this.showMainMenu = false;
    this.breadCrums = [];
    this.sh = null;
    this.deviceName = null;
  }
  onAddClose() {
    this.addDevice = false;
  }

  canRemove(event: any,data:any) {
    this.isLoading = false;
    event.stopPropagation();
    this.cnfrmRemove = true;
    this.serviceToRemove = data;
  }
  toggleCnfmModel(data: any) {
    this.cnfrmRemove = false;
    this.DeviceInfo = data.data;
    if(data.toDel) {
      this.showRemove = false;
    }
  }
}
