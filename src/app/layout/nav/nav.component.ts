import { Component, computed, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  private auth = inject(AuthService);
  private router = inject (Router);

  user = this.auth.user;
  isAuth = () => this.auth.isAuthenticated();
  isAdmin = computed(() => this.user()?.role === 'admin');

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/')
  }
}
