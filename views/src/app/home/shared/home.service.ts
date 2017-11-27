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
    set
    setIpAddress(url:any) {
      url = url.replace('http://','');
      this.DEVICE_URL = 'http://'+ url;
    }
    setAuthHeader(token:any,cookieId:any) {
      this.token = token;
      this.cookieId = cookieId;
      document.cookie = cookieId;
    }

    getDeviceInfo(type: any): Observable<any> {
      let sysInfo =  this.DEVICE_URL + type ;
      let headers = new Headers();
      headers.append('X-Auth-Token',this.token);
      headers.append('Cookie-Headers',this.cookieId);
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
      return  localStorage.getItem('DeviceInfo');
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
}
