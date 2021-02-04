import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Lendable } from '../common/Lendable';
import { catchError, map } from 'rxjs/operators';
import { ReserveRequest } from '../common/ReserveRequest';
import { ReserveResponse } from '../common/ReserveResponse';
import { Category } from '../common/Category';

@Injectable({
  providedIn: 'root'
})
export class LendableService {
  private baseUrl = 'http://localhost:7070';
  constructor(private httpClient: HttpClient) {}
  getLendableList(language: string): Observable<Lendable[]> {
    const url = `${this.baseUrl}/browse/lendables?language=${language}`;
    return this.httpClient.get<GetLendableResponse>(url)
      .pipe(map(response => response.content));
  }
  getLendablesInCategory(language: string, categoryId: number): Observable<Lendable[]> {
    const url = `${this.baseUrl}/browse/lendables?language=${language}&categoryId=${categoryId}`;
    return this.httpClient.get<GetLendableResponse>(url)
      .pipe(map(response => response.content));
  }
  getCategoryList(language: string): Observable<Category[]> {
    const url = `${this.baseUrl}/browse/categories?language=${language}`;
    return this.httpClient.get<GetCategoryResponse>(url)
      .pipe(map(response => response.content));
  }
  search(searchTerm: string, language: string): Observable<Lendable[]> {
    if (searchTerm === null || searchTerm === undefined || searchTerm.trim().length === 0) {
      return this.getLendableList(language);
    }
    const url = `${this.baseUrl}/search/lendables?name=${searchTerm}&language=${language}`;
    return this.httpClient.get<GetLendableResponse>(url)
    .pipe(map(response => response.content));
  }
  reserve(request: ReserveRequest): Observable<ReserveResponse> {
    const url = `${this.baseUrl}/reserve`;
    const httpOptions = {};
    return this.httpClient.post<ReserveResponse>(url, request, httpOptions)
    .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error.error.message);
    return throwError('Something went wrong.');
  }
}

interface GetLendableResponse {
  content: Lendable[];
}
interface GetCategoryResponse {
  content: Category[];
}
