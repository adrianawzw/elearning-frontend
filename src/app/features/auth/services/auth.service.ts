import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, catchError, throwError, switchMap } from 'rxjs';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UserSession,
} from '../interfaces/auth.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly API_URL = `${environment.apiUrl}/auth`;
  private readonly BASE_URL = environment.apiUrl;
  private readonly TOKEN_KEY = 'access_token';
  private readonly USER_KEY = 'user_session';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private userSessionSubject = new BehaviorSubject<UserSession | null>(this.getUserSession());
  public userSession$ = this.userSessionSubject.asObservable();

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/authenticate`, credentials).pipe(
      tap((response) => this.saveToken(response.access_token)),
      switchMap((response) =>
        this.http.get<any>(`${this.BASE_URL}/usuarios/me`).pipe(
          tap((usuario) => {
            const userSession: UserSession = {
              token: response.access_token,
              email: usuario.email,
              rol: usuario.rol,
              id: usuario.id,
              nombres: usuario.nombres,
              apellidos: usuario.apellidos,
            };
            this.saveUserSession(userSession);
            this.isAuthenticatedSubject.next(true);
            if (usuario.rol === 'DOCENTE') {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/dashboard/inicio']);
            }
          }),
          catchError(() => throwError(() => new Error('Error al obtener datos del usuario')))
        )
      ),
      catchError((error) => throwError(() => this.handleError(error)))
    );
  }

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.API_URL}/register`, data).pipe(
      tap(() => {
      this.router.navigate(['/auth/login']);
      }),
      catchError((error) => {
        return throwError(() => this.handleError(error));
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isAuthenticatedSubject.next(false);
     this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUserSession(): UserSession | null {
    const session = localStorage.getItem(this.USER_KEY);
    return session ? JSON.parse(session) : null;
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  getUserRol(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.rol || payload.role || null;
    } catch {
      return null;
    }
  }

  getUserId(): number | null {
    return this.getUserSession()?.id ?? null;
  }

  isDocente(): boolean {
    return this.getUserRol() === 'DOCENTE';
  }

  isEstudiante(): boolean {
    return this.getUserRol() === 'ESTUDIANTE';
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  updateCurrentUser(partial: Partial<UserSession>): void {
    const current = this.getUserSession();
    if (!current) return;
    const updated = { ...current, ...partial };
    localStorage.setItem(this.USER_KEY, JSON.stringify(updated));
    this.userSessionSubject.next(updated);
  }

  private saveUserSession(session: UserSession): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(session));
    this.userSessionSubject.next(session);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  private handleError(error: any): Error {
    let message = 'Error desconocido';

    if (error.status === 401) {
      message = 'Credenciales inválidas';
    } else if (error.status === 409) {
      message = 'El email ya está registrado';
    } else if (error.error?.message) {
      message = error.error.message;
    } else if (error.message) {
      message = error.message;
    }

    return new Error(message);
  }
}