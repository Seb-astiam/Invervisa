import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { ProductosComponent } from './pages/productos/productos.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    NavComponent,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
