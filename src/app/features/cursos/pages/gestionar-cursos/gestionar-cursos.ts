import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { CursoService } from '../../services/curso.service';
import { AuthService } from '../../../../features/auth/services/auth.service';
import { Curso } from '../../../../shared/interfaces/models.interface';

@Component({
  selector: 'app-gestionar-cursos',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatSnackBarModule, MatProgressSpinnerModule, RouterLink],
  templateUrl: './gestionar-cursos.html',
  styleUrl: './gestionar-cursos.scss',
})
export class GestionarCursos implements OnInit {
  private cursoService = inject(CursoService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  cursos: Curso[] = [];
  cargando = true;
  docenteId: number | null = null;

  ngOnInit() {
    this.docenteId = this.authService.getUserId();
    if (this.docenteId) this.cargarCursos();
    else this.cargando = false;
  }

  cargarCursos() {
    this.cargando = true;
    this.cursoService.obtenerPorDocente(this.docenteId!).subscribe({
      next: (data) => { this.cursos = data; this.cargando = false; },
      error: () => { this.cargando = false; }
    });
  }

  eliminar(id: number) {
    if (!confirm('¿Eliminar este curso?')) return;
    this.cursoService.eliminar(id).subscribe({
      next: () => {
        this.cursos = this.cursos.filter(c => c.id !== id);
        this.snackBar.open('Curso eliminado', 'Cerrar', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'top' });
      },
      error: () => this.snackBar.open('Error al eliminar', 'Cerrar', { duration: 3000 })
    });
  }

  getNivelColor(nivel: string): string {
    const map: Record<string, string> = { 'basico': '#4CAF50', 'intermedio': '#F48C06', 'avanzado': '#9C27B0' };
    return map[nivel?.toLowerCase()] ?? '#49BBBD';
  }

  get cursosPublicados(): number { return this.cursos.length; }
  get totalEstudiantes(): number {
    return new Set(this.cursos.flatMap(c => c.inscripciones ?? [])).size;
  }
}
