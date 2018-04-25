/*
 Copyright (c) 2017-2018, The Storage Networking Industry Association.
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

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from "rxjs";


@Injectable()
export class HomeService {
    constructor(private http: Http) {
    }

    public DEVICE_URL: any;
    public token:any;
    public cookieId:any;
    public locIp:any;
    set
    setIpAddress(url:any) {
      url = url.replace('http://','');
      this.DEVICE_URL = 'http://'+ url;
    }
    setAuthHeader(token:any,cookieId:any,Location:any) {
      this.token = token;
      this.cookieId = cookieId;
      this.locIp = Location;
    }
    getCurrentSessionName() {
      return sessionStorage.getItem(this.DEVICE_URL.replace('http://','')+'Location');
    }
    getDeviceInfo(type: any): Observable<any> {
      let sysInfo =  this.DEVICE_URL + type ;
      let headers = new Headers();
      headers.append('X-Auth-Token',this.token);
      headers.append('Cookie-Headers',sessionStorage.getItem(this.DEVICE_URL.replace('http://','')));
      return this.http.get( '/getCollectionData?Ip='+sysInfo,{headers:headers}).map((res: Response) => {
        if ( res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        }
        else {
          return res.json();
        }
      });
    }
    getIPAddress() {
      return  sessionStorage.getItem('DeviceInfo');
    }
    getAuthToken(data:any) {
      let postUrl = this.DEVICE_URL + "/redfish/v1/SessionService/Sessions";
       data['postUrl'] = postUrl;
      return this.http.post('/getCookie', data )
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    updateDeviceInfo(type: any, item: any) {
      let sysInfo = this.DEVICE_URL + type;
      let headers = new Headers();
      headers.append('X-Auth-Token',this.token);
      headers.append('Cookie-Headers',this.cookieId);
      return this.http.post('/updateCollection?Ip='+sysInfo,  item,{headers:headers})
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    getKeyValueProperties(CollectionName: any,value: any) {
      return this.http.get(this.DEVICE_URL +value+'/template').map((res: Response) => res.json());
    }

    addNewService(serviceName: any,data: any) {
      let headers = new Headers();
      headers.append('X-Auth-Token',this.token);
      headers.append('Cookie-Headers',this.cookieId);
      return this.http.post('/addCollection', {Ip:this.DEVICE_URL+serviceName},{headers:headers})
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    deleteSwordfishService(data:any,collectionPath:any) {
      let headers = new Headers();
      headers.append('X-Auth-Token',this.token);
      headers.append('Cookie-Headers',this.cookieId);
        return this.http.delete('/deleteService?Ip='+this.DEVICE_URL+collectionPath,new RequestOptions({
          headers: headers,
          body: data
        }))
          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    deleteSession(url:any) {
      var locationHeader;
      var sessionHeader;
      let headers = new Headers();
      headers.append('X-Auth-Token',this.token);
      headers.append('Cookie-Headers',sessionStorage.getItem(this.DEVICE_URL.replace('http://','')));
      if(url) {
         locationHeader = this.DEVICE_URL +  url;
      }
      else{
         sessionHeader = sessionStorage.getItem(this.DEVICE_URL.replace('http://','')+'Location');
         locationHeader = this.DEVICE_URL + sessionHeader;
      }
      return this.http.delete('/deleteSession?Ip='+locationHeader,{headers:headers}).catch((error:any) =>
      Observable.throw(error.json().error || 'Server error')
      );
    }
}
