import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs';
import { AuthService } from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  isMenuOpen = false;
  isLoggedIn = false;
  isScrolled = false;
  isAuthPage = false;
  isDocente = false;
  isEstudiante = false;

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(auth => {
      this.isLoggedIn = auth;
      if (auth) {
        this.isDocente = this.authService.isDocente();
        this.isEstudiante = this.authService.isEstudiante();
      }
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
    this.isAuthPage = event.url.includes('/auth/login') || event.url.includes('/auth/register');
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 30;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.closeMenu();
  }
}