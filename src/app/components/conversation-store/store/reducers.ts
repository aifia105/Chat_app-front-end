import { createFeature, createReducer, on } from "@ngrx/store";
import { ConversationStateInterface } from "../conversationStateInterface";
import { conversationActions } from "./actions";

const initialState: ConversationStateInterface = {
    status: 'pending',
    conversation: null
};

const conversationFeature = createFeature({
 name: 'conversation',
 reducer : createReducer(
    initialState,
    on(conversationActions.getConversation, (state) => ({
        ...state,
        status: 'loading',
        conversation: null
    })),
    on(conversationActions.getConversationSuccess, (state, action) => ({
        ...state,
        status: 'success',
        conversation: action.conversation
    })),
    on(conversationActions.getConversationError, (state) => ({
        ...state,
        status: 'error',
        conversation: null
    })),
    on(conversationActions.getGroupConversation, (state) => ({
        ...state,
        status: 'loading',
        conversation: null
    })),
    on(conversationActions.getGroupConversationSuccess, (state, action) => ({
        ...state,
        status: 'success',
        conversation: action.conversation
    })),
    on(conversationActions.getGroupConversationError, (state) => ({
        ...state,
        status: 'error',
        conversation: null
    })),
 )       
});

export const {
    name: conversationFeatureKey,
    reducer: conversationReducer,
    selectConversation,
    selectStatus
} = conversationFeature;