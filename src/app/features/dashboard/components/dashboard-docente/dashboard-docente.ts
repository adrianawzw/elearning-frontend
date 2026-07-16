import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CursoService } from '../../../cursos/services/curso.service';
import { InscripcionService } from '../../../inscripciones/services/inscripcion';
import { AuthService } from '../../../auth/services/auth.service';
import { Curso } from '../../../../shared/interfaces/models.interface';

@Component({
  selector: 'app-dashboard-docente',
  imports: [CommonModule, MatCardModule, MatIconModule, MatProgressBarModule, MatButtonModule, MatChipsModule, RouterLink, MatSnackBarModule],
  templateUrl: './dashboard-docente.html',
  styleUrl: './dashboard-docente.scss',
})
export class DashboardDocente implements OnInit {
  private cursoService = inject(CursoService);
  private inscripcionService = inject(InscripcionService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private docenteId: number | null = null;

  userName = 'Docente';
  cursos: Curso[] = [];
  finalizadosPorCurso: Record<number, any[]> = {};
  cursoExpandido: number | null = null;

  stats = [
    { icon: 'school', value: '0', label: 'Cursos dictados' },
    { icon: 'people', value: '0', label: 'Estudiantes totales' },
    { icon: 'assignment', value: '0', label: 'Contenidos totales' },
  ];

  ngOnInit() {
    const session = this.authService.getUserSession();
    this.userName = session?.nombres ?? session?.email?.split('@')[0] ?? 'Docente';
    this.docenteId = session?.id ?? null;
    if (session?.id) this.cargarStats(session.id);
  }

  cargarStats(docenteId: number) {
    this.cursoService.obtenerPorDocente(docenteId).subscribe({
      next: (cursos) => {
        this.cursos = cursos;
        this.stats[0].value = String(cursos.length);

        const totalContenidos = cursos.reduce((sum, c) => sum + (c.contenido?.length ?? 0), 0);
        this.stats[2].value = String(totalContenidos);

        const estudiantesIds = new Set(cursos.flatMap(c => c.inscripciones ?? []));
        this.stats[1].value = String(estudiantesIds.size);

        if (cursos.length) {
          const requests = cursos.map(c =>
            this.inscripcionService.obtenerFinalizadosPorCurso(c.id!).pipe(catchError(() => of([])))
          );
          forkJoin(requests).subscribe(resultados => {
            cursos.forEach((c, i) => { this.finalizadosPorCurso[c.id!] = resultados[i]; });
          });
        }
      }
    });
  }

  toggleFinalizados(cursoId: number) {
    this.cursoExpandido = this.cursoExpandido === cursoId ? null : cursoId;
  }

  eliminarCurso(id: number) {
    if (!confirm('¿Eliminar este curso? Esta acción no se puede deshacer.')) return;
    this.cursoService.eliminar(id).subscribe({
      next: () => {
        this.cursos = this.cursos.filter(c => c.id !== id);
        this.stats[0].value = String(this.cursos.length);
        this.snackBar.open('Curso eliminado', 'Cerrar', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'top' });
      },
      error: () => this.snackBar.open('Error al eliminar el curso', 'Cerrar', { duration: 3000 })
    });
  }

  recentActivities: { estudiante_nombre: string; curso_titulo: string; fecha_inscripcion: string }[] = [];
}
