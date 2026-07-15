import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs';
import { AuthService } from '../../../features/auth/services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, MatIconModule, AsyncPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  private readonly router = inject(Router);
  readonly authService = inject(AuthService);

  isMenuOpen = false;
  isLoggedIn = false;
  isScrolled = false;
  isAuthPage = false;
  isDocente = false;
  isEstudiante = false;
  avatarUrl = '';

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(auth => {
      this.isLoggedIn = auth;
      if (auth) {
        this.isDocente = this.authService.isDocente();
        this.isEstudiante = this.authService.isEstudiante();
      }
    });

    this.authService.userSession$.subscribe(session => {
      if (session) {
        if (session.foto_url) {
          this.avatarUrl = `${session.foto_url}?t=${Date.now()}`;
        } else {
          const nombre = `${session.nombres ?? ''} ${session.apellidos ?? ''}`.trim() || 'Usuario';
          this.avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(nombre)}&size=36&background=49BBBD&color=fff&bold=true`;
        }
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