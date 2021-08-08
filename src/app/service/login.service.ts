import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credential } from '../models/credential';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  authenticateUri = 'authenticate';
  loggedInUserUri = 'logged-in-user';
  logoutUri = 'logout';

  constructor(private httpClient: HttpClient) { }

  login = (credential: Credential): Observable<any> => {
    return this.httpClient.post<any>(environment.baseURL + this.authenticateUri, credential).pipe(
      catchError(this.handleError)
    );
  }

  handleError = (error) => {
    return throwError(error);
  }

  saveToken = (token: string) => {
    localStorage.setItem('token', token);
  }

  isLoggedIn = () => {
    return !!localStorage.getItem('token');
  }

  getToken = () => {
    return localStorage.getItem('token');
  }

  getLoggedInUser = (): Observable<any> => {
    return this.httpClient.get<any>(environment.baseURL + this.loggedInUserUri).pipe(
      catchError(this.handleError)
    );
  }

  logout = (): Observable<any> => {
    return this.httpClient.get<any>(environment.baseURL + this.logoutUri).pipe(
      catchError(this.handleError)
    );
  }

  removeJwtToken = () => {
    return localStorage.removeItem('token')
  }
}
