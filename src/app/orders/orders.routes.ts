import { Routes } from "@angular/router";
import { OrdersComponent } from "./pages/order-list/orders.component";
import { CheckoutComponent } from "./pages/checkout/checkout.component";
import { OrderDetailComponent } from "./pages/order-detail/order-detail.component";

export const ORDERS_ROUTES: Routes = [
    { path: '', component: OrdersComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'detail/:id', component: OrderDetailComponent },
    
   
]