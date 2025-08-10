import { Routes } from "@angular/router";
import { LoginPage } from "./pages/login.page";
import { RegisterPage } from "./pages/register.page";

export const AUTH_ROUTES: Routes = [
    { path: 'register', component: RegisterPage },
    { path: 'login', component: LoginPage }

]