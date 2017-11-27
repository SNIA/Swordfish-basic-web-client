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
/**
 * Created by Sravanthi on 4/24/2017.
 */
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
/*import {FormControl, FormGroup, Validators} from '@angular/forms';*/
var RegisterComponent = (function () {
    function RegisterComponent(formBuilder) {
        this.formBuilder = formBuilder;
        this.isactive = true;
        this.registerCredentials = {
            "firstName": "",
            "lastName": "",
            "email": "",
            "password": "",
            "companyName": "",
            "phoneNumber": "",
        };
        this.registration = formBuilder.group({
            firstName: ['', forms_1.Validators.compose([forms_1.Validators.maxLength(16), forms_1.Validators.pattern('[a-zA-Z ]*'), forms_1.Validators.required])],
            lastName: ['', forms_1.Validators.compose([forms_1.Validators.maxLength(16), forms_1.Validators.pattern('[a-zA-Z ]*'), forms_1.Validators.required])],
            emailId: ['', forms_1.Validators.compose([forms_1.Validators.maxLength(30), forms_1.Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'), forms_1.Validators.required])],
            password: ['', forms_1.Validators.compose([forms_1.Validators.maxLength(15), forms_1.Validators.minLength(8), forms_1.Validators.pattern('^[a-zA-Z0-9@#!$%^&]+'), forms_1.Validators.required])],
            companyName: ['', forms_1.Validators.compose([forms_1.Validators.maxLength(16), forms_1.Validators.pattern('[a-zA-Z0-9 ]*'), forms_1.Validators.required])],
            phoneNumber: ['', forms_1.Validators.compose([forms_1.Validators.minLength(10), forms_1.Validators.maxLength(10), forms_1.Validators.pattern('[0-9]*'), forms_1.Validators.required])],
        });
    }
    RegisterComponent.prototype.registerNewUser = function (data) {
        console.log(data);
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        selector: 'register',
        templateUrl: 'app/register/register.html',
        styleUrls: ['app/login/login.css', 'app/register/register.css']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map