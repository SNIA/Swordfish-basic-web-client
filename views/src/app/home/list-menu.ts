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
import {Component, Output, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {KeysPipe} from '../pipes/key-value';
import {HomeService} from './shared/home.service';
import {Response} from '@angular/http';
import {FormBuilder, Validators} from "@angular/forms";
import {routeParamsPipe} from "../pipes/routeParams";


@Component({
  selector:'list-menu',
  templateUrl: 'list-data.html',
  styleUrls: ['home.css']
})
export class ListMenuComponent implements OnInit {


  @Output() showSysData = new EventEmitter();
  @Output() onClose = new EventEmitter();
  public value: any;
  public  level: any;
  public show: any;

  public  storeKeys: any = [];
  public sysDetails: any = [];
  public highestLevel: any = 2;
  public showMoreData: any = [];
  public showLinks: any = [];
  public canUpdate: any;
  public canAdd: any;
  public showNoData: any;
  public dataToUpdate: any = [];
  public dummyData: any;
  public sampleData: any;
  public keyValues: any;
  public keyProperties: any;
  public CollectionName: any;
  public isLoading:any;
  public showTotalLinks:any =[];
  public showRemove:any = false;
  public statusCode :any;
  public statusText:any;

   public addService = this.formBuilder.group({
    serviceName:['',Validators.required]
  });

  constructor( public homeService: HomeService,public formBuilder: FormBuilder,public _routeParamsPipe:routeParamsPipe) {
  }

  ngOnInit() {
    this.getsysOverview(this.value);
    this.CollectionName = this._routeParamsPipe.transform(this.value);
  }

  /*ToDo: request to Post that add's a collection */
  onAddServices() {
    this.isLoading = true;
    this.homeService.addNewService(this.value+"/"+this.addService.value['serviceName'],this.keyProperties).subscribe((res: Response) =>{
       this.sysDetails.push({'@odata.id':this.value+"/"+this.addService.value['serviceName']});
       this.isLoading = false;
      this.addService.reset();
    },(error) => {
      this.isLoading = false;
      this.addService.reset();
        alert("Error :" + error);
    });
  }

  getProperties() {
   this.homeService.getKeyValueProperties(this.CollectionName,this.value).subscribe(data => {
     this.storeKeys = [];
     this.keyProperties = data;
     this.getKeyValues(data);
     this.keyValues = this.storeKeys.filter((item: any) => {
       return  !(item['key'].indexOf('@') > -1) && item['key'] !== 'Read' && item['key'] !== 'Write' && item['key'] !== 'New';
     });
   });
  }

  /* ToDo: Get reqest to Collection */
  getsysOverview(value: any) {
    this.showNoData = false;
    this.isLoading = true;
    this.dataToUpdate = [];
    this.storeKeys = [];
    this.showTotalLinks = [];
    this.showLinks = [];
    this.homeService.getDeviceInfo(value).subscribe(data => {
      this.sysDetails = [];
      this.dummyData = data;
      this.sampleData = data;
      this.getSubMenuItems(data, this.sysDetails);

      this.sysDetails = this.sysDetails.filter(item => {
          var rg = new RegExp(value+'/','i');
              return rg.test(item['@odata.id']);
        });
      this.getKeyValues(data);
        this.showLinks.map(item => {
          if(item['link']) {
            if(Array.isArray(item['link'])) {
              item['link'].map(key => {
              this.showTotalLinks.push({'key':item.key,'link':key});
              });
            }
            else  {
              Object.keys(item['link']).forEach(data => {
                if(typeof item['link'][data] === 'object') {
                  this.showTotalLinks.push({'key':item.key});
                  item['link'][data].map(subKey => {
                    this.showTotalLinks.push({'key':data,'link':subKey});
                  })
                }
                else {
                  this.showTotalLinks.push({'key':item.key,'link':item['link']});
                }
              });

            }
          }
        });
      if( data.Permissions && data.Permissions[1]['Write'] === 'True') {
        this.canUpdate = true;
      }
      else {
        this.canUpdate = this.canUpdate;
      }
      this.showMoreData = this.storeKeys.filter((item: any) => {
        return item['key'].indexOf('@') > -1 && item['key'] !== '@odata.id' ;
      });
      this.dataToUpdate = this.storeKeys.filter((item: any) => {
        return  !(item['key'].indexOf('@') > -1) && item['key'] !== 'Read' && item['key'] !== 'Write' && item['key'] !== 'New';
      });
      this.isLoading = false;
    },
      (error) => {
        this.showNoData = true;
        this.isLoading = false;
        this.statusCode  = error.status;
        this.statusText  = error.statusText;
      },
    );
  }
  handleError(error:any) {
    this.showNoData = true;
    this.isLoading = false;
  }

  createNew(value: any, selected: any) {
    if(this.showRemove) {

    }
    else {
      this.show = selected;
      this.showSysData.emit({
        value: value,
        level: this.level + 1,
        highestLevel: this.highestLevel + this.level,
        permissions: this.canUpdate
      });
    }
  }

  /* Todo: formates the JSON file to retreive the sub-collection names */
  public getSubMenuItems(data: any, arrayToStore: any) {
    new KeysPipe().transform(data).map((item: any) => {
      if ( item.value instanceof Object) {
        if ( Array.isArray(item.value)) {
          this.getSubMenuItems(item.value, arrayToStore );
        }
        else {
          if ( Object.keys(item.value).length === 1 && item.value && Object.keys(item.value)[0] === '@odata.id') {
            arrayToStore.push(item.value);
          }
          this.getSubMenuItems(item.value, arrayToStore );
        }
      }
    });
  }

  /* ToDo : PUT Request To The collection that saves the Updated data */
  showSavedData(event: any) {
    event.stopPropagation();
    this.homeService.updateDeviceInfo(this.value, this.sampleData).subscribe((res: Response) =>{
    });
  }

  setDataType(jsonToUpdate:any,item:any,value:any,valueToCheck:any) {
    if(typeof  valueToCheck === 'string') {
      jsonToUpdate[item] = value;
    }
    else {
      jsonToUpdate[item] = +value;
    }
  }

  checkValueToUpdate(data:any,key:any,value:any) {
    new KeysPipe().transform(data).map((innerData:any) => {
      if(innerData.key === key) {
        this.setDataType(data,key,value,innerData.value)
      }
    });
  }

  sendData(key: any, value: any, parentKey: any,index: any,jsonToUpdate: any) {
    if( !parentKey ) {
      Object.keys(jsonToUpdate).forEach(item => {
        if(key === item ) {
          if(typeof jsonToUpdate[item] === 'object') {
            if(typeof jsonToUpdate[item][index-1] === 'string') {
              jsonToUpdate[item][index-1] = value;
            }
            else {
              jsonToUpdate[item][index-1] = +value;
            }

          }
          else {
            this.setDataType(jsonToUpdate,item,value,jsonToUpdate[item]);
          }
        }
      });
    }
    else {
      new KeysPipe().transform(jsonToUpdate).map((item: any) => {
      if(item.key === parentKey) {
        if(Array.isArray(item.value)) {
          item.value.map((data:any) => {
           this.checkValueToUpdate(data,key,value);
          });
        }
        else {
         this.checkValueToUpdate(item.value,key,value);
        }

      }
      else {
        if(Array.isArray(item.value)) {
          item.value.map((data)=> {
           if(Array.isArray(data)) {

           }
           else if(typeof  data === 'object'){
             new KeysPipe().transform(data).map((subitem: any) => {
               if(subitem.key === parentKey) {
                  this.checkValueToUpdate(subitem.value,key,value);
               }
               else {
                 new KeysPipe().transform(subitem.value).map((innerData: any) => {
                   new KeysPipe().transform(innerData.value).map((innerData1: any) => {
                     if(innerData.key === parentKey) {
                       if(innerData1.key === key) {
                         this.setDataType(innerData.value,key,value,innerData1.value);
                       }
                     }
                   });
                 });
               }
             });

           }
          });
        }
        else {
          new KeysPipe().transform(item.value).map((data: any) => {
           if(data.key === parentKey) {
             this.checkValueToUpdate(data.value,key,value);
           }
          });
        }
      }
      });
    }
  }

  /* Function to parse the response in key-value format */
  public getData(key: any, value: any,parentKey: any,index:any) {
    let i=0;
    if ( value instanceof Object)  {
      this.storeKeys.push({'key':key,'isParent':true});
      if( Array.isArray(value)) {
        value.map(item => {
          i=i+1;
          if(typeof item === 'object') {
            Object.keys(item).forEach((keydata) => {
              this.getData(keydata, item[keydata], key,i);
            });
          }
          else {
            this.storeKeys.push({'key': key, 'value': item, 'parentKey' : parentKey, 'index':i});
          }
        });
      }
      else {
        Object.keys(value).forEach((keydata) => {
          if(key === 'Links') {
            this.showLinks.push({'key':keydata,'link':value[keydata]});
          }
          this.getData(keydata, value[keydata], key,i);
        });
      }
    }
    else {
      if(key === 'New') {
        this.canAdd = true;
      }
      this.storeKeys.push({'key': key, 'value': value, 'parentKey': parentKey,'index':index});
    }
  };

 public  getKeyValues(value: any) {
    new KeysPipe().transform(value).map((item: any) => {
      this.getData(item['key'], item['value'],'','');
    });
  }



  close() {
    this.onClose.emit({index : this.level});
  }
  onEdit(event: any) {
    event.stopPropagation();
  }
  onAdd(event: any) {
    event.stopPropagation();
  }
  public onCancelChanges(event: any) {
    event.stopPropagation();
    this.homeService.getDeviceInfo(this.value).subscribe(data => {
      this.dummyData = data;
    });
  }

   public refresh(event:any) {
    event.stopPropagation();
    this.getsysOverview(this.value);
    this.CollectionName = this._routeParamsPipe.transform(this.value);
  }
  public removeCollService(event:any,data:any) {
    this.isLoading = true;
     event.stopPropagation();
     this.homeService.deleteSwordfishService(data,this.value).subscribe(res => {
       this.getsysOverview(this.value);
       alert("Deleted Sucessfully");
       this.isLoading = false;
     },(error) => {
        alert("Deleting a service Failed");
       this.isLoading = false;
       }
     );
  }
  public removeSession(url:any) {
    this.homeService.deleteSession(url).subscribe(res => {
      sessionStorage.clear();
    });
  }
}


