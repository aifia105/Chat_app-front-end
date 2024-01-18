import { Injectable, inject } from "@angular/core";
import { StompConfig, StompService } from "@stomp/ng2-stompjs";
import { PersistanceService } from "./persistance.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    persist = inject(PersistanceService);
    stompService = inject(StompService)

    private stopmConfig: StompConfig = {
        url: 'ws://localhost:8080/ws',
        headers: {
            Authorization: `Bearer ${this.persist.get('token')}`
        },
        heartbeat_in: 0,
        heartbeat_out: 20000,
        reconnect_delay: 5000,
        debug: true
    };

    connectAndSubscribe(ConversationId: string): Observable<any> {
        const stompSubscription = this.stompService.subscribe(`/topic/${ConversationId}`);
        return new Observable<any>((observer) => {
            stompSubscription.subscribe((message) => {
                observer.next(message);
            });
        });
    }
    
    sendMessage(ConversationId: string, message: string): void {
        this.stompService.publish(`/app/chat/${ConversationId}`, message);
    }

    disconnect(): void {
        this.stompService.disconnect();
    }
    
}