import { Component, OnInit, OnDestroy, ViewChild, inject } from '@angular/core';
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
import { RouterOutlet } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../auth/services/auth.service';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
  exact?: boolean;
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
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatDrawer;
  private readonly authService = inject(AuthService);
  private readonly breakpointObserver = inject(BreakpointObserver);
  // se le agrega logica login segun rol de usuario, para mostrar el dashboard correspondiente !!!
  // se inyectan servicios
  userRole: 'estudiante' | 'docente' = 'docente';

  userName = '';
  userEmail = '';
  userAvatar = 'https://ui-avatars.com/api/?name=Usuario&size=40&background=49BBBD&color=fff&bold=true';

  isHandset = false;
  private handsetSub?: Subscription;

  // DOCENTE
  private docenteMenu: MenuItem[] = [
    { icon: 'dashboard', label: 'Inicio', route: '/dashboard', exact: true },
    { icon: 'menu_book', label: 'Gestionar Cursos', route: '/dashboard/gestionar-cursos' },
    { icon: 'add_circle', label: 'Crear Curso', route: '/dashboard/crear-curso' },
    { icon: 'folder', label: 'Gestionar Contenidos', route: '/dashboard/gestionar-contenidos' },
    { icon: 'post_add', label: 'Crear Contenido', route: '/dashboard/crear-contenido' },
    { icon: 'quiz', label: 'Gestionar Evaluaciones', route: '/dashboard/gestionar-evaluaciones' },
    { icon: 'add_task', label: 'Crear Evaluación', route: '/dashboard/crear-evaluacion' },
  ];

  private estudianteMenu: MenuItem[] = [
    { icon: 'dashboard', label: 'Inicio', route: '/dashboard/inicio', exact: true },
    { icon: 'search', label: 'Catálogo', route: '/dashboard/catalogo' },
    { icon: 'school', label: 'Mis Cursos', route: '/dashboard/mis-cursos' },
    { icon: 'person', label: 'Mi Perfil', route: '/dashboard/perfil' },
  ];

  get menuItems(): MenuItem[] {
    return this.userRole === 'docente' ? this.docenteMenu : this.estudianteMenu;
  }


  ngOnInit() {
    const rol = this.authService.getUserRol();
    this.userRole = rol === 'DOCENTE' ? 'docente' : 'estudiante';

    this.authService.userSession$.subscribe(session => {
      if (session) {
        const nombre = `${session.nombres ?? ''} ${session.apellidos ?? ''}`.trim() || session.email?.split('@')[0] || 'Usuario';
        this.userName = nombre;
        this.userEmail = session.email ?? '';
        this.userAvatar = session.foto_url
          ? session.foto_url
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(nombre)}&size=40&background=49BBBD&color=fff&bold=true`;
      }
    });

    this.handsetSub = this.breakpointObserver.observe('(max-width: 768px)').subscribe((res) => {
      this.isHandset = res.matches;
      if (this.isHandset && this.drawer) {
        this.drawer.close();
      }
    });
  }

  logout() {
    this.authService.logout(); // ← CAMBIAR
  }
  ngOnDestroy(): void {
    if (this.handsetSub) {
      this.handsetSub.unsubscribe();
    }
  }
}
