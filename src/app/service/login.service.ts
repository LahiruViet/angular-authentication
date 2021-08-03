import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  authenticateUri = 'authenticate';
  loggedInUser = 'logged-in-user';

  constructor(private httpClient: HttpClient) { }

  login = (credential): Observable<any> => {
    return this.httpClient.post<any>(environment.baseURL + this.authenticateUri, credential).pipe(
      catchError(this.handleError)
    );
  }

  handleError = error => {
    return throwError(error);
  }

  saveToken = (token) => {
    localStorage.setItem('token', token);
  }

  isLoggedIn = () => {
    return !!localStorage.getItem('token');
  }

  getToken = () => {
    return localStorage.getItem('token');
  }

  getLoggedInUser = (): Observable<any> => {
    return this.httpClient.get<any>(environment.baseURL + this.loggedInUser).pipe(
      catchError(this.handleError)
    );
  }
}
