/*
 Copyright (c) 2017, The Storage Networking Industry Association.
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
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {loginService} from './shared/login.service';
import {Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: 'login.html',
  styleUrls: [ 'login.css' ]
})
export class LoginComponent implements OnInit {
    public isactive = true;
    private user_tokenId;
    public loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    constructor(private router: Router , private loginservice: loginService , public fb: FormBuilder) {
      if ( localStorage.getItem('user-token')) {
        this.router.navigate(['/home']);
      }
    }
    ngOnInit() {

    }
    getToken() {
      this.loginservice.authenticate().subscribe(data => {
        const token = data.userDetails.filter(item => {
           this.user_tokenId = item['token'];
            return item['email'] ===  this.loginForm.value['email'] && item['password'] === this.loginForm.value['password'];
        });
        if ( token.length > 0) {
          localStorage.setItem('user-token', this.user_tokenId)
          this.router.navigate(['/home']);
        }
        else {
          alert("Invalid Credentials");
        }
      });
    }
}
