"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Sravanthi on 4/26/2017.
 */
var core_1 = require('@angular/core');
var forms_1 = require("@angular/forms");
var AddEmulatorComponent = (function () {
    function AddEmulatorComponent(formBuilder) {
        this.formBuilder = formBuilder;
        this.IPInfo = new core_1.EventEmitter();
        this.toggleAddModal = new core_1.EventEmitter();
        this.addForm = this.formBuilder.group({
            sysName: ['', forms_1.Validators.required],
            email: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        });
    }
    AddEmulatorComponent.prototype.ngOnInit = function () {
    };
    AddEmulatorComponent.prototype.closeModal = function () {
        alert('hello');
        this.toggleAddModal.emit({ 'value': false });
    };
    AddEmulatorComponent.prototype.onAddDevice = function () {
        this.IPInfo.emit({ 'IPAddress': this.addForm.value['sysName'] });
    };
    AddEmulatorComponent.prototype.onRemove = function () {
        if (this.remove.valid) {
            this.closeModal();
        }
        else {
            this.showWarning = true;
        }
    };
    __decorate([
        core_1.Input()
    ], AddEmulatorComponent.prototype, "DeviceInfo", void 0);
    __decorate([
        core_1.Output()
    ], AddEmulatorComponent.prototype, "IPInfo", void 0);
    __decorate([
        core_1.Output()
    ], AddEmulatorComponent.prototype, "toggleAddModal", void 0);
    AddEmulatorComponent = __decorate([
        core_1.Component({
            selector: 'addEmulator-modal',
            templateUrl: 'addEmulator.html',
            styleUrls: [],
        })
    ], AddEmulatorComponent);
    return AddEmulatorComponent;
}());
exports.AddEmulatorComponent = AddEmulatorComponent;
