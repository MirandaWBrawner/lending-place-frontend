import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PendingLoan } from '../common/PendingLoan';

@Injectable({
  providedIn: 'root'
})
export class PendingLoanService {
  private baseUrl = 'http://localhost:7070';
  constructor(private httpClient: HttpClient) {}
  getLoans(): Observable<PendingLoan[]> {
    const url = `${this.baseUrl}/pendingLoans/pageSize=50`;
    return this.httpClient.get<GetLoanResponse>(url)
    .pipe(map(response => response.content));
  }
}
interface GetLoanResponse {
  content: PendingLoan[];
}
