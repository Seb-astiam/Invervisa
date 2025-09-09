import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../auth/services/auth.services';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

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

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.menuOpen.set(false); 
      });
  }

  menuOpen = signal(false);
  user = this.auth.user;
  isAuth = () => this.auth.isAuthenticated();
  isAdmin = computed(() => this.user()?.role === 'admin');

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/')
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }
}
