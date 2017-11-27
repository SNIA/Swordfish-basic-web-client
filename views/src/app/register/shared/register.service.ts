/**
 * Created by Sravanthi on 4/27/2017.
 */
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Response} from "@angular/http";

const LOGIN_URL='assets/json/login.json';
@Injectable()
export class registerService{
  constructor(private http: Http) {}

  register(){
    return this.http.get(LOGIN_URL).map((res: Response) => res.json());
  }
}
