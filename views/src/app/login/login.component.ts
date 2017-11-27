
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
      });
    }
}
