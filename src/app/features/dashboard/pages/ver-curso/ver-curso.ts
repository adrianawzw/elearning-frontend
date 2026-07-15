import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CursoService } from '../../../cursos/services/curso.service';
import { InscripcionService } from '../../../inscripciones/services/inscripcion';
import { ProgresoService } from '../../../progreso/services/progreso.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Contenido, Progreso } from '../../../../shared/interfaces/models.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-ver-curso',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatProgressBarModule, MatTabsModule, MatProgressSpinnerModule, MatSnackBarModule, RouterLink],
  templateUrl: './ver-curso.html',
  styleUrl: './ver-curso.scss',
})
export class VerCurso implements OnInit {
  private route = inject(ActivatedRoute);
  private cursoService = inject(CursoService);
  private inscripcionService = inject(InscripcionService);
  private progresoService = inject(ProgresoService);
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);

  leccionActiva = 0;
  cargando = true;
  cursoId!: number;
  inscripcionId: number | null = null;
  estudianteId: number | null = null;

  curso: any = null;
  lecciones: (Contenido & { completada: boolean })[] = [];
  progresos: Progreso[] = [];
  evaluaciones: any[] = [];

  ngOnInit() {
    this.cursoId = Number(this.route.snapshot.paramMap.get('id'));
    this.estudianteId = this.authService.getUserId();
    this.cargarDatos();
  }

  cargarDatos() {
    this.http.get<any>(`http://localhost:8080/api/v1/cursos/${this.cursoId}`).pipe(catchError(() => of(null))).subscribe(curso => {
      this.curso = curso;
      if (curso) {
        this.http.get<any[]>(`http://localhost:8080/api/v1/evaluaciones/curso/${this.cursoId}`)
          .pipe(catchError(() => of([])))
          .subscribe(data => this.evaluaciones = data ?? []);
      }
    });

    this.http.get<Contenido[]>(`http://localhost:8080/api/v1/contenidos/curso/${this.cursoId}`).pipe(catchError(() => of([]))).subscribe({
      next: (contenidos) => {
        const lista = contenidos ?? [];
        if (this.estudianteId) {
          this.inscripcionService.obtenerPorEstudiante(this.estudianteId).subscribe({
            next: (inscripciones) => {
              const ins = inscripciones.find(i => i.curso_id === this.cursoId);
              this.inscripcionId = ins?.id ?? null;
              if (this.inscripcionId) {
                this.progresoService.obtenerPorInscripcion(this.inscripcionId).subscribe({
                  next: (progresos) => {
                    this.progresos = progresos;
                    this.lecciones = lista.map(c => ({
                      ...c,
                      completada: progresos.some(p => p.contenido_id === c.id && p.completado)
                    }));
                    this.cargando = false;
                  },
                  error: () => {
                    this.lecciones = lista.map(c => ({ ...c, completada: false }));
                    this.cargando = false;
                  }
                });
              } else {
                this.lecciones = lista.map(c => ({ ...c, completada: false }));
                this.cargando = false;
              }
            },
            error: () => { this.cargando = false; }
          });
        } else {
          this.lecciones = lista.map(c => ({ ...c, completada: false }));
          this.cargando = false;
        }
      },
      error: () => { this.cargando = false; }
    });
  }

  get leccionActual() { return this.lecciones[this.leccionActiva]; }
  get completadas() { return this.lecciones.filter(l => l.completada).length; }
  get progreso() { return this.lecciones.length ? Math.round((this.completadas / this.lecciones.length) * 100) : 0; }

  getTipoIcon(tipo: string): string {
    return tipo === 'VIDEO' ? 'smart_display' : tipo === 'PDF' ? 'picture_as_pdf' : tipo === 'WORD' ? 'description' : 'link';
  }

  abrirEnlace(url: string | undefined) {
    console.log('abrirEnlace url:', url);
    console.log('leccionActual completa:', this.leccionActual);
    const urlFinal = url ?? this.leccionActual?.urlMaterial ?? this.leccionActual?.url_material;
    if (!urlFinal) return;
    const a = document.createElement('a');
    a.href = urlFinal;
    a.target = '_blank';
    a.rel = 'noopener';
    a.click();
  }

  marcarCompletada() {
    if (!this.inscripcionId || !this.leccionActual) return;
    this.progresoService.marcarCompletado(this.inscripcionId, this.leccionActual.id).subscribe({
      next: () => {
        this.lecciones[this.leccionActiva].completada = true;
        this.snackBar.open('¡Lección completada!', 'Cerrar', { duration: 2000, horizontalPosition: 'end', verticalPosition: 'top' });
        if (this.leccionActiva < this.lecciones.length - 1) this.leccionActiva++;
      },
      error: () => {
        this.snackBar.open('Error al guardar progreso', 'Cerrar', { duration: 2000 });
      }
    });
  }
}
