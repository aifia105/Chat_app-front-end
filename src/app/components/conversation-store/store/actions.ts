import { createActionGroup, props } from "@ngrx/store";
import { ConversationInterface } from "../../../models/ConversationInterface";

export const conversationActions = createActionGroup({
    source: 'Conversation',
    events: {
        'Get Conversation': props<{id: string}>(),
        'Get Conversation Success': props<{conversation: ConversationInterface}>(),
        'Get Conversation Error': props<{error: any}>(),


        'Get Group Conversation': props<{participants: string[]}>(),
        'Get Group Conversation Success': props<{conversation: ConversationInterface}>(),
        'Get Group Conversation Error': props<{error: any}>(),
    }
});