import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-admin',
    imports: [CommonModule, RouterLink],
    template: `
    <h1>Panel Admin</h1>
    <nav class="grid">
        <a routerLink="/admin/categories/new">Nueva Categoria</a>
        <a routerLink="/admin/products/new">Nuevo Producto</a>
        <a routerLink="/admin/orders">Órdenes</a>
    </nav>
    `,
    styles: [`.grid{display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));}`]
})
export class AdminDashboardComponent { }