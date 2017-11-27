import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Response} from "@angular/http";

const LOGIN_URL='assets/json/login.json';
@Injectable()
export class loginService{
  constructor(private http: Http) {}
    authenticate(){
      return this.http.get(LOGIN_URL).map((res: Response) => res.json());
    }
}
