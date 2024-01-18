import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "../authStateInterface";
import { authActions } from "./actions";

const initialState: AuthStateInterface = {
    status: 'pending',
    user: null
}

const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        initialState,
        on(authActions.login, (state) => ({
            ...state,
            status: 'loading',
            user: null
        })),
        on(authActions.loginSuccess, (state, action) => ({
            ...state,
            status: 'success',
            user: action.user
        })),
        on(authActions.loginError, (state) => ({
            ...state,
            status: 'error',
            user: null
        })),
        on(authActions.register, (state) => ({
            ...state,
            status: 'loading',
            user: null
        })),
        on(authActions.registerSuccess, (state, action) => ({
            ...state,
            status: 'success',
            user: action.user
        })),
        on(authActions.registerError, (state) => ({
            ...state,
            status: 'error',
            user: null
        })),
    )
});

export const {
    name: authFeatureKey,
    reducer: authReducer,
    selectUser,
    selectStatus
} = authFeature;