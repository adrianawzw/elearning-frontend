import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ContenidoService } from '../../services/contenido.service';
import { CursoService } from '../../../cursos/services/curso.service';
import { AuthService } from '../../../../features/auth/services/auth.service';
import { Contenido, Curso } from '../../../../shared/interfaces/models.interface';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-gestionar-contenidos',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatTabsModule,
    MatProgressSpinnerModule, MatSnackBarModule, RouterLink],
  templateUrl: './gestionar-contenidos.html',
  styleUrl: './gestionar-contenidos.scss',
})
export class GestionarContenidos implements OnInit {
  private contenidoService = inject(ContenidoService);
  private cursoService = inject(CursoService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  editarContenido(id: number) {
    this.router.navigate(['/dashboard/crear-contenido'], { queryParams: { id } });
  }

  contenidos: (Contenido & { cursoTitulo?: string })[] = [];
  cursos: Curso[] = [];
  cargando = true;

  ngOnInit() {
    const docenteId = this.authService.getUserId();
    const cursoIdParam = Number(this.route.snapshot.queryParamMap.get('cursoId')) || null;

    if (!docenteId) { this.cargando = false; return; }

    this.cursoService.obtenerPorDocente(docenteId).subscribe({
      next: (cursos) => {
        this.cursos = cursos;
        const cursosACargar = cursoIdParam ? cursos.filter(c => c.id === cursoIdParam) : cursos;
        if (!cursosACargar.length) { this.cargando = false; return; }

        forkJoin(cursosACargar.map(c =>
          this.contenidoService.obtenerPorCurso(c.id).pipe(catchError(() => of([])))
        )).subscribe(resultados => {
          this.contenidos = resultados.flatMap((lista, i) =>
            ((lista ?? []) as Contenido[]).map(c => ({ ...c, cursoTitulo: cursosACargar[i].titulo }))
          );
          this.cargando = false;
        });
      },
      error: () => { this.cargando = false; }
    });
  }

  eliminar(id: number) {
    if (!confirm('¿Eliminar este contenido?')) return;
    this.contenidoService.eliminar(id).subscribe({
      next: () => {
        this.contenidos = this.contenidos.filter(c => c.id !== id);
        this.snackBar.open('Contenido eliminado', 'Cerrar', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'top' });
      },
      error: () => this.snackBar.open('Error al eliminar', 'Cerrar', { duration: 3000 })
    });
  }

  getTipoIcon(tipo: string): string {
    const map: Record<string, string> = { 'VIDEO': 'smart_display', 'PDF': 'picture_as_pdf', 'PRESENTACION': 'slideshow', 'ENLACE': 'link' };
    return map[tipo] ?? 'insert_drive_file';
  }

  getTipoColor(tipo: string): string {
    const map: Record<string, string> = { 'VIDEO': '#F44336', 'PDF': '#F48C06', 'PRESENTACION': '#9C27B0', 'ENLACE': '#49BBBD' };
    return map[tipo] ?? '#49BBBD';
  }

  getTipoBg(tipo: string): string {
    const map: Record<string, string> = { 'VIDEO': '#FFEBEE', 'PDF': '#FFF3E0', 'PRESENTACION': '#F3E5F5', 'ENLACE': '#E0F7F7' };
    return map[tipo] ?? '#E0F7F7';
  }

  countTipo(tipo: string): number { return this.contenidos.filter(c => c.tipo === tipo).length; }
}
