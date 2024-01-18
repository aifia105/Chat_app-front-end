import { createActionGroup, props } from "@ngrx/store";
import { AuthenticationResponse } from "../../../models/AuthenticationResponse";
import { LoginRequest } from "../../../models/LoginRequest";
import { RegisterRequest } from "../../../models/RegisterRequest";

export const authActions = createActionGroup({
    source : 'auth',
    events: {
        'Login': props<{request: LoginRequest}>(),
        'Login Success': props<{user: AuthenticationResponse}>(),
        'Login Error': props<{error: any}>(),

        'Register': props<{request: RegisterRequest}>(),
        'Register Success': props<{user: AuthenticationResponse}>(),
        'Register Error': props<{error: any}>(),  
    }
})