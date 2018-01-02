"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
var http_1 = require('@angular/http');
var rxjs_1 = require("rxjs");
var DEVICE_URL = 'http://183.82.111.178:5000';
var MEMORY_URL = ' assets/json/emulator/deviceinfo.json';
var HomeService = (function () {
    function HomeService(http) {
        this.http = http;
    }
    HomeService.prototype.getDeviceInfo = function (type) {
        var sysInfo = DEVICE_URL + type;
        return this.http.get(sysInfo).map(function (res) {
            if (res.status < 200 || res.status >= 300) {
                throw new Error('This request has failed ' + res.status);
            }
            else {
                return res.json();
            }
        });
    };
    HomeService.prototype.getIPAddress = function () {
        return this.http.get('assets/json/IPAddress.json').map(function (res) { return res.json(); });
    };
    HomeService.prototype.getMemoryDetails = function () {
        return this.http.get(MEMORY_URL).map(function (res) { return res.json(); });
    };
    HomeService.prototype.updateDeviceInfo = function (type, item) {
        var sysInfo = DEVICE_URL + type;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        /* console.log(sysInfo);
         console.log(JSON.stringify(item));*/
        return this.http.put(sysInfo, JSON.stringify(item), options)
            .catch(function (error) { return rxjs_1.Observable.throw(error.json().error || 'Server error'); });
    };
    HomeService = __decorate([
        core_1.Injectable()
    ], HomeService);
    return HomeService;
}());
exports.HomeService = HomeService;
