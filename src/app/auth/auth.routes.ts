import { Routes } from "@angular/router";
import { LoginPage } from "./pages/login.page/login.page";
import { RegisterPage } from "./pages/register.page/register.page";

export const AUTH_ROUTES: Routes = [
    { path: 'register', component: RegisterPage },
    { path: 'login', component: LoginPage }

]