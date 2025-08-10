import { Component } from "@angular/core"; 
import { RouterLink, RouterOutlet } from "@angular/router";
import { NavComponent } from "./nav/nav.component";

@Component({
    selector: 'app-shell',
    imports: [RouterOutlet, NavComponent, RouterLink],
    template: `
    <div class="layout">
        <div class="invervisa">
            <img routerLink="/entrada" src="/group-13.1.svg"  alt="Logo" class="logo"/>
            <app-nav></app-nav>
        </div>
        <router-outlet />
    </div>

    `,
    styleUrl: './style.css'
})
export class ShellComponent {}