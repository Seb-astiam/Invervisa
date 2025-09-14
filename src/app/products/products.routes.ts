import { Routes } from "@angular/router";
// import { ProductsComponent } from "./pages/product-list/productos.component";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";
import { BrowseByCategoryComponent } from "./pages/browse-by-category.component.ts/browse-by-category.component";
import { CategoryBrowseComponent } from "./pages/category-browse/category-browse.component";

export const PRODUCTS_ROUTES: Routes = [
    { path: '', component: BrowseByCategoryComponent },
    { path: 'browse', component: CategoryBrowseComponent },
    { path: ':id', component: ProductDetailComponent },
] 