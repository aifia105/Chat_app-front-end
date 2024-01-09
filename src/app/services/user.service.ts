import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { UserInterface } from "../models/UserInterface";

@Injectable({ 
    providedIn: 'root'
 })
export class UserService{
    
    private http = inject(HttpClient);

    getUser(id: string):Observable<UserInterface>{
        const url = environment.apiUrl + 'user/';
        var headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:4200',
          'Access-Control-Allow-Credentials': 'true',
        });
        return this.http.get<UserInterface>(url + `${id}`, {headers: headers}).pipe(
            catchError(this.handleError),
            tap((user) => {console.log(user); })
        );
    }

    getConnectedUsers():Observable<UserInterface[]>{
        const url = environment.apiUrl + 'connectedUsers';
        var headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:4200',
          'Access-Control-Allow-Credentials': 'true',
        });
        return this.http.get<UserInterface[]>(url, {headers: headers}).pipe(
            catchError(this.handleError),
            tap((user) => {console.log(user); })
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