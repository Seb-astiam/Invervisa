import { Routes } from "@angular/router";
import { ProductsComponent } from "./pages/product-list/productos.component";

export const PRODUCTS_ROUTES: Routes = [
    { path: '', component: ProductsComponent },
    // { path: ':id', component: ProductDetailComponent }
]