import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { DashboardDocente } from '../../components/dashboard-docente/dashboard-docente';
import { DashboardEstudiante } from '../../components/dashboard-estudiante/dashboard-estudiante';
import { MatDividerModule } from '@angular/material/divider';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
}
@Component({
  selector: 'app-dashboard',
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    RouterLink,
    DashboardDocente,
    DashboardEstudiante,
    RouterLinkActive,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatDrawer;
  // se le agrega logica login segun rol de usuario, para mostrar el dashboard correspondiente !!!
  // se inyectan servicios
  userRole: 'estudiante' | 'docente' = 'docente'; // Cambiar según el rol del usuario

  userName = 'María García';
  userEmail = 'maria@email.com';
  userAvatar =
    'https://ui-avatars.com/api/?name=Maria+Garcia&size=40&background=49BBBD&color=fff&bold=true';

  isHandset = false;
  private handsetSub?: Subscription;

  // DOCENTE
  private docenteMenu: MenuItem[] = [
    { icon: 'dashboard', label: 'Inicio', route: '/dashboard' },
    { icon: 'school', label: 'Mis Cursos', route: '/dashboard/mis-cursos' },
    { icon: 'add_circle', label: 'Crear Curso', route: '/dashboard/crear-curso' },
    { icon: 'person', label: 'Mi Perfil', route: '/dashboard/perfil' },
  ];

  // ESTUDIANTE
  private estudianteMenu: MenuItem[] = [
    { icon: 'dashboard', label: 'Inicio', route: '/dashboard' },
    { icon: 'search', label: 'Catálogo', route: '/dashboard/catalogo' },
    { icon: 'school', label: 'Mis Cursos', route: '/dashboard/mis-cursos' },
    { icon: 'person', label: 'Mi Perfil', route: '/dashboard/perfil' },
  ];

  get menuItems(): MenuItem[] {
    return this.userRole === 'docente' ? this.docenteMenu : this.estudianteMenu;
  }

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.handsetSub = this.breakpointObserver.observe('(max-width: 768px)').subscribe((res) => {
      this.isHandset = res.matches;
      if (this.isHandset && this.drawer) {
        this.drawer.close();
      }
    });
  }

  logout() {
    console.log('Cerrando sesión...');
  }

  ngOnDestroy(): void {
    if (this.handsetSub) {
      this.handsetSub.unsubscribe();
    }
  }
}
