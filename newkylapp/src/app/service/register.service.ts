import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse,HttpParams} from '@angular/common/http';
import { environment } from '../environment';
import { RegisterModel } from '../model/register-model';
import {catchError, retry, tap} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class RegisterService {

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


    registration(_registerModel:RegisterModel):Observable<any> {
      const _url = `${environment.registerURL}`;
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
      return this.http.post(_url,_registerModel,options);
      
    }

    private handleAnyError(error: any) {

      let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  
      console.log('status'+error.status);
  
      return throwError(error);
  
    }
}

