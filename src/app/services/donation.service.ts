import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DonationRequest } from '../common/DonationRequest';
import { RecommendationResponse } from '../common/RecommendationResponse';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private baseUrl = 'http://localhost:7070';
  constructor(private httpClient: HttpClient) { }
  donate(request: DonationRequest): Observable<RecommendationResponse> {
    const url = `${this.baseUrl}/donate`;
    return this.httpClient.post<RecommendationResponse>(url, request, {})
    .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError('Something went wrong.');
  }
}
