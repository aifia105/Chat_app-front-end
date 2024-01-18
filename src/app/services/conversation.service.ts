import { Injectable, computed, inject, signal } from "@angular/core";
import { ConversationInterface } from "../models/ConversationInterface";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { EMPTY, Observable, Subject, catchError, switchMap, tap, throwError } from "rxjs";
import { environment } from "../../environments/environment";




@Injectable({
    providedIn: 'root'
})
export class ConversationService {

    private http = inject(HttpClient);


    getConversationsOneOnOne(id: string):Observable<ConversationInterface>{
        const url = environment.apiUrl + 'conversation/one-on-one/';
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4200',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
          });
        return this.http.post<ConversationInterface>(url + `${id}` , {headers: headers}).pipe(
            catchError(this.handleError),
            tap((conv) => {
                console.log(conv);
              })
        );
    }

    getConversationsGroup(participants: string[]):Observable<ConversationInterface>{
        const url = environment.apiUrl + 'conversation/group';
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4200',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
          });
        return this.http.post<ConversationInterface>(url, participants , {headers: headers}).pipe(
            catchError(this.handleError),
            tap((conv) => {
                console.log(conv);
              })
        );
    }

    getUserConversations(id: string | undefined):Observable<ConversationInterface[]>{
        const url = environment.apiUrl + 'conversation/';
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4200',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
          });
        return this.http.get<ConversationInterface[]>(url + `${id}` , {headers: headers}).pipe(
            catchError(this.handleError),
            tap((conv) => {
                console.log(conv);
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