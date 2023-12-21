import {  Routes } from '@angular/router';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path:'home',component: HomeComponent},
    {path:'login', component: LoginComponent},
    {path: 'navbar', component: NavbarComponent},
    {path:'register', component: RegisterComponent},
    {path: 'chat-window', component: ChatWindowComponent},
    {path: 'chat-list', component: ChatListComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'notifications', component: NotificationsComponent},
    {path: '**', component: NotFoundComponent}
];
