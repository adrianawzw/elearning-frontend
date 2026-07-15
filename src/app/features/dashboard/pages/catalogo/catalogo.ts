import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CursoService } from '../../../cursos/services/curso.service';
import { InscripcionService } from '../../../inscripciones/services/inscripcion';
import { AuthService } from '../../../auth/services/auth.service';
import { Curso, Inscripcion } from '../../../../shared/interfaces/models.interface';

@Component({
  selector: 'app-catalogo',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatChipsModule, MatProgressSpinnerModule, MatSnackBarModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.scss',
})
export class Catalogo implements OnInit {
  private cursoService = inject(CursoService);
  private inscripcionService = inject(InscripcionService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  categoriaActiva = 'Todos';
  categorias = ['Todos', 'Programación', 'Diseño', 'Datos', 'Idiomas', 'Negocios'];

  cursos: Curso[] = [];
  inscripciones: Inscripcion[] = [];
  cargando = true;
  estudianteId: number | null = null;

  ngOnInit() {
    this.estudianteId = this.authService.getUserId();
    this.cargarDatos();
  }

  cargarDatos() {
    this.cargando = true;
    this.cursoService.obtenerTodos().subscribe({
      next: (cursos) => {
        this.cursos = cursos;
        if (this.estudianteId) {
          this.inscripcionService.obtenerPorEstudiante(this.estudianteId).subscribe({
            next: (ins) => { this.inscripciones = ins ?? []; this.cargando = false; },
            error: () => { this.inscripciones = []; this.cargando = false; }
          });
        } else {
          this.inscripciones = [];
          this.cargando = false;
        }
      },
      error: () => { this.cargando = false; }
    });
  }

  estaInscrito(cursoId: number): boolean {
    return (this.inscripciones ?? []).some(i => i.curso_id === cursoId);
  }

  inscribirse(cursoId: number) {
    if (!this.estudianteId) return;
    this.inscripcionService.inscribirse(this.estudianteId, cursoId).subscribe({
      next: (ins) => {
        this.inscripciones.push(ins);
        this.snackBar.open('¡Inscripción exitosa!', 'Cerrar', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'top' });
      },
      error: () => {
        this.snackBar.open('Error al inscribirse', 'Cerrar', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'top' });
      }
    });
  }

  get cursosFiltrados() {
    if (this.categoriaActiva === 'Todos') return this.cursos;
    return this.cursos.filter(c => (c as any).categoria === this.categoriaActiva);
  }

  setCategoria(cat: string) { this.categoriaActiva = cat; }

  getNivelColor(nivel: string): string {
    const map: Record<string, string> = { 'basico': '#4CAF50', 'intermedio': '#F48C06', 'avanzado': '#9C27B0' };
    return map[nivel?.toLowerCase()] ?? '#49BBBD';
  }
}
