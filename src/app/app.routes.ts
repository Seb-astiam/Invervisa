import { Routes } from '@angular/router';
import { EntradaComponent } from './pages/entrada/entrada.component';
import { ShellComponent } from './layout/shell';
import { authGuard } from './auth/guards/auth.guard';
import { adminGuard } from './auth/guards/admin.guard';

export const routes: Routes = [
   

    {
        path: '',
        component: ShellComponent,
        children: [
            { path: '', redirectTo: 'productos', pathMatch: 'full' },
            { path: 'entrada', component: EntradaComponent },

            {
                path: 'productos',
                loadChildren: () => import('./products/products.routes').then(m => m.PRODUCTS_ROUTES)
            },
            {
                path: 'cart',
                canActivate: [authGuard],
                loadChildren: () => import('./cart/cart.routes').then(m => m.CART_ROUTES)
            },
            {
                path: 'addresses',
                canActivate: [authGuard],
                loadChildren: () => import('./addresses/addresses.routes').then(m => m.ADDRESSES_ROUTES)
            },
            {
                path: 'orders',
                canActivate: [authGuard],
                loadChildren: () => import('./orders/orders.routes').then(m => m.ORDERS_ROUTES)
            },
            {
                path: 'admin',
                canActivate: [authGuard, adminGuard],
                loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
            },
            {
                path: 'account',
                canActivate: [authGuard],
                loadChildren: () => import('./account/account.routes').then(m => m.ACCOUNT_ROUTES)
              }
        ]
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
    }

];
