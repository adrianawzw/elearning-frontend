import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { EvaluacionService } from '../../services/evaluacion.service';
import { CursoService } from '../../../cursos/services/curso.service';
import { AuthService } from '../../../auth/services/auth.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-gestionar-evaluaciones',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, MatSnackBarModule, RouterLink],
  templateUrl: './gestionar-evaluaciones.html',
  styleUrl: './gestionar-evaluaciones.scss',
})
export class GestionarEvaluaciones implements OnInit {
  private evaluacionService = inject(EvaluacionService);
  private cursoService = inject(CursoService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);

  evaluaciones: any[] = [];
  cargando = true;
  cursoId: number | null = null;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.cursoId = Number(params['cursoId']) || null;
      console.log('gestionar-evaluaciones ngOnInit, cursoId:', this.cursoId);
      if (this.cursoId) {
        this.cargarEvaluaciones();
      } else {
        this.cargarTodasDelDocente();
      }
    });
  }

  cargarTodasDelDocente() {
    const docenteId = this.authService.getUserId();
    if (!docenteId) { this.cargando = false; return; }
    this.cursoService.obtenerPorDocente(docenteId).pipe(catchError(() => of([]))).subscribe(cursos => {
      if (!cursos.length) { this.cargando = false; return; }
      forkJoin(cursos.map(c => this.evaluacionService.obtenerPorCurso(c.id).pipe(catchError(() => of([])))))
        .subscribe(resultados => {
          this.evaluaciones = resultados.flat();
          this.cargando = false;
        });
    });
  }

  cargarEvaluaciones() {
    console.log('cursoId:', this.cursoId);
    this.evaluacionService.obtenerPorCurso(this.cursoId!).subscribe({
      next: (data) => {
        console.log('evaluaciones response:', data);
        this.evaluaciones = data ?? [];
        this.cargando = false;
      },
      error: (err) => { console.error('error evaluaciones:', err); this.cargando = false; }
    });
  }

  eliminar(id: number) {
    if (!confirm('¿Eliminar esta evaluación?')) return;
    this.evaluacionService.eliminar(id).subscribe({
      next: () => {
        this.evaluaciones = this.evaluaciones.filter(e => e.id !== id);
        this.snackBar.open('Evaluación eliminada', 'Cerrar', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'top' });
      },
      error: () => this.snackBar.open('Error al eliminar', 'Cerrar', { duration: 3000 })
    });
  }

  getTipoColor(tipo: string): string {
    const map: Record<string, string> = { 'EXAMEN': '#F44336', 'TAREA': '#F48C06', 'ENTREGABLE': '#9C27B0' };
    return map[tipo] ?? '#49BBBD';
  }
}
