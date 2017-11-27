/**
 * Created by Sravanthi on 4/24/2017.
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
