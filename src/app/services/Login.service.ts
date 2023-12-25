import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable, computed, inject, signal } from "@angular/core";
import { LoginRequest } from "../models/LoginRequest";
import { environment } from "../../environments/environment";
import { EMPTY, Observable, Subject, catchError, switchMap, tap, throwError } from "rxjs";
import { RegisterRequest } from "../models/RegisterRequest";
import { AuthenticationResponse } from "../models/AuthenticationResponse";

export type LoginStatus = 'pending' | 'success' | 'error';

interface LoginState{
    status: LoginStatus;
    user: AuthenticationResponse | null;
}

@Injectable({ 
    providedIn: 'root'
 })
export class LoginService {
    private http = inject(HttpClient);
    //state
    private state = signal<LoginState>({
        status: 'pending',
        user: null,
    });
   //actions
   error$ = new Subject<any>();
   authenticateUser$ = new Subject<LoginRequest>();
   userAuthenticated$ = this.authenticateUser$.pipe(
    switchMap((LoginRequest) => this.login(LoginRequest).pipe(
        catchError((error) => {
            this.error$.next(error);
            return EMPTY;
        })
    
    ))
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
            tap((user) => {console.log('from backend', user);})
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