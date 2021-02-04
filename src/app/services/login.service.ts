import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:7070';
  constructor(private httpClient: HttpClient) { }
  login(theUsername: string, thePassword: string): Observable<LoginResponse> {
    const url = `${this.baseUrl}/accounts/login`;
    const theHeaders = {'content-type': 'application/json'};
    const httpOptions = {headers: theHeaders};
    const loginInfo = {
      username: theUsername,
      password: thePassword
    };
    const requestBody = JSON.stringify(loginInfo);
    return this.httpClient.post<LoginResponse>(url, requestBody, httpOptions)
    .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError('');
  }
}
interface LoginResponse {
  jwt: string;
}
