import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Order, OrdersService } from '../../services/orders.service';
import { ProductsService } from '../../../products/services/products.service';

@Component({
  selector: 'app-order-detail',
  imports: [CommonModule, RouterLink, DatePipe, CurrencyPipe],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent {
  private route = inject(ActivatedRoute);
  private api = inject(OrdersService);
  productApi = inject(ProductsService)
  
  loading = signal(true);
  order = signal<Order | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.api.getOne(id).subscribe({
      next: (o) => { this.order.set(o); this.loading.set(false); },
      error: () => { this.order.set(null); this.loading.set(false); }
    });
  }

  subtotal() {
    const o = this.order();

    if (!o) return 0;
    return o.items.reduce((acc, it) => acc + Number(it.basePrice) * it.quantity, 0);
  }
}
