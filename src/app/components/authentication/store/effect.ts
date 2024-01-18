import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../../services/Auth.service";
import { Router } from "@angular/router";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { authActions } from "./actions";
import { PersistanceService } from "../../../services/persistance.service";
import { HttpErrorResponse } from "@angular/common/http";

export const loginEffect = createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService), route = inject(Router), persist = inject(PersistanceService)) => {
        return actions$.pipe(
            ofType(authActions.login),
            switchMap(({request}) => {
                return authService.login(request).pipe(
                    tap((response) => console.log('API Response: from effect', response)),
                    map((user) => {
                        route.navigate(['home']);
                        persist.set('token', user.token);
                        persist.set('user', user)
                        return authActions.loginSuccess({user});
                    }),
                    catchError((error: HttpErrorResponse) => {
                        return of(authActions.loginError({error}))
                    })
                );
            })
        );
        
    },
    { functional: true }
);

export const registerEffect = createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService), route = inject(Router), persist = inject(PersistanceService)) => {
        return actions$.pipe(
            ofType(authActions.register),
            switchMap(({request}) => {
                return authService.register(request).pipe(
                    tap((response) => console.log('API Response: from effect', response)),
                    map((user) => {
                        route.navigate(['home']);
                        persist.set('token', user.token);
                        persist.set('user', user)
                        return authActions.registerSuccess({user});
                    }),
                    catchError((error: HttpErrorResponse) => {
                        return of(authActions.registerError({error}))
                    })
                );
            })
        );
        
    },
    { functional: true }
);
