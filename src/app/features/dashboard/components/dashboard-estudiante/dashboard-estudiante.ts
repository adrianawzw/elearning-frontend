import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../../auth/services/auth.service';
import { InscripcionService } from '../../../inscripciones/services/inscripcion';
import { ProgresoService } from '../../../progreso/services/progreso.service';
import { ResultadoEvaluacionService } from '../../../evaluaciones/services/resultado-evaluacion.service';

@Component({
  selector: 'app-dashboard-estudiante',
  imports: [CommonModule, MatCardModule, MatIconModule, MatProgressBarModule, MatButtonModule, MatChipsModule, RouterLink],
  templateUrl: './dashboard-estudiante.html',
  styleUrl: './dashboard-estudiante.scss',
})
export class DashboardEstudiante implements OnInit {
  private authService = inject(AuthService);
  today = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  userName = 'Estudiante';

  private inscripcionService = inject(InscripcionService);
  private progresoService = inject(ProgresoService);
  private resultadoService = inject(ResultadoEvaluacionService);

  stats = [
    { icon: 'menu_book', value: '0', label: 'Cursos Activos', color: '#49BBBD', bg: '#49BBBD18' },
    { icon: 'check_circle', value: '0', label: 'Cursos Completados', color: '#4CAF50', bg: '#4CAF5018' },
    { icon: 'play_circle', value: '0', label: 'Videos Vistos', color: '#F48C06', bg: '#F48C0618' },
    { icon: 'assignment_turned_in', value: '0', label: 'Actividades Realizadas', color: '#9C27B0', bg: '#9C27B018' },
  ];

  activeCourses: { id: number; titulo: string; descripcion: string; progreso: number; categoria: string; imagen: string }[] = [];

  categorias: { label: string; count: number; color: string }[] = [];

  private readonly CATEGORIA_COLORS: Record<string, string> = {
    'Programación': '#49BBBD', 'Diseño': '#9C27B0', 'Datos': '#F48C06',
    'Idiomas': '#4CAF50', 'Negocios': '#F44336'
  };

  ngOnInit() {
    const session = this.authService.getUserSession();
    this.userName = session?.nombres ?? session?.email?.split('@')[0] ?? 'Estudiante';
    if (session?.id) this.cargarStats(session.id);
  }

  cargarStats(estudianteId: number) {
    forkJoin([
      this.inscripcionService.obtenerPorEstudiante(estudianteId).pipe(catchError(() => of([]))),
      this.progresoService.obtenerPorEstudiante(estudianteId).pipe(catchError(() => of([]))),
      this.resultadoService.obtenerPorEstudiante(estudianteId).pipe(catchError(() => of([])))
    ]).subscribe(([inscripciones, progresos, resultados]) => {
      this.stats[0].value = String(inscripciones.filter((i: any) => i.estado === 'ACTIVO').length);
      this.stats[1].value = String(inscripciones.filter((i: any) => i.estado === 'FINALIZADO').length);
      this.stats[2].value = String(progresos.length);
      this.stats[3].value = String(resultados.length);

      this.activeCourses = inscripciones
        .filter((i: any) => i.estado === 'ACTIVO')
        .map((i: any) => ({
          id: i.curso_id,
          titulo: i.curso_titulo ?? 'Curso',
          descripcion: i.curso_descripcion ?? '',
          progreso: i.progreso ?? 0,
          categoria: i.curso_categoria ?? 'General',
          imagen: i.curso_imagen ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(i.curso_titulo ?? 'Curso')}&size=120&background=49BBBD&color=fff`
        }));

      const cats = [...new Set(inscripciones.map((i: any) => i.curso_categoria).filter(Boolean))];
      this.categorias = (cats as string[]).map(cat => ({
        label: cat,
        count: inscripciones.filter((i: any) => i.curso_categoria === cat).length,
        color: this.CATEGORIA_COLORS[cat] ?? '#49BBBD'
      }));
    });
  }
}
