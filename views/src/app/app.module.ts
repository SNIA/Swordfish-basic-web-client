import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {DeviceComponentComponent} from './shared/device-menu-popover/devicePopover.component';

import {AccordionModule} from 'ngx-bootstrap';
import {PopoverModule} from 'ngx-popover';
import {AddEmulatorComponent} from './add-emulator/addEmulator.component';
import {Ng2Bs3ModalModule} from 'ng2-bs3-modal/ng2-bs3-modal';
import { ProgressbarModule } from 'ngx-bootstrap';
import {loginService} from './login/shared/login.service';
import { HttpModule, } from '@angular/http';
import {registerService} from './register/shared/register.service';
import {KeysPipe} from './pipes/key-value';
import {HomeService} from './home/shared/home.service';
import {routeParamsPipe} from './pipes/routeParams';
import {ListMenuComponent} from './home/list-menu';
import {LoginComponent} from 'app/login/login.component';
import {ConfirmModalComponent} from "./confirm-modal/confirm-modal.component";
import { SpinnerComponentModule } from 'ng2-component-spinner';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent , pathMatch : 'full'},
  {path: '' , component : LoginComponent },
];


@NgModule({
  imports:      [ BrowserModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    PopoverModule,
    Ng2Bs3ModalModule,
    AccordionModule.forRoot(),
    ProgressbarModule.forRoot(),
    SpinnerComponentModule,
  ],
  declarations: [ AppComponent  , LoginComponent , RegisterComponent , HomeComponent , DeviceComponentComponent,
    AddEmulatorComponent,
    KeysPipe,
    routeParamsPipe,
    ListMenuComponent,
    ConfirmModalComponent
    ],
  providers: [
    loginService,
    registerService,
    HomeService,
    routeParamsPipe,
  ],
  entryComponents: [ ListMenuComponent,ConfirmModalComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
