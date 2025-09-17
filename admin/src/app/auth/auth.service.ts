import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { authTokenKey } from './auth.constants';

type AuthResponse = {
  access_token: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('http://localhost:3000/auth', { email, password })
      .pipe(
        tap((response) => {
          localStorage.setItem(authTokenKey, response.access_token);
          this.isAuthenticatedSubject.next(true);
        })
      );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(authTokenKey);
  }

  private checkAuthStatus(): void {
    const token = localStorage.getItem(authTokenKey);
    this.isAuthenticatedSubject.next(!!token);
  }
}
