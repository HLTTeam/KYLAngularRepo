import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse,HttpParams} from '@angular/common/http';
import { environment } from '../environment';
import { PasswordResetModel } from '../model/password-reset-model';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

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

    reset(_resetModel:PasswordResetModel): Observable<any> {
      const _url = `${environment.resetURL}`;
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
      // return this.http.put(_url,_resetModel,options);
      console.log("Before call the reset passowrd servcie");
      return this.http.post(_url,_resetModel,options);
    }

}
