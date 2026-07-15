import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { InscripcionService } from '../../../inscripciones/services/inscripcion';
import { CursoService } from '../../../cursos/services/curso.service';
import { ProgresoService } from '../../../progreso/services/progreso.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Curso, Inscripcion, Progreso } from '../../../../shared/interfaces/models.interface';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface CursoInscrito {
  id: number;
  inscripcionId: number;
  cursoId: number;
  titulo: string;
  estado: string;
  progreso: number;
  nota_final: number | null;
  img: string;
  categoria: string;
  docente: string;
  duracion: string;
  completadas: string;
  ultimaActividad: string;
}

@Component({
  selector: 'app-mis-cursos-estudiante',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatProgressBarModule, MatTabsModule, MatProgressSpinnerModule, RouterLink],
  templateUrl: './mis-cursos-estudiante.html',
  styleUrl: './mis-cursos-estudiante.scss',
})
export class MisCursosEstudiante implements OnInit {
  private inscripcionService = inject(InscripcionService);
  private cursoService = inject(CursoService);
  private progresoService = inject(ProgresoService);
  private authService = inject(AuthService);

  cursosInscritos: CursoInscrito[] = [];
  cargando = true;
  estudianteId: number | null = null;

  ngOnInit() {
    this.estudianteId = this.authService.getUserId();
    if (this.estudianteId) this.cargarCursos();
    else this.cargando = false;
  }

  cargarCursos() {
    this.inscripcionService.obtenerPorEstudiante(this.estudianteId!).subscribe({
      next: (inscripciones) => {
        if (!inscripciones.length) { this.cargando = false; return; }

        const cursos$ = this.cursoService.obtenerTodos();
        const progresos$ = inscripciones.map(ins =>
          this.progresoService.obtenerPorInscripcion(ins.id).pipe(catchError(() => of([])))
        );

        forkJoin([cursos$, ...progresos$]).subscribe({
          next: ([cursos, ...todosProgresos]) => {
            this.cursosInscritos = inscripciones.map((ins, i) => {
              const curso = (cursos as Curso[]).find(c => c.id === ins.curso_id);
              const progresos = todosProgresos[i] as Progreso[];
              const completados = progresos.filter(p => p.completado).length;
              const total = progresos.length || 1;
              return {
                inscripcionId: ins.id,
                id: ins.curso_id,
                cursoId: ins.curso_id,
                titulo: curso?.titulo ?? 'Curso',
                estado: ins.estado,
                progreso: Math.round((completados / total) * 100),
                nota_final: ins.nota_final,
                img: curso?.imagen_url ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(curso?.titulo ?? 'Curso')}&size=400&background=49BBBD&color=fff&bold=true`,
                categoria: curso?.categoria ?? 'General',
                docente: curso?.docente ? `${(curso.docente as any).nombres ?? ''} ${(curso.docente as any).apellidos ?? ''}`.trim() : 'Docente',
                duracion: curso?.duracion ?? '—',
                completadas: `${completados}`,
                ultimaActividad: ins.fecha_inscripcion ? new Date(ins.fecha_inscripcion).toLocaleDateString() : '—'
              };
            });
            this.cargando = false;
          },
          error: () => { this.cargando = false; }
        });
      },
      error: () => { this.cargando = false; }
    });
  }

  get activos() { return this.cursosInscritos.filter(c => c.estado !== 'FINALIZADO'); }
  get completados() { return this.cursosInscritos.filter(c => c.estado === 'FINALIZADO'); }

  getProgresoColor(progreso: number): string {
    if (progreso >= 80) return '#4CAF50';
    if (progreso >= 50) return '#F48C06';
    return '#49BBBD';
  }
}
