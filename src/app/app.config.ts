import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { interceptorInterceptor } from './interceptor.interceptor';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  authFeatureKey,
  authReducer,
} from './components/authentication/store/reducers';
import * as authEffects from './components/authentication/store/effect';
import * as conversationEffects from './components/conversation-store/store/effect';
import {
  conversationFeatureKey,
  conversationReducer,
} from './components/conversation-store/store/reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([interceptorInterceptor])),
    provideStore(),
    provideEffects(authEffects, conversationEffects),
    provideState(authFeatureKey, authReducer),
    provideState(conversationFeatureKey, conversationReducer),
  ],
};
