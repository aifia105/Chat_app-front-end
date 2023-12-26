import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable, computed, inject, signal } from "@angular/core";
import { RegisterRequest } from "../models/RegisterRequest";
import { EMPTY, Observable, Subject, catchError, switchMap, tap, throwError } from "rxjs";
import { environment } from "../../environments/environment";


export type RegisterStatus = 'pending' | 'success' | 'error';

interface RegisterState{
    status: RegisterStatus;
    user: AuthenticatorResponse | null;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService{

  private http = inject(HttpClient);
  //state
  private state = signal<RegisterState>({
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

  //selectors 
  user = computed(() => this.state().user);
  status = computed(() => this.state().status);

  constructor(){
    this.userRegistered$.subscribe((user) => {
      this.state.update((state) => ({... state, status: 'success', user: user}));
    });
    this.error$.subscribe(() => {
      this.state.update((state) => ({... state, status: 'error'}));
    });
    this.registerUser$.subscribe(() => {
      this.state.update((state) => ({... state, status: 'pending', user: null}))
    });
  }

     register(registerRequest: RegisterRequest): Observable<AuthenticatorResponse> {
        const url = environment.apiUrl + 'register';
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4200',
            'Access-Control-Allow-Credentials': 'true',
        });
        return this.http.post<AuthenticatorResponse>(url, registerRequest, {headers: headers}).pipe(
            catchError(this.handleError),
            tap((response) => {
                console.log('from backend',response);
            })
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