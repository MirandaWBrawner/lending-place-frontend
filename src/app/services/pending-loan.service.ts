import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckoutRequest } from '../common/CheckoutRequest';
import { CheckoutResponse } from '../common/CheckoutResponse';
import { PendingLoan } from '../common/PendingLoan';

@Injectable({
  providedIn: 'root'
})
export class PendingLoanService {
  private baseUrl = 'http://localhost:7070';
  constructor(private httpClient: HttpClient) {}
  getLoansPaginated(token: string): Observable<PendingLoan[]> {
    const url = `${this.baseUrl}/browse/pendingLoans/paginated`;
    const requestHeaders = new HttpHeaders()
      .set('Authentication', token);
    return this.httpClient.get<GetLoanResponse>(url, {headers: requestHeaders})
    .pipe(map(response => response.content));
  }
  getLoansUnpaginated(token: string): Observable<PendingLoan[]> {
    const url = `${this.baseUrl}/browse/pendingLoans`;
    const requestHeaders = new HttpHeaders()
      .set('Authentication', token);
    return this.httpClient.get<PendingLoan[]>(url, {headers: requestHeaders})
    .pipe(map(response => response));
  }
  checkout(request: CheckoutRequest, token: string): Observable<CheckoutResponse> {
    const url = `${this.baseUrl}/checkout`;
    const requestHeaders = new HttpHeaders()
    .set('Authentication', token);
    return this.httpClient.post<CheckoutResponse>(url, request, {headers: requestHeaders})
    .pipe(map(response => response));
  }
}
interface GetLoanResponse {
  content: PendingLoan[];
}

