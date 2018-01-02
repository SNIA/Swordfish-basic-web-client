/**
 * Created by Sravanthi on 4/25/2017.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var ngx_popover_1 = require("ngx-popover");
var DeviceComponentComponent = (function () {
    function DeviceComponentComponent() {
        alert("hai");
        /* this.popover.show();*/
    }
    DeviceComponentComponent.prototype.ngAfterViewInit = function () {
        /*  this.popover.show();*/
    };
    return DeviceComponentComponent;
}());
__decorate([
    core_1.ViewChild("myPopover"),
    __metadata("design:type", ngx_popover_1.Popover)
], DeviceComponentComponent.prototype, "popover", void 0);
DeviceComponentComponent = __decorate([
    core_1.Component({
        selector: 'device-popover',
        templateUrl: 'app/shared/device-menu-popover/devicePopover.html',
        styleUrls: ['app/shared/device-menu-popover/devicePopover.css']
    }),
    __metadata("design:paramtypes", [])
], DeviceComponentComponent);
exports.DeviceComponentComponent = DeviceComponentComponent;
//# sourceMappingURL=devicePopover.component.js.map