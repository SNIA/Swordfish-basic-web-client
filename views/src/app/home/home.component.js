/**
 * Created by Sravanthi on 4/24/2017.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var list_menu_1 = require('./list-menu');
var routeParams_1 = require('../pipes/routeParams');
var HomeComponent = (function () {
    function HomeComponent(componentFactoryResolver, router, homeService) {
        var _this = this;
        this.componentFactoryResolver = componentFactoryResolver;
        this.router = router;
        this.homeService = homeService;
        this.dataToDisplay = [];
        this.level = 0;
        this.highestLevel = 0;
        this.addDevice = false;
        this.breadCrums = [];
        this.canEdit = false;
        this.data = [];
        this.showMainMenu = false;
        this.colors = ['skyblue', 'cadetblue', 'steelblue', 'rosybrown', 'silver'];
        if (!localStorage.getItem('user-token')) {
            this.router.navigate(['']);
        }
        this.homeService.getDeviceInfo('/redfish/v1/get_system_details').subscribe(function (data) {
            _this.total_disk_space = +data.total_disk_space;
            _this.used_space = +data.used_space;
            _this.available_space = +data.available_space;
        });
        this.homeService.getMemoryDetails().subscribe(function (data) {
            _this.memoryAllocation = data.data;
        });
        this.homeService.getIPAddress().subscribe(function (data) {
            _this.DeviceInfo = data.Device;
        });
    }
    HomeComponent.prototype.IPInfo = function (data) {
        this.DeviceInfo.push({ 'IPAddress': data.IPAddress });
        this.addDevice = false;
    };
    HomeComponent.prototype.homePage = function (value) {
        var _this = this;
        this.deviceName = value;
        this.homeService.getDeviceInfo('/redfish/v1/').subscribe(function (data) {
            _this.resourcesMenu = data.Links;
        });
        this.showMainMenu = true;
        this.breadCrums = [];
        for (var i = 0; i <= this.highestLevel + 1; i++) {
            if (this.dataToDisplay[i]) {
                this.dataToDisplay[i].destroy();
            }
        }
        this.show = null;
        this.memoryDetails = '';
        this.canEdit = false;
    };
    HomeComponent.prototype.create = function (value, index, selected, key) {
        var _this = this;
        this.breadCrums[index] = value;
        this.show = selected;
        this.memoryDetails = key;
        this.toClose = index;
        if (index === 0) {
            this.level = 0;
        }
        for (var i = index; i <= this.highestLevel + 1; i++) {
            if (this.dataToDisplay[i]) {
                this.dataToDisplay[i].destroy();
            }
            this.breadCrums.splice(index + 1, 1);
        }
        this.dataToDisplay[index] = this.viewData.createComponent(this.componentFactoryResolver.resolveComponentFactory(list_menu_1.ListMenuComponent));
        this.dataToDisplay[index].instance.value = value;
        this.dataToDisplay[index].instance.level = this.level;
        this.dataToDisplay[index].instance.canUpdate = this.canEdit;
        this.dataToDisplay[index].instance.showSysData.subscribe(function (result) {
            _this.level = result.level;
            _this.highestLevel = result.highestLevel;
            _this.canEdit = result.permissions;
            _this.create(result.value, result.level, selected, key);
        });
        this.dataToDisplay[index].instance.onClose.subscribe(function (item) {
            if (_this.dataToDisplay[item.index - 1]) {
                _this.dataToDisplay[item.index - 1].instance.show = null;
            }
            if (item.index === 0) {
                _this.show = null;
            }
            _this.close(item.index);
        });
        document.body.scrollLeft = 100000;
    };
    HomeComponent.prototype.close = function (index) {
        for (var i = index; i <= this.highestLevel + 1; i++) {
            if (this.dataToDisplay[i]) {
                this.dataToDisplay[i].destroy();
            }
            this.breadCrums.splice(index, 1);
        }
    };
    HomeComponent.prototype.getName = function (value) {
        this.breadCrumKey = new routeParams_1.routeParamsPipe().transform(value);
    };
    HomeComponent.prototype.logout = function () {
        localStorage.clear();
        this.router.navigate(['']);
    };
    HomeComponent.prototype.getColor = function () {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    };
    HomeComponent.prototype.onAddDevice = function () {
        this.addDevice = true;
    };
    HomeComponent.prototype.toggleAddModal = function (data) {
        this.addDevice = data.value;
        console.log(this.addDevice);
    };
    HomeComponent.prototype.home = function () {
        this.showMainMenu = false;
        this.breadCrums = [];
        this.sh = null;
        this.deviceName = null;
    };
    HomeComponent.prototype.onAddClose = function () {
        this.addDevice = false;
    };
    __decorate([
        core_1.ViewChild('dynamicCom', { read: core_1.ViewContainerRef })
    ], HomeComponent.prototype, "viewData", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: 'home.html',
            styleUrls: ['home.css']
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
