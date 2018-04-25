/*
 Copyright (c) 2017-2018, The Storage Networking Industry Association.
 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:
 Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice,
 this list of conditions and the following disclaimer in the documentation
 and/or other materials provided with the distribution.
 Neither the name of The Storage Networking Industry Association (SNIA) nor
 the names of its contributors may be used to endorse or promote products
 derived from this software without specific prior written permission.
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 THE POSSIBILITY OF SUCH DAMAGE.
 */
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
    HomeService,
    routeParamsPipe,
  ],
  entryComponents: [ ListMenuComponent,ConfirmModalComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
