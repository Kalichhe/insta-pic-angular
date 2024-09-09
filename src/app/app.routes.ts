import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { HomeComponent } from './features/pages/home/home.component';

export const routes: Routes = [
    {path: 'login', component:LoginComponent},
    {path: 'sign-up', component:SignUpComponent},
    {path: 'home', component:HomeComponent},
    {path: '', redirectTo:'login', pathMatch:'full'},
    {path: '**', redirectTo:'login', pathMatch:'full'},
];
