"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var home_component_1 = require("./home/home.component");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var devicePopover_component_1 = require("./shared/device-menu-popover/devicePopover.component");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var ngx_popover_1 = require("ngx-popover");
var addEmulator_component_1 = require("./add-emulator/addEmulator.component");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var ngx_bootstrap_2 = require("ngx-bootstrap");
var login_service_1 = require("./login/shared/login.service");
var http_1 = require("@angular/http");
var register_service_1 = require("./register/shared/register.service");
var key_value_1 = require("./pipes/key-value");
var home_service_1 = require("./home/shared/home.service");
var ng2_charts_1 = require("ng2-charts");
var routeParams_1 = require("./pipes/routeParams");
var list_menu_1 = require("./home/list-menu");
var appRoutes = [
    { path: 'home', component: home_component_1.HomeComponent, pathMatch: 'full' },
    { path: '', component: login_component_1.LoginComponent },
];
exports.findRoutingProviders = [];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule,
            router_1.RouterModule.forRoot(appRoutes, { useHash: true }),
            forms_1.ReactiveFormsModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            ngx_popover_1.PopoverModule,
            ng2_bs3_modal_1.Ng2Bs3ModalModule,
            ngx_bootstrap_1.AccordionModule.forRoot(),
            ngx_bootstrap_2.ProgressbarModule.forRoot(),
            ng2_charts_1.ChartsModule
        ],
        declarations: [app_component_1.AppComponent, login_component_1.LoginComponent, register_component_1.RegisterComponent, home_component_1.HomeComponent, devicePopover_component_1.DeviceComponentComponent,
            addEmulator_component_1.AddEmulatorComponent,
            key_value_1.KeysPipe,
            routeParams_1.routeParamsPipe,
            list_menu_1.ListMenuComponent],
        providers: [exports.findRoutingProviders, login_service_1.loginService, register_service_1.registerService, home_service_1.HomeService],
        entryComponents: [list_menu_1.ListMenuComponent],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map