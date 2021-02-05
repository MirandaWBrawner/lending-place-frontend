import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RecommendationRequest } from '../common/RecommendationRequest';
import { RecommendationResponse } from '../common/RecommendationResponse';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl = 'http://localhost:7070';
  constructor(private httpClient: HttpClient) { }
  sendFeedback(request: RecommendationRequest): Observable<RecommendationResponse> {
    const url = `${this.baseUrl}/recommend`;
    const headerContent = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type'
    };
    const requestOptions = {
      headers: new Headers(headerContent)
    };
    return this.httpClient.post<RecommendationResponse>(url, request, {})
    .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError('Something went wrong.');
  }
}
