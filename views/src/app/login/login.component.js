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
var router_1 = require("@angular/router");
var login_service_1 = require("./shared/login.service");
var forms_1 = require("@angular/forms");
var LoginComponent = (function () {
    function LoginComponent(router, loginservice, fb) {
        this.router = router;
        this.loginservice = loginservice;
        this.fb = fb;
        this.isactive = true;
        this.loginForm = this.fb.group({
            email: ["", forms_1.Validators.required],
            password: ["", forms_1.Validators.required]
        });
        if (localStorage.getItem('user-token')) {
            this.router.navigate(['/home']);
        }
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.getToken = function (event) {
        var _this = this;
        var $this = this;
        this.loginservice.authenticate().subscribe(function (data) {
            var token = data.userDetails.filter(function (item) {
                $this.user_tokenId = item["token"];
                return item["email"] === $this.loginForm.value["email"] && item["password"] === $this.loginForm.value["password"];
            });
            if (token.length > 0) {
                localStorage.setItem('user-token', _this.user_tokenId);
                _this.router.navigate(['/home']);
            }
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: 'app/login/login.html',
        styleUrls: ['./login.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, login_service_1.loginService, forms_1.FormBuilder])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map