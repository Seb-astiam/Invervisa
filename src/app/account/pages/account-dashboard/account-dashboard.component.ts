import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Me, UsersService } from '../../../users/services/users.service';

@Component({
  selector: 'app-account-dashboard',
  imports: [CommonModule ,RouterLink],
  templateUrl: './account-dashboard.component.html',
  styleUrl: './account-dashboard.component.css'
})
export class AccountDashboardComponent {
  private api = inject(UsersService);
  me: Me | null = null;
  loading = true;
  

  ngOnInit() {
    this.api.getMe().subscribe({
      next: (res) => { this.me = res; this.loading = false; },
      error: (e) => { this.loading = false }
    })

  }
}
