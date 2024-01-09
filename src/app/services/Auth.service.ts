import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable, computed, inject, signal } from "@angular/core";
import { LoginRequest } from "../models/LoginRequest";
import { environment } from "../../environments/environment";
import { EMPTY, Observable, Subject, catchError, switchMap, tap, throwError } from "rxjs";
import { RegisterRequest } from "../models/RegisterRequest";
import { AuthenticationResponse } from "../models/AuthenticationResponse";

export type AuthStatus = 'pending' | 'success' | 'error';

interface AuthState{
    status: AuthStatus;
    user: AuthenticationResponse | null;
}

@Injectable({ 
    providedIn: 'root'
 })
export class AuthService {
    private http = inject(HttpClient);
    //state
    private state = signal<AuthState>({
        status: 'pending',
        user: null,
    });
   //actions
   error$ = new Subject<any>();
   registerUser$ = new Subject<RegisterRequest>();
  userRegistered$ = this.registerUser$.pipe(
    switchMap((registerRequest) => this.register(registerRequest).pipe(
      catchError((error) => {
        this.error$.next(error);
        return EMPTY;
      })
    ))
  );
   authenticateUser$ = new Subject<LoginRequest>();
   userAuthenticated$ = this.authenticateUser$.pipe(
    switchMap((LoginRequest) => this.login(LoginRequest).pipe(
        catchError((error) => {
            this.error$.next(error);
            return EMPTY;
        })
    
    ))
   );
   disconnectUser$ = new Subject<string | undefined>();
   userDisconnected$ = this.disconnectUser$.pipe(
     tap((id) => this.disconnect(id))
   );
   //selectors
   user = computed(() => this.state().user);
   status = computed(() => this.state().status);
   constructor(){
    //reducers
    this.userAuthenticated$.pipe().subscribe((user) => {
        this.state.update((state) => ({ ...state, status: 'success', user: user  }))
    });
    this.error$.pipe().subscribe(() => {
        this.state.update((state) => ({ ...state, status: 'error'  }))
    });
    this.authenticateUser$.pipe().subscribe(() => {
        this.state.update((state) => ({ ...state, status: 'pending', user : null  }))
    });

    this.userRegistered$.subscribe((user) => {
      this.state.update((state) => ({... state, status: 'success', user: user}));
    });
    this.error$.subscribe(() => {
      this.state.update((state) => ({... state, status: 'error'}));
    });
    this.registerUser$.subscribe(() => {
      this.state.update((state) => ({... state, status: 'pending', user: null}))
    });
    this.userDisconnected$.subscribe(() => {
      this.state.update((state) => ({ ...state, status: 'success', user: null  }))
    });
    this.disconnectUser$.subscribe(() => {
      this.state.update((state) => ({ ...state, status: 'pending', user: null  }))
    })
   }

    
    login(loginResquest: LoginRequest): Observable<AuthenticationResponse>{
        const url = environment.apiUrl + 'login';
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4200',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
          });
        return this.http.post<AuthenticationResponse>(url, loginResquest , {headers: headers}).pipe(
            catchError(this.handleError),
            tap((user) => {console.log(user); })
        );
    }
    register(registerRequest: RegisterRequest): Observable<AuthenticationResponse> {
      const url = environment.apiUrl + 'register';
      var headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:4200',
          'Access-Control-Allow-Credentials': 'true',
      });
      return this.http.post<AuthenticationResponse>(url, registerRequest, {headers: headers}).pipe(
          catchError(this.handleError),
          tap((user) => {
            console.log(user);
          })
      );
    }

    disconnect(id: string | undefined): void {
      const url = environment.apiUrl + 'disconnect/';
      var headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true',
      });
       this.http.post(url + `${id}`, {headers: headers}).pipe(
        catchError(this.handleError),
       );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
          console.error('An error occurred:', error.error);
        } else {
          console.error(
            `Backend returned code ${error.status}, body was: `,
            error.error
          );
        }
        return throwError(
          () => new Error('Something bad happened; please try again later.')
        );
      }
}