import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CursoService } from '../../../cursos/services/curso.service';
import { EvaluacionService } from '../../services/evaluacion.service';
import { ResultadoEvaluacionService } from '../../services/resultado-evaluacion.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-resultados',
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTabsModule,
    MatProgressSpinnerModule, MatSnackBarModule, MatFormFieldModule, MatInputModule,
    RouterLink, FormsModule],
  templateUrl: './resultados.html',
  styleUrl: './resultados.scss',
})
export class Resultados implements OnInit {
  private cursoService = inject(CursoService);
  private evaluacionService = inject(EvaluacionService);
  private resultadoService = inject(ResultadoEvaluacionService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  cargando = true;
  evaluacionesConResultados: any[] = [];
  calificandoId: number | null = null;
  notaInput: Record<number, number> = {};

  ngOnInit() {
    const docenteId = this.authService.getUserId();
    if (!docenteId) { this.cargando = false; return; }

    this.cursoService.obtenerPorDocente(docenteId).subscribe({
      next: (cursos) => {
        if (!cursos.length) { this.cargando = false; return; }
        forkJoin(cursos.map(c =>
          this.evaluacionService.obtenerPorCurso(c.id).pipe(catchError(() => of([])))
        )).subscribe(resultados => {
          const evaluaciones = resultados.flatMap((lista: any[], i) =>
            (lista ?? []).map(ev => ({ ...ev, cursoTitulo: cursos[i].titulo }))
          );
          if (!evaluaciones.length) { this.cargando = false; return; }
          forkJoin(evaluaciones.map(ev =>
            this.resultadoService.obtenerPorEstudiante(ev.id).pipe(catchError(() => of([])))
          )).subscribe(entregas => {
            this.evaluacionesConResultados = evaluaciones.map((ev, i) => ({
              ...ev,
              entregas: entregas[i] ?? []
            }));
            this.cargando = false;
          });
        });
      },
      error: () => { this.cargando = false; }
    });
  }

  calificar(resultadoId: number, evaluacionIdx: number) {
    const nota = this.notaInput[resultadoId];
    if (nota == null || nota < 0 || nota > 100) {
      this.snackBar.open('Ingresa una nota entre 0 y 100', 'Cerrar', { duration: 3000 }); return;
    }
    this.resultadoService.calificar(resultadoId, nota).subscribe({
      next: () => {
        const entrega = this.evaluacionesConResultados[evaluacionIdx]?.entregas.find((e: any) => e.id === resultadoId);
        if (entrega) entrega.nota = nota;
        this.calificandoId = null;
        this.snackBar.open('Calificación guardada', 'Cerrar', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'top' });
      },
      error: () => this.snackBar.open('Error al calificar', 'Cerrar', { duration: 3000 })
    });
  }

  getTipoColor(tipo: string): string {
    const map: Record<string, string> = { 'EXAMEN': '#F44336', 'TAREA': '#F48C06', 'ENTREGABLE': '#9C27B0' };
    return map[tipo] ?? '#49BBBD';
  }

  getNotaColor(nota: number): string {
    if (nota >= 80) return '#4CAF50';
    if (nota >= 60) return '#F48C06';
    return '#F44336';
  }
}
