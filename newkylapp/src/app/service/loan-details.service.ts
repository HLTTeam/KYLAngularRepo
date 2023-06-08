import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoanDetailsResponse } from '../model/loan-details-response.model';
import {catchError, retry, tap} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../environment';
import { ApplyLoanRequest } from '../model/apply-loan-request.model';



@Injectable({
  providedIn: 'root'
})
export class LoanDetailsService {
  httpOptions: any;

  constructor(private http: HttpClient) {
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

}

getLoans():Observable<LoanDetailsResponse[]>{
  const _url = `${environment.bankLoan}`;
  return this.http.get<LoanDetailsResponse[]>(_url);

    
  }
  applyLoan(_applyLoanRequest:ApplyLoanRequest):Observable<any> {
    const _url = `${environment.applyLoan}`;
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
    return this.http.post(_url,_applyLoanRequest,options);
    
  }

 

}
