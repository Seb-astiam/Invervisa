import { Routes } from "@angular/router";
import { AdminDashboardComponent } from "./pages/admin-dashboard/admin-dashboard.component";
import { NewCategoryComponent } from "./pages/new-category/new-category.component";
import { NewProductComponent } from "./pages/new-product/new-product.component";
import { OrderAdminComponent } from "./pages/orders-admin/orders-admin.component";

export const ADMIN_ROUTES: Routes = [
    { path: '', component: AdminDashboardComponent },
    { path: 'categories/new', component: NewCategoryComponent },
    { path: 'products/new', component: NewProductComponent }, 
    { path: 'orders', component: OrderAdminComponent },
]
