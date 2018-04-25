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
import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: 'register.html',
  styleUrls: [  'register.css']
})
export class RegisterComponent  {
  public isactive:boolean=true;
  public registerCredentials = {
    "firstName":"",
    "lastName":"",
    "email":"",
    "password":"",
    "companyName":"",
    "phoneNumber":"",
  };
  public registration:any;
  constructor(public formBuilder: FormBuilder) {
    this.registration = formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(16), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(16), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      emailId: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'), Validators.required])],
      password: ['', Validators.compose([Validators.maxLength(15),Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9@#!$%^&]+'), Validators.required])],
      companyName:['', Validators.compose([Validators.maxLength(16), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      phoneNumber: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10),Validators.pattern('[0-9]*'), Validators.required])],
    });
  }
  registerNewUser(data:any)  {
    console.log(this.registration);
    console.log(data);
  }
}
