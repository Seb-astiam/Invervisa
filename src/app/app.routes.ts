import { Routes } from '@angular/router';
import { ProductosComponent } from './pages/productos/productos.component';
import { EntradaComponent } from './pages/entrada/entrada.component';

export const routes: Routes = [
    { path: 'productos', component: ProductosComponent },
    { path: 'entrada', component: EntradaComponent }
];
