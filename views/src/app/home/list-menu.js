"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Sravanthi on 5/8/2017.
 */
var core_1 = require('@angular/core');
var key_value_1 = require('../pipes/key-value');
var ListMenuComponent = (function () {
    function ListMenuComponent(homeService) {
        this.homeService = homeService;
        this.showSysData = new core_1.EventEmitter();
        this.onClose = new core_1.EventEmitter();
        this.storeKeys = [];
        this.sysDetails = [];
        this.highestLevel = 2;
        this.showMoreData = [];
        this.showLinks = [];
        this.dataToUpdate = [];
    }
    ListMenuComponent.prototype.ngOnInit = function () {
        this.getsysOverview(this.value);
    };
    ListMenuComponent.prototype.getsysOverview = function (value) {
        var _this = this;
        this.showNoData = false;
        this.homeService.getDeviceInfo(value).subscribe(function (data) {
            _this.sysDetails = [];
            _this.dummyData = data;
            _this.sampleData = data;
            _this.getSubMenuItems(data, _this.sysDetails);
            _this.getKeyValues(data);
            if (data.Permissions) {
                _this.canUpdate = data.Permissions[1]['Write'];
            }
            else {
                _this.canUpdate = _this.canUpdate;
            }
            _this.showMoreData = _this.storeKeys.filter(function (item) {
                return item['key'].indexOf('@') > -1 && item['key'] !== '@odata.id';
            });
            _this.showLinks = _this.storeKeys.filter(function (item) {
                return item['key'].indexOf('@') > -1 && item['key'] === '@odata.id';
            });
            _this.dataToUpdate = _this.storeKeys.filter(function (item) {
                return !(item['key'].indexOf('@') > -1) && item['key'] !== 'Read' && item['key'] !== 'Write';
            });
        }, function (error) { return _this.handleError(error); });
    };
    ListMenuComponent.prototype.handleError = function (error) {
        this.showNoData = true;
        //console.log(error);
    };
    ListMenuComponent.prototype.showSavedData = function (event) {
        event.stopPropagation();
        this.homeService.updateDeviceInfo(this.value, this.sampleData).subscribe(function (res) {
            // console.log(res);
        });
    };
    ListMenuComponent.prototype.sendData = function (key, value, parentKey) {
        var _this = this;
        // console.log(parentKey);
        if (!parentKey) {
            Object.keys(this.sampleData).forEach(function (item) {
                if (key === item) {
                    _this.sampleData[item] = value;
                }
            });
        }
        else {
            new key_value_1.KeysPipe().transform(this.sampleData).map(function (item) {
                if (typeof item.value !== 'string' && !Array.isArray(item.value)) {
                    _this.setUpdatedValue(item, parentKey, key, value);
                }
            });
        }
    };
    ListMenuComponent.prototype.setUpdatedValue = function (item, parentKey, key, value) {
        new key_value_1.KeysPipe().transform(item.value).map(function (item1) {
            if (typeof item1 === 'object') {
                if (item1.key === parentKey) {
                    new key_value_1.KeysPipe().transform(item1).map(function (subitem) {
                        Object.keys(subitem.value).forEach(function (data) {
                            if (key === data) {
                                subitem.value[key] = value;
                            }
                        });
                    });
                }
            }
            else {
                if (item1.key === parentKey) {
                    Object.keys(item1.value).forEach(function (data) {
                        if (key === data) {
                            item1.value[key] = value;
                            return;
                        }
                    });
                }
            }
        });
    };
    ListMenuComponent.prototype.createNew = function (value, selected) {
        this.show = selected;
        this.showSysData.emit({ value: value, level: this.level + 1, highestLevel: this.highestLevel + this.level, permissions: this.canUpdate });
    };
    ListMenuComponent.prototype.getData = function (key, value, parentKey) {
        var _this = this;
        if (value instanceof Object) {
            if (Array.isArray(value)) {
                value.map(function (item) {
                    if (typeof item !== 'string') {
                        Object.keys(item).forEach(function (keydata) {
                            _this.getData(keydata, item[keydata], '');
                        });
                    }
                    else {
                        _this.storeKeys.push({ 'key': key, 'value': item, 'parentKey': _this.storeArraykey });
                    }
                });
            }
            else {
                this.storeArraykey = key;
                Object.keys(value).forEach(function (keydata) {
                    _this.getData(keydata, value[keydata], _this.storeArraykey);
                });
            }
        }
        else {
            this.storeKeys.push({ 'key': key, 'value': value, 'parentKey': parentKey });
        }
    };
    ;
    ListMenuComponent.prototype.getKeyValues = function (value) {
        var _this = this;
        new key_value_1.KeysPipe().transform(value).map(function (item) {
            _this.getData(item['key'], item['value'], '');
        });
    };
    ListMenuComponent.prototype.getSubMenuItems = function (data, arrayToStore) {
        var _this = this;
        new key_value_1.KeysPipe().transform(data).map(function (item) {
            if (item.value instanceof Object) {
                if (Array.isArray(item.value)) {
                    _this.getSubMenuItems(item.value, arrayToStore);
                }
                else {
                    if (Object.keys(item.value).length === 1 && item.value && Object.keys(item.value)[0] === '@odata.id') {
                        arrayToStore.push(item.value);
                    }
                    _this.getSubMenuItems(item.value, arrayToStore);
                }
            }
        });
    };
    ListMenuComponent.prototype.close = function () {
        this.onClose.emit({ index: this.level });
    };
    ListMenuComponent.prototype.onCancelChanges = function (event) {
        var _this = this;
        event.stopPropagation();
        this.homeService.getDeviceInfo(this.value).subscribe(function (data) {
            _this.dummyData = data;
        });
    };
    __decorate([
        core_1.Output()
    ], ListMenuComponent.prototype, "showSysData", void 0);
    __decorate([
        core_1.Output()
    ], ListMenuComponent.prototype, "onClose", void 0);
    ListMenuComponent = __decorate([
        core_1.Component({
            selector: 'list-menu',
            templateUrl: 'list-data.html',
            styleUrls: ['home.css']
        })
    ], ListMenuComponent);
    return ListMenuComponent;
}());
exports.ListMenuComponent = ListMenuComponent;
