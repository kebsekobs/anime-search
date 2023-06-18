import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Series } from './series';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable()
export class SeriesService {
  seriesUrl = 'api/series';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('SeriesService');
  }

  /** GET series from the server */
  getSeries(): Observable<Series[]> {
    return this.http.get<Series[]>(this.seriesUrl)
      .pipe(
        catchError(this.handleError('getSeries', []))
      );
  }

  /* GET series whose name contains search term */
  searchSeries(term: string): Observable<Series[]> {
    term = term.trim();
    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
     { params: new HttpParams().set('name', term) } : {};
    return this.http.get<Series[]>(this.seriesUrl, options)
      .pipe(
        catchError(this.handleError<Series[]>('searchSeries', []))
      );
  }
  getInfoSeries(id: number): Observable<Series[]> {
    const url = `${this.seriesUrl}/${id}`;
    return this.http.get<Series[]>(url)
      .pipe(
        catchError(this.handleError('getSeries', []))
      );
  }
}
