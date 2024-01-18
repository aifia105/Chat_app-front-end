import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ConversationService } from "../../../services/conversation.service";
import { conversationActions } from "./actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

export const conversationEffects = createEffect(
    (action$ = inject(Actions), conversationService = inject(ConversationService)) => {
        return action$.pipe(
            ofType(conversationActions.getConversation),
            switchMap(({id}) => {
                return conversationService.getConversationsOneOnOne(id).pipe(
                    tap((response) => console.log('API Response: from effect', response)),
                    map((conversation) => {
                        return conversationActions.getConversationSuccess({conversation});
                    }),
                    catchError((error: HttpErrorResponse) => {
                        return of(conversationActions.getConversationError({error}))
                    })
                );
            })
        );
    },
    { functional: true }
);

export const conversationGroupEffects = createEffect(
    (action$ = inject(Actions), conversationService = inject(ConversationService)) => {
        return action$.pipe(
            ofType(conversationActions.getGroupConversation),
            switchMap(({participants}) => {
                return conversationService.getConversationsGroup(participants).pipe(
                    tap((response) => console.log('API Response: from effect', response)),
                    map((conversation) => {
                        return conversationActions.getGroupConversationSuccess({conversation});
                    }),
                    catchError((error: HttpErrorResponse) => {
                        return of(conversationActions.getGroupConversationError({error}))
                    })
                );
            })
        );
    },
    { functional: true }
);