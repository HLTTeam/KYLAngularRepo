import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse,HttpParams} from '@angular/common/http';
import { environment } from './environment';
import { LoginModel } from './model/login-model';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT',
      'If-Modified-Since': '0',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };



    login(_loginModel:LoginModel) {
      const _url = `${environment.loginURL}`;
      let httpOptions = this.httpOptions;
      httpOptions = {
        headers: new HttpHeaders({
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT',
          'If-Modified-Since': '0',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
          })
        };
      console.log('URL '+_url);
      let httpQueryParams: HttpParams =  new HttpParams();
     
      const options = { ...httpOptions, params: httpQueryParams };
      return this.http.post(_url,_loginModel,options);
    }

    getData() {
      const _url = `${environment.updateURL}`;
      let httpOptions = this.httpOptions;
      let headers:HttpHeaders=httpOptions.headers.append('Content-Type', 'multipart/form-data');
      httpOptions = {
        headers:headers
      };
      console.log('URL '+_url);
      let httpQueryParams: HttpParams =  new HttpParams();
     
      const options = { ...httpOptions, params: httpQueryParams };
      return this.http.get(_url,formData,options);
    }



}

